package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.account.entity.Gender;
import com.ssafy.health.domain.character.entity.Character;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    Optional<Character> findByBodyTypeIdAndGender(Long bodyTypeId, Gender gender);
}
