package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.FavoredExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoredRepository extends JpaRepository<FavoredExercise, Long> {

    List<FavoredExercise> findByUserId(Long userId);
}
