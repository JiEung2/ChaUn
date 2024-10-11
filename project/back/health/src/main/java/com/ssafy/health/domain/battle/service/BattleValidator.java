package com.ssafy.health.domain.battle.service;

import com.ssafy.health.domain.battle.entity.BattleStatus;
import com.ssafy.health.domain.battle.exception.BattleAlreadyExistsException;
import com.ssafy.health.domain.battle.repository.BattleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BattleValidator {

    private final BattleRepository battleRepository;

    public void validateBattleAlreadyExists(Long crewId) {
        battleRepository.findBattleByCrewId(crewId, BattleStatus.STARTED).ifPresent(battle -> {
            throw new BattleAlreadyExistsException();
        });
    }
}
