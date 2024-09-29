package com.ssafy.health.domain.quest.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.quest.dto.request.QuestCreateRequestDto;
import com.ssafy.health.domain.quest.entity.Quest;
import com.ssafy.health.domain.quest.service.QuestWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quest")
public class QuestController {

    private final QuestWriteService questWriteService;

    // 퀘스트 신규 생성
    // 유저/크루에게 퀘스트 부여가 아닌, 새로운 퀘스트 종류 생성
    @PostMapping("/create")
    public ApiResponse<Quest> createQuest(@RequestBody QuestCreateRequestDto requestDto) {
        return ApiResponse.success(questWriteService.createQuest(requestDto));
    }
}
