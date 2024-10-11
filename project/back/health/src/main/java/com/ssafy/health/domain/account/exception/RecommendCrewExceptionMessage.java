package com.ssafy.health.domain.account.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum RecommendCrewExceptionMessage {
    LIST_NOT_FOUND("추천 크루 목록이 존재하지 않습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    RecommendCrewExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
