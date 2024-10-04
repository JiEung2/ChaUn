package com.ssafy.health.domain.crew.dto.analysis;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TotalCrewDataDto {
    private List<CrewData> crews;
}
