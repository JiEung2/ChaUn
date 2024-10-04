package com.ssafy.health.domain.notification.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.notification.dto.request.NotificationRequestDto;
import com.ssafy.health.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.health.domain.notification.dto.response.StatusUpdateResponseDto;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import com.ssafy.health.domain.notification.entity.NotificationType;
import com.ssafy.health.domain.notification.service.NotificationReadService;
import com.ssafy.health.domain.notification.service.NotificationWriteService;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import com.ssafy.health.domain.quest.entity.UserQuest;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController implements NotificationControllerApi {

    private final NotificationReadService notificationReadService;
    private final NotificationWriteService notificationWriteService;
    private final BattleRepository battleRepository;
    private final UserQuestRepository userQuestRepository;
    private final UserRepository userRepository;

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
