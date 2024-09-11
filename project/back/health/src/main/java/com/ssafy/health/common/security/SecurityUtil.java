package com.ssafy.health.common.security;

import com.ssafy.health.common.oauth.dto.CustomOAuth2User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomOAuth2User) {
            CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
            return user.getId();  // 현재 사용자의 ID 반환
        }
        throw new UserNotFoundException();
    }
}
