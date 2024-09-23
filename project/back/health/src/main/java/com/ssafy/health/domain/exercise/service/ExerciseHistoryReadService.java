package com.ssafy.health.domain.exercise.service;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

import com.ssafy.health.domain.exercise.dto.response.ExerciseTimeResponseDto;
import com.ssafy.health.domain.exercise.entity.ExerciseHistory;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExerciseHistoryReadService {

    private final ExerciseHistoryRepository exerciseHistoryRepository;

    public ExerciseTimeResponseDto getExerciseTime(final Long userId) {
        Long totalExerciseTime = getTotalExerciseTime(userId);
        Long monthlyAccumulateExerciseTime = getMonthlyAccumulatedExerciseTime(userId);

        return ExerciseTimeResponseDto.builder()
                .totalExerciseTime(totalExerciseTime)
                .monthlyAccumulatedExerciseTime(monthlyAccumulateExerciseTime)
                .build();
    }

    private Long getTotalExerciseTime(final Long userId) {
        List<ExerciseHistory> exerciseHistories = exerciseHistoryRepository.findByUserId(userId);
        return exerciseHistories.stream()
                .mapToLong(ExerciseHistory::getExerciseDuration)
                .sum();
    }

    private Long getMonthlyAccumulatedExerciseTime (final Long userId) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime startTime = today.with(firstDayOfMonth()).with(LocalTime.MIN);
        LocalDateTime endTime = today.with(lastDayOfMonth()).with(LocalTime.MAX);

        List<ExerciseHistory> exerciseHistories = exerciseHistoryRepository.findByUserIdAndExerciseStartTimeBetween(
                userId, startTime, endTime);

        return exerciseHistories.stream()
                .mapToLong(ExerciseHistory::getExerciseDuration)
                .sum();

    }

}
