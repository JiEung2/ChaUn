package com.ssafy.health.domain.notification.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationMessage {
    SURVEY("체형 입력을 통해 정확도 높은 예측을 받아보세요!"),
    BATTLE_START("크루 배틀이 시작되었어요! 현황을 확인하세요!"),
    BATTLE_END("크루 배틀이 종료되었어요! 결과를 확인하세요!"),
    QUEST("퀘스트를 달성했어요.");

    private final String message;

}
