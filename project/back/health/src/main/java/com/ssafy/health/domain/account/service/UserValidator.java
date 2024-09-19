package com.ssafy.health.domain.account.service;

import com.ssafy.health.domain.account.dto.response.ValidateNicknameSuccessDto;
import com.ssafy.health.domain.account.exception.InsufficientCoinsException;
import com.ssafy.health.domain.account.exception.NicknameDuplicateException;
import com.ssafy.health.domain.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserValidator {

    private final UserRepository userRepository;

    public ValidateNicknameSuccessDto validateNickname(String nickname) {
        if(userRepository.existsByNickname(nickname)) throw new NicknameDuplicateException();
        return new ValidateNicknameSuccessDto();
    }

    public void validateSufficientCoins(Integer userCoin, Integer coin) {
        if (userCoin < coin) {
            throw new InsufficientCoinsException();
        }
    }
}
