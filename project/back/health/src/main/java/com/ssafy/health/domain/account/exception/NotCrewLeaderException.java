package com.ssafy.health.domain.account.exception;

public class NotCrewLeaderException extends RuntimeException {
    @Override
    public String getMessage() { return UserCrewExceptionMessage.NOT_CREW_LEADER.getMessage(); }
    public int getStatus() {
        return UserCrewExceptionMessage.NOT_CREW_LEADER.getStatus();
    }
}
