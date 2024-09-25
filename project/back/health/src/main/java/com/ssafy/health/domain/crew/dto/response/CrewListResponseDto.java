package com.ssafy.health.domain.crew.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewListResponseDto {
    private List<CrewInfo> crewList;

    @Getter
    @Builder
    public static class CrewInfo{
        private Long crewId;
        private String crewName;
        private String exerciseName;
        private String crewProfileImage;
    }
}
