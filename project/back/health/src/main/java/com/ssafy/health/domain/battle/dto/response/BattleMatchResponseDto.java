package com.ssafy.health.domain.battle.dto.response;

import com.ssafy.health.domain.battle.entity.BattleStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BattleMatchResponseDto {
    private String myCrewName;
    private Float myCrewScore;
    private String opponentCrewName;
    private Float opponentCrewScore;
    private String exerciseName;
    private BattleStatus battleStatus;
    private Integer dDay;
}
