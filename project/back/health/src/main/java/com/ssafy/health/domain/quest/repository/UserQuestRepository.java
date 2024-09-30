package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import com.ssafy.health.domain.quest.entity.UserQuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserQuestRepository extends JpaRepository<UserQuest, Long> {

    @Query("SELECT q FROM UserQuest q WHERE q.user = :user AND q.status IN :status")
    List<UserQuest> findAllByUserAndStatus(User user, List<QuestStatus> status);
}
