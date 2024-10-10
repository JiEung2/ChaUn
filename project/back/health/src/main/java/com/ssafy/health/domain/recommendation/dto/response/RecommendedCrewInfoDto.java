package com.ssafy.health.domain.recommendation.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class RecommendedCrewInfoDto {
    private Long crewId;
    private CrewDetail crewDetail;
    private ScoreDataDto crewScore;

    @Getter
    @Builder
    public static class CrewDetail {
        private String name;
        private String description;
        private String exerciseName;
        private String profileImage;
    }
}