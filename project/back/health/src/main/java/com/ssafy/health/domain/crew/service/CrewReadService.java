package com.ssafy.health.domain.crew.service;

import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto;
import com.ssafy.health.domain.crew.dto.response.CrewListResponseDto.CrewInfo;
import com.ssafy.health.domain.crew.entity.Crew;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewReadService {

    private UserCrewRepository userCrewRepository;

    public CrewListResponseDto getJoinedCrewList(Long userId) {
        List<UserCrew> userCrewList = userCrewRepository.findByUserId(userId);

        List<CrewInfo> crewList = userCrewList.stream()
                .map(userCrew -> {
                    Crew crew = userCrew.getCrew();
                    return CrewInfo.builder()
                            .crewName(crew.getName())
                            .exerciseName(crew.getExercise().getName())
                            .crewProfileImage(crew.getProfileImage())
                            .build();
                })
                .collect(Collectors.toList());

        return CrewListResponseDto.builder()
                .crewList(crewList)
                .build();
    }
}
