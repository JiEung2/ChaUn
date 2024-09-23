package com.ssafy.health.domain.exercise.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ExerciseHistoryListResponseDto {
    List<ExerciseHistoryDetailDto> exerciseHistoryList;

    @Builder
    public static class ExerciseHistoryDetailDto {
        private Long id;
        private Long exerciseDuration;
        private Float burnedCalories;
        private String exerciseName;
        private LocalDateTime createdAt;
    }
}
