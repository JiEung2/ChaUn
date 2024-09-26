package com.ssafy.health.domain.crew.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.exception.NotCrewLeaderException;
import com.ssafy.health.domain.account.exception.UserCrewNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.entity.CrewRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrewValidator {

    private final UserCrewRepository userCrewRepository;

    public void validateCrewLeader(Long crewId) {
        Long userId = SecurityUtil.getCurrentUserId();
        UserCrew userCrew = userCrewRepository.findByCrewIdAndUserId(crewId, userId).orElseThrow(UserCrewNotFoundException::new);
        if (userCrew.getRole().equals(CrewRole.MEMBER)) throw new NotCrewLeaderException();
    }

}
