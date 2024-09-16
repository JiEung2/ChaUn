package com.ssafy.health.domain.body.BodyHistory.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.BodySurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.BodySurveySuccessDto;
import com.ssafy.health.domain.body.BodyHistory.dto.response.WeightHistoryResponseDto;
import com.ssafy.health.domain.body.BodyHistory.service.BodyHistoryReadService;
import com.ssafy.health.domain.body.BodyHistory.service.BodyHistoryWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class BodyHistoryController implements BodyHistoryControllerApi{

    private final BodyHistoryReadService bodyHistoryReadService;
    private final BodyHistoryWriteService bodyHistoryWriteService;

    @PostMapping("/survey/body")
    public ApiResponse<BodySurveySuccessDto> saveBodySurvey(@RequestBody BodySurveyRequestDto bodySurveyRequestDto) {
        return ApiResponse.success(bodyHistoryWriteService.saveBodyHistory(bodySurveyRequestDto));
    }

}
