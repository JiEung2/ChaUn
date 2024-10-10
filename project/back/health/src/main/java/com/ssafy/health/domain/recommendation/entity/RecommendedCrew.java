package com.ssafy.health.domain.recommendation.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@Document(collection = "crew_recommend")
public class RecommendedCrew {

    @Field("user_id")
    private Long userId;
    @Field("crew_recommended")
    private List<RecommendedCrewInfo> crewRecommend;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("user")
    private ScoreData userScore;

    @Getter
    @AllArgsConstructor
    public static class RecommendedCrewInfo {
        @Field("crew_id")
        private Long crewId;
        private Float similarity;
        @Field("score")
        private ScoreData crewScore;
    }

    @Getter
    @AllArgsConstructor
    public static class ScoreData {
        @Field("basic_score")
        private Float basicScore;
        @Field("activity_score")
        private Float activityScore;
        @Field("intake_score")
        private Float intakeScore;
    }
}
