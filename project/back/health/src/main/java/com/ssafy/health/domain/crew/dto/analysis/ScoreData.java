package com.ssafy.health.domain.crew.dto.analysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScoreData {
    @JsonProperty("m_type")
    private float mType;
    private float type;
    private int age;
    @JsonProperty("basic_score")
    private float basicScore;
    @JsonProperty("activity_score")
    private float activityScore;
    @JsonProperty("intake_score")
    private float intakeScore;
}