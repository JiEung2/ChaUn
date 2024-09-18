package com.ssafy.health.domain.crew.dto.response;

import com.ssafy.health.domain.account.entity.User;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewMembersResponseDto {
    List<CrewMemberInfo> memberList;

    @Getter
    @Builder
    public static class CrewMemberInfo {
        private String nickname;
        private Long userId;
        private String userProfileImage;
        private Long thisWeekExerciseTime;
    }
}
