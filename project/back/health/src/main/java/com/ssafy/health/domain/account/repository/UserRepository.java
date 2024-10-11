package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findBySso(String sso);

    boolean existsByNickname(String nickname);

    @Query("SELECT uc.user FROM UserCrew uc WHERE uc.crew.id = :crewId")
    List<User> findUserByCrewId(Long crewId);

    List<User> findALLBySurveyCompletedTrue();

    @Query("""
            SELECT DISTINCT u From User u
            LEFT JOIN BodyHistory bh ON u = bh.user
            WHERE bh IS NULL
            OR u.id IN (
                SELECT DISTINCT bh2.user.id from BodyHistory bh2
                WHERE bh2.createdAt <= :baseDate
            )
            """)
    List<User> findAllByBodyHistoryAvailability(LocalDateTime baseDate);
}
