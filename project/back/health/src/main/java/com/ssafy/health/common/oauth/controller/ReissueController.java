package com.ssafy.health.common.oauth.controller;

import com.ssafy.health.common.oauth.exception.ExpiredRefreshToken;
import com.ssafy.health.common.oauth.exception.InvalidRefreshToken;
import com.ssafy.health.common.oauth.exception.NotFoundRefreshTokenException;
import com.ssafy.health.common.oauth.jwt.JWTUtil;
import com.ssafy.health.common.oauth.repository.RefreshRepository;
import com.ssafy.health.common.oauth.service.CookieService;
import com.ssafy.health.common.oauth.service.RefreshService;
import com.ssafy.health.domain.account.entity.UserRole;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReissueController {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final RefreshService refreshService;
    private final CookieService cookieService;

    @GetMapping("/api/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        log.info("reissue 진입");
        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();

        log.info(cookies.toString());
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
                log.info("refresh =" + refresh);
            }
        }

        if (refresh == null) {

            log.info("refresh가 null");
            throw new NotFoundRefreshTokenException();
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            throw new ExpiredRefreshToken();
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        // DB에 저장되어 있는지 확인
        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if (!isExist) {

            //response body
            throw new InvalidRefreshToken();
        }

        if (!category.equals("refresh")) {

            //response status code
            throw new InvalidRefreshToken();
        }

        String username = jwtUtil.getUsername(refresh);
        UserRole role = jwtUtil.getRole(refresh);

        //make new JWT
        String newAccess = jwtUtil.createJwt("access", username, UserRole.USER, 600000000L);
        String newRefresh = jwtUtil.createJwt("refresh", username, UserRole.USER, 86400000L);

        refreshRepository.deleteByRefresh(refresh);
        refreshService.addRefreshToken(username, newRefresh, 86400000L);

        //response
        response.setHeader("access", newAccess);
//        response.addHeader(HttpHeaders.SET_COOKIE, cookieService.createCookie("refresh", newRefresh).toString());
        cookieService.createCookie(response, "refresh", newRefresh);

        System.out.println("access: " + newAccess);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
