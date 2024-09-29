package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.quest.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestRepository extends JpaRepository<Quest, Long> {
}
