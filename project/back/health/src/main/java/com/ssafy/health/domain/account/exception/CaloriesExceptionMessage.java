package com.ssafy.health.domain.account.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CaloriesExceptionMessage {
    MEAL_NOT_FOUND("해당 식사에 대한 기준표가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    SNACK_NOT_FOUND("해당 간식에 대한 기준표가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    DRINK_NOT_FOUND("해당 음료에 대한 기준표가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    ;

    private final String message;
    private final int status;

    CaloriesExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
