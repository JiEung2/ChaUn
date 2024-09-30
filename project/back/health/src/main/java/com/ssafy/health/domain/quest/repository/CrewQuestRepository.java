package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.quest.entity.CrewQuest;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewQuestRepository extends JpaRepository<CrewQuest, Long> {

    @Query("SELECT q FROM CrewQuest q WHERE q.crew = :crew AND q.status IN :status")
    List<CrewQuest> findAllByCrewAndStatus(Crew crew, List<QuestStatus> status);
}