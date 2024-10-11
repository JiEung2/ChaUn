package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.character.entity.CharacterSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterSnapshotRepository extends JpaRepository<CharacterSnapshot, Long> {

    List<CharacterSnapshot> findByUserIdOrderByCreatedAtDesc(Long userId);
}
