package com.ssafy.health.domain.body.BodyPredict.dto.response;

import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ExtraPredictionResponseDto {

    private Long userId;
    private Float p30;
    private Float p90;
    private LocalDateTime createdAt;
    private ExerciseDetailDto exercise;
}
