package com.ssafy.health.domain.exercise.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.common.util.CrewBasicScoreLockException;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.exception.BodyHistoryNotFoundException;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.repository.CrewRepository;
import com.ssafy.health.domain.exercise.dto.request.ExerciseHistorySaveRequestDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistorySaveResponseDto;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.exercise.entity.ExerciseHistory;
import com.ssafy.health.domain.exercise.exception.ExerciseNotFoundException;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExerciseHistoryWriteService {

    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final UserCrewRepository userCrewRepository;
    private final ExerciseRepository exerciseRepository;
    private final BodyHistoryRepository bodyHistoryRepository;
    private final ExerciseHistoryRepository exerciseHistoryRepository;

    private final Float OXYGEN_INTAKE = 3.5F;

    public Float getOxygenIntake() {
        return OXYGEN_INTAKE;
    }

    public ExerciseHistorySaveResponseDto saveExerciseHistory(ExerciseHistorySaveRequestDto exerciseHistorySaveRequestDto) throws InterruptedException{
        User user = findUserById(SecurityUtil.getCurrentUserId());
        Exercise exercise = findExerciseById(exerciseHistorySaveRequestDto.getExerciseId());
        Float burnedCalories = calculateBurnedCalories(user, exercise, exerciseHistorySaveRequestDto.getExerciseTime());

        ExerciseHistory exerciseHistory = buildExerciseHistory(exerciseHistorySaveRequestDto, user, exercise, burnedCalories);
        exerciseHistoryRepository.save(exerciseHistory);

        Float basicScore = calculateBasicScore(burnedCalories);
        updateUserCrewBasicScore(user, exercise, basicScore);
        updateCrewBasicScore(user, exercise, basicScore);

        return ExerciseHistorySaveResponseDto.builder()
                .burnedCalories(exerciseHistory.getBurnedCalories())
                .build();
    }

    private void updateUserCrewBasicScore(User user, Exercise exercise, Float basicScore) {
        userCrewRepository.updateBasicScoreByUserAndExercise(user, exercise, basicScore);
    }

    private void updateCrewBasicScore(User user, Exercise exercise, Float basicScore) throws InterruptedException{
        int maxRetries = 5;
        int retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                List<Crew> crews = crewRepository.findCrewsByUserAndExercise(user, exercise);

                crews.forEach(crew -> {
                    crew.updateBasicScore(basicScore);
                    crewRepository.save(crew);
                });

                return;

            } catch (OptimisticLockException e) {
                retryCount++;
                Thread.sleep(50); // 대기 시간
            }
        }

        throw new CrewBasicScoreLockException();
    }

    private ExerciseHistory buildExerciseHistory(ExerciseHistorySaveRequestDto exerciseHistorySaveRequestDto, User user, Exercise exercise, Float burnedCalories) {
        return ExerciseHistory.builder()
                .user(user)
                .exercise(exercise)
                .exerciseStartTime(exerciseHistorySaveRequestDto.getExerciseStartTime())
                .exerciseEndTime(exerciseHistorySaveRequestDto.getExerciseEndTime())
                .exerciseDuration(exerciseHistorySaveRequestDto.getExerciseTime())
                .burnedCalories(burnedCalories)
                .build();
    }

    private Float calculateBurnedCalories(User user, Exercise exercise, Long exerciseTime) {
        BodyHistory bodyHistory = findBodyHistoryById(user.getId());
        Float weight = bodyHistory.getWeight();
        Float met = exercise.getMet();

        //(met * 3.5 * kg * min) / 1000 * 5 -> Kcal
        return (met * OXYGEN_INTAKE * weight * msToMin(exerciseTime)) / 1000 * 5;
    }

    private Exercise findExerciseById(Long exerciseId) {
        return exerciseRepository.findById(exerciseId).orElseThrow(ExerciseNotFoundException::new);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    private BodyHistory findBodyHistoryById(Long userId) {
        return bodyHistoryRepository.findFirstByUserIdOrderByCreatedAtDesc(userId).orElseThrow(BodyHistoryNotFoundException::new);
    }

    private Long msToMin(Long exerciseTime) {
        return exerciseTime / 60000;
    }

    private Float calculateBasicScore(Float burnedCalories) {
        return burnedCalories / 10;
    }
}
