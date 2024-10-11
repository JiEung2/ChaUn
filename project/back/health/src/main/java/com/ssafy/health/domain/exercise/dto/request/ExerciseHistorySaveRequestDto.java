package com.ssafy.health.domain.exercise.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ExerciseHistorySaveRequestDto {
    private Long exerciseId;
    private Long exerciseTime;
    private LocalDateTime exerciseStartTime;
    private LocalDateTime exerciseEndTime;
}
