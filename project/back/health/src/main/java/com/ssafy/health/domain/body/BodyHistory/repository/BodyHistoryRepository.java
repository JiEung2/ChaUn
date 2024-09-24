package com.ssafy.health.domain.body.BodyHistory.repository;

import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BodyHistoryRepository extends JpaRepository<BodyHistory, Long> {
    List<BodyHistory> findByUserIdAndCreatedAtAfter(Long userId, LocalDateTime startTime);
    List<BodyHistory> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime startTime, LocalDateTime endTime);
    Optional<BodyHistory> findFirstByUserIdOrderByCreatedAtDesc(Long userId);
}