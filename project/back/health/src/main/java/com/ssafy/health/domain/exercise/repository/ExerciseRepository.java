package com.ssafy.health.domain.exercise.repository;

import com.ssafy.health.domain.exercise.category.entity.Category;
import com.ssafy.health.domain.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByCategory(Category category);
}
