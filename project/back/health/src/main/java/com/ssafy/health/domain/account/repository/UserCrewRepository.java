package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserCrew;
import com.ssafy.health.domain.crew.dto.analysis.MaxScoresDto;
import com.ssafy.health.domain.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserCrewRepository extends JpaRepository<UserCrew, Long> {

    @Query("SELECT uc FROM UserCrew uc JOIN FETCH uc.crew WHERE uc.user.id = :userId")
    List<UserCrew> findByUserIdWithCrew(Long userId);

    @Query("SELECT uc FROM UserCrew uc JOIN FETCH uc.user WHERE uc.crew.id = :crewId")
    List<UserCrew> findByCrewId(Long crewId);

    Optional<UserCrew> findByCrewIdAndUserId(Long crewId, Long userId);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE UserCrew uc " +
            "SET uc.basicScore = uc.basicScore + :basicScore " +
            "WHERE uc.user = :user " +
            "AND uc.crew IN (SELECT c FROM Crew c WHERE c.exercise = :exercise)")
    void updateBasicScoreByUserAndExercise(@Param("user") User user,
                                           @Param("exercise") Exercise exercise,
                                           @Param("basicScore") Float basicScore);

    @Query("SELECT uc FROM UserCrew uc JOIN FETCH uc.user WHERE uc.crew.id = :crewId ORDER BY (uc.basicScore + uc.activityScore) DESC ")
    List<UserCrew> findUserByCrewIdOrderByScore(Long crewId);

    @Query("""
            SELECT NEW com.ssafy.health.domain.crew.dto.analysis.MaxScoresDto(MAX(uc.basicScore), MAX(uc.activityScore))
            FROM UserCrew uc WHERE uc.user.id = :userId
            """)
    MaxScoresDto findMaxScoresByUserId(Long userId);
}