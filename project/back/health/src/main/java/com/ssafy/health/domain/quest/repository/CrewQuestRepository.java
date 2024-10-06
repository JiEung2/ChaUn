package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.quest.entity.CrewQuest;
import com.ssafy.health.domain.quest.entity.QuestPeriod;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewQuestRepository extends JpaRepository<CrewQuest, Long> {

    @Query("SELECT q FROM CrewQuest q WHERE q.crew = :crew AND q.status IN :status")
    List<CrewQuest> findAllByCrewAndStatus(Crew crew, List<QuestStatus> status);

    @Modifying
    @Query("UPDATE CrewQuest cq SET cq.status = :status WHERE cq.quest.period = :period")
    void updateAllStatusByPeriod(QuestPeriod period, QuestStatus status);

    @Query("""
            SELECT DISTINCT cq FROM CrewQuest cq JOIN FETCH cq.quest q
            WHERE cq.crew = :crew AND cq.status = :status AND q.title LIKE %:title%
            ORDER BY cq.createdAt DESC
            """)
    CrewQuest findCrewQuestWithCriteria(Crew crew, QuestStatus status, String title);
}
