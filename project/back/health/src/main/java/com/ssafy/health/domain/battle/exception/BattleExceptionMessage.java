package com.ssafy.health.domain.battle.exception;

import org.springframework.http.HttpStatus;

public enum BattleExceptionMessage {

    BATTLE_NOT_FOUND("현재 진행중인 배틀이 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    ;

    private final String message;
    private final int status;

    BattleExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
