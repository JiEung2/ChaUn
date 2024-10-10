package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.common.util.MonthlyRequestDto;
import com.ssafy.health.domain.account.dto.request.CaloriesSurveyRequestDto;
import com.ssafy.health.domain.account.dto.request.DeviceRegisterRequestDto;
import com.ssafy.health.domain.account.dto.request.FavoredExercisesRequestDto;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.*;
import com.ssafy.health.domain.exercise.dto.request.ExerciseHistorySaveRequestDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistoryListResponseDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistorySaveResponseDto;
import com.ssafy.health.domain.exercise.dto.response.WeeklyAndDailyExerciseTimeResponseDto;
import com.ssafy.health.domain.recommendation.dto.response.RecommendedCrewResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.concurrent.ExecutionException;

@Tag(name = "회원 컨트롤러", description = "회원 생성, 조회, 삭제 등 회원을 관리하는 클래스")
public interface UserControllerApi {
    @Operation(
            summary = "회원 닉네임 중복 확인",
            description = "입력된 닉네임이 이미 존재하는지 확인하고, 사용 가능한 닉네임인지 검사합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "사용 가능한 닉네임",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"사용 가능한 닉네임입니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "이미 존재하는 닉네임",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 409,\n" +
                                    "  \"message\": \"이미 존재하는 닉네임입니다.\",\n" +
                                    "  \"data\": {}\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<ValidateNameSuccessDto> validateNickname(@PathVariable("nickname") String nickname);

    @Operation(
            summary = "닉네임 검증",
            description = "사용가능한 닉네임인지 검증합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "닉네임 검증 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"사용 가능한 이름입니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<InfoSurveySuccessDto> saveInfoSurvey(@RequestBody InfoSurveyRequestDto infoSurveyRequestDto);

    @Operation(
            summary = "본인의 이번주, 오늘 운동 시간 조회",
            description = "본인의 이번주 운동시간과 오늘 운동시간을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "회원 운동 시간 조회 완료",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"weeklyAccumulatedExerciseTime\": 0,\n" +
                                    "    \"dailyAccumulatedExerciseTime\": 0\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<WeeklyAndDailyExerciseTimeResponseDto> getWeeklyAndDailyExerciseTime();

    @Operation(
            summary = "회원 이번주, 오늘 운동 시간 조회",
            description = "특정 회원의 이번주 운동시간과 오늘 운동시간을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "회원 운동 시간 조회 완료",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"weeklyAccumulatedExerciseTime\": 0,\n" +
                                    "    \"dailyAccumulatedExerciseTime\": 0\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<WeeklyAndDailyExerciseTimeResponseDto> getWeeklyAndDailyExerciseTime(@PathVariable("user_id") Long userId);

    @Operation(
            summary = "회원 디테일 조회",
            description = "특정 회원의 닉네임과 코인 수를 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "회원 디테일 조회 완료",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"nickname\": \"JiEung2\",\n" +
                                    "    \"characterImageUrl\": \"image.png\",\n" +
                                    "    \"characterFileUrl\": \"image.glb\"\n" +
                                    "    \"gender\": \"MAN\"\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "존재하지 않는 회원",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 404,\n" +
                                    "  \"message\": \"해당 유저가 존재하지 않습니다.\",\n" +
                                    "  \"data\": {}\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<UserDetailDto> getUserDetail(@PathVariable("user_id") Long userId);

    @Operation(
            summary = "회원 식습관 설문조사",
            description = "회원 식습관을 입력받아 평균 하루 섭취 칼로리를 계산합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "회원 식습관 설문조사 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"회원 식습관 설문조사를 완료했습니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "설문조사에서 지정된 값이 아닌 다른 값이 넘어왔을 때",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 404,\n" +
                                    "  \"message\": \"해당 식사에 대한 기준표가 존재하지 않습니다.\",\n" +
                                    "  \"data\": {}\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<CaloriesSurveySuccessDto> saveCaloriesSurvey(@RequestBody CaloriesSurveyRequestDto caloriesSurveyRequestDto);

    @Operation(
            summary = "회원 선호 운동 설문조사",
            description = "회원의 선호하는 운동을 입력받습니다.."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "회원 선호 운동 등록 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"선호하는 운동 설문조사를 완료했습니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<SurveySuccessDto> saveFavoredExercises(@RequestBody FavoredExercisesRequestDto requestDto);

    @Operation(
            summary = "알림 수신 기기 등록",
            description = "Firebase Cloud Messaging을 이용한 알림을 받을 기기를 등록합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "기기 등록 완료",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "기기가 등록되었습니다.",
                                      "data": {}
                                    }"""
                            )
                    )
            )
    })
    ApiResponse<DeviceRegisterResponseDto> registerDevice(DeviceRegisterRequestDto deviceRegisterRequestDto);

    @Operation(
            summary = "설문조사 완료 상태 확인",
            description = "초기 설문조사를 완료했는지 상태를 반환합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "설문조사 완료 상태 확인",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"surveyCompleted\": true\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<SurveyCompletedResponseDto> getSurveyCompleted();

    @Operation(
            summary = "운동 기록 저장",
            description = "운동 기록을 저장하고, 소비된 칼로리를 반환받습니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "운동 기록 저장 완료",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"burnedCalories\": 500\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<ExerciseHistorySaveResponseDto> saveExerciseHistory(@RequestBody ExerciseHistorySaveRequestDto exerciseHistorySaveRequestDto)
            throws InterruptedException, ExecutionException;

    @Operation(
            summary = "자신의 특정 주의 운동 기록 조회",
            description = "자신의 특정 주의 운동 기록을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "운동 기록 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "",
                                      "data": {
                                        "exerciseHistoryList": [
                                            {
                                              "id": 1,
                                              "exerciseDuration": 3600,
                                              "burnedCalories": 560,
                                              "exerciseName": "러닝",
                                              "createdAt": "2024-09-16T15:00:00"
                                            },
                                            {
                                              "id": 2,
                                              "exerciseDuration": 1800,
                                              "burnedCalories": 300,
                                              "exerciseName": "수영",
                                              "createdAt": "2024-09-17T10:00:00"
                                            }
                                        ]
                                      }
                                    }
                                    """
                            ))
            )
    })
    ApiResponse<ExerciseHistoryListResponseDto> getWeeklyExerciseHistory();

    @Operation(
            summary = "자신의 특정 달의 운동 기록 조회",
            description = "자신의 특정 달의 운동 기록을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "운동 기록 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "",
                                      "data": {
                                        "exerciseHistoryList": [
                                            {
                                              "id": 1,
                                              "exerciseDuration": 3600,
                                              "burnedCalories": 560,
                                              "exerciseName": "러닝",
                                              "createdAt": "2024-09-16T15:00:00"
                                            },
                                            {
                                              "id": 2,
                                              "exerciseDuration": 1800,
                                              "burnedCalories": 300,
                                              "exerciseName": "수영",
                                              "createdAt": "2024-09-17T10:00:00"
                                            }
                                        ]
                                      }
                                    }
                                    """
                            ))
            )
    })
    ApiResponse<ExerciseHistoryListResponseDto> getMonthlyExerciseHistory(MonthlyRequestDto requestDto);

    @Operation(
            summary = "자신의 추천 크루 목록 조회",
            description = "자신의 추천 크루와 유사도 목록을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "추천 크루 목록 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                       "status": 200,
                                       "message": "",
                                       "data": {
                                         "crewList": [
                                           {
                                             "crewId": 1,
                                             "crewName": "달리자",
                                             "exerciseName": "러닝",
                                             "crewProfileImage": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/file_uuid.jpeg"
                                           },
                                           {
                                             "crewId": 2,
                                             "crewName": "달리자",
                                             "exerciseName": "러닝",
                                             "crewProfileImage": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/file_uuid.jpeg"
                                           }
                                         ]
                                       }
                                     }"""
                            ))
            )
    })
    ApiResponse<RecommendedCrewResponseDto> getRecommendedCrew();
}