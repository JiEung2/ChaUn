package com.ssafy.health.domain.battle.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.battle.dto.request.BattleRegisterDto;
import com.ssafy.health.domain.crew.entity.Crew;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

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
    public Battle(BattleRegisterDto battleRegisterDto) {
        this.homeCrew = battleRegisterDto.getHomeCrew();
        this.awayCrew = battleRegisterDto.getAwayCrew();
        this.status = BattleStatus.WAITING;
        this.homeCrewScore = 0F;
        this.awayCrewScore = 0F;
    }

}
