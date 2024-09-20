package com.ssafy.health.domain.battle.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.coin.CoinCost;
import com.ssafy.health.domain.coin.service.CoinService;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BattleWriteService {
    // TODO: 배틀을 할 때 상대 팀의 코인도 고려해줘야함
    // TODO: 각 메서드 간의 결합도를 낮춰야할 것처럼 보임

    private final BattleRepository battleRepository;
    private final CrewRepository crewRepository;
    private final CoinService coinService;

    public BattleMatchResponseDto startBattle(Long crewId) {
        coinService.spendCoins(SecurityUtil.getCurrentUserId(), CoinCost.START_BATTLE.getAmount());
        Float myCrewScore = findRecentBattleScore(crewId);
        Crew opponentCrew = findOpponentCrew(crewId, myCrewScore);
        Crew myCrew = crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);

        Battle.builder()
                .homeCrew(myCrew)
                .awayCrew(opponentCrew)
                .build();

        return BattleMatchResponseDto.builder()
                .exercise(myCrew.getExercise())
                .myTeamName(myCrew.getName())
                .myTeamScore(0F)
                .opponentTeamName(opponentCrew.getName())
                .opponentTeamScore(0F)
                .dDay(calculateDDay())
                .build();
    }

    private Integer calculateDDay() {
        LocalDate now = LocalDate.now();
        LocalDate lastDay = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

        return (int) ChronoUnit.DAYS.between(now, lastDay);
    }

    private Crew findOpponentCrew(Long crewId, Float myCrewScore) {
        List<Battle> recentBattleList = findRecentBattlesForAvailableCrews();

        Crew closestCrew = null;
        Float smallestDifference = Float.MAX_VALUE;

        for (Battle battle : recentBattleList) {
            Crew opponentCrew = (battle.getHomeCrew().getId().longValue() == crewId) ? battle.getAwayCrew() : battle.getHomeCrew();
            Float opponentScore = (battle.getHomeCrew().getId().longValue() == crewId) ? battle.getAwayCrewScore() : battle.getHomeCrewScore();
            Float scoreDifference = Math.abs(myCrewScore - opponentScore);

            if (scoreDifference < smallestDifference) {
                smallestDifference = scoreDifference;
                closestCrew = opponentCrew;
            }
        }

        return closestCrew;
    }

    private Float findRecentBattleScore(Long crewId) {
        Optional<Battle> battle = battleRepository.findFirstByCrewIdOrderByCreatedAtDesc(crewId);
        return battle.map(b -> b.getHomeCrew().getId().longValue() == crewId ? b.getHomeCrewScore(): b.getAwayCrewScore())
                .orElse(0F);
    }

    private List<Battle> findRecentBattlesForAvailableCrews() {
        List<Crew> availableCrews = crewRepository.findAvailableCrews();

        List<Long> crewIds = availableCrews.stream()
                .map(Crew::getId)
                .collect(Collectors.toList());

        return battleRepository.findMostRecentFinishedBattleByCrewIdList(crewIds);
    }

}
