package com.ssafy.health.domain.quest.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum QuestPeriod {
    DAILY("일일"),
    WEEKLY("주간"),
    MONTHLY("월간");

    private final String frequencyType;
}
