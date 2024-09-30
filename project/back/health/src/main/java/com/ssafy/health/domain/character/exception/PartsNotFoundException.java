package com.ssafy.health.domain.character.exception;

public class PartsNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {return CharacterExceptionMessage.PARTS_NOT_FOUND.getMessage();}
    public int getStatus() {return CharacterExceptionMessage.PARTS_NOT_FOUND.getStatus();}
}
