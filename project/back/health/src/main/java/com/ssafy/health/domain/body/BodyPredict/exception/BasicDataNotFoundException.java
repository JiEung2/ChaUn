package com.ssafy.health.domain.body.BodyPredict.exception;

public class BasicDataNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return BodyPredictExceptionMessage.BASIC_DATA_NOT_AVAILABLE.getMessage();
    }

    public int getStatue() {
        return BodyPredictExceptionMessage.BASIC_DATA_NOT_AVAILABLE.getStatus();
    }
}
