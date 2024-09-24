package com.ssafy.health.domain.account.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.crew.entity.CrewRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_crew_id", columnList = "crew_id")
})
public class UserCrew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CrewRole role;

    private Float basicScore;

    private Float activityScore;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @Builder
    public UserCrew(User user, Crew crew, CrewRole role) {
        this.user = user;
        this.crew = crew;
        this.role = role;
        this.basicScore = 0F;
        this.activityScore = 0F;
    }
}
