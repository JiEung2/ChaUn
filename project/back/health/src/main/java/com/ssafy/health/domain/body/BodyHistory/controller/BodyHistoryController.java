package com.ssafy.health.domain.body.BodyHistory.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.BodySurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.BodySurveySuccessDto;
import com.ssafy.health.domain.body.BodyHistory.dto.request.BodyHistoryRequestDto;
import com.ssafy.health.domain.body.BodyHistory.dto.response.BodyHistoryResponseDto;
import com.ssafy.health.domain.body.BodyHistory.dto.response.WeightHistoryResponseDto;
import com.ssafy.health.domain.body.BodyHistory.service.BodyHistoryReadService;
import com.ssafy.health.domain.body.BodyHistory.service.BodyHistoryWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{user_id}/weight")
    public ApiResponse<WeightHistoryResponseDto> getWeightData(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(bodyHistoryReadService.getWeightData(userId));
    }

    @GetMapping("/body")
    public ApiResponse<BodyHistoryResponseDto> getBodyHistory(@RequestParam("year") Integer year,
                                                              @RequestParam("month") Integer month) {
        return ApiResponse.success(bodyHistoryReadService.getBodyHistory(BodyHistoryRequestDto.builder()
                .year(year)
                .month(month)
                .build()));
    }

}
