package com.ssafy.health.domain.quest.service;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.coin.service.CoinService;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.notification.entity.NotificationType;
import com.ssafy.health.domain.notification.service.NotificationWriteService;
import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.entity.*;
import com.ssafy.health.domain.quest.exception.QuestNotFoundException;
import com.ssafy.health.domain.quest.repository.CrewQuestRepository;
import com.ssafy.health.domain.quest.repository.QuestRepository;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestWriteService {

    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final QuestRepository questRepository;
    private final UserQuestRepository userQuestRepository;
    private final CrewQuestRepository crewQuestRepository;
    private final CoinService coinService;
    private final NotificationWriteService notificationWriteService;

    public Quest createQuest(QuestCreateRequestDto requestDto) {
        return questRepository.save(questBuilder(
                requestDto.getQuestType(),
                requestDto.getTitle(),
                requestDto.getQuestPeriod(),
                requestDto.getCoins()));
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void createDailyQuest() {

        endQuests(QuestPeriod.DAILY);
        buildQuestList(QuestPeriod.DAILY);
    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void createMonthlyQuest() {

        endQuests(QuestPeriod.MONTHLY);
        buildQuestList(QuestPeriod.MONTHLY);
    }

    private void buildQuestList(QuestPeriod period) {

        List<Quest> questList = questRepository.findAllByPeriod(period);
        List<User> userList = userRepository.findAll();
        List<Crew> crewList = crewRepository.findAll();

        List<UserQuest> userQuestList = new ArrayList<>();
        List<CrewQuest> crewQuestList = new ArrayList<>();

        questList.forEach(quest -> {
            if (quest.getType().equals(QuestType.INDIVIDUAL)) {
                userList.forEach(user -> userQuestList.add(UserQuest.builder()
                        .quest(quest)
                        .user(user)
                        .build()));
            } else if (quest.getType().equals(QuestType.CREW)) {
                crewList.forEach(crew -> crewQuestList.add(CrewQuest.builder()
                        .quest(quest)
                        .crew(crew)
                        .build()));
            }
        });

        userQuestRepository.saveAll(userQuestList);
        crewQuestRepository.saveAll(crewQuestList);
    }

    public void updateUserQuestStatus(User user, String title, QuestStatus status)
            throws ExecutionException, InterruptedException {
        UserQuest quest = userQuestRepository.findUserQuestWithCriteria(user, status, title);
        if (quest != null) {
            quest.updateStatus(QuestStatus.COMPLETED);
            coinService.grantCoinsToUser(user, quest.getQuest().getCompletionCoins());

            notificationWriteService.createUserQuestNotification(NotificationType.QUEST, user, quest.getId());
        } else {
            throw new QuestNotFoundException();
        }
    }

    public void updateCrewQuestStatus(Crew crew, String title, QuestStatus status) {
        CrewQuest quest = crewQuestRepository.findCrewQuestWithCriteria(crew, status, title);
        if (quest != null) {
            quest.updateStatus(QuestStatus.COMPLETED);
            coinService.grantCoinsToCrew(crew, quest.getQuest().getCompletionCoins());

            List<User> userList = userRepository.findUserByCrewId(crew.getId());
            userList.forEach(user -> {
                try {
                    notificationWriteService.createCrewQuestNotification(NotificationType.QUEST, user, crew, quest.getId());
                } catch (ExecutionException | InterruptedException e) {
                    throw new RuntimeException(e);
                }
            });
        } else {
            throw new QuestNotFoundException();
        }
    }

    private void endQuests(QuestPeriod period) {

        userQuestRepository.updateAllStatusByPeriod(period, QuestStatus.FINISHED);
        crewQuestRepository.updateAllStatusByPeriod(period, QuestStatus.FINISHED);
    }

    private Quest questBuilder(QuestType type, String title, QuestPeriod period, Integer coins) {
        return Quest.builder()
                .type(type)
                .period(period)
                .title(title)
                .completionCoins(coins)
                .build();
    }
}
