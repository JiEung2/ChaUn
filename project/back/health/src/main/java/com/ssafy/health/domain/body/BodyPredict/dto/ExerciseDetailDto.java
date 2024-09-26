package com.ssafy.health.domain.body.BodyPredict.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExerciseDetailDto {

    @JsonProperty("exercise_id")
    private Long exerciseId;
    private Integer count;
    private Integer duration;
}
