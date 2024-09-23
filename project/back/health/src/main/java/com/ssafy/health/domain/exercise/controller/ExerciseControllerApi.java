package com.ssafy.health.domain.exercise.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.exercise.dto.response.ExerciseAndCategoryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "운동 컨트롤러", description = "운동, 카테고리를 조회하는 클래스")
public interface ExerciseControllerApi {

    @Operation(
            summary = "카테고리별 운동 목록 조회",
            description = "모든 카테고리별로 포함된 운동 목록을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "운동 목록 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                        {
                          "status": 200,
                          "message": "",
                          "data": [
                            {
                              "categoryName": "Cardio",
                              "exercises": [
                                {
                                  "id": 1,
                                  "name": "러닝",
                                  "description": "심폐 지구력을 높이는 유산소 운동"
                                },
                                {
                                  "id": 2,
                                  "name": "사이클링",
                                  "description": "자전거를 이용한 유산소 운동"
                                }
                              ]
                            },
                            {
                              "categoryName": "Strength",
                              "exercises": [
                                {
                                  "id": 3,
                                  "name": "벤치 프레스",
                                  "description": "가슴 근육을 키우는 근력 운동"
                                },
                                {
                                  "id": 4,
                                  "name": "스쿼트",
                                  "description": "하체 근육을 키우는 근력 운동"
                                }
                              ]
                            }
                          ]
                        }
                        """
                            ))
            ),
    })
    ApiResponse<List<ExerciseAndCategoryDto>> getExercises();

}