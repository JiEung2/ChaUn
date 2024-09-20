package com.ssafy.health.domain.battle.dto.response;

import com.ssafy.health.domain.exercise.entity.Exercise;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BattleMatchResponseDto {
    private String myTeamName;
    private Float myTeamScore;
    private String opponentTeamName;
    private Float opponentTeamScore;
    private String exerciseName;
    private Integer dDay;
}
