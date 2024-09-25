package com.ssafy.health.domain.body.BodyPredict.repository;

import com.ssafy.health.domain.body.BodyPredict.entity.BodyExtraPrediction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BodyExtraPredictRepository extends MongoRepository<BodyExtraPrediction, Long> {

    Optional<BodyExtraPrediction> findFirstByUserIdOrderByCreatedAtDesc(Long userId);
}
