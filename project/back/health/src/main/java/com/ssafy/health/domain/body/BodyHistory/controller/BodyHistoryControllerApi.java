package com.ssafy.health.domain.body.BodyHistory.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.BodySurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.BodySurveySuccessDto;
import com.ssafy.health.domain.body.BodyHistory.dto.response.WeightHistoryResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "체형 기록 컨트롤러", description = "회원의 체형 기록을 관리하는 클래스")
public interface BodyHistoryControllerApi {

    @Operation(
            summary = "회원 체형 설문조사",
            description = "체형 입력받아 체형기록에 저장합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "회원 체형 설문조사 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"회원 체형 설문조사를 완료했습니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<BodySurveySuccessDto> saveBodySurvey(@RequestBody BodySurveyRequestDto bodySurveyRequestDto);

    @Operation(
            summary = "회원의 6개월 간 몸무게 조회",
            description = "특정 회원의 6개월 간의 몸무게를 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "회원 몸무게 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"Success\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"weightDataList\": [\n" +
                                    "      {\n" +
                                    "        \"date\": \"2024-09-16T15:00:00\",\n" +
                                    "        \"weight\": 75.5\n" +
                                    "      },\n" +
                                    "      {\n" +
                                    "        \"date\": \"2024-08-16T15:00:00\",\n" +
                                    "        \"weight\": 74.0\n" +
                                    "      }\n" +
                                    "    ]\n" +
                                    "  }\n" +
                                    "}"
                            ))
            )
    })
    ApiResponse<WeightHistoryResponseDto> getWeightData(@PathVariable("user_id") Long userId);

}