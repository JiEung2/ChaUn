package com.ssafy.health.domain.crew.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.crew.dto.request.CreateCrewRequestDto;
import com.ssafy.health.domain.exercise.entity.Exercise;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {
        @Index(name = "idx_exercise_id", columnList = "exercise_id"),
})
public class Crew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Integer memberLimit;

    @Version
    private Integer version;

    private String profileImage;
    private Float averageAge;
    private String description;
    private Integer crewCoin;
    private Float basicScore;
    private Float activityScore;
    private Boolean battleStatus;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Builder
    public Crew(CreateCrewRequestDto createCrewRequestDto, Exercise exercise, String profileImage, Float averageAge) {
        this.name = createCrewRequestDto.getName();
        this.description = createCrewRequestDto.getDescription();
        this.exercise = exercise;
        this.profileImage = profileImage;
        this.averageAge = averageAge;
        this.memberLimit = 10;
        this.crewCoin = 0;
        this.version = 1;
        this.battleStatus = false;
        this.basicScore = 0F;
        this.activityScore = 0F;
    }

    public void increaseCoin(Integer coin) {
        this.crewCoin += coin;
    }

    public void activeBattleStatus() {
        this.battleStatus = true;
    }

    public void deActiveBattleStatus() {
        this.battleStatus = false;
    }

    public void decreaseCoin(Integer coin) {
        this.crewCoin -= coin;
    }

    public void updateBasicScore(Float basicScore) {
        this.basicScore += basicScore;
    }

    public void updateActivityScore(Float activityScore) { this.activityScore += activityScore; }

    public void resetScores() {
        this.basicScore = 0F;
        this.activityScore = 0F;
    }
}
