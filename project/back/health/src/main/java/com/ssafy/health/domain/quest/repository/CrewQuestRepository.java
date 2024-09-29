package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.quest.entity.CrewQuest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewQuestRepository extends JpaRepository<CrewQuest, Long> {
}
