package com.ssafy.health.domain.body.BodyHistory.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BodyHistoryRequestDto {
    private int year;
    private int month;
}
