package com.ssafy.health.domain.battle.service;

import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.battle.exception.BattleNotFoundException;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.crew.entity.Crew;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BattleReadService {

    private final BattleRepository battleRepository;

    public BattleMatchResponseDto getBattleStatus(Long crewId) {
        Battle battle = findOngoingBattleByCrewId(crewId);
        Crew myCrew = getMyCrew(battle, crewId);
        Crew opponentCrew = getOpponentCrew(battle, crewId);

        return BattleMatchResponseDto.builder()
                .myCrewName(myCrew.getName())
                .myCrewScore(myCrew.getBasicScore() + myCrew.getActivityScore())
                .opponentCrewName(opponentCrew.getName())
                .opponentCrewScore(opponentCrew.getBasicScore() + opponentCrew.getActivityScore())
                .exerciseName(myCrew.getExercise().getName())
                .dDay(calculateDDay())
                .build();
    }

    private Battle findOngoingBattleByCrewId(Long crewId) {
        return battleRepository.findBattleByCrewId(crewId, BattleStatus.STARTED).orElseThrow(BattleNotFoundException::new);
    }

    private Crew getMyCrew(Battle battle, Long crewId) {
        if (battle.getHomeCrew().getId().longValue() == crewId.longValue()) {
            return battle.getHomeCrew();
        }
        return battle.getAwayCrew();
    }

    private Crew getOpponentCrew(Battle battle, Long crewId) {
        if (battle.getHomeCrew().getId().longValue() != crewId.longValue()) {
            return battle.getHomeCrew();
        }
        return battle.getAwayCrew();
    }

    private Integer calculateDDay() {
        LocalDate now = LocalDate.now();
        LocalDate lastDay = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

        return (int) ChronoUnit.DAYS.between(now, lastDay);
    }

}
