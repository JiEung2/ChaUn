package com.ssafy.health.domain.account.repository.mongodb;

import com.ssafy.health.domain.account.entity.RecommendedCrew;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecommendedCrewRepository extends MongoRepository<RecommendedCrew, Long> {

    RecommendedCrew findByUserId(Long userId);
}
