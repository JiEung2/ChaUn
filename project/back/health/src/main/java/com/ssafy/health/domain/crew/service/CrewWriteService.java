package com.ssafy.health.domain.crew.service;

import com.ssafy.health.common.s3.service.S3Service;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.coin.service.CoinService;
import com.ssafy.health.domain.coin.service.CoinValidator;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.crew.dto.response.*;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.entity.CrewRole;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.exercise.exception.ExerciseNotFoundException;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;

import static com.ssafy.health.domain.coin.CoinCost.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CrewWriteService {

    private final S3Service s3Service;
    private final CoinService coinService;
    private final CoinValidator coinValidator;
    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserCrewRepository userCrewRepository;
    private final CrewValidator crewValidator;

    public CreateCrewSuccessDto createCrew(CreateCrewRequestDto requestDto, MultipartFile profileImage) throws IOException {
        Exercise exercise = exerciseRepository.findById(requestDto.getExerciseId()).orElseThrow(ExerciseNotFoundException::new);
        User user = findUserById(SecurityUtil.getCurrentUserId());

        coinService.spendUserCoins(user, CREATE_CREW.getAmount());
        String savedProfileImage = s3Service.uploadFile(profileImage);

        Crew crew = buildCrew(requestDto, exercise, savedProfileImage, calculateAge(user.getBirthday()));

        buildUserCrew(user, crew, CrewRole.LEADER);

        return new CreateCrewSuccessDto();
    }

    public JoinCrewSuccessDto joinCrew(Long crewId) {
        Crew crew = findCrewById(crewId);
        User user = findUserById(SecurityUtil.getCurrentUserId());

        buildUserCrew(user, crew, CrewRole.MEMBER);

        return new JoinCrewSuccessDto();
    }

    public SendCoinSuccessDto sendCoin(Long crewId, Integer coin) throws InterruptedException {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        coinService.spendUserCoins(user, coin);

        Crew crew = updateCoinsWithLock(crewId, coin);

        userRepository.save(user);
        crewRepository.save(crew);

        return SendCoinSuccessDto.builder()
                .crewCoin(crew.getCrewCoin())
                .myCoin(user.getCoin())
                .build();
    }

    public BattleReadyStatusResponse readyCrewBattle(Long crewId) {
        crewValidator.validateCrewLeader(crewId);
        Crew crew = findCrewById(crewId);

        if(crewValidator.isBattleReady(crew)){
            crew.deActiveBattleStatus();
            return new BattleUnReadySuccessDto();
        }

        coinValidator.validateSufficientCoins(crew.getCrewCoin(), START_BATTLE.getAmount());
        crew.activeBattleStatus();
        return new BattleReadySuccessDto();
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

    private UserCrew buildUserCrew(User user, Crew crew, CrewRole crewRole) {
        return userCrewRepository.save(UserCrew.builder()
                .user(user)
                .crew(crew)
                .role(crewRole)
                .build());
    }

    private Crew buildCrew(CreateCrewRequestDto requestDto, Exercise exercise, String profileImage, Float averageAge) {
        return crewRepository.save(Crew.builder()
                .createCrewRequestDto(requestDto)
                .profileImage(profileImage)
                .averageAge(averageAge)
                .exercise(exercise)
                .build());
    }

    private Float calculateAge(LocalDate birthday) {
        LocalDate today = LocalDate.now();
        return (float) Period.between(birthday, today).getYears();
    }

    private Crew findCrewById(Long crewId) {
        return crewRepository.findById(crewId).orElseThrow(CrewNotFoundException::new);
    }
}
