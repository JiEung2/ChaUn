package com.ssafy.health.domain.body.BodyHistory.repository;

import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BodyHistoryRepository extends JpaRepository<BodyHistory, Long> {
    List<BodyHistory> findByUserIdAndCreatedAtAfter(Long userId, LocalDateTime startTime);

}
