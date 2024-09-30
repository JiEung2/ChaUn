package com.ssafy.health.domain.character.dto.request;

import com.ssafy.health.domain.account.entity.Gender;
import lombok.Getter;

@Getter
public class CharacterSaveRequestDto {
    private Gender gender;
    private Long bodyTypeId;
}
