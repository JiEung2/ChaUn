package com.ssafy.health.domain.crew.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CrewExceptionMessage {
    CREW_NOT_FOUND("해당 크루가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    CREW_MEMBER_LIMIT_EXCEEDED("크루 인원이 모두 찼습니다. 더 이상 가입할 수 없습니다.", HttpStatus.CONFLICT.value()),
    ALREADY_JOINED_CREW("이미 해당 크루에 가입되어 있습니다.", HttpStatus.CONFLICT.value()),
    ;

    private final String message;
    private final int status;

    CrewExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
