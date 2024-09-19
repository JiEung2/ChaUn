package com.ssafy.health.domain.crew.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateCrewRequestDto {
    private String name;
    private String profileImage;
    private Float averageAge;
    private String description;
    private Long exerciseId;
}
