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

    private final BattleRepository battleRepository;
    private final CrewRepository crewRepository;
    private final CoinService coinService;

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
