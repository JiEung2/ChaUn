package com.ssafy.health.domain.body.BodyHistory.service;

import static java.time.temporal.TemporalAdjusters.*;

import com.ssafy.health.domain.body.BodyHistory.dto.response.WeightHistoryResponseDto;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BodyHistoryReadService {

    private final BodyHistoryRepository bodyHistoryRepository;

    public WeightHistoryResponseDto getWeightData(Long userId) {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime startTime = today.minusMonths(6).with(firstDayOfMonth()).with(LocalTime.MIN);

        List<BodyHistory> bodyHistoryList = bodyHistoryRepository.findByUserIdAndCreatedAtAfter(userId,
                startTime);

        List<WeightHistoryResponseDto.WeightData> weightDataList = bodyHistoryList.stream()
                .map(bodyHistory -> WeightHistoryResponseDto.WeightData.builder()
                        .date(bodyHistory.getCreatedAt())
                        .weight(bodyHistory.getWeight())
                        .build())
                .collect(Collectors.toList());

        return WeightHistoryResponseDto.builder()
                .weightDataList(weightDataList)
                .build();
    }
}
