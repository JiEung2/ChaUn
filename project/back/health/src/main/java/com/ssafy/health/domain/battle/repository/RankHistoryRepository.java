package com.ssafy.health.domain.battle.repository;

import com.ssafy.health.domain.battle.entity.RankHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankHistoryRepository extends JpaRepository<RankHistory, Long> {
}
