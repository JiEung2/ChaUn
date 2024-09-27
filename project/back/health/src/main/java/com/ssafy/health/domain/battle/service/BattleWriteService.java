package com.ssafy.health.domain.battle.service;

import com.ssafy.health.domain.battle.dto.response.BattleAndCrewDto;
import com.ssafy.health.domain.battle.dto.response.BattleMatchResponseDto;
import com.ssafy.health.domain.battle.entity.Battle;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.coin.service.CoinService;
import com.ssafy.health.domain.coin.service.CoinValidator;
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
import java.util.*;

import static com.ssafy.health.domain.coin.CoinCost.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BattleWriteService {

    private final BattleRepository battleRepository;
    private final BattleValidator battleValidator;
    private final CrewRepository crewRepository;
    private final CoinService coinService;
    private final CoinValidator coinValidator;

    public BattleMatchResponseDto startBattle(Long crewId) {
        battleValidator.validateBattleAlreadyExists(crewId);

        Crew myCrew = crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);
        coinValidator.validateSufficientCoins(myCrew.getCrewCoin(), START_BATTLE.getAmount());

        Float myCrewScore = findRecentBattleScore(crewId);
        Crew opponentCrew = findOpponentCrew(crewId, myCrewScore);

        coinService.spendCrewCoins(myCrew, START_BATTLE.getAmount());
        coinService.spendCrewCoins(opponentCrew, START_BATTLE.getAmount());

        battleRepository.save(Battle.builder()
                .homeCrew(myCrew)
                .awayCrew(opponentCrew)
                .build());

        return BattleMatchResponseDto.builder()
                .exerciseName(myCrew.getExercise().getName())
                .myCrewName(myCrew.getName())
                .myCrewScore(0F)
                .opponentCrewName(opponentCrew.getName())
                .opponentCrewScore(0F)
                .dDay(calculateDDay())
                .build();
    }

    private Integer calculateDDay() {
        LocalDate now = LocalDate.now();
        LocalDate lastDay = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

        return (int) ChronoUnit.DAYS.between(now, lastDay) - 1;
    }

    private Crew findOpponentCrew(Long crewId, Float myCrewScore) {
        List<BattleAndCrewDto> recentBattleList = findRecentBattlesForAvailableCrews(crewId);
        return getClosestCrew(myCrewScore, recentBattleList);
    }

    private static Crew getClosestCrew(Float myCrewScore, List<BattleAndCrewDto> recentBattleList) {
        Crew closestCrew = null;
        float smallestDifference = Float.MAX_VALUE;

        for (BattleAndCrewDto dto : recentBattleList) {
            Battle battle = dto.getBattle();

            if (battle == null) {
                continue;
            }
            Crew crew = dto.getCrew();

            Float crewScore = battle.getHomeCrew().equals(dto.getCrew()) ?
                    battle.getHomeCrewScore() :
                    battle.getAwayCrewScore();

            float scoreDifference = Math.abs(myCrewScore - crewScore);

            if (scoreDifference < smallestDifference) {
                smallestDifference = scoreDifference;
                closestCrew = crew;
            }
        }

        if (closestCrew == null && !recentBattleList.isEmpty()) {
            Random random = new Random();
            closestCrew = recentBattleList.get(random.nextInt(recentBattleList.size())).getCrew();
        }
        return closestCrew;
    }

    private Float findRecentBattleScore(Long crewId) {
        Optional<Battle> battle = battleRepository.findFirstByHomeCrewIdOrAwayCrewIdOrderByCreatedAtDesc(crewId, crewId);
        return battle.map(b -> b.getHomeCrew().getId().longValue() == crewId ? b.getHomeCrewScore(): b.getAwayCrewScore())
                .orElse(0F);
    }

    private List<BattleAndCrewDto> findRecentBattlesForAvailableCrews(Long crewId) {
        List<Crew> availableCrews = crewRepository.findBattleReadyCrews(crewId);
        List<BattleAndCrewDto> battleAndCrewDtoList = new ArrayList<>();

        for (Crew crew : availableCrews) {
            Optional<Battle> findBattle = battleRepository.findFirstByHomeCrewOrAwayCrewOrderByCreatedAtDesc(crew, crew);

            findBattle.ifPresentOrElse(battle ->{
                Crew currentCrew = battle.getAwayCrew().equals(crew) ? battle.getAwayCrew() : battle.getHomeCrew();
                battleAndCrewDtoList.add(new BattleAndCrewDto(currentCrew, battle));
            }, () ->{

                battleAndCrewDtoList.add(new BattleAndCrewDto(crew, null));
            });
        }

        for (BattleAndCrewDto dto : battleAndCrewDtoList) {
            System.out.println(dto.getCrew().getId());
            if (dto.getBattle() == null) continue;
            System.out.println(dto.getBattle().getCreatedAt());
        }

        return battleAndCrewDtoList;
    }

}
