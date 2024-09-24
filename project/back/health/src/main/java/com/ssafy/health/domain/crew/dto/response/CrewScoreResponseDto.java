package com.ssafy.health.domain.crew.dto.response;


import com.ssafy.health.domain.crew.entity.Crew;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewScoreResponseDto {
    private Integer basicScore;
    private Integer activityScore;

    public static CrewScoreResponseDto fromEntity(final Crew crew) {
        return CrewScoreResponseDto.builder()
                .activityScore(crew.getActivityScore())
                .basicScore(crew.getBasicScore())
                .build();
    }
}
