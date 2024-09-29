package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import com.ssafy.health.domain.quest.entity.UserQuest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserQuestRepository extends JpaRepository<UserQuest, Long> {

    List<UserQuest> findAllByUserAndStatus(User user, QuestStatus status);
}
