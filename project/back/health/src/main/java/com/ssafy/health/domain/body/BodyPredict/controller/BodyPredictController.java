package com.ssafy.health.domain.body.BodyPredict.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.ExtraPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictReadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users/predict")
@RequiredArgsConstructor
public class BodyPredictController implements BodyPredictControllerApi {

    private final BodyPredictReadService bodyPredictReadService;

    @GetMapping("/basic")
    public ApiResponse<BasicPredictionResponseDto> getBasicPrediction() {
        return ApiResponse.success(bodyPredictReadService.getBasicPrediction());
    }

    @GetMapping("/extra")
    public ApiResponse<ExtraPredictionResponseDto> getExtraPrediction() {
        return ApiResponse.success(bodyPredictReadService.getExtraPrediction());
    }
}
