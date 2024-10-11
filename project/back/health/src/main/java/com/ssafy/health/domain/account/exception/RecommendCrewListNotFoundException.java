package com.ssafy.health.domain.account.exception;

public class RecommendCrewListNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return RecommendCrewExceptionMessage.LIST_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return RecommendCrewExceptionMessage.LIST_NOT_FOUND.getStatus();
    }
}
