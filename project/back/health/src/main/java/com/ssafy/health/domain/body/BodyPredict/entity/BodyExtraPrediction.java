package com.ssafy.health.domain.body.BodyPredict.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Document(collection = "predict_extra")
public class BodyExtraPrediction {

    @Field("user_id")
    private Long userId;
    private Float p30;
    private Float p90;
    @Field("created_at")
    private LocalDateTime createdAt;
    private ExerciseDetail exercise;

    @Getter
    @AllArgsConstructor
    public static class ExerciseDetail {
        @Field("exercise_id")
        private Long exerciseId;
        private Integer count;
        private Integer duration;
    }
}
