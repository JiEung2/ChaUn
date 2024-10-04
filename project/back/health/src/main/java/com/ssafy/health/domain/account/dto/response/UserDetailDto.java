package com.ssafy.health.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDetailDto {

    private String nickname;
    private String characterImageUrl;
    private String characterFileUrl;
}
