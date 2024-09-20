package com.ssafy.health.domain.notification.repository;

import com.ssafy.health.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
