package com.ssafy.health.domain.crew.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewMembersResponseDto {
    List<CrewMemberInfo> memberList;

}
