package com.ssafy.health.common.oauth;


import com.ssafy.health.common.oauth.dto.CustomOAuth2User;
import com.ssafy.health.common.oauth.jwt.JWTUtil;
import com.ssafy.health.common.oauth.service.CookieService;
import com.ssafy.health.common.oauth.service.RefreshService;
import com.ssafy.health.domain.account.entity.UserRole;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;
    private final CookieService cookieService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        UserRole role = UserRole.valueOf(auth.getAuthority());

        //토큰 생성
        String accessToken = jwtUtil.createJwt("access", username, role, 600000000L);
        String refreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        //Refresh 토큰 저장
        refreshService.addRefreshToken(username, refreshToken, 86400000L);

        //응답 설정
        response.addCookie(cookieService.createCookie("access", accessToken));
        response.addCookie(cookieService.createCookie("refresh", refreshToken));
        response.setStatus(HttpStatus.OK.value());

        System.out.println("access = " + accessToken);
        System.out.println("refresh = " + refreshToken);

        response.sendRedirect("http://localhost:8080/login");
    }

}
