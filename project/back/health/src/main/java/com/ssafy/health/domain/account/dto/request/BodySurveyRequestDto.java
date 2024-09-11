package com.ssafy.health.domain.account.dto.request;

import lombok.Getter;
import org.openapitools.jackson.nullable.JsonNullable;

@Getter
public class BodySurveyRequestDto {
    private Float height;
    private Float weight;
    private final JsonNullable<Float> skeletalMuscleMass = JsonNullable.undefined();
    private final JsonNullable<Float> bodyFatRatio = JsonNullable.undefined();
    private Boolean isMuscle;
    private Long bodyType;
}
