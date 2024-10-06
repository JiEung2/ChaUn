package com.ssafy.health.domain.character.dto.response;

import com.ssafy.health.domain.account.entity.Gender;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CharacterResponseDto {
    private final String characterUrl;
    private final Long bodyTypeId;
    private final Gender gender;
}
