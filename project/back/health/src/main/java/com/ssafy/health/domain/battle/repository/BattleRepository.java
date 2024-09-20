package com.ssafy.health.domain.battle.repository;

import com.ssafy.health.domain.battle.entity.Battle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BattleRepository extends JpaRepository<Battle, Long> {

    @Query("SELECT b FROM Battle b " +
            "WHERE (b.homeCrew.id IN :crewIdList OR b.awayCrew.id IN :crewIdList) " +
            "AND b.status = 'FINISHED' " +
            "ORDER BY b.createdAt DESC")
    List<Battle> findMostRecentFinishedBattleByCrewIdList(List<Long> crewIdList);

    @Query("SELECT b FROM Battle b " +
            "WHERE (b.homeCrew.id = :crewId OR b.awayCrew.id = :crewId) " +
            "AND b.status = 'FINISHED' " +
            "ORDER BY b.createdAt DESC")
    Optional<Battle> findFirstByCrewIdOrderByCreatedAtDesc(Long crewId);
}
