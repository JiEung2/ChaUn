package com.ssafy.health.domain.account.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.response.SurveyCompletedResponseDto;
import com.ssafy.health.domain.account.dto.response.UserDetailDto;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserReadService {

    private final UserRepository userRepository;

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

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
