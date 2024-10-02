package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.FavoredExercise;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoredRepository extends JpaRepository<FavoredExercise, Long> {
    List<FavoredExercise> findByUserId(Long userId);
}
