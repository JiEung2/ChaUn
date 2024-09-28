package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.FavoredExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoredRepository extends JpaRepository<FavoredExercise, Long> {
}
