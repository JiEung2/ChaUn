package com.ssafy.health.domain.account.exception;

public class SnackNotFoundException extends RuntimeException {

    @Override
    public String getMessage() { return CaloriesExceptionMessage.SNACK_NOT_FOUND.getMessage(); }
    public int getStatus() { return CaloriesExceptionMessage.SNACK_NOT_FOUND.getStatus(); }
}