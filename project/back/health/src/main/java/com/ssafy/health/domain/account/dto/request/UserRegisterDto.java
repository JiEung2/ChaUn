package com.ssafy.health.domain.account.dto.request;

import com.ssafy.health.domain.account.entity.UserRole;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserRegisterDto {

    private String username;
    private String sso;
    private String email;
    private UserRole role;
}
