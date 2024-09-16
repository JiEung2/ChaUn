package com.ssafy.health.domain.body.BodyHistory.dto.response;

import com.ssafy.health.domain.body.BodyHistory.dto.response.WeightHistoryResponseDto.WeightData;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BodyHistoryResponseDto {

    private List<BodyHistoryData> bodyHistoryDataList;

    @Builder
    public static class BodyHistoryData {
        private Float weight;
        private Float skeletalMuscleMass;
        private Float bodyFatRatio;
        private LocalDateTime date;
    }
}
