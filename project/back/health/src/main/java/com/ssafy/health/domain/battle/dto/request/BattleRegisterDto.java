package com.ssafy.health.domain.battle.dto.request;

import com.ssafy.health.domain.crew.entity.Crew;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BattleRegisterDto {
    private Crew homeCrew;
    private Crew awayCrew;
}
