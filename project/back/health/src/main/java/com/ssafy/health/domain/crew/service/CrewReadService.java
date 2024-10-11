package com.ssafy.health.domain.crew.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.battle.dto.response.BattleStatsDto;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictWriteService;
import com.ssafy.health.domain.body.BodyType.service.BodyTypeReadService;
import com.ssafy.health.domain.character.entity.Character;
import com.ssafy.health.domain.character.respository.CharacterSetRepository;
import com.ssafy.health.domain.crew.dto.analysis.CrewData;
import com.ssafy.health.domain.crew.dto.analysis.MaxScoresDto;
import com.ssafy.health.domain.crew.dto.analysis.ScoreData;
import com.ssafy.health.domain.crew.dto.response.*;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto.CrewInfo;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.entity.CrewRole;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.exercise.exception.ExerciseNotFoundException;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import com.ssafy.health.domain.recommendation.dto.response.RecommendedCrewResponseDto;
import com.ssafy.health.domain.recommendation.dto.response.ScoreDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewReadService {

    private final CrewValidator crewValidator;
    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final BattleRepository battleRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserCrewRepository userCrewRepository;
    private final CharacterSetRepository characterSetRepository;
    private final ExerciseHistoryRepository exerciseHistoryRepository;
    private final BodyHistoryRepository bodyHistoryRepository;
    private final BodyPredictWriteService bodyPredictWriteService;
    private final BodyTypeReadService bodyTypeReadService;

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

        Long totalBattlesCount = 0L;
        Long winCount = 0L;

        if (battleStats.isPresent()) {
            totalBattlesCount = battleStats.get().totalBattles();
            winCount = battleStats.get().wonBattles();
        }

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

    public RecommendedCrewResponseDto getRecommendCrewDetail(Long crewId) {
        Crew crew = crewRepository.findCrewWithExerciseById(crewId).orElseThrow(CrewNotFoundException::new);
        Long crewRanking = getCrewRanking(crew.getActivityScore() + crew.getBasicScore());
        CrewData crewData = buildCrewData(crew);

        return RecommendedCrewResponseDto.builder()
                .crewId(crewId)
                .crewName(crew.getName())
                .exerciseName(crew.getExercise().getName())
                .description(crew.getDescription())
                .crewProfileImage(crew.getProfileImage())
                .crewCoins(crew.getCrewCoin())
                .crewRanking(crewRanking)
                .averageAge(crewData.getScore().getAge())
                .averageBodyType(
                        (crewData.getScore().getMType() + crewData.getScore().getType()) / 2)
                .activityScore(crewData.getScore().getActivityScore())
                .basicScore(crewData.getScore().getBasicScore())
                .intakeScore(crewData.getScore().getIntakeScore())
                .build();
    }

    private CrewData buildCrewData(Crew crew) {

        List<User> userList = userRepository.findUserByCrewId(crew.getId());
        List<ScoreData> userScoreList = userList.stream()
                .map(user -> calculateUserScore(user.getId()))
                .toList();

        Long crewId = crew.getId();
        Exercise crewSports = crew.getExercise();
        ScoreData score = calculateCrewScore(userScoreList);

        return CrewData.builder()
                .crewId(crewId)
                .crewSports(crewSports.getId())
                .score(score)
                .build();
    }

    private ScoreData calculateUserScore(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        BodyHistory bodyHistory = bodyHistoryRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElse(null);
        int age = bodyPredictWriteService.calculateAge(user.getBirthday());
        float bodyType = bodyTypeReadService.bodyTypeCoverter(bodyHistory.getBodyType());

        MaxScoresDto scoresDto = userCrewRepository.findMaxScoresByUserId(userId);

        return ScoreData.builder()
                .mType(bodyType > 6 ? bodyType : 0)
                .type(bodyType > 6 ? 0 : bodyType)
                .age(age)
                .basicScore(scoresDto.getBasicScore())
                .activityScore(scoresDto.getActivityScore())
                .intakeScore((float) user.getDailyCaloricIntake())
                .build();
    }

    private ScoreData calculateCrewScore(List<ScoreData> scoreDataList) {

        int userCount = scoreDataList.size();

        float totalMType = 0;
        float totalType = 0;
        int totalAge = 0;
        float totalBasicScore = 0;
        float totalActivityScore = 0;
        float totalIntakeScore = 0;

        for (ScoreData scoreData : scoreDataList) {
            totalMType += scoreData.getMType();
            totalType += scoreData.getType();
            totalAge += scoreData.getAge();
            totalBasicScore += scoreData.getBasicScore();
            totalActivityScore += scoreData.getActivityScore();
            totalIntakeScore += scoreData.getIntakeScore();
        }

        return ScoreData.builder()
                .mType(totalMType / userCount)
                .type(totalType / userCount)
                .age(Math.round((float) totalAge / userCount))
                .basicScore(totalBasicScore / userCount)
                .activityScore(totalActivityScore / userCount)
                .intakeScore(totalIntakeScore / userCount)
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
        Crew crew = crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);

        return CrewScoreResponseDto.builder()
                .basicScore(crew.getBasicScore())
                .activityScore(crew.getActivityScore())
                .build();
    }

    public CrewListResponseDto getCrewRankingByExercise(Long exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(ExerciseNotFoundException::new);
        List<Crew> crewList = crewRepository.findByExerciseIdOrderByTotalScoreDesc(exerciseId);

        if (crewList.isEmpty()) {
            return CrewListResponseDto.builder().crewList(Collections.emptyList()).build();
        }
        return createCrewListResponseDto(crewList, exercise);
    }

    public CrewMemberDailyDetailListDto getCrewMemberDailyDetailList(Long crewId) {
        List<User> crewMemberList = userRepository.findUserByCrewId(crewId);
        List<Long> crewMemberIdList = crewMemberList.stream()
                .map(User::getId).toList();

        Map<Long, Long> userExerciseTimeMap = getMembersTodayExerciseTime(crewMemberIdList);
        Map<Long, Character> memberCharacter = getMembersCharacter(crewMemberIdList);

        List<CrewMemberDailyDetail> crewMemberDailyDetailList = createCrewDailyDetailDto(crewMemberList, userExerciseTimeMap, memberCharacter);

        return CrewMemberDailyDetailListDto.builder()
                .crewMemberDailyDetailList(crewMemberDailyDetailList)
                .build();
    }

    public CrewSettingResponseDto getCrewSetting(Long crewId) {
        crewValidator.validateCrewLeader(crewId);
        Crew crew = crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);
        return CrewSettingResponseDto.builder().battleStatus(crew.getBattleStatus()).build();
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

    private Map<Long, Character> getMembersCharacter(List<Long> crewMemberIdList) {
        List<Object[]> results = characterSetRepository.findCharacterByUserIdIn(crewMemberIdList);
        return results.stream()
                .collect(Collectors.toMap(
                        result -> (Long) result[0],
                        result -> (Character) result[1]
                ));
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

    public CrewListWithUserScoreResponseDto createCrewListResponseDto(
            ScoreDataDto userScore, List<Crew> crewList) {

        List<CrewListWithUserScoreResponseDto.CrewRecommendInfo> crewRecommendInfoList = crewList.stream()
                .map(this::createCrewRecommendInfo)
                .toList();

        return CrewListWithUserScoreResponseDto.builder()
                .userScore(userScore)
                .crewList(crewRecommendInfoList)
                .build();
    }

//    public RecommendedCrewResponseDto createCrewListResponseDto(RecommendedCrew recommendedCrew) {
//
//        ScoreDataDto userScore = ScoreDataDto.builder()
//                .basicScore(recommendedCrew.getUserScore().getBasicScore())
//                .activityScore(recommendedCrew.getUserScore().getActivityScore())
//                .intakeScore(recommendedCrew.getUserScore().getIntakeScore())
//                .build();
//
//        List<RecommendedCrewInfoDto> recommendedCrewList = recommendedCrew.getCrewRecommend().stream().map(crewInfo -> {
//                    Crew crew = crewRepository.findById(crewInfo.getCrewId()).orElseThrow(CrewNotFoundException::new);
//                    return RecommendedCrewInfoDto.builder()
//                            .crewId(crew.getId())
//                            .crewDetail(RecommendedCrewInfoDto.CrewDetail.builder()
//                                    .name(crew.getName())
//                                    .description(crew.getDescription())
//                                    .profileImage(crew.getProfileImage())
//                                    .exerciseName(crew.getExercise().getName())
//                                    .build())
//                            .crewScore(ScoreDataDto.builder()
//                                    .basicScore(crewInfo.getCrewScore().getBasicScore())
//                                    .activityScore(crewInfo.getCrewScore().getActivityScore())
//                                    .intakeScore(crewInfo.getCrewScore().getIntakeScore())
//                                    .build())
//                            .build();
//                })
//                .toList();
//
//        return RecommendedCrewResponseDto.builder()
//                .userId(recommendedCrew.getUserId())
//                .userScore(userScore)
//                .crewRecommend(recommendedCrewList)
//                .build();
//    }

    public CrewListResponseDto createCrewListResponseDto(List<Crew> crewList, Exercise exercise) {
        List<CrewInfo> crewInfoList = crewList.stream()
                .map(crew -> CrewInfo.builder()
                        .crewId(crew.getId())
                        .crewName(crew.getName())
                        .crewProfileImage(crew.getProfileImage())
                        .exerciseName(exercise.getName())
                        .basicScore(crew.getBasicScore())
                        .activityScore(crew.getActivityScore())
                        .build())
                .toList();

        return CrewListResponseDto.builder()
                .crewList(crewInfoList)
                .build();
    }

    public CrewListWithUserScoreResponseDto.CrewRecommendInfo createCrewRecommendInfo(Crew crew) {
        return CrewListWithUserScoreResponseDto.CrewRecommendInfo.builder()
                .crewId(crew.getId())
                .crewName(crew.getName())
                .crewProfileImage(crew.getProfileImage())
                .exerciseName(crew.getExercise().getName())
                .build();
    }

    public CrewInfo createCrewInfo(Crew crew) {
        return CrewInfo.builder()
                .crewId(crew.getId())
                .crewName(crew.getName())
                .crewProfileImage(crew.getProfileImage())
                .exerciseName(crew.getExercise().getName())
                .basicScore(crew.getBasicScore())
                .activityScore(crew.getActivityScore())
                .build();
    }

    private static List<CrewMemberDailyDetail> createCrewDailyDetailDto(List<User> crewMemberList, Map<Long, Long> userExerciseTimeMap, Map<Long, Character> memberCharacter) {
        return crewMemberList.stream()
                .map(user -> {
                    Long exerciseTime = userExerciseTimeMap.getOrDefault(user.getId(), 0L);
                    Character character = memberCharacter.get(user.getId());

                    return CrewMemberDailyDetail.builder()
                            .userId(user.getId())
                            .nickname(user.getNickname())
                            .exerciseTime(exerciseTime)
                            .characterImageUrl(character.getCharacterImage())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
