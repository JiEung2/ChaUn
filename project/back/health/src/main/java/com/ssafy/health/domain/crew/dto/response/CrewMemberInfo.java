package com.ssafy.health.domain.crew.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CrewMemberInfo {
    private Long userId;
    private String nickname;
    private String userProfileImage;
    private Long exerciseTime;
}
