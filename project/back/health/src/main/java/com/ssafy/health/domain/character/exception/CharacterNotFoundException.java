package com.ssafy.health.domain.character.exception;

public class CharacterNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {return CharacterExceptionMessage.CHARACTER_NOT_FOUND.getMessage();}
    public int getStatus() {return CharacterExceptionMessage.CHARACTER_NOT_FOUND.getStatus();}
}
