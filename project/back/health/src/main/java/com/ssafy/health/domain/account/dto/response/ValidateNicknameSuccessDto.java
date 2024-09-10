package com.ssafy.health.domain.account.dto.response;

import lombok.Getter;

@Getter
public class ValidateNicknameSuccessDto {
    private final String message = "사용 가능한 닉네임입니다.";
}
