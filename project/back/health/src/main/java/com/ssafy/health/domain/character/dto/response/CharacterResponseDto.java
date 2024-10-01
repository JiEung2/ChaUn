package com.ssafy.health.domain.character.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CharacterResponseDto {
    private final String characterUrl;
}
