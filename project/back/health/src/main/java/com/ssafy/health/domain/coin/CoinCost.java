package com.ssafy.health.domain.coin;

import lombok.Getter;

@Getter
public enum CoinCost {
    CREATE_CREW(300),
    START_BATTLE(100),
    FIRST_PLACE_REWARD(50),
    SECOND_PLACE_REWARD(40),
    THIRD_PLACE_REWARD(30)
    ;

    private final int amount;

    CoinCost(int amount) {
        this.amount = amount;
    }
}
