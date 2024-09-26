package com.ssafy.health.domain.crew.dto.response;

import lombok.Getter;

@Getter
public class BattleReadySuccessDto implements BattleReadyStatusResponse{
    private final String message = "크루 배틀 랜덤 매칭 동의에 성공하였습니다.";
}
