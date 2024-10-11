package com.ssafy.health.domain.account.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLoginUpdateRequestDto {
    private Long userId;
    private String email;
    private String name;
}
