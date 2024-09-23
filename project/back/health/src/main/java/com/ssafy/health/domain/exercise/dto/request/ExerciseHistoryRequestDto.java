package com.ssafy.health.domain.exercise.dto.request;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.exercise.entity.Exercise;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ExerciseHistoryRequestDto {

    private Exercise exercise;
    private User user;
    private LocalDateTime exerciseStartTime;
    private LocalDateTime exerciseEndTime;
    private Long exerciseDuration;
    private Float burnedCalories;

}
