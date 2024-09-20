package com.ssafy.health.domain.battle.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.battle.dto.request.BattleRegisterDto;
import com.ssafy.health.domain.crew.entity.Crew;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Battle extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private BattleStatus status;

    private Float homeCrewScore;
    private Float awayCrewScore;

    @ManyToOne
    @JoinColumn(name = "homeCrew_id")
    private Crew homeCrew;

    @ManyToOne
    @JoinColumn(name = "awayCrew_id")
    private Crew awayCrew;

    @Builder
    public Battle(Crew homeCrew, Crew awayCrew) {
        this.homeCrew = homeCrew;
        this.awayCrew = awayCrew;
        this.status = BattleStatus.STARTED;
        this.homeCrewScore = 0F;
        this.awayCrewScore = 0F;
    }

}
