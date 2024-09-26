package com.ssafy.health.domain.account.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum UserCrewExceptionMessage {
    USER_CREW_NOT_FOUND_MESSAGE("해당 크루의 크루원이 아닙니다.", HttpStatus.NOT_FOUND.value()),
    NOT_CREW_LEADER("해당 작업을 수행하려면 크루장 권한이 필요합니다.", HttpStatus.FORBIDDEN.value())
    ;

    private final String message;
    private final int status;

    UserCrewExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
