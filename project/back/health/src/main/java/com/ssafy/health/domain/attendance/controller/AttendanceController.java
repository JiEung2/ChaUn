package com.ssafy.health.domain.attendance.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.attendance.dto.response.AttendanceSuccessDto;
import com.ssafy.health.domain.attendance.service.AttendanceWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceWriteService attendanceWriteService;

    @PostMapping("/attendance")
    public ApiResponse<AttendanceSuccessDto> markAttendance() {
        return ApiResponse.success(attendanceWriteService.markAttendance());
    }
}
