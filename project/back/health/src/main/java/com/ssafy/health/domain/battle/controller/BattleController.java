package com.ssafy.health.domain.battle.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.battle.dto.response.BattleMemberRankingDto;
import com.ssafy.health.domain.battle.service.BattleReadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/battle")
@RequiredArgsConstructor
public class BattleController implements BattleControllerApi{

    private final BattleReadService battleReadService;

    @GetMapping("/{battle_id}")
    public ApiResponse<BattleMemberRankingDto> getBattleMemberRanking(@PathVariable("battle_id") Long battleId) {
        return ApiResponse.success(battleReadService.getBattleMemberRanking(battleId));
    }
}
