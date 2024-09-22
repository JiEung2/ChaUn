package com.ssafy.health.domain.crew.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.service.BattleReadService;
import com.ssafy.health.domain.battle.service.BattleWriteService;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.CrewDetailResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewMembersResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewScoreResponseDto;
import com.ssafy.health.domain.crew.dto.response.JoinCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.SendCoinSuccessDto;
import com.ssafy.health.domain.crew.service.CrewReadService;
import com.ssafy.health.domain.crew.service.CrewWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CrewController implements CrewControllerApi {

    private final CrewReadService crewReadService;
    private final CrewWriteService crewWriteService;
    private final BattleReadService battleReadService;
    private final BattleWriteService battleWriteService;

    @PostMapping("/crew")
    public ApiResponse<CreateCrewSuccessDto> createCrew(@RequestBody CreateCrewRequestDto createCrewRequestDto) {
        return ApiResponse.success(crewWriteService.createCrew(createCrewRequestDto));
    }

    @GetMapping("/crew/{crew_id}/detail")
    public ApiResponse<CrewDetailResponseDto> getCrewDetail(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewReadService.getCrewDetail(crewId));
    }

    @GetMapping("/users/{user_id}/crew-list")
    public ApiResponse<CrewListResponseDto> getJoinedCrewList(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(crewReadService.getJoinedCrewList(userId));
    }

    @PostMapping("/crew/{crew_id}/join")
    public ApiResponse<JoinCrewSuccessDto> joinCrew(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewWriteService.joinCrew(crewId));
    }

    @PostMapping("/crew/{crew_id}/coin/{coin_count}")
    public ApiResponse<SendCoinSuccessDto> sendCoin(@PathVariable("crew_id") Long crewId,
                                                    @PathVariable("coin_count") Integer coin) throws InterruptedException{
        return ApiResponse.success(crewWriteService.sendCoin(crewId, coin));
    }

    @GetMapping("/crew/{crew_id}/members")
    public ApiResponse<CrewMembersResponseDto> getCrewMembers(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewReadService.getCrewMembers(crewId));
    }

    @GetMapping("/crew/{crew_id}/score")
    public ApiResponse<CrewScoreResponseDto> getCrewScore(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewReadService.getCrewScore(crewId));
    }

    @GetMapping("/crew/{crew_id}/ranking")
    public ApiResponse<CrewMembersResponseDto> getCrewRanking(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewReadService.getCrewMemberRanking(crewId));
    }

    @PostMapping("/crew/{crew_id}/battle")
    public ApiResponse<BattleMatchResponseDto> startCrewBattle(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(battleWriteService.startBattle(crewId));
    }

    @GetMapping("/crew/{crew_id}/battle")
    public ApiResponse<BattleMatchResponseDto> getBattleStatus(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(battleReadService.getBattleStatus(crewId));
    }
}
