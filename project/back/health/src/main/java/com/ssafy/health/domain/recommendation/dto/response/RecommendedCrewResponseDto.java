package com.ssafy.health.domain.recommendation.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecommendedCrewResponseDto {

    private Long userId;
    private ScoreDataDto userScore;
    private List<RecommendedCrewInfoDto> crewRecommend;
}
