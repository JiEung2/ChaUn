package com.ssafy.health.domain.notification.dto.response;

import com.ssafy.health.domain.notification.entity.NotificationStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StatusUpdateResponseDto {

    private final String message = "알림 상태 변경 완료";
    private NotificationStatus previousStatus;
    private NotificationStatus currentStatus;
}