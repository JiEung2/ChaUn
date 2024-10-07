package com.ssafy.health.domain.quest.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.dto.response.QuestResponseDto;
import com.ssafy.health.domain.quest.entity.Quest;
import com.ssafy.health.domain.quest.entity.QuestType;
import com.ssafy.health.domain.quest.service.QuestReadService;
import com.ssafy.health.domain.quest.service.QuestWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quest")
public class QuestController implements QuestControllerApi {

    private final QuestWriteService questWriteService;
    private final QuestReadService questReadService;

    // 퀘스트 신규 생성
    // 유저/크루에게 퀘스트 부여가 아닌, 새로운 퀘스트 종류 생성
    @PostMapping("/create")
    public ApiResponse<Quest> createQuest(@RequestBody QuestCreateRequestDto requestDto) {
        return ApiResponse.success(questWriteService.createQuest(requestDto));
    }

    @GetMapping("/get/user")
    public ApiResponse<List<QuestResponseDto>> getUserQuestList() {
        return ApiResponse.success(questReadService.getAchievableQuest(QuestType.INDIVIDUAL, 0L));
    }

    @GetMapping("/get/crew")
    public ApiResponse<List<QuestResponseDto>> getCrewQuestList(@RequestParam("crew_id") Long crewId) {
        return ApiResponse.success(questReadService.getAchievableQuest(QuestType.CREW, crewId));
    }

    @PostMapping("/test")
    public ApiResponse<List<QuestResponseDto>>testQuest() {
        questWriteService.createDailyQuest();
        questWriteService.createMonthlyQuest();
        return ApiResponse.success(questReadService.getAchievableQuest(QuestType.INDIVIDUAL, 0L));
    }
}
