package com.ssafy.health.domain.quest.entity;

import com.ssafy.health.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class Quest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private QuestType type;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    private Integer period;

    @NotNull
    private Integer completionCoins;
}
