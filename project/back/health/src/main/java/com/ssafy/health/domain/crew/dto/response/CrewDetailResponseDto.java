package com.ssafy.health.domain.crew.dto.response;

import com.ssafy.health.domain.crew.entity.CrewRole;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewDetailResponseDto {
    private String crewName;
    private String exerciseName;
    private String description;
    private String profileImage;
    private Integer crewCoins;
    private Long crewRanking;
    private Integer totalBattlesCount;
    private Integer winCount;
    private Float averageAge;
    private Integer basicScore;
    private Integer activityScore;
    private CrewRole role;
}
