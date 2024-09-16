package com.ssafy.health.domain.crew.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.service.CrewWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CrewController {

    private final CrewWriteService crewWriteService;

    @PostMapping("/crew")
    public ApiResponse<CreateCrewSuccessDto> saveInfoSurvey(@RequestBody CreateCrewRequestDto createCrewRequestDto) {
        return ApiResponse.success(crewWriteService.createCrew(createCrewRequestDto));
    }
}
