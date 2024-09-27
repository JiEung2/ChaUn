package com.ssafy.health.domain.account.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.response.SurveyCompletedResponseDto;
import com.ssafy.health.domain.account.dto.response.UserDetailDto;
import com.ssafy.health.domain.account.entity.RecommendedCrew;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.account.repository.mongodb.RecommendedCrewRepository;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.crew.service.CrewReadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserReadService {

    private final UserRepository userRepository;
    private final RecommendedCrewRepository recommendedCrewRepository;
    private final CrewReadService crewReadService;
    private final CrewRepository crewRepository;

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

    public CrewListResponseDto getRecommendedCrew() {
        Long userId = SecurityUtil.getCurrentUserId();
        RecommendedCrew recommendedCrew = recommendedCrewRepository.findByUserId(userId);

        List<Crew> crewList = recommendedCrew.getCrewRecommend().stream()
                .map(recommendList ->
                        crewRepository.findById(recommendList.getCrewId()).orElseThrow(CrewNotFoundException::new))
                .toList();
        return crewReadService.createCrewListResponseDto(crewList);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
