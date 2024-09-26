package com.ssafy.health.domain.battle.exception;

public class BattleAlreadyExistsException extends RuntimeException{
    @Override
    public String getMessage() {
        return BattleExceptionMessage.BATTLE_ALREADY_EXISTS.getMessage();
    }
    public int getStatus() {
        return BattleExceptionMessage.BATTLE_ALREADY_EXISTS.getStatus();
    }
}
