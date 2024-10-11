package com.ssafy.health.domain.crew.exception;

public class AlreadyJoinedCrewException extends RuntimeException {
    @Override
    public String getMessage() {
        return CrewExceptionMessage.ALREADY_JOINED_CREW.getMessage();
    }
    public int getStatus() {
        return CrewExceptionMessage.ALREADY_JOINED_CREW.getStatus();
    }
}
