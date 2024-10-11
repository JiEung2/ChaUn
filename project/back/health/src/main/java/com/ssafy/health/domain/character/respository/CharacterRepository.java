package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    Character findFirstByBodyTypeId(Long bodyTypeId);
}
