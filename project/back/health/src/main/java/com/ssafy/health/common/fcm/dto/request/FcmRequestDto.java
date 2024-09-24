package com.ssafy.health.common.fcm.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FcmRequestDto {

    private String title;
    private String body;
    private String token;
}
