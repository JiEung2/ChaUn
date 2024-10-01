package com.ssafy.health.domain.crew.exception;

public class CrewMemberLimitExceededException extends RuntimeException {
    @Override
    public String getMessage() {
        return CrewExceptionMessage.CREW_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return CrewExceptionMessage.CREW_NOT_FOUND.getStatus();
    }
}
