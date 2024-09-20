package com.ssafy.health.domain.account.exception;

public class DrinkNotFoundException extends RuntimeException {

    @Override
    public String getMessage() { return CaloriesExceptionMessage.DRINK_NOT_FOUND.getMessage(); }
    public int getStatus() { return CaloriesExceptionMessage.DRINK_NOT_FOUND.getStatus(); }
}