package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.UserCrew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCrewRepository extends JpaRepository<UserCrew, Long> {
}