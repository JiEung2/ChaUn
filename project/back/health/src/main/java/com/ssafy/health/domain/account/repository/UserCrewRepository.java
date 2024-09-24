package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import java.util.List;

import com.ssafy.health.domain.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserCrewRepository extends JpaRepository<UserCrew, Long> {
    List<UserCrew> findByUserId(Long userId);
    List<UserCrew> findByCrewId(Long crewId);

    @Modifying
    @Query("UPDATE UserCrew uc " +
            "SET uc.basicScore = uc.basicScore + :basicScore " +
            "WHERE uc.user = :user " +
            "AND uc.crew IN (SELECT c FROM Crew c WHERE c.exercise = :exercise)")
    void updateBasicScoreByUserAndExercise(@Param("user") User user,
                                           @Param("exercise") Exercise exercise,
                                           @Param("basicScore") Float basicScore);
}