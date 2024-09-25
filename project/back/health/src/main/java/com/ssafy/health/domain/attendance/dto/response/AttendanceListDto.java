package com.ssafy.health.domain.attendance.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttendanceListDto {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    List<LocalDateTime> attendanceList;
}
