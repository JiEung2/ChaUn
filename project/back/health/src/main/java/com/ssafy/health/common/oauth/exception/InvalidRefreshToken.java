package com.ssafy.health.common.oauth.exception;

public class InvalidRefreshToken extends RuntimeException {
    @Override
    public String getMessage() {
        return OAuthExceptionMessage.INVALID_REFRESH_TOKEN.getMessage();
    }
    public int getStatus() {
        return OAuthExceptionMessage.INVALID_REFRESH_TOKEN.getStatus();
    }
}
