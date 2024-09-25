package com.ssafy.health.domain.attendance.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttendanceListDto {
    List<LocalDateTime> attendanceList;
}
