package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findBySso(String sso);
    boolean existsByNickname(String nickname);

    @Query("SELECT uc.user FROM UserCrew uc WHERE uc.crew.id = :crewId")
    List<User> findUserByCrewId(Long crewId);

    List<User> findALLBySurveyCompletedTrue();
}
