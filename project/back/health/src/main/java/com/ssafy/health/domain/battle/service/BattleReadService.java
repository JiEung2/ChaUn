package com.ssafy.health.domain.battle.service;

import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.crew.entity.Crew;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BattleReadService {

    private final BattleRepository battleRepository;

    public BattleMatchResponseDto getBattleStatus(Long crewId) {
        Optional<Battle> battle = battleRepository.findBattleByCrewId(crewId, BattleStatus.STARTED);

        if (battle.isEmpty()) {
            return createEmptyBattleResponse();
        }

        Crew myCrew = getMyCrew(battle.get(), crewId);
        Crew opponentCrew = getOpponentCrew(battle.get(), crewId);

        return BattleMatchResponseDto.builder()
                .myCrewName(myCrew.getName())
                .myCrewScore(myCrew.getBasicScore() + myCrew.getActivityScore())
                .opponentCrewName(opponentCrew.getName())
                .opponentCrewScore(opponentCrew.getBasicScore() + opponentCrew.getActivityScore())
                .exerciseName(myCrew.getExercise().getName())
                .battleStatus(battle.get().getStatus())
                .dDay(calculateDDay())
                .build();
    }

    private BattleMatchResponseDto createEmptyBattleResponse(){
        return BattleMatchResponseDto.builder()
                .myCrewName("No Battle")
                .myCrewScore(0)
                .opponentCrewName("No Opponent")
                .opponentCrewScore(0)
                .exerciseName("N/A")
                .battleStatus(BattleStatus.NONE)
                .dDay(0)
                .build();
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