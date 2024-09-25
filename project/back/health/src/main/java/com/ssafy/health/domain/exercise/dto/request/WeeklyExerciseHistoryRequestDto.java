package com.ssafy.health.domain.exercise.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WeeklyExerciseHistoryRequestDto {
    private int year;
    private int month;
    private int week;
}
