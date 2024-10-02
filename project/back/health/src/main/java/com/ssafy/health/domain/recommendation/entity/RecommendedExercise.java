package com.ssafy.health.domain.recommendation.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.exercise.entity.Exercise;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendedExercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String exerciseName;

    private String reason;

    @Column(columnDefinition = "TEXT")
    private String description;

}
