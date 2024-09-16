package com.ssafy.health.domain.crew.repository;

import com.ssafy.health.domain.crew.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
}
