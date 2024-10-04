package com.ssafy.health.domain.crew.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.health.common.util.RequestUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.repository.FavoredRepository;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.account.service.UserReadService;
import com.ssafy.health.domain.crew.dto.analysis.*;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewAnalysisRequestService {

    private final RequestUtil requestUtil;
    private final UserRepository userRepository;
    private final UserReadService userReadService;
    private final UserCrewRepository userCrewRepository;
    private final FavoredRepository favoredRepository;
    private final CrewRepository crewRepository;

    @Value("${health.analysis.api.url}")
    private String fastApiUrl;

    @Scheduled(cron = "0 30 3 * * *")
    public void requestAnalysis() throws JsonProcessingException {

        final String apiUrl = fastApiUrl + "/users/crew-recommendation/fast-api";

        CrewAnalysisRequestDto requestDto = CrewAnalysisRequestDto.builder()
                .totalUsers(buildUserData())
                .totalCrews(buildCrewData())
                .build();

        requestUtil.sendPostRequest(apiUrl, requestDto, String.class);
    }

    private TotalUserDataDto buildUserData() {
        return TotalUserDataDto.builder()
                .users(userDataBuilder(userRepository.findALLBySurveyCompletedTrue()))
                .build();
    }

    private TotalCrewDataDto buildCrewData() {

        List<Crew> crewList = crewRepository.findAll();
        return TotalCrewDataDto.builder()
                .crews(crewList.stream()
                        .map(crew ->
                        {
                            List<User> userList = userRepository.findUserByCrewId(crew.getId());
                            List<ScoreData> userScoreList = userList.stream()
                                    .map(user -> userReadService.calculateUserScore(user.getId()))
                                    .toList();

                            return CrewData.builder()
                                    .crewId(crew.getId())
                                    .crewSports(crew.getExercise().getId())
                                    .score(calculateCrewScore(userScoreList))
                                    .build();

                        })
                        .toList())
                .build();
    }

    private List<UserData> userDataBuilder(List<User> userList) {
        return userList.stream()
                .map(user -> UserData.builder()
                        .userId(user.getId())
                        .score(userReadService.calculateUserScore(user.getId()))
                        .crewList(userCrewRepository.findByUserIdWithCrew(user.getId())
                                .stream()
                                .map(UserCrew::getId)
                                .toList())
                        .favoriteSports(favoredRepository.findAllByUserId(user.getId())
                                .stream()
                                .map(favoredExercise -> favoredExercise.getExercise().getId())
                                .toList())
                        .build())
                .toList();
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
}
