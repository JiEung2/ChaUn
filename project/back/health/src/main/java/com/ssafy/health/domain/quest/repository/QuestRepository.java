package com.ssafy.health.domain.quest.repository;

import com.ssafy.health.domain.quest.entity.Quest;
import com.ssafy.health.domain.quest.entity.QuestPeriod;
import com.ssafy.health.domain.quest.entity.QuestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestRepository extends JpaRepository<Quest, Long> {

    List<Quest> findAllByPeriod(QuestPeriod period);

    List<Quest> findAllByType(QuestType type);

    List<Quest> findAllByTypeAndPeriod(QuestType type, QuestPeriod period);
}
