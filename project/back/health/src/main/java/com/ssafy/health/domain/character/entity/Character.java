package com.ssafy.health.domain.character.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.Gender;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
@Table(name = "characters")
public class Character extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Gender gender;

    @NotNull
    private String characterImage;

    @ManyToOne
    @JoinColumn(name = "bodyType_id")
    private BodyType bodyType;
}
