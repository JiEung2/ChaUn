package com.ssafy.health.domain.crew.exception;

public class CrewNotFoundException extends RuntimeException {
    public String getMessage() {
        return CrewExceptionMessage.CREW_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return CrewExceptionMessage.CREW_NOT_FOUND.getStatus();
    }
}
