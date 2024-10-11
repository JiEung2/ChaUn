package com.ssafy.health.common.util;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum LockExceptionMessage {
    CREW_BASIC_SCORE_LOCK_EXCEPTION("크루 basic score 업데이트 부분에 락 충돌이 발생하였습니다.", HttpStatus.CONFLICT.value()),
    ;

    private final String message;
    private final int status;

    LockExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
