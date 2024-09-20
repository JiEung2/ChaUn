package com.ssafy.health.domain.coin.service;

import com.ssafy.health.domain.account.exception.InsufficientCoinsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoinValidator {

    public void validateSufficientCoins(Integer userCoin, Integer coin) {
        if (userCoin < coin) {
            throw new InsufficientCoinsException();
        }
    }

}
