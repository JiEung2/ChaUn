package com.ssafy.health.domain.battle.exception;

public class CrewNotParticipantException extends RuntimeException{
    @Override
    public String getMessage() {
        return BattleExceptionMessage.CREW_NOT_PARTICIPANT.getMessage();
    }
    public int getStatus() {
        return BattleExceptionMessage.CREW_NOT_PARTICIPANT.getStatus();
    }
}
