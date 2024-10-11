package com.ssafy.health.domain.battle.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BattleExceptionMessage {

    BATTLE_NOT_FOUND("현재 진행중인 배틀이 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    BATTLE_ALREADY_EXISTS("이미 진행중인 배틀이 존재합니다.", HttpStatus.CONFLICT.value()),
    CREW_NOT_PARTICIPANT("해당 배틀에 참여중인 크루가 아닙니다.", HttpStatus.BAD_REQUEST.value())
    ;

    private final String message;
    private final int status;

    BattleExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
