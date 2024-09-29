package com.ssafy.health.domain.quest.service;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.entity.Quest;
import com.ssafy.health.domain.quest.entity.QuestPeriod;
import com.ssafy.health.domain.quest.entity.QuestType;
import com.ssafy.health.domain.quest.entity.UserQuest;
import com.ssafy.health.domain.quest.repository.QuestRepository;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestWriteService {

    private final UserRepository userRepository;
    private final QuestRepository questRepository;
    private final UserQuestRepository userQuestRepository;

    // 퀘스트 생성
    public Quest createQuest(QuestCreateRequestDto requestDto) {
        return questRepository.save(questBuilder(
                requestDto.getQuestType(),
                requestDto.getTitle(),
                requestDto.getQuestPeriod(),
                requestDto.getCoins()));
    }

    // TODO: 스프링 스케줄러 사용하여 일별, 월별 퀘스트 생성
    public void createDailyQuest() {
        List<Quest> questList = questRepository.findAllByPeriod(QuestPeriod.DAILY);
        List<User> userList = userRepository.findAll();

        // 유저 퀘스트 생성
        questList.forEach(quest ->
                userList.forEach(user -> userQuestRepository.save(UserQuest.builder()
                        .quest(quest)
                        .user(user)
                        .build())));
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
