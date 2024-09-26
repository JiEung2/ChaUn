package com.ssafy.health.domain.battle.exception;

public class BattleNotFoundException extends RuntimeException{

    @Override
    public String getMessage() {
        return BattleExceptionMessage.BATTLE_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return BattleExceptionMessage.BATTLE_NOT_FOUND.getStatus();
    }
}
