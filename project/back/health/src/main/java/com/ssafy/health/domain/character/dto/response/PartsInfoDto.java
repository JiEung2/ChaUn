package com.ssafy.health.domain.character.dto.response;

import com.ssafy.health.domain.character.entity.Parts;
import com.ssafy.health.domain.character.entity.PartsType;
import lombok.Builder;

@Builder
public record PartsInfoDto(
        Long id,
        String name,
        Integer cost,
        String partsImage,
        PartsType partsType
) {
    public static PartsInfoDto fromEntity(Parts parts) {
        return PartsInfoDto.builder()
                .id(parts.getId())
                .name(parts.getName())
                .cost(parts.getCost())
                .partsImage(parts.getPartsImage())
                .partsType(parts.getPartsType())
                .build();
    }
}
