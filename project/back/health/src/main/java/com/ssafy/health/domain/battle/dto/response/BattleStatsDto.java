package com.ssafy.health.domain.battle.dto.response;

public record BattleStatsDto(Long totalBattles, Long wonBattles) {
    public BattleStatsDto(Long totalBattles, Long wonBattles) {
        this.totalBattles = totalBattles != null ? totalBattles : 0L;
        this.wonBattles = wonBattles != null ? wonBattles : 0L;
    }
}
