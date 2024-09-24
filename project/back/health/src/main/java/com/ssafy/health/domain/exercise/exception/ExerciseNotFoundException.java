package com.ssafy.health.domain.exercise.exception;

public class ExerciseNotFoundException extends RuntimeException {
    public String getMessage() {
        return ExerciseExceptionMessage.EXERCISE_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return ExerciseExceptionMessage.EXERCISE_NOT_FOUND.getStatus();
    }
}
