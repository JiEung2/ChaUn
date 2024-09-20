package com.ssafy.health.domain.notification.service;

import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.notification.dto.request.NotificationRequestDto;
import com.ssafy.health.domain.notification.entity.Notification;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import com.ssafy.health.domain.notification.entity.NotificationType;
import com.ssafy.health.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import static com.ssafy.health.domain.notification.entity.NotificationMessage.BATTLE_END;
import static com.ssafy.health.domain.notification.entity.NotificationMessage.BATTLE_START;

@Service
@RequiredArgsConstructor
public class NotificationWriteService {

    private final BattleRepository battleRepository;
    private final NotificationRepository notificationRepository;

    public void createBattleNotification(NotificationRequestDto dto, Long battleId) {
        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("battleId", battleId);

        BattleStatus status = battleRepository.findById(battleId).orElseThrow().getStatus();
        String message = (status.equals(BattleStatus.STARTED) ? BATTLE_START.getMessage() : BATTLE_END.getMessage());

        Notification battleNotification = notificationBuilder(
                dto.getNotificationType(), dto.getUserId(), message, additionalData);
        notificationRepository.save(battleNotification);
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
