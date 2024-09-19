package com.ssafy.health.domain.coin.service;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CoinService {

    private final UserRepository userRepository;
    private final CoinValidator coinValidator;

    public void spendCoins(Long userId, Integer coins) {
        User user = findUserById(userId);
        coinValidator.validateSufficientCoins(user.getCoin(), coins);
        user.decreaseCoin(coins);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
