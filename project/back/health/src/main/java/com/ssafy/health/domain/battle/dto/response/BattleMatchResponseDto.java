package com.ssafy.health.domain.battle.dto.response;

import com.ssafy.health.domain.exercise.entity.Exercise;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BattleMatchResponseDto {
    private String myTeamName;
    private String opponentTeamName;
    private Exercise exercise;
    private Float myTeamScore;
    private Float opponentTeamScore;
    private Integer dDay;
}
