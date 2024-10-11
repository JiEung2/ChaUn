package com.ssafy.health.domain.account.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum UserExceptionMessage {
    USER_NOT_FOUND("해당 유저가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    NAME_DUPLICATED("이미 사용중인 이름입니다.", HttpStatus.CONFLICT.value()),
    INSUFFICIENT_COINS("코인이 부족합니다.", HttpStatus.BAD_REQUEST.value()),
    ;

    private final String message;
    private final int status;

    UserExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
