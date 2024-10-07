package com.ssafy.health.domain.body.BodyType.repository;

import com.ssafy.health.domain.account.entity.Gender;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BodyTypeRepository extends JpaRepository<BodyType, Long> {

    @Query("SELECT b FROM BodyType b WHERE b.gender = :gender AND :bmi BETWEEN b.minFatRatio AND b.maxFatRatio")
    Optional<BodyType> findByBmiAndGender(Float bmi, Gender gender);
}