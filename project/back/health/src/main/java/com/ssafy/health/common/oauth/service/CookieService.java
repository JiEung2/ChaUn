package com.ssafy.health.common.oauth.service;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {
    public void createCookie(HttpServletResponse response, String key, String value) {

        ResponseCookie cookie = ResponseCookie.from(key, value)
                .httpOnly(true)        // JavaScript에서 접근하지 못하도록 설정
                .secure(false)          // HTTPS 환경에서만 전송되도록 설정
                .path("/")             // 쿠키의 적용 경로 설정
                .maxAge(60 * 60 * 60)        // 쿠키 만료 시간 설정
                .domain("localhost")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }
}
