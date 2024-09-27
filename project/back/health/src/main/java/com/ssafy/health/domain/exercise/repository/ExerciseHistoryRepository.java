package com.ssafy.health.domain.exercise.repository;

import com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto;
import com.ssafy.health.domain.crew.dto.response.CrewMemberInfo;
import com.ssafy.health.domain.exercise.entity.ExerciseHistory;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistory, Long> {
    List<ExerciseHistory> findByUserId(Long userId);

    List<ExerciseHistory> findByUserIdAndExerciseStartTimeBetween(Long userId, LocalDateTime startTime,
                                                                     LocalDateTime endTime);

    @Query("SELECT exerciseHistory.user.id, SUM(exerciseHistory.exerciseDuration) " +
            "FROM ExerciseHistory exerciseHistory " +
            "WHERE exerciseHistory.user.id IN :userIdList " +
            "AND exerciseHistory.exerciseStartTime BETWEEN :startTime AND :endTime " +
            "GROUP BY exerciseHistory.user.id " +
            "ORDER BY exerciseHistory.user.nickname ASC")
    List<Object[]> findUserExerciseDurationSumByUserIdInAndCreatedAtBetween(List<Long> userIdList, LocalDateTime startTime, LocalDateTime endTime);

    @Query("SELECT new com.ssafy.health.domain.account.dto.response.UserExerciseTimeDto(exerciseHistory.user.id, SUM (exerciseHistory.exerciseDuration))" +
            "FROM ExerciseHistory exerciseHistory " +
            "WHERE exerciseHistory.user.id IN :userIdList AND exerciseHistory.exerciseStartTime BETWEEN :startTime AND :endTime " +
            "GROUP BY exerciseHistory.user.id " +
            "ORDER BY SUM(exerciseHistory.exerciseDuration) DESC ")
    List<UserExerciseTimeDto> findUserExerciseTimes(
            List<Long> userIdList,
            LocalDateTime startTime,
            LocalDateTime endTime);

    List<ExerciseHistory> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

    @Query("SELECT new com.ssafy.health.domain.crew.dto.response.CrewMemberInfo(u.id, u.nickname, u.profileImage, SUM(eh.exerciseDuration)) " +
            "FROM Crew c " +
            "JOIN UserCrew uc ON uc.crew = c " +
            "JOIN User u ON uc.user = u " +
            "JOIN ExerciseHistory eh ON eh.user = u " +
            "WHERE c.id = :crewId " +
            "AND eh.exerciseStartTime > :dateTime " +
            "GROUP BY u.id, u.nickname " +
            "ORDER BY SUM(eh.exerciseDuration) DESC")
    List<CrewMemberInfo> findUserRankingsByCrewAndDateTime(@Param("crewId") Long crewId,
                                                           @Param("dateTime") LocalDateTime dateTime);
}