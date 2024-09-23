package com.ssafy.health.common.s3.exception;

public class S3FileUploadException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.UPLOAD_FAILED.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.UPLOAD_FAILED.getStatusCode();
    }
}
