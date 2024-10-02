package com.ssafy.health.domain.crew.dto.analysis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CrewAnalysisRequestDto {
    @JsonProperty("total_users")
    private TotalUserDataDto totalUsers;
    @JsonProperty("total_crews")
    private TotalCrewDataDto totalCrews;
}