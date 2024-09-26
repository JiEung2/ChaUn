package com.ssafy.health.domain.account.exception;

public class NotCrewLeaderException extends RuntimeException {
    @Override
    public String getMessage() { return UserCrewExceptionMessage.USER_CREW_NOT_FOUND_MESSAGE.getMessage(); }
    public int getStatus() {
        return UserCrewExceptionMessage.USER_CREW_NOT_FOUND_MESSAGE.getStatus();
    }
}
