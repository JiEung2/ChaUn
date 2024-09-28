package com.ssafy.health.domain.coin.service;

import static com.ssafy.health.domain.coin.CoinCost.*;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.crew.entity.Crew;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CoinService {

    private final CoinValidator coinValidator;

    public void spendUserCoins(final User user, final Integer coins) {
        coinValidator.validateSufficientCoins(user.getCoin(), coins);
        user.decreaseCoin(coins);
    }

    public void spendCrewCoins(final Crew crew, final Integer coins) {;
        crew.decreaseCoin(coins);
    }

    public void distributeBattleRewards(List<User> crewMemberRanking) {
        Map<Integer, Integer> rewardMap = Map.of(
                1, FIRST_PLACE_REWARD.getAmount(),
                2, SECOND_PLACE_REWARD.getAmount(),
                3, THIRD_PLACE_REWARD.getAmount()
        );

        crewMemberRanking.stream()
                .limit(3)
                .forEach(user -> {
                    int ranking = crewMemberRanking.indexOf(user) + 1;
                    Integer coinAmount = rewardMap.get(ranking);
                    if (coinAmount != null) {
                        grantCoins(user, coinAmount);
                    }
                });
    }

    private void grantCoins(User user, int coinAmount) {
        user.increaseCoin(coinAmount);
    }
}
