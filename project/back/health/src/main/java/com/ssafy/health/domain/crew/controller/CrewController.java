package com.ssafy.health.domain.crew.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.battle.service.BattleReadService;
import com.ssafy.health.domain.battle.service.BattleWriteService;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.*;
import com.ssafy.health.domain.crew.service.CrewReadService;
import com.ssafy.health.domain.crew.service.CrewWriteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CrewController implements CrewControllerApi {

    private final CrewReadService crewReadService;
    private final CrewWriteService crewWriteService;
    private final BattleReadService battleReadService;
    private final BattleWriteService battleWriteService;

    @PostMapping(value = "/crew", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<CreateCrewSuccessDto> createCrew(
            @Valid @RequestPart("createCrewRequestDto") CreateCrewRequestDto createCrewRequestDto,
            @RequestPart("profileImage") MultipartFile profileImage) throws IOException {
        return ApiResponse.success(crewWriteService.createCrew(createCrewRequestDto, profileImage));
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
                                                    @PathVariable("coin_count") Integer coin) throws InterruptedException {
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
        BattleMatchResponseDto battleStatus = battleReadService.getBattleStatus(crewId);

        if (battleStatus.getBattleStatus() != BattleStatus.NONE)
            return ApiResponse.success(battleStatus);

        return ApiResponse.success(HttpStatus.NO_CONTENT.value(), battleStatus, "현재 진행 중인 배틀이 없습니다.");
    }

    @PostMapping("/crew/{crew_id}/battle/ready")
    public ApiResponse<BattleReadyStatusResponse> readyCrewBattle(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewWriteService.readyCrewBattle(crewId));
    }
}
