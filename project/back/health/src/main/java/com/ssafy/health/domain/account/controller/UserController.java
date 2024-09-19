package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.ExerciseTimeResponseDto;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.UserDetailDto;
import com.ssafy.health.domain.account.dto.response.ValidateNicknameSuccessDto;
import com.ssafy.health.domain.account.service.ExerciseHistoryReadService;
import com.ssafy.health.domain.account.service.UserReadService;
import com.ssafy.health.domain.account.service.UserValidator;
import com.ssafy.health.domain.account.service.UserWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController implements UserControllerApi{

    private final UserWriteService userWriteService;
    private final UserReadService userReadService;
    private final UserValidator userValidator;
    private final ExerciseHistoryReadService exerciseHistoryReadService;

    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable("nickname") String nickname) {
        return ApiResponse.success(userValidator.validateNickname(nickname));
    }

    @PostMapping("/survey/information")
    public ApiResponse<InfoSurveySuccessDto> saveInfoSurvey(@RequestBody InfoSurveyRequestDto infoSurveyRequestDto) {
        return ApiResponse.success(userWriteService.saveInfoSurvey(infoSurveyRequestDto));
    }

    @GetMapping("/{user_id}/exercise-time")
    public ApiResponse<ExerciseTimeResponseDto> getExerciseTime(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(exerciseHistoryReadService.getExerciseTime(userId));
    }

    @GetMapping("{user_id}")
    public ApiResponse<UserDetailDto> getUserDetail(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(userReadService.getUserDetail(userId));
    }

}
