package com.ssafy.health.domain.notification.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.health.domain.notification.entity.Notification;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import com.ssafy.health.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationReadService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public List<NotificationResponseDto> getNotifications() {
        Long userId = findUserById(SecurityUtil.getCurrentUserId()).getId();
        List<Notification> notificationList = notificationRepository.findByUserIdAndNotificationStatus(
                userId, NotificationStatus.UNREAD);

        return notificationList.stream().map(this::buildNotificationResponseDto).toList();
    }

    private NotificationResponseDto buildNotificationResponseDto(Notification notification) {
        return NotificationResponseDto.builder()
                .notificationId(notification.getId())
                .notificationType(notification.getNotificationType())
                .content(notification.getContent())
                .createdAt(notification.getCreatedAt())
                .additionalData(notification.getAdditionalData())
                .build();
    }

    private User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }
}
