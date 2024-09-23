package com.ssafy.health.common.fcm.exception;

public class DeviceNotRegisteredException extends RuntimeException {

    public String getMessage() {
        return DeviceExceptionMessage.DEVICE_NOT_REGISTERED.getMessage();
    }

    public int getStatus() {
        return DeviceExceptionMessage.DEVICE_NOT_REGISTERED.getStatusCode();
    }
}
