package com.ssafy.health.domain.account.dto.response;

import lombok.Getter;

@Getter
public class ValidateNameSuccessDto {
    private final String message = "사용 가능한 이름입니다.";
}
