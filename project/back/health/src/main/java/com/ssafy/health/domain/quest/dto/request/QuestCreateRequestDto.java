package com.ssafy.health.domain.quest.dto.request;

import com.ssafy.health.domain.quest.entity.QuestPeriod;
import com.ssafy.health.domain.quest.entity.QuestType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestCreateRequestDto {

    private QuestType questType;
    private String title;
    private QuestPeriod questPeriod;
    private Integer coins;
}
