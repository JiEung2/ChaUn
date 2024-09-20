package com.ssafy.health.domain.battle.repository;

import com.ssafy.health.domain.battle.entity.Battle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BattleRepository extends JpaRepository<Battle, Long> {
}
