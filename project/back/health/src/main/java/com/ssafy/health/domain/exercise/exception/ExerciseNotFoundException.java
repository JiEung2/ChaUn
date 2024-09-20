package com.ssafy.health.domain.exercise.exception;

import com.ssafy.health.domain.crew.exception.CrewExceptionMessage;

public class ExerciseNotFoundException extends RuntimeException {
    public String getMessage() {
        return ExerciseExceptionMessage.EXERCISE_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return ExerciseExceptionMessage.EXERCISE_NOT_FOUND.getStatus();
    }
}
