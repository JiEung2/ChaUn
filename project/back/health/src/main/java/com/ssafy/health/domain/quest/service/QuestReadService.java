package com.ssafy.health.domain.quest.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.quest.dto.response.QuestResponseDto;
import com.ssafy.health.domain.quest.entity.*;
import com.ssafy.health.domain.quest.repository.CrewQuestRepository;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestReadService {

    private final UserRepository userRepository;
    private final UserQuestRepository userQuestRepository;
    private final CrewQuestRepository crewQuestRepository;
    private final CrewRepository crewRepository;

    public List<QuestResponseDto> getAchievableQuest(QuestType type, Long crewId) {

        List<QuestStatus> questStatus = Arrays.asList(QuestStatus.CREATED, QuestStatus.COMPLETED);

        if (type.equals(QuestType.INDIVIDUAL)) {
            List<UserQuest> questList = userQuestRepository.findAllByUserAndStatus(
                    findUserById(SecurityUtil.getCurrentUserId()), questStatus);
            return questList.stream()
                    .map(quest -> createQuestResponseDto(quest.getId(), quest.getQuest().getTitle(),
                            quest.getQuest().getPeriod(), quest.getStatus()))
                    .toList();
        } else if (type.equals(QuestType.CREW)) {
            List<CrewQuest> questList = crewQuestRepository.findAllByCrewAndStatus(
                    findCrewById(crewId), questStatus);
            return questList.stream()
                    .map(quest -> createQuestResponseDto(quest.getId(), quest.getQuest().getTitle(),
                            quest.getQuest().getPeriod(), quest.getStatus()))
                    .toList();
        }
        return Collections.emptyList();
    }

    private QuestResponseDto createQuestResponseDto(Long id, String title, QuestPeriod period, QuestStatus status) {
        return QuestResponseDto.builder()
                .questId(id)
                .title(title)
                .questPeriod(period)
                .isCompleted(status.equals(QuestStatus.COMPLETED))
                .build();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    private Crew findCrewById(Long crewId) {
        return crewRepository.findByIdWithOptimisticLock(crewId);
    }
}
