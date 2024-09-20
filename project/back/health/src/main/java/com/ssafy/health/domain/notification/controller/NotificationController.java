package com.ssafy.health.domain.notification.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.health.domain.notification.service.NotificationReadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController implements NotificationControllerApi {

    private final NotificationReadService notificationReadService;

    @GetMapping("/get")
    public ApiResponse<List<NotificationResponseDto>> getNotifications() {
        return ApiResponse.success(notificationReadService.getNotifications());
    }
}
