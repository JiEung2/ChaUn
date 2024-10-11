package com.ssafy.health.domain.recommendation.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScoreDataDto {
    private Integer age;
    private Float bodyType;
    private Float basicScore;
    private Float activityScore;
    private Float intakeScore;
}