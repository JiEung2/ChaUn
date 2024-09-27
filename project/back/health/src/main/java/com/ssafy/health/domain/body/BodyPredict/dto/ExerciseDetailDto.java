package com.ssafy.health.domain.body.BodyPredict.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDetailDto {

    @JsonProperty("exercise_id")
    private Long exerciseId;
    private Integer count;
    private Integer duration;
}
