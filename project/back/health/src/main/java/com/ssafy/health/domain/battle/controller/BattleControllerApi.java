package com.ssafy.health.domain.battle.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.battle.dto.response.BattleMemberRankingDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "배틀 컨트롤러", description = "배틀을 관리하는 클래스")
public interface BattleControllerApi {

    @Operation(
            summary = "배틀 멤버 기여도 랭킹 조회",
            description = "특정 크루의 배틀에 대한 기여도 랭킹을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "배틀 멤버 기여도 랭킹 조회 성공",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"Success\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"myCrewMembers\": [\n" +
                                    "      {\n" +
                                    "        \"userId\": 1,\n" +
                                    "        \"nickname\": \"홍길동\",\n" +
                                    "        \"userProfileImage\": \"https://example.com/image1.jpg\",\n" +
                                    "        \"exerciseTime\": 3600\n" +
                                    "      }\n" +
                                    "    ],\n" +
                                    "    \"opponentCrewMembers\": [\n" +
                                    "      {\n" +
                                    "        \"userId\": 2,\n" +
                                    "        \"nickname\": \"김철수\",\n" +
                                    "        \"userProfileImage\": \"https://example.com/image2.jpg\",\n" +
                                    "        \"exerciseTime\": 4200\n" +
                                    "      }\n" +
                                    "    ]\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<BattleMemberRankingDto> getBattleMemberRanking(@PathVariable("battle_id") Long battleId, @PathVariable("crew_id") Long crewId);

}
