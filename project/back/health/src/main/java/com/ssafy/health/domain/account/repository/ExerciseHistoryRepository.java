package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto;
import com.ssafy.health.domain.account.entity.ExerciseHistory;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistory, Long> {
    List<ExerciseHistory> findByUserId(Long userId);

    List<ExerciseHistory> findByUserIdAndExerciseStartTimeBetween(Long userId, LocalDateTime startTime,
                                                                     LocalDateTime endTime);

    @Query("SELECT exerciseHistory FROM ExerciseHistory exerciseHistory " +
            "WHERE exerciseHistory.user.id IN :userIdList " +
            "AND exerciseHistory.exerciseStartTime BETWEEN :startTime AND :endTime " +
            "ORDER BY exerciseHistory.user.nickname ASC ")
    List<ExerciseHistory> findByUserIdInAndExerciseStartTimeBetween(List<Long> userIdList, LocalDateTime startTime, LocalDateTime endTime);

    @Query("SELECT new com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto(exerciseHistory.user.id, SUM (exerciseHistory.exerciseDuration))" +
            "FROM ExerciseHistory exerciseHistory " +
            "WHERE exerciseHistory.user.id IN :userIdList AND exerciseHistory.exerciseStartTime BETWEEN :startTime AND :endTime " +
            "GROUP BY exerciseHistory.user.id " +
            "ORDER BY SUM(exerciseHistory.exerciseDuration) DESC ")
    List<UserExerciseTimeDto> findUserExerciseTimes(
            List<Long> userIdList,
            LocalDateTime startTime,
            LocalDateTime endTime);
}