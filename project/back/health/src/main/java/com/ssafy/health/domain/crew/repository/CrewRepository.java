package com.ssafy.health.domain.crew.repository;

import com.ssafy.health.domain.crew.entity.Crew;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

public interface CrewRepository extends JpaRepository<Crew, Long> {

    @Lock(LockModeType.OPTIMISTIC)
    @Query("select c from Crew c where c.id = :id")
    Crew findByIdWithOptimisticLock(Long id);
}
