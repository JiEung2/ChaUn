package com.ssafy.health.domain.attendance.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.attendance.dto.response.AttendanceListDto;
import com.ssafy.health.domain.attendance.entity.Attendance;
import com.ssafy.health.domain.attendance.repository.AttendanceRepository;
import com.ssafy.health.common.util.MonthlyRequestDto;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AttendanceReadService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceListDto getMonthlyAttendance(MonthlyRequestDto requestDto) {
        YearMonth yearMonth = YearMonth.of(requestDto.getYear(), requestDto.getMonth());
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(LocalTime.MAX);

        return AttendanceListDto.builder()
                .attendanceList(attendanceRepository.findByUserIdAndCreatedAtBetween(SecurityUtil.getCurrentUserId(), startOfMonth, endOfMonth)
                .stream()
                .map(Attendance::getCreatedAt)
                .collect(Collectors.toList()))
                .build();
    }
}
