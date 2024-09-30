package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.character.entity.CharacterSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterSetRepository extends JpaRepository<CharacterSet, Long> {
}