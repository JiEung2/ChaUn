package com.ssafy.health.domain.notification.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.health.domain.notification.dto.response.StatusUpdateResponseDto;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import com.ssafy.health.domain.notification.service.NotificationReadService;
import com.ssafy.health.domain.notification.service.NotificationWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController implements NotificationControllerApi {

    private final NotificationReadService notificationReadService;
    private final NotificationWriteService notificationWriteService;

    @GetMapping("/get")
    public ApiResponse<List<NotificationResponseDto>> getNotifications() {
        return ApiResponse.success(notificationReadService.getNotifications());
    }

    @PatchMapping("/read/{notification_id}")
    public ApiResponse<StatusUpdateResponseDto> readNotification(@PathVariable("notification_id") Long id) {
        return ApiResponse.success(notificationWriteService.updateNotificationStatus(NotificationStatus.READ, id));
    }

    @PatchMapping("/delete/{notification_id}")
    public ApiResponse<StatusUpdateResponseDto> deleteNotification(@PathVariable("notification_id") Long id) {
        return ApiResponse.success(notificationWriteService.updateNotificationStatus(NotificationStatus.DELETED, id));
    }
}
