package com.ssafy.health.common.fcm.exception;

public class DeviceNotFoundException extends RuntimeException {

    public String getMessage() {
        return DeviceExceptionMessage.DEVICE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return DeviceExceptionMessage.DEVICE_NOT_FOUND.getStatusCode();
    }
}
