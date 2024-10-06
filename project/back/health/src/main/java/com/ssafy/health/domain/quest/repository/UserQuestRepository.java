package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.quest.entity.QuestPeriod;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import com.ssafy.health.domain.quest.entity.UserQuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserQuestRepository extends JpaRepository<UserQuest, Long> {

    @Query("SELECT q FROM UserQuest q WHERE q.user = :user AND q.status IN :status")
    List<UserQuest> findAllByUserAndStatus(User user, List<QuestStatus> status);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE UserQuest uq SET uq.status = :status WHERE uq.quest.period = :period")
    void updateAllStatusByPeriod(QuestPeriod period, QuestStatus status);

    @Query("""
            SELECT DISTINCT uq FROM UserQuest uq JOIN FETCH uq.quest q
            WHERE uq.user = :user AND uq.status = :status AND q.title LIKE %:title%
            ORDER BY uq.createdAt DESC
            """)
    UserQuest findUserQuestWithCriteria(User user, QuestStatus status, String title);
}
