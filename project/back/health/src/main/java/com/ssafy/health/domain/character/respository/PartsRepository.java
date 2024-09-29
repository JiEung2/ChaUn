package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.character.entity.Parts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartsRepository extends JpaRepository<Parts, Long> {
}
