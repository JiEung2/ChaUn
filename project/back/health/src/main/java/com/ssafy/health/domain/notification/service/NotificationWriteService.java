package com.ssafy.health.domain.notification.service;

import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.notification.dto.request.NotificationRequestDto;
import com.ssafy.health.domain.notification.dto.response.StatusUpdateResponseDto;
import com.ssafy.health.domain.notification.entity.Notification;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import com.ssafy.health.domain.notification.entity.NotificationType;
import com.ssafy.health.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static com.ssafy.health.domain.notification.entity.NotificationMessage.*;

@Service
@RequiredArgsConstructor
public class NotificationWriteService {

    private final BattleRepository battleRepository;
    private final BodyHistoryRepository bodyHistoryRepository;
    private final NotificationRepository notificationRepository;

    public void createBodySurveyNotification(NotificationRequestDto dto) {
        Map<String, Object> additionalData = new HashMap<>();
        LocalDateTime lastSurveyedDate = null;

        try {
            lastSurveyedDate = bodyHistoryRepository.findFirstByUserId(dto.getUserId())
                    .orElseThrow().getCreatedAt();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        additionalData.put("lastSurveyedDate", lastSurveyedDate);

        Notification notification = notificationBuilder(
                dto.getNotificationType(), dto.getUserId(), BODY_SURVEY.getMessage(), additionalData);
        notificationRepository.save(notification);
    }

    public void createBattleNotification(NotificationRequestDto dto, Long battleId) {
        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("battleId", battleId);

        BattleStatus status = battleRepository.findById(battleId).orElseThrow().getStatus();
        String message = (status.equals(BattleStatus.STARTED) ? BATTLE_START.getMessage() : BATTLE_END.getMessage());

        Notification battleNotification = notificationBuilder(
                dto.getNotificationType(), dto.getUserId(), message, additionalData);
        notificationRepository.save(battleNotification);
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

    public Notification notificationBuilder(NotificationType notificationType, Long userId, String message) {
        return Notification.builder()
                .notificationType(notificationType)
                .notificationStatus(NotificationStatus.UNREAD)
                .content(message)
                .userId(userId)
                .build();
    }

    public Notification notificationBuilder(
            NotificationType notificationType, Long userId, String message, Map<String, Object> additionalData) {
        return Notification.builder()
                .notificationType(notificationType)
                .notificationStatus(NotificationStatus.UNREAD)
                .content(message)
                .userId(userId)
                .additionalData(additionalData)
                .build();
    }
}
