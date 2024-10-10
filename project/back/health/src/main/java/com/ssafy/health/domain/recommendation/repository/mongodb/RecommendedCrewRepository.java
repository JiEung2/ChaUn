package com.ssafy.health.domain.recommendation.repository.mongodb;

import com.ssafy.health.domain.recommendation.entity.RecommendedCrew;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RecommendedCrewRepository extends MongoRepository<RecommendedCrew, Long> {

    Optional<RecommendedCrew> findFirstByUserIdOrderByCreatedAtDesc(Long userId);
}
