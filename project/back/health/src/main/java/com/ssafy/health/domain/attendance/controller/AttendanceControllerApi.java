package com.ssafy.health.domain.attendance.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.attendance.dto.response.AttendanceListDto;
import com.ssafy.health.domain.attendance.dto.response.AttendanceSuccessDto;
import com.ssafy.health.common.util.MonthlyRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "출석 컨트롤러", description = "출석을 관리하는 클래스")

public interface AttendanceControllerApi {

    @Operation(
            summary = "출석 체크",
            description = "출석체크를 진행합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "출석 체크 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 200,\n" +
                                    "  \"message\": \"\",\n" +
                                    "  \"data\": {\n" +
                                    "    \"message\": \"출석 체크를 완료하였습니다.\"\n" +
                                    "  }\n" +
                                    "}"
                            ))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "이미 존재하는 닉네임",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\n" +
                                    "  \"status\": 409,\n" +
                                    "  \"message\": \"오늘은 이미 출석을 완료하였습니다.\",\n" +
                                    "  \"data\": {}\n" +
                                    "}"
                            ))
            ),
    })
    ApiResponse<AttendanceSuccessDto> markAttendance();


    @Operation(
            summary = "자신의 특정 월의 출석 기록 조회",
            description = "자신의 특정 월의 출석 기록을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "출석 기록 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                {
                                  "status": 200,
                                  "message": "",
                                  "data": {
                                    "attendanceList": [
                                        {
                                          "2024-09-16T15:00:00"
                                        },
                                        {
                                          "2024-09-17T10:00:00"
                                        }
                                    ]
                                  }
                                }
                                """
                            )
                    )
            ),
    })
    ApiResponse<AttendanceListDto> getMonthlyAttendance(MonthlyRequestDto requestDto);

}
