package com.ssafy.health.domain.account.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class SnackCalories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CaloriesType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    @NotNull
    private int calories;
}
