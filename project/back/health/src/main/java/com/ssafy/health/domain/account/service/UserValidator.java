package com.ssafy.health.domain.account.service;

import com.ssafy.health.domain.account.dto.response.ValidateNameSuccessDto;
import com.ssafy.health.domain.account.exception.NameDuplicateException;
import com.ssafy.health.domain.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserValidator {

    private final UserRepository userRepository;

    public ValidateNameSuccessDto validateNickname(String nickname) {
        if(userRepository.existsByNickname(nickname)) throw new NameDuplicateException();
        return new ValidateNameSuccessDto();
    }
}
