package com.ssafy.health.domain.battle.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BattleMatchResponseDto {
    private String myCrewName;
    private Integer myCrewScore;
    private String opponentCrewName;
    private Integer opponentCrewScore;
    private String exerciseName;
    private Integer dDay;
}
