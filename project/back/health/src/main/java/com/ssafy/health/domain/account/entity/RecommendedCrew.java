package com.ssafy.health.domain.account.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter
@AllArgsConstructor
@Document(collection = "crew_recommend")
public class RecommendedCrew {

    @Field("user_id")
    private Long userId;
    @Field("crew_recommend")
    private List<CrewRecommendList> crewRecommend;

    @Getter
    @AllArgsConstructor
    public static class CrewRecommendList {
        @Field("crew_id")
        private Long crewId;
        private Float similarity;
    }
}
