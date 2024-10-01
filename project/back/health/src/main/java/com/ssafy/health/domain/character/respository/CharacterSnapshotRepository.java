package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.character.entity.CharacterSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterSnapshotRepository extends JpaRepository<CharacterSnapshot, Long> {
}
