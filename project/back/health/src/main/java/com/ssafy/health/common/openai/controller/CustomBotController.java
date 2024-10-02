package com.ssafy.health.common.openai.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.common.openai.dto.RecommendedExerciseListDto;
import com.ssafy.health.common.openai.service.PromptWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class CustomBotController {

    private final PromptWriteService promptWriteService;

    @GetMapping("/exercise/recommendation")
    public ApiResponse<RecommendedExerciseListDto> recommendExercise(){
        return ApiResponse.success(promptWriteService.requestExerciseRecommendations());
    }
}
