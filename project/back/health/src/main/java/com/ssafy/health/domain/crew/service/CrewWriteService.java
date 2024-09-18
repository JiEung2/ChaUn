package com.ssafy.health.domain.crew.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.account.service.UserValidator;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.CreateCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.JoinCrewSuccessDto;
import com.ssafy.health.domain.crew.dto.response.SendCoinSuccessDto;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.entity.CrewRole;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrewWriteService {

    private final UserValidator userValidator;
    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final UserCrewRepository userCrewRepository;

    public CreateCrewSuccessDto createCrew(CreateCrewRequestDto requestDto) {
        // Todo: 코인 감소와 코인 감소에 대한 예외처리 추가

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

    public JoinCrewSuccessDto joinCrew(Long crewId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);
        User user = findUserById(SecurityUtil.getCurrentUserId());

        userCrewRepository.save(UserCrew.builder()
                .user(user)
                .crew(crew)
                .role(CrewRole.MEMBER)
                .build());

        return new JoinCrewSuccessDto();
    }

    public SendCoinSuccessDto sendCoin(Long crewId, Integer coin) throws InterruptedException {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        userValidator.validateSufficientCoins(user.getCoin(), coin);

        user.decreaseCoin(coin);
        Crew crew = updateCoinsWithLock(crewId, coin);

        userRepository.save(user);
        crewRepository.save(crew);

        return SendCoinSuccessDto.builder()
                .crewCoin(crew.getCrewCoin())
                .myCoin(user.getCoin())
                .build();
    }

    private Crew updateCoinsWithLock(Long crewId, Integer coin) throws InterruptedException {
        while (true) {
            try {
                Crew crew = crewRepository.findByIdWithOptimisticLock(crewId);
                crew.increaseCoin(coin);
                return crew;
            } catch (OptimisticLockException e) {
                Thread.sleep(50);
            }
        }
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
