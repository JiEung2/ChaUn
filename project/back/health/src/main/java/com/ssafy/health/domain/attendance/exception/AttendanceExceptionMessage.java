package com.ssafy.health.domain.attendance.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AttendanceExceptionMessage {
    ATTENDANCE_ALREADY_EXISTS("오늘은 이미 출석을 완료하였습니다.", HttpStatus.CONFLICT.value()),
    ;

    private final String message;
    private final int status;

    AttendanceExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
