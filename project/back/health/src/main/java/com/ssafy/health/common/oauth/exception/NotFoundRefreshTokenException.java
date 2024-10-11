package com.ssafy.health.common.oauth.exception;

public class NotFoundRefreshTokenException extends RuntimeException {

    @Override
    public String getMessage() {
        return OAuthExceptionMessage.NOT_FOUND_REFRESH_TOKEN.getMessage();
    }
    public int getStatus() {
        return OAuthExceptionMessage.NOT_FOUND_REFRESH_TOKEN.getStatus();
    }
}
