package com.ssafy.health.domain.account.exception;

public class UserNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return UserExceptionMessage.USER_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return UserExceptionMessage.USER_NOT_FOUND.getStatus();
    }
}
