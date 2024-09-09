package com.ssafy.health.domain.body.BodyHistory.dto.request;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class BodyHistoryRequestDto {

    private Float height;
    private Float weight;
    private Float skeletalMuscleMass;
    private Float bodyFatRatio;
    private Integer dailyCaloricIntake;
    private User user;
    private BodyType bodyType;
}
