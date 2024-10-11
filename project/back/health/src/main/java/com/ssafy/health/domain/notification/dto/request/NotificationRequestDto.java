package com.ssafy.health.domain.notification.dto.request;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.notification.entity.NotificationType;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationRequestDto {

    private NotificationType notificationType;
    private User user;
    private String message;
    private Map<String, Object> additionalData;

}
