package com.ssafy.health.domain.exercise.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.exercise.dto.response.ExerciseAndCategoryDto;
import com.ssafy.health.domain.exercise.service.ExerciseReadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/api/v1")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseReadService exerciseReadService;

    @GetMapping("/exercise")
    public ApiResponse<List<ExerciseAndCategoryDto>> getExercises() {
        return ApiResponse.success(exerciseReadService.getExerciseAndCategory());
    }
}
