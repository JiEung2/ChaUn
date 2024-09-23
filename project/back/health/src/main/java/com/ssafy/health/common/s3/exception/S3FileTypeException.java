package com.ssafy.health.common.s3.exception;

public class S3FileTypeException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.INVALID_FILETYPE.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.INVALID_FILETYPE.getStatusCode();
    }
}
