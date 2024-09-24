package com.ssafy.health.domain.account.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.response.RecommendedCrewResponseDto;
import com.ssafy.health.domain.account.dto.response.SurveyCompletedResponseDto;
import com.ssafy.health.domain.account.dto.response.UserDetailDto;
import com.ssafy.health.domain.account.entity.RecommendedCrew;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.mongodb.RecommendedCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserReadService {

    private final UserRepository userRepository;
    private final RecommendedCrewRepository recommendedCrewRepository;

    public UserDetailDto getUserDetail(Long userId) {
        User user = findUserById(userId);

        return UserDetailDto.builder()
                .nickname(user.getNickname())
                .coin(user.getCoin())
                .build();
    }

    public SurveyCompletedResponseDto getSurveyCompleted() {
        User user = findUserById(SecurityUtil.getCurrentUserId());

        return SurveyCompletedResponseDto.builder()
                .surveyCompleted(user.getSurveyCompleted())
                .build();
    }

    public RecommendedCrewResponseDto getRecommendedCrew() {
        Long userId = SecurityUtil.getCurrentUserId();
        RecommendedCrew recommendedCrew = recommendedCrewRepository.findByUserId(userId);

        return RecommendedCrewResponseDto.builder()
                .userId(recommendedCrew.getUserId())
                .crewRecommend(recommendedCrew.getCrewRecommend()
                        .stream()
                        .map(crew -> RecommendedCrewResponseDto.CrewRecommendList.builder()
                                .crewId(crew.getCrewId())
                                .similarity(crew.getSimilarity())
                                .build())
                        .toList())
                .build();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
