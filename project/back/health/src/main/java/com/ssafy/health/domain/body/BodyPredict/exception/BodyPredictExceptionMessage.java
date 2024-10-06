package com.ssafy.health.domain.body.BodyPredict.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BodyPredictExceptionMessage {
    BASIC_DATA_NOT_AVAILABLE("기본 체형 예측 정보가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    EXTRA_DATA_NOT_AVAILABLE("추가 체형 예측 정보가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    BodyPredictExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
