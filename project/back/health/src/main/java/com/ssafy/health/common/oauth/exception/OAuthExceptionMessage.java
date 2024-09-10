package com.ssafy.health.common.oauth.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum OAuthExceptionMessage {
    NOT_FOUND_REFRESH_TOKEN("리프레시 토큰을 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()),
    EXPIRED_REFRESH_TOKEN("리프레시 토큰이 만료되었습니다.", HttpStatus.BAD_REQUEST.value()),
    INVALID_REFRESH_TOKEN("유효하지 않은 리프레시 토큰입니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    OAuthExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
