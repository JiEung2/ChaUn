package com.ssafy.health.domain.body.BodyPredict.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BasicPredictionResponseDto {

    private Long userId;

    private Float current;
    @JsonProperty("current_image")
    private String currentImage;

    private Float p30;
    @JsonProperty("p30_image")
    private String p30Image;

    private Float p90;
    @JsonProperty("p90_image")
    private String p90Image;

    private LocalDateTime createdAt;
}
