package com.ssafy.health.domain.body.BodyHistory.repository;

import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BodyHistoryRepository extends JpaRepository<BodyHistory, Long> {

}
