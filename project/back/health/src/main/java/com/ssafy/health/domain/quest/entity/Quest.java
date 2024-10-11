package com.ssafy.health.domain.quest.entity;

import com.ssafy.health.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private QuestType type;

    @NotNull
    private String title;

    @NotNull
    @Enumerated(EnumType.STRING)
    private QuestPeriod period;

    @NotNull
    private Integer completionCoins;
}
