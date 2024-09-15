package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.ExerciseHistory;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistory, Long> {
    List<ExerciseHistory> findByUserId(Long userId);

    List<ExerciseHistory> findByUserIdAAndAndExerciseStartTimeBetween(Long userId, LocalDateTime startTime,
                                                                      LocalDateTime endTime);

}