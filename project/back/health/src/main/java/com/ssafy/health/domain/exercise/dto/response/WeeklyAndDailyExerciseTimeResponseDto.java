package com.ssafy.health.domain.exercise.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WeeklyAndDailyExerciseTimeResponseDto {
    private Long weeklyAccumulatedExerciseTime;
    private Long dailyAccumulatedExerciseTime;
}
