package com.ssafy.health.domain.crew.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewMemberDailyExerciseTime {
    private Long userId;
    private String nickname;
    private Long exerciseTime;
}
