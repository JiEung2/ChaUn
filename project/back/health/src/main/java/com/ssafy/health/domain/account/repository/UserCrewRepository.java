package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import java.util.List;

import com.ssafy.health.domain.exercise.entity.Exercise;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserCrewRepository extends JpaRepository<UserCrew, Long> {

    @Query("SELECT uc FROM UserCrew uc JOIN FETCH uc.crew WHERE uc.user.id = :userId")
    List<UserCrew> findByUserIdWithCrew(Long userId);

    @Query("SELECT uc FROM UserCrew uc JOIN FETCH uc.user WHERE uc.crew.id = :crewId")
    List<UserCrew> findByCrewId(Long crewId);

    Optional<UserCrew> findByCrewIdAndUserId(Long crewId, Long userId);

    @Modifying
    @Query("UPDATE UserCrew uc " +
            "SET uc.basicScore = uc.basicScore + :basicScore " +
            "WHERE uc.user = :user " +
            "AND uc.crew IN (SELECT c FROM Crew c WHERE c.exercise = :exercise)")
    void updateBasicScoreByUserAndExercise(@Param("user") User user,
                                           @Param("exercise") Exercise exercise,
                                           @Param("basicScore") Float basicScore);

    @Query("SELECT uc FROM UserCrew uc JOIN FETCH uc.user WHERE uc.crew.id = :crewId ORDER BY (uc.basicScore + uc.activityScore) DESC ")
    List<UserCrew> findUserByCrewIdOrderByScore(Long crewId);
}