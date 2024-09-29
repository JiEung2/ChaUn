package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.quest.entity.CrewQuest;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewQuestRepository extends JpaRepository<CrewQuest, Long> {

    List<CrewQuest> findAllByCrewAndStatus(Crew crew, QuestStatus status);
}
