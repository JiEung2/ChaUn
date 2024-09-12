package com.ssafy.health.domain.account.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class MealCalories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private int mealCount;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @NotNull
    private int calories;
}
