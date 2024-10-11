package com.ssafy.health.domain.character.exception;

public class CharacterSetNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {return CharacterExceptionMessage.CHARACTER_SET_NOT_FOUND.getMessage();}
    public int getStatus() {return CharacterExceptionMessage.CHARACTER_SET_NOT_FOUND.getStatus();}
}
