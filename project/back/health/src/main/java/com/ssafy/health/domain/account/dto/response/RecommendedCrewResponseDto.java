package com.ssafy.health.domain.account.dto.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Builder
public class RecommendedCrewResponseDto {

    private Long userId;
    private List<CrewRecommendList> crewRecommend;

    @Data
    @Builder
    public static class CrewRecommendList {
        private Long crewId;
        private Float similarity;
    }
}
