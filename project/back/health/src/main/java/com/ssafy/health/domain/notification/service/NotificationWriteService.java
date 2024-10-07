package com.ssafy.health.domain.notification.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.health.common.fcm.dto.request.FcmRequestDto;
import com.ssafy.health.common.fcm.service.FcmService;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.notification.dto.request.NotificationRequestDto;
import com.ssafy.health.domain.notification.dto.response.StatusUpdateResponseDto;
import com.ssafy.health.domain.notification.entity.Notification;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import com.ssafy.health.domain.notification.entity.NotificationType;
import com.ssafy.health.domain.notification.repository.NotificationRepository;
import com.ssafy.health.domain.quest.entity.CrewQuest;
import com.ssafy.health.domain.quest.entity.QuestType;
import com.ssafy.health.domain.quest.entity.UserQuest;
import com.ssafy.health.domain.quest.exception.QuestNotFoundException;
import com.ssafy.health.domain.quest.repository.CrewQuestRepository;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static com.ssafy.health.domain.notification.entity.NotificationMessage.*;

@Service
@RequiredArgsConstructor
public class NotificationWriteService {

    private final BodyHistoryRepository bodyHistoryRepository;
    private final NotificationRepository notificationRepository;
    private final FcmService fcmService;
    private final UserQuestRepository userQuestRepository;
    private final CrewQuestRepository crewQuestRepository;
    private final UserRepository userRepository;

    @Scheduled(cron = "0 0 9 * * Mon")
    public void sendBodySurveyNotification() {

        LocalDateTime dueDate = LocalDateTime.now().minusDays(14);
        List<User> usersToSend = userRepository.findAllByBodyHistoryAvailability(dueDate);

        usersToSend.forEach(user -> {
            try {
                createBodySurveyNotification(user);
            } catch (ExecutionException | InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }


    private void createBodySurveyNotification(User user)
            throws ExecutionException, InterruptedException {

        Map<String, Object> additionalData = new HashMap<>();
        LocalDateTime lastSurveyedDate = null;

        BodyHistory bodyHistory = bodyHistoryRepository.findFirstByUserIdOrderByCreatedAtDesc(user.getId())
                .orElse(null);

        if (bodyHistory != null) {
            lastSurveyedDate = bodyHistory.getCreatedAt();
        }

        additionalData.put("lastSurveyedDate", lastSurveyedDate);

        Notification notification = notificationBuilder(
                NotificationType.SURVEY, user, SURVEY.getMessage(), additionalData);
        notificationRepository.save(notification);

        sendFcmMessage(user, "체형 입력 알림", SURVEY.getMessage());
    }

    public NotificationRequestDto createBattleNotification(
            NotificationType notificationType, User user, Battle battle, Crew crew, Integer coinAmount)
            throws ExecutionException, InterruptedException {

        Map<String, Object> additionalData = new HashMap<>();

        BattleMatchResponseDto battleData = createBattleMatchResponseDto(battle, crew);
        additionalData.put("battleDetail", battleData);

        additionalData.put("coinDetail", battleData.getBattleStatus().equals(BattleStatus.STARTED) ?
                null : createCoinDetail(coinAmount));

        String message = getBattleNotificationMessage(battle.getStatus());

        return NotificationRequestDto.builder()
                .notificationType(notificationType)
                .user(user)
                .message(message)
                .additionalData(additionalData)
                .build();
    }

    private BattleMatchResponseDto createBattleMatchResponseDto(Battle battle, Crew crew) {
        String myCrewName, opponentCrewName;
        Float myCrewScore, opponentCrewScore;

        if (battle.getHomeCrew().equals(crew)) {
            myCrewName = battle.getHomeCrew().getName();
            myCrewScore = battle.getHomeCrewScore();
            opponentCrewName = battle.getAwayCrew().getName();
            opponentCrewScore = battle.getAwayCrewScore();
        } else {
            myCrewName = battle.getAwayCrew().getName();
            myCrewScore = battle.getAwayCrewScore();
            opponentCrewName = battle.getHomeCrew().getName();
            opponentCrewScore = battle.getHomeCrewScore();
        }

        return BattleMatchResponseDto.builder()
                .myCrewName(myCrewName)
                .myCrewScore(myCrewScore)
                .opponentCrewName(opponentCrewName)
                .opponentCrewScore(opponentCrewScore)
                .exerciseName(battle.getHomeCrew().getExercise().getName())
                .battleStatus(battle.getStatus())
                .dDay(calculateDDay())
                .build();
    }

    private CoinDetail createCoinDetail(Integer coinAmount) {
        return CoinDetail.builder()
                .crewCoin(200)
                .myCoin(coinAmount)
                .build();
    }

    private String getBattleNotificationMessage(BattleStatus status) {
        return status.equals(BattleStatus.STARTED) ? BATTLE_START.getMessage() : BATTLE_END.getMessage();
    }

    public void saveNotification(List<NotificationRequestDto> requestDtoList) {
        List<Notification> battleNotificationList = requestDtoList.stream()
                .map(dto -> {
                    try {
                        sendFcmMessage(dto.getUser(), "배틀 알림", dto.getMessage());
                    } catch (ExecutionException | InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    return notificationBuilder(dto.getNotificationType(),
                            dto.getUser(), dto.getMessage(), dto.getAdditionalData());
                })
                .toList();

        notificationRepository.saveAll(battleNotificationList);
    }


    @Data
    @Builder
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class CoinDetail {
        private int crewCoin;
        private int myCoin;
    }

    public void createUserQuestNotification(NotificationType notificationType, User user, Long questId)
            throws ExecutionException, InterruptedException {

        Map<String, Object> additionalData = new HashMap<>();

        UserQuest quest = userQuestRepository.findById(questId).orElseThrow(QuestNotFoundException::new);
        UserQuestNotification questDetail = UserQuestNotification.builder()
                .type(QuestType.INDIVIDUAL)
                .questId(questId)
                .title(quest.getQuest().getTitle())
                .coins(quest.getQuest().getCompletionCoins())
                .build();

        StringBuilder messageBuilder = new StringBuilder().append("'")
                .append(quest.getQuest().getTitle())
                .append("' ")
                .append(QUEST.getMessage());

        additionalData.put("questDetail", questDetail);
        Notification questNotification = notificationBuilder(
                notificationType, user, messageBuilder.toString(), additionalData);
        notificationRepository.save(questNotification);

        sendFcmMessage(user, "퀘스트 알림", messageBuilder.toString());
    }

    public void createCrewQuestNotification(NotificationType notificationType, User user, Crew crew, Long questId)
            throws ExecutionException, InterruptedException {

        Map<String, Object> additionalData = new HashMap<>();

        CrewQuest quest = crewQuestRepository.findById(questId).orElseThrow(QuestNotFoundException::new);
        CrewQuestNotification questDetail = CrewQuestNotification.builder()
                .type(QuestType.CREW)
                .questId(questId)
                .crewId(crew.getId())
                .crewName(crew.getName())
                .title(quest.getQuest().getTitle())
                .coins(quest.getQuest().getCompletionCoins())
                .build();

        StringBuilder messageBuilder = new StringBuilder().append(QUEST.getMessage());

        additionalData.put("questDetail", questDetail);
        Notification questNotification = notificationBuilder(
                notificationType, user, messageBuilder.toString(), additionalData);
        notificationRepository.save(questNotification);

        sendFcmMessage(user, "퀘스트 알림", messageBuilder.toString());
    }

    @Data
    @Builder
    static class UserQuestNotification {
        private QuestType type;
        private Long questId;
        private String title;
        private Integer coins;
    }

    @Data
    @Builder
    static class CrewQuestNotification {
        private QuestType type;
        private Long questId;
        private Long crewId;
        private String crewName;
        private String title;
        private Integer coins;
    }

    public StatusUpdateResponseDto updateNotificationStatus(NotificationStatus status, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow();
        NotificationStatus previousStatus = notification.getNotificationStatus();
        notification.updateNotificationStatus(status);
        notificationRepository.save(notification);

        return StatusUpdateResponseDto.builder()
                .previousStatus(previousStatus)
                .currentStatus(status)
                .build();
    }

    public void sendFcmMessage(User user, String title, String body) throws ExecutionException, InterruptedException {
        String token = user.getDeviceToken();

        if (token != null) {
            FcmRequestDto fcmRequestDto = FcmRequestDto.builder()
                    .token(token)
                    .title(title)
                    .body(body)
                    .build();
            fcmService.sendMessageToDevice(fcmRequestDto);
        }
    }

    public Notification notificationBuilder(
            NotificationType notificationType, User user, String message, Map<String, Object> additionalData) {
        return Notification.builder()
                .notificationType(notificationType)
                .notificationStatus(NotificationStatus.UNREAD)
                .content(message)
                .user(user)
                .additionalData(additionalData)
                .build();
    }

    private Integer calculateDDay() {
        LocalDate now = LocalDate.now();
        LocalDate lastDay = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

        return (int) ChronoUnit.DAYS.between(now, lastDay);
    }
}
