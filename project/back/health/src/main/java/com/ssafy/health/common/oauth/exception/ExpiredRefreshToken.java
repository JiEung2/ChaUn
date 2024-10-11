package com.ssafy.health.common.oauth.exception;

public class ExpiredRefreshToken extends RuntimeException {
    @Override
    public String getMessage() {
        return OAuthExceptionMessage.EXPIRED_REFRESH_TOKEN.getMessage();
    }
    public int getStatus() {
        return OAuthExceptionMessage.EXPIRED_REFRESH_TOKEN.getStatus();
    }
}
