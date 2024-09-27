package com.ssafy.health.domain.crew.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.battle.dto.response.BattleStatsDto;
import com.ssafy.health.domain.crew.dto.response.*;
import com.ssafy.health.domain.crew.entity.CrewRole;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto.CrewInfo;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewReadService {

    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final BattleRepository battleRepository;
    private final UserCrewRepository userCrewRepository;
    private final ExerciseHistoryRepository exerciseHistoryRepository;

    public CrewListResponseDto getJoinedCrewList(Long userId) {
        List<UserCrew> userCrewList = userCrewRepository.findByUserIdWithCrew(userId);

        List<CrewInfo> crewList = userCrewList.stream()
                .map(userCrew -> createCrewInfo(userCrew.getCrew()))
                .collect(Collectors.toList());

        return CrewListResponseDto.builder()
                .crewList(crewList)
                .build();
    }

    public CrewDetailResponseDto getCrewDetail(Long crewId) {
        Crew crew = crewRepository.findCrewWithExerciseById(crewId).orElseThrow(CrewNotFoundException::new);
        Long crewRanking = getCrewRanking(crew.getActivityScore() + crew.getBasicScore());

        Optional<BattleStatsDto> battleStats = battleRepository.countTotalAndWonBattles(crewId);

        Long totalBattlesCount = battleStats.get().totalBattles();
        Long winCount = battleStats.get().wonBattles();

        CrewRole crewRole = getCrewRole(crewId);

        return CrewDetailResponseDto.builder()
                .crewId(crewId)
                .crewName(crew.getName())
                .exerciseName(crew.getExercise().getName())
                .profileImage(crew.getProfileImage())
                .description(crew.getDescription())
                .crewCoins(crew.getCrewCoin())
                .averageAge(crew.getAverageAge())
                .activityScore(crew.getActivityScore())
                .basicScore(crew.getBasicScore())
                .crewRanking(crewRanking)
                .totalBattlesCount(totalBattlesCount)
                .winCount(winCount)
                .role(crewRole)
                .build();
    }

    public CrewMembersResponseDto getCrewMembers(Long crewId) {
        List<UserCrew> userCrewList = userCrewRepository.findByCrewId(crewId);

        List<Long> userIdList = userCrewList.stream()
                .map(userCrew -> userCrew.getUser().getId())
                .collect(Collectors.toList());

        Map<Long, Long> userExerciseTimes = getMembersThisWeekExerciseTime(userIdList);

        List<CrewMemberInfo> memberInfoList = userCrewList.stream()
                .map(userCrew -> {
                    User user = userCrew.getUser();

                    Long thisWeekExerciseTime = userExerciseTimes.getOrDefault(user.getId(), 0L);

                    return CrewMemberInfo.builder()
                            .userId(user.getId())
                            .userProfileImage(user.getProfileImage())
                            .nickname(user.getNickname())
                            .exerciseTime(thisWeekExerciseTime)
                            .build();
                })
                .collect(Collectors.toList());

        return CrewMembersResponseDto.builder()
                .memberList(memberInfoList)
                .build();
    }

    public CrewMembersResponseDto getCrewMemberRanking(Long crewId) {
        List<UserCrew> userCrewList = userCrewRepository.findByCrewId(crewId);

        Map<Long, User> userMap = userCrewList.stream()
                .collect(Collectors.toMap(UserCrew::getId, UserCrew::getUser));

        List<UserExerciseTimeDto> userExerciseTimeList = getUserExerciseTimeList(userMap);

        List<CrewMemberInfo> memberInfoList = getCrewMemberInfoList(userExerciseTimeList, userMap, userCrewList);

        return CrewMembersResponseDto.builder()
                .memberList(memberInfoList)
                .build();
    }

    public CrewScoreResponseDto getCrewScore(Long crewId) {
        List<UserCrew> userCrewList = userCrewRepository.findByCrewId(crewId);
        Float totalBasicScore = 0F;
        Float totalActivityScore = 0F;

        for (UserCrew userCrew : userCrewList) {
            totalBasicScore += userCrew.getBasicScore();
            totalActivityScore += userCrew.getActivityScore();
        }

        return CrewScoreResponseDto.builder()
                .basicScore(totalBasicScore)
                .activityScore(totalActivityScore)
                .build();
    }

    public CrewListResponseDto getCrewRankingByExercise(Long exerciseId) {
        List<Crew> crewList = crewRepository.findByExerciseIdOrderByTotalScoreDesc(exerciseId);

        if (crewList.isEmpty()) {
            return CrewListResponseDto.builder().crewList(Collections.emptyList()).build();
        }
        return createCrewListResponseDto(crewList);
    }

    public CrewMemberDailyExerciseTimeListDto getCrewMemberDailyExerciseTimeList(Long crewId) {
        List<User> crewMemberList = userRepository.findUserByCrewId(crewId);
        List<Long> crewMemberIdList = crewMemberList.stream()
                        .map(User::getId).toList();

        Map<Long, Long> userExerciseTimeMap = getMembersTodayExerciseTime(crewMemberIdList);

        List<CrewMemberDailyExerciseTime> exerciseTimeList = createCrewDailyExerciseTimeDto(crewMemberList, userExerciseTimeMap);

        return CrewMemberDailyExerciseTimeListDto.builder()
                .exerciseTimeList(exerciseTimeList)
                .build();
    }

    private static List<CrewMemberInfo> getCrewMemberInfoList(List<UserExerciseTimeDto> userExerciseTimeList, Map<Long, User> userMap, List<UserCrew> userCrewList) {
        Set<Long> processedUserIdList = new HashSet<>();

        List<CrewMemberInfo> memberInfoList = userExerciseTimeList.stream()
                .map(dto -> {
                    User user = userMap.get(dto.getUserId());
                    processedUserIdList.add(dto.getUserId());
                    return CrewMemberInfo.builder()
                            .userId(user.getId())
                            .userProfileImage(user.getProfileImage())
                            .nickname(user.getNickname())
                            .exerciseTime(dto.getTotalExerciseTime())
                            .build();
                })
                .collect(Collectors.toList());

        userCrewList.stream()
                .map(UserCrew::getUser)
                .filter(user -> !processedUserIdList.contains(user.getId()))
                .forEach(user -> memberInfoList.add(
                        CrewMemberInfo.builder()
                                .userId(user.getId())
                                .userProfileImage(user.getProfileImage())
                                .nickname(user.getNickname())
                                .exerciseTime(0L)
                                .build()
                ));
        return memberInfoList;
    }

    private List<UserExerciseTimeDto> getUserExerciseTimeList(Map<Long, User> userMap) {
        List<Long> userIdList = new ArrayList<>(userMap.keySet());

        LocalDateTime startTime = getStartOfWeek();
        LocalDateTime endTime = LocalDateTime.now();

        return exerciseHistoryRepository.findUserExerciseTimes(userIdList, startTime, endTime);
    }

    private LocalDateTime getStartOfWeek() {
        LocalDateTime now = LocalDateTime.now();

        return now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .with(LocalTime.MIN);
    }

    private Map<Long, Long> getMembersThisWeekExerciseTime(List<Long> userIdList) {
        LocalDateTime startTime = getStartOfWeek();
        LocalDateTime endTime = LocalDateTime.now();

        List<Object[]> results = exerciseHistoryRepository.findUserExerciseDurationSumByUserIdInAndCreatedAtBetween(
                userIdList, startTime, endTime);

        return results.stream()
                .collect(Collectors.toMap(
                        result -> (Long) result[0],
                        result -> (Long) result[1]
                ));
    }

    private Map<Long, Long> getMembersTodayExerciseTime(List<Long> userIdList) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = now.toLocalDate().atStartOfDay();

        List<Object[]> results = exerciseHistoryRepository.findUserExerciseDurationSumByUserIdInAndCreatedAtBetween(
                userIdList, startTime, now);

        return results.stream()
                .collect(Collectors.toMap(
                        result -> (Long) result[0],
                        result -> (Long) result[1]
                ));
    }

    private Long getCrewRanking(Float crewScore) {
        return crewRepository.countCrewsWithHigherOrEqualScore(crewScore);
    }

    private CrewRole getCrewRole(Long crewId) {
        return userCrewRepository.findByCrewIdAndUserId(crewId, SecurityUtil.getCurrentUserId())
                .map(UserCrew::getRole)
                .orElse(CrewRole.NOT_REGISTERED);
    }

    private CrewListResponseDto createCrewListResponseDto(List<Crew> crewList) {
        List<CrewInfo> crewInfoList = crewList.stream()
                .map(this::createCrewInfo)  // 위에서 정의한 createCrewInfo 사용
                .collect(Collectors.toList());

        return CrewListResponseDto.builder()
                .crewList(crewInfoList)
                .build();
    }

    private CrewInfo createCrewInfo(Crew crew) {
        return CrewInfo.builder()
                .crewId(crew.getId())
                .crewName(crew.getName())
                .crewProfileImage(crew.getProfileImage())
                .exerciseName(crew.getExercise().getName())
                .basicScore(crew.getBasicScore())
                .activityScore(crew.getActivityScore())
                .build();
    }

    private static List<CrewMemberDailyExerciseTime> createCrewDailyExerciseTimeDto(List<User> crewMemberList, Map<Long, Long> userExerciseTimeMap) {
        return crewMemberList.stream()
                .map(user -> {
                    Long exerciseTime = userExerciseTimeMap.getOrDefault(user.getId(), 0L);

                    return CrewMemberDailyExerciseTime.builder()
                            .userId(user.getId())
                            .nickname(user.getNickname())
                            .exerciseTime(exerciseTime)
                            .build();
                })
                .collect(Collectors.toList());
    }

}
