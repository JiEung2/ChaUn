package com.ssafy.health.domain.exercise.repository;

import com.ssafy.health.domain.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
