package com.ssafy.health.domain.crew.dto.analysis;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MaxScoresDto {

    private Double basicScore;
    private Double activityScore;
}
