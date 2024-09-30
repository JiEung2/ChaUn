package com.ssafy.health.domain.quest.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum QuestExceptionMessage {
    QUEST_NOT_FOUND("해당 퀘스트가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    QUEST_NOT_AVAILABLE("생성 가능한 퀘스트가 존재하지 않습니다", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    QuestExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
