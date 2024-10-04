package com.ssafy.health.domain.crew.dto.analysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CrewData {
    @JsonProperty("crew_id")
    private int crewId;
    private ScoreData score;
    @JsonProperty("crew_sports")
    private int crewSports;
}