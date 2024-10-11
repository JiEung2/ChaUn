package com.ssafy.health.common.util;

public class CrewBasicScoreLockException extends InterruptedException {
    @Override
    public String getMessage() {return LockExceptionMessage.CREW_BASIC_SCORE_LOCK_EXCEPTION.getMessage();}
    public int getStatus() { return LockExceptionMessage.CREW_BASIC_SCORE_LOCK_EXCEPTION.getStatus(); }
}
