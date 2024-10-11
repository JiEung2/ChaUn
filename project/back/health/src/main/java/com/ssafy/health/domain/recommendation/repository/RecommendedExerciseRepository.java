package com.ssafy.health.domain.recommendation.repository;

import com.ssafy.health.domain.recommendation.entity.RecommendedExercise;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendedExerciseRepository extends JpaRepository<RecommendedExercise, Long> {
    List<RecommendedExercise> findByUserId(Long userId);
}
