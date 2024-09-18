package com.ssafy.health.domain.crew.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CrewExceptionMessage {
    CREW_NOT_FOUND("해당 유저가 존재하지 않습니다.", HttpStatus.CONFLICT.value()),
    ;

    private final String message;
    private final int status;

    CrewExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
