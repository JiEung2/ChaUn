package com.ssafy.health.common.oauth.service;

import com.ssafy.health.common.oauth.entity.RefreshToken;
import com.ssafy.health.common.oauth.repository.RefreshRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class RefreshService {

    private final RefreshRepository refreshRepository;

    public void addRefreshToken(String username, String refreshToken, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshToken refresh = new RefreshToken();
        refresh.setUsername(username);
        refresh.setRefresh(refreshToken);
        refresh.setExpiration(date.toString());

        refreshRepository.save(refresh);
    }

}
