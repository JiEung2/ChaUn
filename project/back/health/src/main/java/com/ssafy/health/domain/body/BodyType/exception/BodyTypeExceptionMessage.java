package com.ssafy.health.domain.body.BodyType.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BodyTypeExceptionMessage {
    BODY_TYPE_NOT_FOUND("해당 BodyType이 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    ;

    private final String message;
    private final int status;

    BodyTypeExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
