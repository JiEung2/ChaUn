package com.ssafy.health.domain.exercise.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TotalAndMonthlyExerciseTimeResponseDto {
    private Long totalExerciseTime;
    private Long monthlyAccumulatedExerciseTime;
}
