package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.CaloriesSurveyRequestDto;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.*;
import com.ssafy.health.domain.account.dto.request.DeviceRegisterRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

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
    ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable("nickname") String nickname);

    @Operation(
            summary = "회원 정보 설문조사",
            description = "닉네임, 생년월일, 성별을 입력받고 회원정보에 저장합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "회원 정보 설문조사 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"회원 정보 설문조사를 완료했습니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<InfoSurveySuccessDto> saveInfoSurvey(@RequestBody InfoSurveyRequestDto infoSurveyRequestDto);

    @Operation(
            summary = "회원 운동 시간 조회",
            description = "특정 회원의 총 운동시간과 이번 달 운동시간을 조회합니다."
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
                                    "    \"totalExerciseTime\": 0,\n" +
                                    "    \"monthlyAccumulatedExerciseTime\": 0\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<ExerciseTimeResponseDto> getExerciseTime(@PathVariable("user_id") Long userId);

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
                                    "    \"coin\": 999999\n" +
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

}