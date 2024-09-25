package com.ssafy.health.common.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WeeklyRequestDto {
    private int year;
    private int month;
    private int week;
}
