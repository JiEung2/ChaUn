package com.ssafy.health.domain.body.BodyPredict.repository;

import com.ssafy.health.domain.body.BodyPredict.entity.BodyBasicPrediction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BodyBasicPredictRepository extends MongoRepository<BodyBasicPrediction, Long> {

    Optional<BodyBasicPrediction> findFirstByUserIdOrderByCreatedAtDesc(Long userId);
}
