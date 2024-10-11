package com.ssafy.health.domain.battle.dto.response;

import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.crew.entity.Crew;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BattleAndCrewDto {
    private final Crew crew;
    private final Battle battle;
}
