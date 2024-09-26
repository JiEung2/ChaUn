package com.ssafy.health.domain.notification.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.health.domain.notification.dto.response.StatusUpdateResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Tag(name = "알림 컨트롤러", description = "알림 조회, 읽기, 삭제 등을 관리하는 클래스")
public interface NotificationControllerApi {
    @Operation(
            summary = "읽지 않은 알림 목록 조회",
            description = "특정 사용자가 읽지 않은 모든 알림을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "Success",
                                      "data": [
                                        {
                                          "notificationId": 1,
                                          "notificationType": "SURVEY",
                                          "additionalData": null,
                                          "content": "테스트 알림 1",
                                          "createdAt": "2024-09-20T00:00:00"
                                        },
                                        {
                                          "notificationId": 2,
                                          "notificationType": "BATTLE",
                                          "additionalData": {
                                            "battleId": 1
                                          },
                                          "content": "테스트 알림 2",
                                          "createdAt": "2024-09-20T00:00:00"
                                        }
                                      ]
                                    }"""
                            )
                    )
            )
    })
    ApiResponse<List<NotificationResponseDto>> getNotifications();

    @Operation(
            summary = "알림 읽기",
            description = "알림의 상태를 '읽음'으로 변경합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "Success",
                                      "data": {
                                        "message": "알림 상태 변경 완료",
                                        "previousStatus": "UNREAD",
                                        "currentStatus": "READ"
                                      }
                                    }"""
                            )
                    )
            )
    })
    ApiResponse<StatusUpdateResponseDto> readNotification(Long id);

    @Operation(
            summary = "알림 삭제",
            description = "알림의 상태를 '삭제됨'으로 변경합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "Success",
                                      "data": {
                                        "message": "알림 상태 변경 완료",
                                        "previousStatus": "READ",
                                        "currentStatus": "DELETED"
                                      }
                                    }"""
                            )
                    )
            )
    })
    ApiResponse<StatusUpdateResponseDto> deleteNotification(Long id);
}