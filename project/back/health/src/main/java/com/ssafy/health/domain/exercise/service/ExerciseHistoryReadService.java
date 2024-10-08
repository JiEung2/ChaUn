package com.ssafy.health.domain.exercise.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.common.util.MonthlyRequestDto;
import com.ssafy.health.common.util.WeeklyRequestDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistoryListResponseDto;
import com.ssafy.health.domain.exercise.dto.response.WeeklyAndDailyExerciseTimeResponseDto;
import com.ssafy.health.domain.exercise.entity.ExerciseHistory;
import com.ssafy.health.domain.exercise.repository.ExerciseHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExerciseHistoryReadService {

    private final ExerciseHistoryRepository exerciseHistoryRepository;

    public WeeklyAndDailyExerciseTimeResponseDto getWeeklyAndDailyExerciseTime(final Long userId) {
        Long weeklyAccumulatedExerciseTime = getWeeklyAccumulatedExerciseTime(userId);
        Long dailyAccumulatedExerciseTime = getDailyAccumulatedExerciseTime(userId);

        return WeeklyAndDailyExerciseTimeResponseDto.builder()
                .weeklyAccumulatedExerciseTime(weeklyAccumulatedExerciseTime)
                .dailyAccumulatedExerciseTime(dailyAccumulatedExerciseTime)
                .build();
    }

    public WeeklyAndDailyExerciseTimeResponseDto getWeeklyAndDailyExerciseTime() {
        Long userId = SecurityUtil.getCurrentUserId();
        Long weeklyAccumulatedExerciseTime = getWeeklyAccumulatedExerciseTime(userId);
        Long dailyAccumulatedExerciseTime = getDailyAccumulatedExerciseTime(userId);

        return WeeklyAndDailyExerciseTimeResponseDto.builder()
                .weeklyAccumulatedExerciseTime(weeklyAccumulatedExerciseTime)
                .dailyAccumulatedExerciseTime(dailyAccumulatedExerciseTime)
                .build();
    }

    public ExerciseHistoryListResponseDto getWeeklyExerciseHistory(WeeklyRequestDto requestDto) {
        LocalDateTime[] dateTimes = calculateWeekDateTimeRange(requestDto.getYear(), requestDto.getMonth(), requestDto.getWeek());
        return getExerciseHistoryListResponseDto(dateTimes);
    }

    public ExerciseHistoryListResponseDto getLastWeekExerciseHistory(Long userId) {

        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));

        int weekYearNumber = today.get(WeekFields.of(Locale.KOREA).weekOfYear()) - 1;

        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.WEEK_OF_YEAR, weekYearNumber);
        calendar.set(Calendar.YEAR, today.getYear());

        LocalDateTime startDateTime = calendar.getTime().toInstant()
                .atZone(ZoneId.of("Asia/Seoul"))
                .toLocalDateTime();
        LocalDateTime endDateTime = startDateTime.plusWeeks(1).minusSeconds(1);
        return getExerciseHistoryListResponseDto(userId, new LocalDateTime[]{startDateTime, endDateTime});
    }

    public ExerciseHistoryListResponseDto getMonthlyExerciseHistory(MonthlyRequestDto requestDto) {
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

    private ExerciseHistoryListResponseDto getExerciseHistoryListResponseDto(Long userId, LocalDateTime[] dateTimes) {
        LocalDateTime startDateTime = dateTimes[0];
        LocalDateTime endDateTime = dateTimes[1];

        List<ExerciseHistory> exerciseHistoryList = exerciseHistoryRepository.
                findByUserIdAndCreatedAtBetween(userId, startDateTime, endDateTime);

        List<ExerciseHistoryListResponseDto.ExerciseHistoryDetailDto> exerciseHistoryDetailList =
                getExerciseHistoryDetailDtoList(exerciseHistoryList);

        return ExerciseHistoryListResponseDto.builder()
                .exerciseHistoryList(exerciseHistoryDetailList)
                .build();
    }

    private Long getTotalExerciseTime(final Long userId) {
        return calculateExerciseTime(exerciseHistoryRepository.findByUserId(userId));
    }

    private Long getDailyAccumulatedExerciseTime(final Long userId) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime startTime = today.toLocalDate().atStartOfDay();
        LocalDateTime endTime = today.toLocalDate().atTime(23, 59, 59);

        return calculateExerciseTime(exerciseHistoryRepository.findByUserIdAndExerciseStartTimeBetween(
                userId, startTime, endTime));
    }

    private Long getWeeklyAccumulatedExerciseTime(final Long userId) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime startTime = today.with(DayOfWeek.MONDAY).toLocalDate().atStartOfDay();
        LocalDateTime endTime = today.with(DayOfWeek.SUNDAY).toLocalDate().atTime(23, 59, 59);

        return calculateExerciseTime(exerciseHistoryRepository.findByUserIdAndExerciseStartTimeBetween(
                userId, startTime, endTime));
    }

    private Long getMonthlyAccumulatedExerciseTime(final Long userId) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime startTime = today.with(firstDayOfMonth()).with(LocalTime.MIN);
        LocalDateTime endTime = today.with(lastDayOfMonth()).with(LocalTime.MAX);

        return calculateExerciseTime(exerciseHistoryRepository.findByUserIdAndExerciseStartTimeBetween(
                userId, startTime, endTime));
    }

    private long calculateExerciseTime(List<ExerciseHistory> exerciseHistoryList) {

        return exerciseHistoryList.stream()
                .mapToLong(ExerciseHistory::getExerciseDuration)
                .sum();
    }

    private LocalDateTime[] calculateWeekDateTimeRange(int year, int month, int week) {
        LocalDate firstDayOfWeek = LocalDate.of(year, month, 1);
        LocalDate firstMondayOfMonth = firstDayOfWeek.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        LocalDate startOfWeek = firstMondayOfMonth.plusWeeks(week - 1);

        LocalDateTime startDateTime = startOfWeek.atStartOfDay();
        LocalDateTime endDateTime = startOfWeek.with(TemporalAdjusters.next(DayOfWeek.SUNDAY)).atTime(23, 59, 59);

        return new LocalDateTime[]{startDateTime, endDateTime};
    }

    private LocalDateTime[] calculateMonthDateTimeRange(int year, int month) {
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
