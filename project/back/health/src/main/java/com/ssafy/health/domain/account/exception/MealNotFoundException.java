package com.ssafy.health.domain.account.exception;

public class MealNotFoundException extends RuntimeException {

    @Override
    public String getMessage() { return CaloriesExceptionMessage.MEAL_NOT_FOUND.getMessage(); }
    public int getStatus() { return CaloriesExceptionMessage.MEAL_NOT_FOUND.getStatus(); }
}