package com.ssafy.health.domain.battle.dto.response;

import com.ssafy.health.domain.crew.dto.response.CrewMemberInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BattleMemberRankingDto {
    private List<CrewMemberInfo> homeCrewMembers;
    private List<CrewMemberInfo> awayCrewMembers;
}
