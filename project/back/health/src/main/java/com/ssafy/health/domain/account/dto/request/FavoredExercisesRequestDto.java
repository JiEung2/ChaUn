package com.ssafy.health.domain.account.dto.request;

import java.util.List;
import lombok.Getter;

@Getter
public class FavoredExercisesRequestDto {
    private List<Long> favoredExerciseIdList;
}
