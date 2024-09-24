package com.ssafy.health.domain.exercise.service;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.exercise.dto.request.MonthlyExerciseHistoryRequestDto;
import com.ssafy.health.domain.exercise.dto.request.WeeklyExerciseHistoryRequestDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistoryListResponseDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseTimeResponseDto;
import com.ssafy.health.domain.exercise.entity.ExerciseHistory;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
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

    public ExerciseHistoryListResponseDto getWeeklyExerciseHistory(WeeklyExerciseHistoryRequestDto requestDto) {
        LocalDateTime[] dateTimes = calculateWeekDateTimeRange(requestDto.getYear(), requestDto.getMonth(), requestDto.getWeek());
        return getExerciseHistoryListResponseDto(dateTimes);
    }

    public ExerciseHistoryListResponseDto getMonthlyExerciseHistory(MonthlyExerciseHistoryRequestDto requestDto) {
        LocalDateTime[] dateTimes = calculateMonthDateTimeRange(requestDto.getYear(), requestDto.getMonth());
        return getExerciseHistoryListResponseDto(dateTimes);
    }

    private ExerciseHistoryListResponseDto getExerciseHistoryListResponseDto(LocalDateTime[] dateTimes) {
        LocalDateTime startDateTime = dateTimes[0];
        LocalDateTime endDateTime = dateTimes[1];

        List<ExerciseHistory> exerciseHistoryList = exerciseHistoryRepository.findByUserIdAndCreatedAtBetween(SecurityUtil.getCurrentUserId(), startDateTime, endDateTime);

        List<ExerciseHistoryListResponseDto.ExerciseHistoryDetailDto> exerciseHistoryDetailList = getExerciseHistoryDetailDtoList(exerciseHistoryList);

        return ExerciseHistoryListResponseDto.builder()
                .exerciseHistoryList(exerciseHistoryDetailList)
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

    private LocalDateTime[] calculateWeekDateTimeRange(int year, int month, int week){
        LocalDate firstDayOfWeek = LocalDate.of(year, month, 1);
        LocalDate firstMondayOfMonth = firstDayOfWeek.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        LocalDate startOfWeek = firstMondayOfMonth.plusWeeks(week - 1);

        LocalDateTime startDateTime = startOfWeek.atStartOfDay();
        LocalDateTime endDateTime = startOfWeek.with(TemporalAdjusters.next(DayOfWeek.SUNDAY)).atTime(23, 59, 59);

        return new LocalDateTime[]{startDateTime, endDateTime};
    }

    private LocalDateTime[] calculateMonthDateTimeRange(int year, int month){
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.with(TemporalAdjusters.lastDayOfMonth());

        LocalDateTime startDateTime = startOfMonth.atStartOfDay();
        LocalDateTime endDateTime = endOfMonth.atTime(23, 59, 59);

        return new LocalDateTime[]{startDateTime, endDateTime};
    }

    private static List<ExerciseHistoryListResponseDto.ExerciseHistoryDetailDto> getExerciseHistoryDetailDtoList(List<ExerciseHistory> exerciseHistoryList) {
        List<ExerciseHistoryListResponseDto.ExerciseHistoryDetailDto> exerciseHistoryDetailList = exerciseHistoryList.stream()
                .map(exerciseHistory -> ExerciseHistoryListResponseDto.ExerciseHistoryDetailDto.builder()
                        .id(exerciseHistory.getId())
                        .exerciseDuration(exerciseHistory.getExerciseDuration())
                        .burnedCalories(exerciseHistory.getBurnedCalories())
                        .exerciseName(exerciseHistory.getExercise().getName())
                        .createdAt(exerciseHistory.getCreatedAt())
                        .build())
                .toList();
        return exerciseHistoryDetailList;
    }
}
