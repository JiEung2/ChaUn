package com.ssafy.health.domain.notification.dto.response;

import com.ssafy.health.domain.notification.entity.NotificationType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Builder
@Getter
public class NotificationResponseDto {

    private Long notificationId;
    private NotificationType notificationType;
    private Map<String, Object> additionalData;
    private String content;
    private LocalDateTime createdAt;
}
