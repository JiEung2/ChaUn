package com.ssafy.health.domain.coin.service;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.notification.service.NotificationWriteService;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static com.ssafy.health.domain.coin.CoinCost.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CoinService {

    private final CoinValidator coinValidator;
    private final NotificationWriteService notificationWriteService;

    public void spendUserCoins(final User user, final Integer coins) {
        coinValidator.validateSufficientCoins(user.getCoin(), coins);
        user.decreaseCoin(coins);
    }

    public void spendCrewCoins(final Crew crew, final Integer coins) {
        crew.decreaseCoin(coins);
    }

    public HashMap<User, Integer> distributeBattleRewards(List<User> crewMemberRanking, List<UserCrew> userCrewList) {
        Map<Integer, Integer> rewardMap = Map.of(
                1, FIRST_PLACE_REWARD.getAmount(),
                2, SECOND_PLACE_REWARD.getAmount(),
                3, THIRD_PLACE_REWARD.getAmount()
        );

        HashMap<User, Integer> results = new HashMap<>();

        crewMemberRanking.stream()
                .limit(3)
                .forEach(user -> {
                    int ranking = crewMemberRanking.indexOf(user) + 1;
                    Integer coinAmount = rewardMap.get(ranking);
                    UserCrew now = userCrewList.get(ranking - 1);
                    Float score = now.getActivityScore() + now.getBasicScore();

                    if (coinAmount != null && score > 0) {
                        grantCoinsToUser(user, coinAmount);
                        results.put(user, coinAmount);
                    } else if (score == 0) {
                        results.put(user, 0);
                    }

                });
        return results;
    }

    public void giveAttendanceReward(User user) {
        user.increaseCoin(ATTENDANCE_REWARD.getAmount());
    }

    public void grantCoinsToUser(User user, int coinAmount) {
        user.increaseCoin(coinAmount);
    }

    public void grantCoinsToCrew(Crew crew, int coinAmount) {
        crew.increaseCoin(coinAmount);
    }
}
