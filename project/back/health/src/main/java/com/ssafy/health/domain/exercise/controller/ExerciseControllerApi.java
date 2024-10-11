package com.ssafy.health.domain.exercise.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.common.openai.dto.RecommendedExerciseListDto;
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

    @Operation(
            summary = "운동 추천",
            description = "선호하는 운동과 지난 운동 추천 목록을 바탕으로 운동을 추천합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "운동 추천 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                        {
                          "status": 200,
                          "message": "Success",
                          "data": {
                            "recommendedExerciseList": [
                              {
                                  "exerciseName": "데드리프트",
                                  "reason": "전체적인 근력 향상",
                                  "description": "바벨이나 덤벨을 바닥에서 들어올리는 운동으로, 하체와 코어 근육을 강화하는 데 효과적입니다."
                              },
                              {
                                  "exerciseName": "벤치 프레스",
                                  "reason": "상체 근육 발달",
                                  "description": "벤치에 누워 바벨을 가슴 높이에서 밀어 올리는 운동으로, 주로 가슴과 삼두근을 강화합니다."
                              },
                              {
                                  "exerciseName": "풀업",
                                  "reason": "등 근육 강화",
                                  "description": "철봉에 몸을 매달고 팔을 이용해 몸을 위로 끌어올리는 운동으로, 등과 팔 근육을 집중적으로 발달시킵니다."
                              },
                              {
                                  "exerciseName": "런지",
                                  "reason": "하체 지구력 향상",
                                  "description": "한 발을 앞으로 내딛고 무릎을 굽혔다가 다시 원위치로 돌아오는 운동으로, 대퇴사두근, 햄스트링 등에 효과적입니다."
                              },
                              {
                                  "exerciseName": "버피",
                                  "reason": "전신 유산소 운동",
                                  "description": "스쿼트, 플랭크, 점핑 제트를 결합한 운동으로, 심박수를 높이고 전신 체력을 강화합니다."
                              }
                            ]
                          }
                        }
                        """
                            ))
            ),
    })

    ApiResponse<RecommendedExerciseListDto> recommendExercise();
}