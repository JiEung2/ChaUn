package com.ssafy.health.domain.body.BodyPredict.repository;

import com.ssafy.health.domain.body.BodyPredict.entity.BodyBasicPrediction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface BodyBasicPredictRepository extends MongoRepository<BodyBasicPrediction, Long> {

    @Query(sort = "{ create_at: -1 }")
    Optional<BodyBasicPrediction> findFirstByUserId(Long userId);
}
