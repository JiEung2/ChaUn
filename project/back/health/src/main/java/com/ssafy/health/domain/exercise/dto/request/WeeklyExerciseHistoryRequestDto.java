package com.ssafy.health.domain.exercise.dto.request;

import lombok.Getter;

@Getter
public class WeeklyExerciseHistoryRequestDto {
    private int year;
    private int month;
    private int week;
}
