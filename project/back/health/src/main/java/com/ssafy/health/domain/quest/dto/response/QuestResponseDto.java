package com.ssafy.health.domain.quest.dto.response;

import com.ssafy.health.domain.quest.entity.QuestPeriod;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestResponseDto {

    private Long questId;
    private String title;
    private QuestPeriod questPeriod;
    private Boolean isCompleted;
}
