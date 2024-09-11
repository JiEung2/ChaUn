package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.BodySurveyRequestDto;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.BodySurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.ValidateNicknameSuccessDto;
import com.ssafy.health.domain.account.service.UserValidator;
import com.ssafy.health.domain.account.service.UserWriteService;
import com.ssafy.health.domain.body.BodyHistory.service.BodyHistoryWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController implements UserControllerApi{

    private final UserWriteService userWriteService;
    private final UserValidator userValidator;
    private final BodyHistoryWriteService bodyHistoryWriteService;

    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable("nickname") String nickname) {
        return ApiResponse.success(userValidator.validateNickname(nickname));
    }

    @PostMapping("/survey/information")
    public ApiResponse<InfoSurveySuccessDto> saveInfoSurvey(@RequestBody InfoSurveyRequestDto infoSurveyRequestDto) {
        return ApiResponse.success(userWriteService.saveInfoSurvey(infoSurveyRequestDto));
    }

}
