package com.ssafy.health.domain.body.BodyPredict.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalysisRequestDto {

    @JsonProperty("exercise_detail")
    private ExerciseDetailDto exerciseDetail;

    @JsonProperty("exercise_data")
    private List<UserExerciseData> exerciseData;

    @JsonProperty("extra_exercise_data")
    private List<UserExerciseData> extraExerciseData;

    @Data
    @Builder
    public static class UserExerciseData {

        private int sex;
        private int age;
        private float bmi;
        private float weight;
        private float calories;
    }
}
