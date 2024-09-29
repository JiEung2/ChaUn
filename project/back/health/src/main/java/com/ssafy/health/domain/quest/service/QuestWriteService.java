package com.ssafy.health.domain.quest.service;

import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.entity.Quest;
import com.ssafy.health.domain.quest.entity.QuestPeriod;
import com.ssafy.health.domain.quest.entity.QuestType;
import com.ssafy.health.domain.quest.repository.QuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestWriteService {

    private final QuestRepository questRepository;

    // 퀘스트 생성
    public Quest createQuest(QuestCreateRequestDto requestDto) {
        return questRepository.save(questBuilder(
                requestDto.getQuestType(),
                requestDto.getTitle(),
                requestDto.getQuestPeriod(),
                requestDto.getCoins()));
    }

    private Quest questBuilder(QuestType type, String title, QuestPeriod period, Integer coins) {
        return Quest.builder()
                .type(type)
                .period(period)
                .title(title)
                .completionCoins(coins)
                .build();
    }
}
