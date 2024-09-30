package com.ssafy.health.domain.quest.exception;

public class QuestNotAvailableException extends RuntimeException {

    @Override
    public String getMessage() {
        return QuestExceptionMessage.QUEST_NOT_AVAILABLE.getMessage();
    }

    public int getStatus() {
        return QuestExceptionMessage.QUEST_NOT_AVAILABLE.getStatus();
    }
}
