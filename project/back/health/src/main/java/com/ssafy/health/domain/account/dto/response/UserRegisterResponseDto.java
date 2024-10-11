package com.ssafy.health.domain.account.dto.response;

import com.ssafy.health.domain.account.entity.UserRole;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserRegisterResponseDto {

    private Long id;
    private String name;
    private String sso;
    private String email;
    private UserRole role;
}
