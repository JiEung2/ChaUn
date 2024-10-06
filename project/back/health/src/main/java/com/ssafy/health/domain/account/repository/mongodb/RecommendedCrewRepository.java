package com.ssafy.health.domain.account.repository.mongodb;

import com.ssafy.health.domain.account.entity.RecommendedCrew;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RecommendedCrewRepository extends MongoRepository<RecommendedCrew, Long> {

    Optional<RecommendedCrew> findByUserId(Long userId);
}
