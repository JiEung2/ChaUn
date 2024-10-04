package com.ssafy.health.common.openai.dto;

import com.ssafy.health.domain.recommendation.entity.RecommendedExercise;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecommendedExerciseDto {

    private String exerciseName;
    private String reason;
    private String description;

    public static RecommendedExerciseDto fromEntity(RecommendedExercise recommendedExercise) {
        return RecommendedExerciseDto.builder()
                .exerciseName(recommendedExercise.getExerciseName())
                .reason(recommendedExercise.getReason())
                .description(recommendedExercise.getDescription())
                .build();
    }
}

