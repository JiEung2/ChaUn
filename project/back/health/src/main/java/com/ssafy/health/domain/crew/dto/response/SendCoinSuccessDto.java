package com.ssafy.health.domain.crew.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SendCoinSuccessDto {
    private final String message = "코인을 전송하였습니다.";
    private final Integer crewCoin;
    private final Integer myCoin;
}
