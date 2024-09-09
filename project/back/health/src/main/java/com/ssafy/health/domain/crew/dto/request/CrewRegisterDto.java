package com.ssafy.health.domain.crew.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewRegisterDto {
    private String name;
    private String profileImage;
    private Float averageAge;
    private String description;
}
