package com.ssafy.health.common.oauth.service;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {
    public Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value); //쿠키 생성
        cookie.setMaxAge(60 * 60 * 60); //쿠키가 살아있을 시간 설정
        cookie.setSecure(true); //https 환경에서만 쿠키가 사용될 수 있게 하는 설정
        cookie.setPath("/"); //쿠키가 보일 위치는 모든 전역 위치
        cookie.setHttpOnly(true); //js가 쿠키를 가져가지 못하게 설정

        return cookie;
    }
}
