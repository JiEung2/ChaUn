package com.ssafy.health.domain.quest.service;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.coin.service.CoinService;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.entity.*;
import com.ssafy.health.domain.quest.repository.CrewQuestRepository;
import com.ssafy.health.domain.quest.repository.QuestRepository;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestWriteService {

    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final QuestRepository questRepository;
    private final UserQuestRepository userQuestRepository;
    private final CrewQuestRepository crewQuestRepository;
    private final CoinService coinService;

    // 퀘스트 생성
    public Quest createQuest(QuestCreateRequestDto requestDto) {
        return questRepository.save(questBuilder(
                requestDto.getQuestType(),
                requestDto.getTitle(),
                requestDto.getQuestPeriod(),
                requestDto.getCoins()));
    }

    // TODO: 스프링 스케줄러 사용하여 일별, 월별 퀘스트 생성
    // TODO: 주기별 퀘스트 생성 시 해당 주기에 이미 퀘스트가 생성되어 있다면 예외 처리
    public void createDailyQuest() {
        List<Quest> dailyQuestList = questRepository.findAllByPeriod(QuestPeriod.DAILY);
        List<User> userList = userRepository.findAll();
        List<Crew> crewList = crewRepository.findAll();

        dailyQuestList.forEach(quest -> {
            if (quest.getType().equals(QuestType.INDIVIDUAL)) {
                userList.forEach(user -> userQuestRepository.save(UserQuest.builder()
                        .quest(quest)
                        .user(user)
                        .build()));
            } else if (quest.getType().equals(QuestType.CREW)) {
                crewList.forEach(crew -> crewQuestRepository.save(CrewQuest.builder()
                        .quest(quest)
                        .crew(crew)
                        .build()));
            }
        });
    }

    public void createMonthlyQuest() {
        List<Quest> monthlyQuestList = questRepository.findAllByPeriod(QuestPeriod.MONTHLY);
        List<User> userList = userRepository.findAll();
        List<Crew> crewList = crewRepository.findAll();

        // 퀘스트 생성
        monthlyQuestList.forEach(quest -> {
            if (quest.getType().equals(QuestType.INDIVIDUAL)) {
                userList.forEach(user -> userQuestRepository.save(UserQuest.builder()
                        .quest(quest)
                        .user(user)
                        .build()));
            } else if (quest.getType().equals(QuestType.CREW)) {
                crewList.forEach(crew -> crewQuestRepository.save(CrewQuest.builder()
                        .quest(quest)
                        .crew(crew)
                        .build()));
            }
        });
    }

    public void updateUserQuestStatus(User user, String title, QuestStatus status) {
        UserQuest quest = userQuestRepository.findUserQuestWithCriteria(user, status, title);
        if (quest != null) {
            quest.updateStatus(QuestStatus.COMPLETED);
            coinService.grantCoinsToUser(user, quest.getQuest().getCompletionCoins());
        }

        // TODO: 알림 생성 및 전송
    }

    public void updateCrewQuestStatus(Crew crew, String title, QuestStatus status) {
        CrewQuest quest = crewQuestRepository.findCrewQuestWithCriteria(crew, status, title);
        if (quest != null) {
            quest.updateStatus(QuestStatus.COMPLETED);
            coinService.grantCoinsToCrew(crew, quest.getQuest().getCompletionCoins());
        }

        // TODO: 알림 생성 및 전송
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
