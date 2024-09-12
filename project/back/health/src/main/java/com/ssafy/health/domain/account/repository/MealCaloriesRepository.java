package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.MealCalories;
import com.ssafy.health.domain.account.entity.MealType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MealCaloriesRepository extends JpaRepository<MealCalories, Long> {
    Optional<MealCalories> findByMealCountAndAndMealType(Integer mealCount, MealType mealType);
}
