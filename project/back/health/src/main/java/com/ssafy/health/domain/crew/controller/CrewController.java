package com.ssafy.health.domain.crew.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
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
}
