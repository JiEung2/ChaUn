package com.ssafy.health.domain.exercise.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class ExerciseAndCategoryDto {
    private String categoryName;
    private List<ExerciseDetailDto> exercises;

    @Getter
    @Builder
    public static class ExerciseDetailDto {
        private Long id;
        private String name;
        private String description;
    }
}
