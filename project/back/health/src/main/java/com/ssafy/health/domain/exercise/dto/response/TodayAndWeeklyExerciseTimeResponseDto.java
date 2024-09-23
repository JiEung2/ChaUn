package com.ssafy.health.domain.exercise.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TodayAndWeeklyExerciseTimeResponseDto {
    private Long todayExerciseTime;
    private Long weeklyAccumulatedExerciseTime;
}
