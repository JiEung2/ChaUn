package com.ssafy.health.domain.recommendation.dto.request;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.recommendation.entity.FavoriteExercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FavoriteExerciseRequestDto {
    private Long userId;
    private Long exerciseId;

    public FavoriteExercise toEntity(User user, Exercise exercise) {
        return FavoriteExercise.builder()
                .user(user)
                .exercise(exercise)
                .build();
    }
}
