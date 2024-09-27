package com.ssafy.health.domain.crew.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CrewMemberDailyExerciseTimeListDto {
    List<CrewMemberDailyExerciseTime> exerciseTimeList;
}
