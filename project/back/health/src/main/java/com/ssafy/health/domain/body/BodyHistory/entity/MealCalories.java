package com.ssafy.health.domain.body.BodyHistory.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private int mealType;

    @NotNull
    private int calories;
}
