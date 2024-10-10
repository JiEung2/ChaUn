package com.ssafy.health.domain.body.BodyPredict.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.ExtraPredictionResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "예측 체형 조회 컨트롤러", description = "30일, 90일 뒤의 체형 예측 정보를 조회하는 클래스")
public interface BodyPredictControllerApi {

    @Operation(
            summary = "기본 체형 예측 조회",
            description = "30일, 90일 뒤의 체형 예측 정보를 조회합니다."
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
                                        "userId": 3,
                                        "current": 85,
                                        "p30": 84.51,
                                        "p90": 83.77,
                                        "createdAt": "2024-10-11T02:22:02.096",
                                        "current_image": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b5.png",
                                        "p30_image": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b6.png",
                                        "p90_image": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b6.png"
                                      }
                                    }"""
                            )
                    )
            )
    })
    ApiResponse<BasicPredictionResponseDto> getBasicPrediction();

    @Operation(
            summary = "추가 체형 예측 조회",
            description = "특정 운동 정보가 추가되었을 경우의 30일, 90일 뒤의 체형 예측 정보를 조회합니다."
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
                                      "message": "추가 체형 예측 완료",
                                      "data": {
                                        "userId": 3,
                                        "current": 85,
                                        "p30": 84.06,
                                        "p90": 82.91,
                                        "createdAt": "2024-10-11T02:22:19.339",
                                        "exercise": {
                                          "count": 2,
                                          "duration": 55,
                                          "exercise_id": 12
                                        },
                                        "current_image": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b5.png",
                                        "p30_image": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b6.png",
                                        "p90_image": "https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b6.png"
                                      }
                                    }
                                    """
                            )
                    )
            )
    })
    ApiResponse<ExtraPredictionResponseDto> requestExtraAnalysis(@RequestBody ExerciseDetailDto dto)
            throws JsonProcessingException;
}
