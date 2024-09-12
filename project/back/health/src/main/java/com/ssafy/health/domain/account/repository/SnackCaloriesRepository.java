package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.CaloriesType;
import com.ssafy.health.domain.account.entity.Frequency;
import com.ssafy.health.domain.account.entity.SnackCalories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SnackCaloriesRepository extends JpaRepository<SnackCalories, Long> {
    Optional<SnackCalories> findByTypeAndFrequency(CaloriesType caloriesType, Frequency frequency);
}
