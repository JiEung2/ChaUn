package com.ssafy.health.domain.crew.dto.analysis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MaxScoresDto {
    private Float basicScore;
    private Float activityScore;
}
