package com.ssafy.health.domain.notification.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.health.domain.notification.dto.response.StatusUpdateResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

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
                                          "notificationId": 5,
                                          "notificationType": "BATTLE",
                                          "additionalData": {
                                            "battleDetail": {
                                              "myTeamName": "달리자크루",
                                              "myTeamScore": 400,
                                              "opponentTeamName": "크크크루",
                                              "opponentTeamScore": 500,
                                              "exerciseName": "러닝",
                                              "battleStatus": "FINISHED"
                                            },
                                            "coinDetail": {
                                              "crewCoin": 200,
                                              "myCoin": 50
                                            }
                                          },
                                          "content": "크루 배틀이 종료되었어요! 결과를 확인하세요!",
                                          "createdAt": "2024-09-27T14:28:26.1466152"
                                        },
                                        {
                                          "notificationId": 4,
                                          "notificationType": "BATTLE",
                                          "additionalData": {
                                            "battleDetail": {
                                              "myTeamName": "달리자크루",
                                              "myTeamScore": 400,
                                              "opponentTeamName": "크크크루",
                                              "opponentTeamScore": 500,
                                              "exerciseName": "러닝",
                                              "battleStatus": "STARTED"
                                            },
                                            "coinDetail": null
                                          },
                                          "content": "크루 배틀이 시작되었어요! 현황을 확인하세요!",
                                          "createdAt": "2024-09-27T14:28:26.008885"
                                        },
                                        {
                                          "notificationId": 1,
                                          "notificationType": "SURVEY",
                                          "additionalData": {
                                            "lastSurveyedDate": null
                                          },
                                          "content": "체형 입력을 통해 정확도 높은 예측을 받아보세요!",
                                          "createdAt": "2024-09-27T14:14:13.869796"
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
