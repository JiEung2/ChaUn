package com.ssafy.health.domain.character.entity;

import com.ssafy.health.domain.account.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CharacterSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "characters_id")
    private Character character;

    @OneToOne
    @JoinColumn(name = "parts_id")
    private Parts parts;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public CharacterSet(User user, Character character, Parts parts) {
        this.user = user;
        this.character = character;
        this.parts = parts;
    }

    public void updateCharacter(Character character) {
        this.character = character;
    }

    public void updateParts(Parts parts) {
        this.parts = parts;
    }
}
