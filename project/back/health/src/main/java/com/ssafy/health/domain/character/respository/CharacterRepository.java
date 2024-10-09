package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.account.entity.Gender;
import com.ssafy.health.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    Optional<Character> findByBodyTypeIdAndGender(Long bodyTypeId, Gender gender);

    Character findFirstByBodyTypeId(Long bodyTypeId);
}
