package com.ssafy.health.domain.account.exception;

public class NicknameDuplicateException extends RuntimeException {

    public String getMessage() {
        return UserExceptionMessage.USER_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return UserExceptionMessage.USER_NOT_FOUND.getStatus();
    }
}
