package com.ssafy.health.domain.quest.exception;

public class QuestNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return QuestExceptionMessage.QUEST_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return QuestExceptionMessage.QUEST_NOT_FOUND.getStatus();
    }
}
