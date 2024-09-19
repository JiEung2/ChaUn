package com.ssafy.health.domain.exercise.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ExerciseExceptionMessage {
    EXERCISE_NOT_FOUND("해당 운동이 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    ;

    private final String message;
    private final int status;

    ExerciseExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
