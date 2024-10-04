package com.ssafy.health.domain.battle.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("dday")
    private Integer dDay;
}
