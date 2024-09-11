package com.ssafy.health.domain.account.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.request.*;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.UserRegisterResponseDto;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserWriteService {

    private final UserRepository userRepository;

    public UserRegisterResponseDto registerUser(UserRegisterRequestDto userRegisterRequestDto) {
        User user = User.builder()
                .userRegisterRequestDto(userRegisterRequestDto).build();

        user = userRepository.save(user);

        return UserRegisterResponseDto.builder()
                .id(user.getId())
                .sso(user.getSso())
                .role(user.getRole())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public void updateNameAndEmail(UserLoginUpdateRequestDto userLoginUpdateRequestDto) {
        User user = findUserById(userLoginUpdateRequestDto.getUserId());
        user.updateNameAndEmail(userLoginUpdateRequestDto);
    }

    public InfoSurveySuccessDto saveInfoSurvey(InfoSurveyRequestDto infoSurveyRequestDto){
        User user = findUserById(SecurityUtil.getCurrentUserId());
        user.saveUserInfo(infoSurveyRequestDto.getNickname(), infoSurveyRequestDto.getBirthday(), infoSurveyRequestDto.getGender());
        userRepository.save(user);

        return new InfoSurveySuccessDto();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

}
