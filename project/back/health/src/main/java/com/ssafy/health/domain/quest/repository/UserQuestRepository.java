package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.quest.entity.UserQuest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserQuestRepository extends JpaRepository<UserQuest, Long> {
}
