package com.ssafy.health.domain.quest.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.dto.response.QuestResponseDto;
import com.ssafy.health.domain.quest.entity.Quest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "퀘스트 컨트롤러", description = "퀘스트 생성, 조회 등을 담당하는 클래스")
public interface QuestControllerApi {

    @Operation(
            summary = "퀘스트 생성",
            description = "퀘스트 적용 대상, 주기 등을 입력하여 새로운 퀘스트를 생성합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Success",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                        {
                                        "status": 200,
                                        "message": "Success",
                                        "data": {
                                            "createdAt": "2024-09-30T13:53:29.8718798",
                                            "id": 7,
                                            "type": "INDIVIDUAL",
                                            "title": "크루 내 2명 이상의 팀원 하루에 합산 1시간 이상 운동하기",
                                            "period": "WEEKLY",
                                            "completionCoins": 30
                                        }
                                    }
                                    """
                            ))
            ),
    })
    ApiResponse<Quest> createQuest(@RequestBody QuestCreateRequestDto requestDto);

    @Operation(
            summary = "개인 퀘스트 조회",
            description = "사용자의 달성했거나 달성해야할 퀘스트를 조회합니다"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "개인별 퀘스트 목록 반환",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "Success",
                                      "data": [
                                        {
                                          "questId": 3,
                                          "title": "매일 몸무게 입력하기",
                                          "questPeriod": "DAILY",
                                          "isCompleted": false
                                        },
                                        {
                                          "questId": 6,
                                          "title": "하루 한 번 운동하기",
                                          "questPeriod": "DAILY",
                                          "isCompleted": true
                                        }
                                      ]
                                    }
                                    """
                            ))
            ),
    })
    ApiResponse<List<QuestResponseDto>> getUserQuestList();

    @Operation(
            summary = "크루 퀘스트 조회",
            description = "크루의 달성했거나 달성해야할 퀘스트를 조회합니다"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "크루 퀘스트 목록 반환",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "Success",
                                      "data": [
                                        {
                                          "questId": 3,
                                          "title": "크루 내 2명 이상의 팀원 하루에 합산 1시간 이상 운동하기",
                                          "questPeriod": "DAILY",
                                          "isCompleted": true
                                        }
                                      ]
                                    }
                                    """
                            ))
            )
    })
    ApiResponse<List<QuestResponseDto>> getCrewQuestList(@RequestParam("crew_id") Long crewId);
}
