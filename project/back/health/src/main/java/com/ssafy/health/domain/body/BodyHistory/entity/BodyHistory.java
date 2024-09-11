package com.ssafy.health.domain.body.BodyHistory.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BodyHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float height;
    private Float weight;
    private Float skeletalMuscleMass;
    private Float bodyFatRatio;
    private Boolean isMuscle;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "bodyType_id")
    private BodyType bodyType;

    @Builder
    public BodyHistory(Float height, Float weight, Float skeletalMuscleMass, Float bodyFatRatio, User user, BodyType bodyType, Boolean isMuscle) {
        this.height = height;
        this.weight = weight;
        this.skeletalMuscleMass = skeletalMuscleMass;
        this.bodyFatRatio = bodyFatRatio;
        this.isMuscle = isMuscle;
        this.user = user;
        this.bodyType = bodyType;
    }
}
