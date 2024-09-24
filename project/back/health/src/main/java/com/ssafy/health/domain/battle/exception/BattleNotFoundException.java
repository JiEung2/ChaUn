package com.ssafy.health.domain.battle.exception;

import com.ssafy.health.domain.account.exception.UserExceptionMessage;

public class BattleNotFoundException extends RuntimeException{

    @Override
    public String getMessage() {
        return UserExceptionMessage.USER_NOT_FOUND.getMessage();
    }
    public int getStatus() {
        return UserExceptionMessage.USER_NOT_FOUND.getStatus();
    }
}
