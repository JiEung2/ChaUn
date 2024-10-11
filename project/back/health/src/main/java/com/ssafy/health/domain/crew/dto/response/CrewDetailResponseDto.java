package com.ssafy.health.domain.crew.dto.response;

import com.ssafy.health.domain.crew.entity.CrewRole;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewDetailResponseDto {
    private Long crewId;
    private String crewName;
    private String exerciseName;
    private String description;
    private String profileImage;
    private Integer crewCoins;
    private Long crewRanking;
    private Long totalBattlesCount;
    private Long winCount;
    private Integer averageAge;
    private Float basicScore;
    private Float activityScore;
    private CrewRole role;
}
