package com.ssafy.health.domain.body.BodyType.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class BodyType extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Float minFatRatio;

    @NotNull
    private Float maxFatRatio;

    @NotNull
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

}
