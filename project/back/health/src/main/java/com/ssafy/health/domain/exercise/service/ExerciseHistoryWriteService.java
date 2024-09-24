package com.ssafy.health.domain.exercise.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.exception.BodyHistoryNotFoundException;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.exercise.dto.request.ExerciseHistorySaveRequestDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistorySaveResponseDto;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.exercise.entity.ExerciseHistory;
import com.ssafy.health.domain.exercise.exception.ExerciseNotFoundException;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ExerciseHistoryWriteService {

    private final UserRepository userRepository;
    private final UserCrewRepository userCrewRepository;
    private final ExerciseRepository exerciseRepository;
    private final BodyHistoryRepository bodyHistoryRepository;
    private final ExerciseHistoryRepository exerciseHistoryRepository;

    private final Float OXYGEN_INTAKE = 3.5F;

    public ExerciseHistorySaveResponseDto saveExerciseHistory(ExerciseHistorySaveRequestDto exerciseHistorySaveRequestDto) {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        Exercise exercise = findExerciseById(exerciseHistorySaveRequestDto.getExerciseId());
        Float burnedCalories = calculateBurnedCalories(user, exercise, exerciseHistorySaveRequestDto.getExerciseTime());

        ExerciseHistory exerciseHistory = buildExerciseHistory(exerciseHistorySaveRequestDto, user, exercise, burnedCalories);
        exerciseHistoryRepository.save(exerciseHistory);

        updateScore(user, exercise, burnedCalories);

        return ExerciseHistorySaveResponseDto.builder()
                .burnedCalories(exerciseHistory.getBurnedCalories())
                .build();
    }

    private void updateScore(User user, Exercise exercise, Float burnedCalories) {
        Float basicScore = calculateBasicScore(burnedCalories);
        userCrewRepository.updateBasicScoreByUserAndExercise(user, exercise, basicScore);
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
        return exerciseTime / 6000;
    }

    private Float calculateBasicScore(Float burnedCalories) {
        return burnedCalories / 10;
    }
}