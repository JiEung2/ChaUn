package com.ssafy.health.domain.notification.repository;

import com.ssafy.health.domain.notification.entity.Notification;
import com.ssafy.health.domain.notification.entity.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.userId = :userId AND n.notificationStatus = :status " +
            "ORDER BY n.createdAt DESC")
    List<Notification> findByUserIdAndNotificationStatus(Long userId, NotificationStatus status);
}
