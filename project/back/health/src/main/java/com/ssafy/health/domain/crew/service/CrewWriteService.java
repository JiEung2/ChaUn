package com.ssafy.health.domain.crew.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.entity.CrewRole;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrewWriteService {

    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final UserCrewRepository userCrewRepository;

    public CreateCrewSuccessDto createCrew(CreateCrewRequestDto requestDto) {

        Crew crew = Crew.builder()
                .createCrewRequestDto(requestDto).build();

        crewRepository.save(crew);

        User user = findUserById(SecurityUtil.getCurrentUserId());

        userCrewRepository.save(UserCrew.builder()
                .user(user)
                .crew(crew)
                .role(CrewRole.LEADER)
                .build());

        return new CreateCrewSuccessDto();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
