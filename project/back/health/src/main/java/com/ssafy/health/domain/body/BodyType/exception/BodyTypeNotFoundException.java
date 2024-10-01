package com.ssafy.health.domain.body.BodyType.exception;

public class BodyTypeNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {return BodyTypeExceptionMessage.BODY_TYPE_NOT_FOUND.getMessage();}
    public int getStatus() {return BodyTypeExceptionMessage.BODY_TYPE_NOT_FOUND.getStatus();}
}
