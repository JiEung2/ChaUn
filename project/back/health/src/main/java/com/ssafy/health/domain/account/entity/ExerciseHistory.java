package com.ssafy.health.domain.account.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.exercise.entity.Exercise;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ExerciseHistory extends BaseEntity {
    //Todo: 칼로리 계산 추가

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime exerciseStartTime;

    @NotNull
    private LocalDateTime exerciseEndTime;

    @NotNull
    private Long exerciseDuration;

    @NotNull
    private Float burnedCalories;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public ExerciseHistory(User user, Exercise exercise,
                           LocalDateTime exerciseStartTime, LocalDateTime exerciseEndTime,
                           Long exerciseDuration){
        this.user = user;
        this.exercise = exercise;
        this.exerciseStartTime = exerciseStartTime;
        this.exerciseEndTime = exerciseEndTime;
        this.exerciseDuration = exerciseDuration;
        this.burnedCalories = burnedCalories;
    }
}
