package com.ssafy.health.domain.account.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.request.CaloriesSurveyRequestDto;
import com.ssafy.health.domain.account.dto.request.InfoSurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.CaloriesSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.ValidateNicknameSuccessDto;
import com.ssafy.health.domain.account.dto.request.DeviceRegisterRequestDto;
import com.ssafy.health.domain.account.dto.response.*;
import com.ssafy.health.domain.exercise.dto.request.ExerciseHistorySaveRequestDto;
import com.ssafy.health.domain.exercise.dto.request.MonthlyExerciseHistoryRequestDto;
import com.ssafy.health.domain.exercise.dto.request.WeeklyExerciseHistoryRequestDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistoryListResponseDto;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistorySaveResponseDto;
import com.ssafy.health.domain.exercise.dto.response.TodayAndWeeklyExerciseTimeResponseDto;
import com.ssafy.health.domain.exercise.dto.response.TotalAndMonthlyExerciseTimeResponseDto;
import com.ssafy.health.domain.exercise.service.ExerciseHistoryReadService;
import com.ssafy.health.domain.account.service.UserReadService;
import com.ssafy.health.domain.account.service.UserValidator;
import com.ssafy.health.domain.account.service.UserWriteService;
import com.ssafy.health.domain.exercise.service.ExerciseHistoryWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController implements UserControllerApi{

    private final UserValidator userValidator;
    private final UserReadService userReadService;
    private final UserWriteService userWriteService;
    private final ExerciseHistoryReadService exerciseHistoryReadService;
    private final ExerciseHistoryWriteService exerciseHistoryWriteService;

    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable("nickname") String nickname) {
        return ApiResponse.success(userValidator.validateNickname(nickname));
    }

    @PostMapping("/survey/information")
    public ApiResponse<InfoSurveySuccessDto> saveInfoSurvey(@RequestBody InfoSurveyRequestDto infoSurveyRequestDto) {
        return ApiResponse.success(userWriteService.saveInfoSurvey(infoSurveyRequestDto));
    }

    @GetMapping("/{user_id}/exercise-time")
    public ApiResponse<TotalAndMonthlyExerciseTimeResponseDto> getExerciseTime(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(exerciseHistoryReadService.getTotalAndWeeklyExerciseTime(userId));
    }

    @GetMapping("{user_id}")
    public ApiResponse<UserDetailDto> getUserDetail(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(userReadService.getUserDetail(userId));
    }

    @PatchMapping("/register-device")
    public ApiResponse<DeviceRegisterResponseDto> registerDevice(@RequestBody DeviceRegisterRequestDto deviceRegisterRequestDto) {
        return ApiResponse.success(userWriteService.regiesterDevice(deviceRegisterRequestDto));
    }

    @PostMapping("/survey/eating-habits")
    public ApiResponse<CaloriesSurveySuccessDto> saveCaloriesSurvey(@RequestBody CaloriesSurveyRequestDto caloriesSurveyRequestDto) {
        return ApiResponse.success(userWriteService.saveDailyCalories(caloriesSurveyRequestDto));
    }

    @GetMapping("/survey")
    public ApiResponse<SurveyCompletedResponseDto> getSurveyCompleted() {
        return ApiResponse.success(userReadService.getSurveyCompleted());
    }

    @PostMapping("/exercise-history")
    public ApiResponse<ExerciseHistorySaveResponseDto> saveExerciseHistory(@RequestBody ExerciseHistorySaveRequestDto exerciseHistorySaveRequestDto) {
        return ApiResponse.success(exerciseHistoryWriteService.saveExerciseHistory(exerciseHistorySaveRequestDto));
    }

    @GetMapping("/exercise-history/week")
    public ApiResponse<ExerciseHistoryListResponseDto> getWeeklyExerciseHistory(@RequestBody WeeklyExerciseHistoryRequestDto requestDto) {
        return ApiResponse.success(exerciseHistoryReadService.getWeeklyExerciseHistory(requestDto));
    }

    @GetMapping("/exercise-history/month")
    public ApiResponse<ExerciseHistoryListResponseDto> getMonthlyExerciseHistory(@RequestBody MonthlyExerciseHistoryRequestDto requestDto) {
        return ApiResponse.success(exerciseHistoryReadService.getMonthlyExerciseHistory(requestDto));
    }

    @GetMapping("/my/exercise-history/today-and-weekly")
    public ApiResponse<TodayAndWeeklyExerciseTimeResponseDto> getMyTodayAndWeeklyExerciseTime() {
        return ApiResponse.success(exerciseHistoryReadService.getTodayAndWeeklyExerciseTime(SecurityUtil.getCurrentUserId()));
    }

}
