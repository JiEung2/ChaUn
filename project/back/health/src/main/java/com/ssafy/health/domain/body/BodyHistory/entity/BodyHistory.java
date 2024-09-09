package com.ssafy.health.domain.body.BodyHistory.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.body.BodyHistory.dto.request.BodyHistoryRequestDto;
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
    // TODO: 근육질인지 아닌지 어떻게 판단할 것인지 결정 필요

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float height;
    private Float weight;
    private Float skeletalMuscleMass;
    private Float bodyFatRatio;
    private Boolean isMuscle;
    private Integer dailyCaloricIntake;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "bodyType_id")
    private BodyType bodyType;

    @Builder
    public BodyHistory(BodyHistoryRequestDto bodyHistoryRequestDto) {
        this.height = bodyHistoryRequestDto.getHeight();
        this.weight = bodyHistoryRequestDto.getWeight();
        this.skeletalMuscleMass = bodyHistoryRequestDto.getSkeletalMuscleMass();
        this.bodyFatRatio = bodyHistoryRequestDto.getBodyFatRatio();
//        this.isMuscle =
        this.dailyCaloricIntake = bodyHistoryRequestDto.getDailyCaloricIntake();
        this.user = bodyHistoryRequestDto.getUser();
        this.bodyType = bodyHistoryRequestDto.getBodyType();
    }
}
