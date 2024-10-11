package com.ssafy.health.domain.character.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PartsListDto {
    private List<PartsInfoDto> partsList;
}
