package com.ssafy.health.common.oauth.dto;

import com.ssafy.health.domain.account.dto.response.UserRegisterResponseDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final UserRegisterResponseDto userRegisterResponseDto;

    public CustomOAuth2User(UserRegisterResponseDto userRegisterResponseDto) {
        this.userRegisterResponseDto = userRegisterResponseDto;
    }

    public Long getId() {
        return userRegisterResponseDto.getId();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "id", userRegisterResponseDto.getId(),
                "name", userRegisterResponseDto.getName(),
                "sso", userRegisterResponseDto.getSso(),
                "role", userRegisterResponseDto.getRole().name()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userRegisterResponseDto.getRole().name();
            }
        });

        return collection;
    }

    @Override
    public String getName() {
        return userRegisterResponseDto.getName();
    }

    public String getUsername() {
        return userRegisterResponseDto.getSso();
    }
}
