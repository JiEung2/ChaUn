package com.ssafy.health.domain.crew.service;

import com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto;
import com.ssafy.health.domain.account.entity.ExerciseHistory;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.repository.ExerciseHistoryRepository;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.crew.dto.response.CrewDetailResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto.CrewInfo;
import com.ssafy.health.domain.crew.dto.response.CrewMembersResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewMembersResponseDto.CrewMemberInfo;
import com.ssafy.health.domain.crew.dto.response.CrewScoreResponseDto;
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

    private final CrewRepository crewRepository;
    private final BattleRepository battleRepository;
    private final UserCrewRepository userCrewRepository;
    private final ExerciseHistoryRepository exerciseHistoryRepository;

    public CrewListResponseDto getJoinedCrewList(Long userId) {
        List<UserCrew> userCrewList = userCrewRepository.findByUserId(userId);

        List<CrewInfo> crewList = userCrewList.stream()
                .map(userCrew -> {
                    Crew crew = userCrew.getCrew();
                    return CrewInfo.builder()
                            .crewName(crew.getName())
                            .exerciseName(crew.getExercise().getName())
                            .crewProfileImage(crew.getProfileImage())
                            .build();
                })
                .collect(Collectors.toList());

        return CrewListResponseDto.builder()
                .crewList(crewList)
                .build();
    }

    public CrewDetailResponseDto getCrewDetail(Long crewId) {
        Crew crew = findCrewById(crewId);
        Long crewRanking = getCrewRanking(crew.getActivityScore() + crew.getBasicScore());

        Object[] result = battleRepository.countTotalAndWonBattles(crewId);

        Integer totalBattlesCount= (Integer) result[0];
        Integer winCount = (Integer) result[1];

        return CrewDetailResponseDto.builder()
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
                .build();
    }

    public CrewMembersResponseDto getCrewMembers(Long crewId) {
        List<UserCrew> userCrewList = userCrewRepository.findByCrewId(crewId);

        List<Long> userIdList = userCrewList.stream()
                .map(userCrew -> userCrew.getUser().getId())
                .collect(Collectors.toList());

        Map<Long, Long> userExerciseTimes = getUsersThisWeekExerciseTime(userIdList);

        List<CrewMemberInfo> memberInfoList = userCrewList.stream()
                .map(userCrew -> {
                    User user = userCrew.getUser();

                    Long thisWeekExerciseTime = userExerciseTimes.getOrDefault(user.getId(), 0L);

                    return CrewMemberInfo.builder()
                            .userId(user.getId())
                            .userProfileImage(user.getProfileImage())
                            .nickname(user.getNickname())
                            .thisWeekExerciseTime(thisWeekExerciseTime)
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
        Crew crew = findCrewById(crewId);
        return CrewScoreResponseDto.fromEntity(crew);
    }

    private Crew findCrewById(Long crewId) {
        return crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);
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
                            .thisWeekExerciseTime(dto.getTotalExerciseTime())
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
                                .thisWeekExerciseTime(0L)
                                .build()
                ));
        return memberInfoList;
    }

    private List<UserExerciseTimeDto> getUserExerciseTimeList(Map<Long, User> userMap) {
        List<Long> userIdList = new ArrayList<>(userMap.keySet());

        LocalDateTime startTime = getStartTime();
        LocalDateTime endTime = LocalDateTime.now();

        return exerciseHistoryRepository.findUserExerciseTimes(userIdList, startTime, endTime);
    }

    private LocalDateTime getStartTime() {
        LocalDateTime now = LocalDateTime.now();

        return now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .with(LocalTime.MIN);
    }

    private Map<Long, Long> getUsersThisWeekExerciseTime(List<Long> userIdList) {
        LocalDateTime startTime = getStartTime();
        LocalDateTime endTime = LocalDateTime.now();

        List<ExerciseHistory> exerciseHistories = exerciseHistoryRepository.findByUserIdInAndExerciseStartTimeBetween(
                userIdList, startTime, endTime);

        return exerciseHistories.stream()
                .collect(Collectors.groupingBy(
                        exerciseHistory -> exerciseHistory.getUser().getId(),
                        Collectors.summingLong(ExerciseHistory::getExerciseDuration)
                ));
    }

    private Long getCrewRanking(Integer crewScore) {
        return crewRepository.countCrewsWithHigherOrEqualScore(crewScore);
    }

}
