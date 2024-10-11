package com.ssafy.health.domain.character.respository;

import com.ssafy.health.domain.character.entity.CharacterSet;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CharacterSetRepository extends JpaRepository<CharacterSet, Long> {
    Optional<CharacterSet> findByUserId(Long userId);

    @Query("SELECT cs.user.id, cs.character FROM CharacterSet cs WHERE cs.user.id IN :crewMemberIdList")
    List<Object[]> findCharacterByUserIdIn(List<Long> crewMemberIdList);
}
