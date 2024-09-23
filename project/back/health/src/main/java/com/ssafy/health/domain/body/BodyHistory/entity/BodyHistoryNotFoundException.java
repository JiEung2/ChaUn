package com.ssafy.health.domain.body.BodyHistory.entity;

public class BodyHistoryNotFoundException extends RuntimeException{
    @Override
    public String getMessage() {return BodyHistoryExceptionMessage.BODY_HISTORY_NOT_FOUND.getMessage();}
    public int getStatus() {return BodyHistoryExceptionMessage.BODY_HISTORY_NOT_FOUND.getStatus();}
}
