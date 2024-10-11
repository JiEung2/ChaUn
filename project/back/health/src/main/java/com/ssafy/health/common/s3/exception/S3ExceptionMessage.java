package com.ssafy.health.common.s3.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum S3ExceptionMessage {
    DUPLICATE_IMAGE("중복된 이미지가 존재합니다.", HttpStatus.BAD_REQUEST.value()),
    INVALID_FILETYPE("지원되지 않는 파일 형식입니다", HttpStatus.BAD_REQUEST.value()),
    UPLOAD_FAILED("업로드에 실패하였습니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int statusCode;
}
