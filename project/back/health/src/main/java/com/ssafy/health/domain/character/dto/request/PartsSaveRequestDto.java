package com.ssafy.health.domain.character.dto.request;

import com.ssafy.health.domain.character.entity.PartsType;
import lombok.Getter;

@Getter
public class PartsSaveRequestDto {
    private String name;
    private PartsType partsType;
    private Integer cost;
}
