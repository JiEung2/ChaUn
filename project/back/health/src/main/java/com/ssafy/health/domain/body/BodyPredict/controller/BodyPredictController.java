package com.ssafy.health.domain.body.BodyPredict.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import com.ssafy.health.domain.body.BodyPredict.dto.request.AnalysisRequestDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.ExtraPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictReadService;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/predict")
@RequiredArgsConstructor
public class BodyPredictController implements BodyPredictControllerApi {

    private final BodyPredictReadService bodyPredictReadService;
    private final BodyPredictWriteService bodyPredictWriteService;

    @GetMapping("/basic")
    public ApiResponse<BasicPredictionResponseDto> getBasicPrediction() {
        return ApiResponse.success(bodyPredictReadService.getBasicPrediction());
    }

    @GetMapping("/extra")
    public ApiResponse<ExtraPredictionResponseDto> getExtraPrediction() {
        return ApiResponse.success(bodyPredictReadService.getExtraPrediction());
    }

    @PostMapping("/request-extra")
    public ApiResponse<AnalysisRequestDto> requestExtraAnalysis(@RequestBody ExerciseDetailDto dto) {
        return ApiResponse.success(
                bodyPredictWriteService.requestExtraAnalysis(dto), "추가 체형 예측을 요청하였습니다.");
    }
}
