package com.ssafy.health.domain.account.exception;

public class InsufficientCoinsException extends RuntimeException {

    public String getMessage() {
        return UserExceptionMessage.INSUFFICIENT_COINS.getMessage();
    }
    public int getStatus() {
        return UserExceptionMessage.INSUFFICIENT_COINS.getStatus();
    }
}
