package com.ssafy.health.domain.body.BodyHistory.entity;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BodyHistoryExceptionMessage {
    BODY_HISTORY_NOT_FOUND("체형 기록이 존재하지 않습니다.",HttpStatus.NOT_FOUND.value()),
    ;

    private final String message;
    private final int status;

    BodyHistoryExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
