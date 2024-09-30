package com.ssafy.health.domain.character.entity;

import com.ssafy.health.domain.account.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
public class CharacterSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "characters_id")
    private Character character;

    @ManyToOne
    @JoinColumn(name = "parts_id")
    private Parts parts;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
