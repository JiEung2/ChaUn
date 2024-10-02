package com.ssafy.health.domain.character.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class CharacterSnapshotResponseDto {
    List<SnapshotInfo> snapshots;

    @Getter
    @Builder
    public static class SnapshotInfo{
        private String snapshotUrl;
        private LocalDateTime createdAt;
    }
}
