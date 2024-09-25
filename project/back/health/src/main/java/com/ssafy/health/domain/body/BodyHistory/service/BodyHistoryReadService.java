package com.ssafy.health.domain.body.BodyHistory.service;

import static java.time.temporal.TemporalAdjusters.*;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.common.util.MonthlyRequestDto;
import com.ssafy.health.domain.body.BodyHistory.dto.response.BodyHistoryResponseDto;
import com.ssafy.health.domain.body.BodyHistory.dto.response.WeightHistoryResponseDto;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import java.time.LocalDate;
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

    public BodyHistoryResponseDto getBodyHistory(MonthlyRequestDto requestDto) {

        LocalDate startDate = LocalDate.of(requestDto.getYear(), requestDto.getMonth(), 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        List<BodyHistory> bodyHistoryList = bodyHistoryRepository.findByUserIdAndCreatedAtBetween(
                SecurityUtil.getCurrentUserId(), startDateTime, endDateTime);

        List<BodyHistoryResponseDto.BodyHistoryData> bodyHistoryDataList = bodyHistoryList.stream()
                .map(bodyHistory -> BodyHistoryResponseDto.BodyHistoryData.builder()
                        .bodyFatRatio(bodyHistory.getBodyFatRatio())
                        .skeletalMuscleMass(bodyHistory.getSkeletalMuscleMass())
                        .weight(bodyHistory.getWeight())
                        .date(bodyHistory.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return BodyHistoryResponseDto.builder()
                .bodyHistoryDataList(bodyHistoryDataList)
                .build();
    }

}
