package com.ssafy.health.domain.character.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CharacterExceptionMessage {
    CHARACTER_NOT_FOUND("해당 캐릭터가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    CHARACTER_SET_NOT_FOUND("해당 캐릭터 세트가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    PARTS_NOT_FOUND("해당 파츠가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value())
    ;

    private final String message;
    private final int status;

    CharacterExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
