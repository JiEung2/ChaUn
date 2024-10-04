package com.ssafy.health.common.openai.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecommendedExerciseListDto {
    List<RecommendedExerciseDto> recommendedExerciseList;
}
