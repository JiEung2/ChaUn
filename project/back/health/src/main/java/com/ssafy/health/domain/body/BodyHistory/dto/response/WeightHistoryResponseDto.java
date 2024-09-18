package com.ssafy.health.domain.body.BodyHistory.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WeightHistoryResponseDto {

    private List<WeightData> weightDataList;

    @Builder
    public static class WeightData {
        private LocalDateTime date;
        private Float weight;
    }
}
