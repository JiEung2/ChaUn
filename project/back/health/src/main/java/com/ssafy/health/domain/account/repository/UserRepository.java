package com.ssafy.health.domain.account.repository;

import com.ssafy.health.domain.account.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findBySso(String sso);
}
