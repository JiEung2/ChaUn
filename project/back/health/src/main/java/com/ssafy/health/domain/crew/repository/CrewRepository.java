package com.ssafy.health.domain.crew.repository;

import com.ssafy.health.domain.crew.entity.Crew;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewRepository extends JpaRepository<Crew, Long> {

    @Lock(LockModeType.OPTIMISTIC)
    @Query("select c from Crew c where c.id = :id")
    Crew findByIdWithOptimisticLock(Long id);

    @Query("SELECT c FROM Crew c " +
            "WHERE c.id NOT IN (SELECT b.homeCrew.id FROM Battle b WHERE b.status = 'STARTED')" +
            "AND c.id NOT IN (SELECT b.awayCrew.id FROM Battle b WHERE b.status = 'STARTED')" +
            "AND c.battleStatus = true " +
            "AND c.id <> :currentCrewId")
    List<Crew> findBattleReadyCrews(Long currentCrewId);

    @Query("SELECT COUNT(c) FROM Crew c WHERE (c.basicScore + c.activityScore) >= :totalScore")
    Long countCrewsWithHigherOrEqualScore(Integer totalScore);
}
