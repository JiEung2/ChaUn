package com.ssafy.health.domain.crew.dto.response;

import com.ssafy.health.domain.recommendation.dto.response.ScoreDataDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CrewListWithUserScoreResponseDto {

    private ScoreDataDto userScore;
    private List<CrewRecommendInfo> crewList;

    @Getter
    @Builder
    public static class CrewRecommendInfo {
        private Long crewId;
        private String crewName;
        private String exerciseName;
        private String crewProfileImage;
    }
}
