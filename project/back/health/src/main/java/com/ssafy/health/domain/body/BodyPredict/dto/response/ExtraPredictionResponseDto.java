package com.ssafy.health.domain.body.BodyPredict.dto.response;

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
    private ExerciseDetail exercise;

    @Data
    @Builder
    public static class ExerciseDetail {
        private Long exerciseId;
        private Integer count;
        private Integer duration;
    }
}
