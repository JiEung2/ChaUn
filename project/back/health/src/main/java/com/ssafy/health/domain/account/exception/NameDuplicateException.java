package com.ssafy.health.domain.account.exception;

public class NameDuplicateException extends RuntimeException {

    public String getMessage() {
        return UserExceptionMessage.NAME_DUPLICATED.getMessage();
    }
    public int getStatus() {
        return UserExceptionMessage.NAME_DUPLICATED.getStatus();
    }
}
