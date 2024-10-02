package com.ssafy.health.domain.character.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CharacterSnapshot extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String characterSnapshot;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public CharacterSnapshot(User user, String characterSnapshot) {
        this.user = user;
        this.characterSnapshot = characterSnapshot;
    }
}
