package com.ssafy.health.domain.body.BodyPredict.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.ExtraPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictReadService;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ApiResponse<ResponseEntity<String>> requestExtraAnalysis(@RequestBody ExerciseDetailDto dto)
            throws JsonProcessingException {
        return ApiResponse.success(
                bodyPredictWriteService.requestExtraAnalysis(dto), "추가 체형 예측을 요청하였습니다.");
    }

    @PostMapping("/request-analysis")
    public ApiResponse<Void> requestAnalysis() {
        return ApiResponse.success(bodyPredictWriteService.requestPrediction(), "FastAPI Basic Request");
    }
}
