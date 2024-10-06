package com.ssafy.health.domain.body.BodyPredict.exception;

public class ExtraDataNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return BodyPredictExceptionMessage.EXTRA_DATA_NOT_AVAILABLE.getMessage();
    }

    public int getStatus() {
        return BodyPredictExceptionMessage.EXTRA_DATA_NOT_AVAILABLE.getStatus();
    }
}
