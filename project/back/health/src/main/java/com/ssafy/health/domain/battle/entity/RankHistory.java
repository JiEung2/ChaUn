package com.ssafy.health.domain.battle.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.crew.entity.Crew;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float basicScore;
    private Float activityScore;
    private Integer ranking;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public RankHistory(Crew crew, User user, Integer ranking, LocalDate endDate, Float basicScore,
                       Float activityScore) {
        this.crew = crew;
        this.user = user;
        this.ranking = ranking;
        this.endDate = endDate;
        this.basicScore = basicScore;
        this.activityScore = activityScore;
    }
}
