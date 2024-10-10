package com.ssafy.health.domain.body.BodyPredict.repository;

import com.ssafy.health.domain.body.BodyPredict.entity.BodyExtraPrediction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface BodyExtraPredictRepository extends MongoRepository<BodyExtraPrediction, Long> {

    @Query(sort = "{ created_at: -1 }")
    Optional<BodyExtraPrediction> findFirstByUserId(Long userId);
}
