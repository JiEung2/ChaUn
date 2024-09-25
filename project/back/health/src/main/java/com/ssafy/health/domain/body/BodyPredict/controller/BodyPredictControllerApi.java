package com.ssafy.health.domain.body.BodyPredict.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.ExtraPredictionResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

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
                                        "userId": 1,
                                        "p30": 73.23,
                                        "p90": 74.3,
                                        "createdAt": "2024-09-20T05:10:42.658"
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
                                       "message": "Success",
                                       "data": {
                                         "userId": 1,
                                         "p30": 73.23,
                                         "p90": 74.3,
                                         "createdAt": "2024-09-20T05:10:42.658",
                                         "exercise": {
                                           "exerciseId": 3,
                                           "count": 2,
                                           "duration": 30
                                         }
                                       }
                                     }"""
                            )
                    )
            )
    })
    ApiResponse<ExtraPredictionResponseDto> getExtraPrediction();
}
