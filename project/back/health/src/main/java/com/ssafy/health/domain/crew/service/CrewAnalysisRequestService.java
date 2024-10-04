package com.ssafy.health.domain.crew.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.common.util.RequestUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.repository.FavoredRepository;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.account.service.UserReadService;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.body.BodyType.service.BodyTypeReadService;
import com.ssafy.health.domain.crew.dto.analysis.CrewAnalysisRequestDto;
import com.ssafy.health.domain.crew.dto.analysis.TotalCrewDataDto;
import com.ssafy.health.domain.crew.dto.analysis.TotalUserDataDto;
import com.ssafy.health.domain.crew.dto.analysis.UserData;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final BodyTypeReadService bodyTypeReadService;
    private final BodyHistoryRepository bodyHistoryRepository;
    private final FavoredRepository favoredRepository;

    @Value("${health.analysis.api.url}")
    private String fastApiUrl;

    private String apiBaseUrlBuilder() {
        Long userId = SecurityUtil.getCurrentUserId();
        return fastApiUrl + "/users/" + userId.toString() + "/body/prediction";
    }

    public void requestAnalysis() throws JsonProcessingException {

        final String apiUrl = apiBaseUrlBuilder();

        CrewAnalysisRequestDto requestDto = CrewAnalysisRequestDto.builder()
                .totalUsers(buildUserData())
                .totalCrews(buildCrewData())
                .build();

        requestUtil.sendPostRequest(apiUrl, requestDto, String.class);
    }

    private TotalUserDataDto buildUserData() {

        List<User> userList = userRepository.findALLBySurveyCompletedTrue();
        return TotalUserDataDto.builder()
                .users(userList.stream()
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
                        .toList())
                .build();
    }

    private TotalCrewDataDto buildCrewData() {

        return TotalCrewDataDto.builder().build();
    }
}
