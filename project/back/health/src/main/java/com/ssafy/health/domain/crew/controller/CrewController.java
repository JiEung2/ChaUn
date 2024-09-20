package com.ssafy.health.domain.crew.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewMembersResponseDto;
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

    private final CrewWriteService crewWriteService;
    private final CrewReadService crewReadService;

    @PostMapping("/crew")
    public ApiResponse<CreateCrewSuccessDto> createCrew(@RequestBody CreateCrewRequestDto createCrewRequestDto) {
        return ApiResponse.success(crewWriteService.createCrew(createCrewRequestDto));
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

    @GetMapping("/crew/{crew_id}/ranking")
    public ApiResponse<CrewMembersResponseDto> getCrewRanking(@PathVariable("crew_id") Long crewId) {
        return ApiResponse.success(crewReadService.getCrewMemberRanking(crewId));
    }
}
