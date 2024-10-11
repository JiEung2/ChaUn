package com.ssafy.health.domain.attendance.exception;


public class AttendanceAlreadyExistsException extends RuntimeException{
    @Override
    public String getMessage() { return AttendanceExceptionMessage.ATTENDANCE_ALREADY_EXISTS.getMessage(); }
    public int getStatus() {
        return AttendanceExceptionMessage.ATTENDANCE_ALREADY_EXISTS.getStatus();
    }
}
