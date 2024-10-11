package com.ssafy.health.domain.account.dto.request;

import com.ssafy.health.domain.account.entity.Frequency;
import com.ssafy.health.domain.account.entity.MealType;
import lombok.Getter;
import org.openapitools.jackson.nullable.JsonNullable;

@Getter
public class CaloriesSurveyRequestDto {
    private Integer mealCount;
    private MealType mealType;
    private Frequency snackFrequency;
    private Frequency drinkFrequency;
}
