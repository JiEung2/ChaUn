package com.ssafy.health.domain.crew.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.CrewDetailResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewMembersResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewScoreResponseDto;
import com.ssafy.health.domain.crew.dto.response.JoinCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.SendCoinSuccessDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "크루 컨트롤러", description = "크루 생성, 조회, 삭제 등 크루를 관리하는 클래스")
public interface CrewControllerApi {
    @Operation(
            summary = "크루 생성",
            description = "크루를 생성합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "크루 생성 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"크루가 생성되었습니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<CreateCrewSuccessDto> createCrew(@RequestBody CreateCrewRequestDto createCrewRequestDto);

    @Operation(
            summary = "크루 상세 조회",
            description = "크루 아이디를 통해 크루 상세를 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "크루 상세 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"crewName\": \"달리는 번개\",\n" +
                                    "    \"exerciseName\": \"러닝\",\n" +
                                    "    \"profileImage\": \"crew-profile-image.jpg\",\n" +
                                    "    \"description\": \"번개맨보다 빠른 러너들의 모임\",\n" +
                                    "    \"crewCoins\": 300,\n" +
                                    "    \"crewRanking\": 3,\n" +
                                    "    \"totalBattleCount\": 10,\n" +
                                    "    \"winCount\": 7,\n" +
                                    "    \"averageAge\": 29,\n" +
                                    "    \"activityScore\": 1200,\n" +
                                    "    \"basicScore\": 900\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<CrewDetailResponseDto> getCrewDetail(@PathVariable("crew_id") Long crewId);

    @Operation(
            summary = "가입된 크루 조회",
            description = "회원의 가입된 크루 조회"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "가입된 크루 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"crewList\": [\n" +
                                    "      {\n" +
                                    "        \"crewName\": \"달리자\",\n" +
                                    "        \"exerciseName\": \"러닝\",\n" +
                                    "        \"crewProfileImage\": \"crew-profile-image.jpg\"\n" +
                                    "      },\n" +
                                    "      {\n" +
                                    "        \"crewName\": \"달리자\",\n" +
                                    "        \"exerciseName\": \"러닝\",\n" +
                                    "        \"crewProfileImage\": \"crew-profile-image.jpg\"\n" +
                                    "      }\n" +
                                    "    ]\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<CrewListResponseDto> getJoinedCrewList(@PathVariable("user_id") Long userId);

    @Operation(
            summary = "크루 가입",
            description = "크루에 가입합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "크루 가입 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"크루에 가입되었습니다.\",\n" +
                                    "  \"data\": {\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<JoinCrewSuccessDto> joinCrew(@PathVariable("crew_id") Long crewId);

    @Operation(
            summary = "코인 전송",
            description = "크루에 코인을 전송합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "코인 전송 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"message\": \"코인을 전송하였습니다.\",\n" +
                                    "    \"crewCoin\": 1000,\n" +
                                    "    \"myCoin\": 900\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<SendCoinSuccessDto> sendCoin(@PathVariable("crew_id") Long crewId,
                                                    @PathVariable("coin_count") Integer coin) throws InterruptedException;

    @Operation(
            summary = "크루 멤버 조회",
            description = "크루의 멤버를 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "크루 멤버 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"memberList\": [\n" +
                                    "      {\n" +
                                    "        \"nickname\": \"달리기 왕자\",\n" +
                                    "        \"userId\": 20,\n" +
                                    "        \"userProfileImage\": \"crew-profile-image.jpg\",\n" +
                                    "        \"thisWeekExerciseTime\": 123123\n" +
                                    "      },\n" +
                                    "      {\n" +
                                    "        \"nickname\": \"달리기 공주\",\n" +
                                    "        \"userId\": 21,\n" +
                                    "        \"userProfileImage\": \"crew-profile-image.jpg\",\n" +
                                    "        \"thisWeekExerciseTime\": 123123\n" +
                                    "      }\n" +
                                    "    ]\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<CrewMembersResponseDto> getCrewMembers(@PathVariable("crew_id") Long crewId);

    @Operation(
            summary = "크루 점수 조회",
            description = "크루 아이디를 통해 크루 점수를 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "크루 점수 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"basicScore\": 1200,\n" +
                                    "    \"activityScore\": 800\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<CrewScoreResponseDto> getCrewScore(@PathVariable("crew_id") Long crewId);

    @Operation(
            summary = "크루 랭킹 조회",
            description = "크루의 현재 랭킹을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "크루 랭킹 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"memberList\": [\n" +
                                    "      {\n" +
                                    "        \"nickname\": \"달리기 왕자\",\n" +
                                    "        \"userId\": 20,\n" +
                                    "        \"userProfileImage\": \"crew-profile-image.jpg\",\n" +
                                    "        \"thisWeekExerciseTime\": 123123\n" +
                                    "      },\n" +
                                    "      {\n" +
                                    "        \"nickname\": \"달리기 공주\",\n" +
                                    "        \"userId\": 21,\n" +
                                    "        \"userProfileImage\": \"crew-profile-image.jpg\",\n" +
                                    "        \"thisWeekExerciseTime\": 123121\n" +
                                    "      }\n" +
                                    "    ]\n" +
                                    "  }\n" +
                                    "}"
                            )
                    )
            )
    })
    ApiResponse<CrewMembersResponseDto> getCrewRanking(@PathVariable("crew_id") Long crewId);

    @Operation(
            summary = "크루 배틀 생성",
            description = "배틀 시작 요청이 들어온 크루의 배틀을 생성합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "크루 배틀 생성 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"myTeamName\": \"달리자크루\",\n" +
                                    "    \"myTeamScore\": 0,\n" +
                                    "    \"opponentTeamName\": \"크크크루\",\n" +
                                    "    \"opponentTeamScore\": 0,\n" +
                                    "    \"exerciseName\": \"러닝\",\n" +
                                    "    \"dDay\": 2\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<BattleMatchResponseDto> startCrewBattle(@PathVariable("crew_id") Long crewId);

}