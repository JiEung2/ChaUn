package com.ssafy.health.common.fcm.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum DeviceExceptionMessage {
    DEVICE_NOT_FOUND("Firebase에 해당 기기를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()),
    DEVICE_NOT_REGISTERED("사용자에게 등록된 기기가 없습니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int statusCode;
}
