package com.ssafy.health.domain.attendance.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.attendance.exception.AttendanceAlreadyExistsException;
import com.ssafy.health.domain.attendance.repository.AttendanceRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttendanceValidator {

    private final AttendanceRepository attendanceRepository;

    public void validateTodayAttendance() {
        LocalDateTime startTime = LocalDate.now().atStartOfDay();
        LocalDateTime endTime = LocalDate.now().atTime(LocalTime.MAX);

        attendanceRepository.findByUserIdAndCreatedAtBetween(
                SecurityUtil.getCurrentUserId(), startTime, endTime).ifPresentOrElse(attendance -> {
                    throw new AttendanceAlreadyExistsException();
                    }, () -> {});
    }
}
