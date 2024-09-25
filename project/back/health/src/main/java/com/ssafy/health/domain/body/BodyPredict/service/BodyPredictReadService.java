package com.ssafy.health.domain.body.BodyPredict.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.entity.BodyBasicPrediction;
import com.ssafy.health.domain.body.BodyPredict.repository.BodyBasicPredictRepository;
import com.ssafy.health.domain.body.BodyPredict.repository.BodyExtraPredictRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BodyPredictReadService {

    private final BodyBasicPredictRepository basicRepository;
    private final BodyExtraPredictRepository extraRepository;

    public BasicPredictionResponseDto getBasicPrediction() {

        Long userId = SecurityUtil.getCurrentUserId();
        BodyBasicPrediction basicPrediction = basicRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow();

        return BasicPredictionResponseDto.builder()
                .userId(basicPrediction.getUserId())
                .p30(basicPrediction.getP30())
                .p90(basicPrediction.getP90())
                .createdAt(basicPrediction.getCreatedAt())
                .build();
    }
}
