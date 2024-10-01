package com.ssafy.health.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveySuccessDto {
    private final String message = "모든 설문조사를 완료했습니다.";
    private final String characterUrl;
}
