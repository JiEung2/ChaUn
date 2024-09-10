package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.response.ValidateNicknameSuccessDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "회원 컨트롤러", description = "회원 생성, 조회, 삭제 등 회원을 관리하는 클래스")
public interface UserControllerApi {
    @Operation(
            summary = "회원 닉네임 중복 확인",
            description = "입력된 닉네임이 이미 존재하는지 확인하고, 사용 가능한 닉네임인지 검사합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "사용 가능한 닉네임입니다."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "이미 존재하는 닉네임입니다."),
    })
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable("nickname") String nickname);
}
