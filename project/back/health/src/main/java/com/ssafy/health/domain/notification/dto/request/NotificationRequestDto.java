package com.ssafy.health.domain.notification.dto.request;

import com.ssafy.health.domain.notification.entity.NotificationType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationRequestDto {

    private NotificationType notificationType;
    private Long userId;
}
