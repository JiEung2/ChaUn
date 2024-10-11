package com.ssafy.health.domain.recommendation.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecommendedCrewResponseDto {

    private Long crewId;
    private String crewName;
    private String exerciseName;
    private String description;
    private String crewProfileImage;
    private Integer crewCoins;
    private Long crewRanking;
    private Integer averageAge;
    private Float averageBodyType;
    private Float basicScore;
    private Float activityScore;
    private Float intakeScore;
}
