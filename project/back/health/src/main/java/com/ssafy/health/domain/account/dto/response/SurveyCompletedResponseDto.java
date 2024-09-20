package com.ssafy.health.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyCompletedResponseDto {
    private Boolean surveyCompleted;
}
