package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.response.ValidateNicknameSuccessDto;
import com.ssafy.health.domain.account.service.UserValidator;
import com.ssafy.health.domain.account.service.UserWriteService;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController implements UserControllerApi{

    private final UserWriteService userWriteService;
    private final UserValidator userValidator;

    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable("nickname") String nickname) {
        return ApiResponse.success(userValidator.validateNickname(nickname));
    }
}
