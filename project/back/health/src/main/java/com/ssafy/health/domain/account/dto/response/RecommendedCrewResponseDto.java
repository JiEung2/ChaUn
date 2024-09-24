package com.ssafy.health.domain.account.dto.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Builder
public class RecommendedCrewResponseDto {

    @Field("user_id")
    private Long userId;
    @Field("crew_recommend")
    private List<CrewRecommendList> crewRecommend;

    @Data
    @Builder
    public static class CrewRecommendList {
        @Field("crew_id")
        private Long crewId;
        private Float similarity;
    }
}
