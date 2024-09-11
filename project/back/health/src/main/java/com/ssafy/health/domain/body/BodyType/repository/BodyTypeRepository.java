package com.ssafy.health.domain.body.BodyType.repository;

import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BodyTypeRepository extends JpaRepository<BodyType, Long> {

}