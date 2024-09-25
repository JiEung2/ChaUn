package com.ssafy.health.domain.crew.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewScoreResponseDto {
    private Float basicScore;
    private Float activityScore;
}
