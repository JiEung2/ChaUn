package com.ssafy.health.domain.account.service;

import com.ssafy.health.domain.account.dto.request.DeviceRegisterRequestDto;
import com.ssafy.health.domain.account.dto.response.DeviceRegisterResponseDto;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.request.*;
import com.ssafy.health.domain.account.dto.response.CaloriesSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.SurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.InfoSurveySuccessDto;
import com.ssafy.health.domain.account.dto.response.UserRegisterResponseDto;
import com.ssafy.health.domain.account.entity.CaloriesType;
import com.ssafy.health.domain.account.entity.FavoredExercise;
import com.ssafy.health.domain.account.entity.MealCalories;
import com.ssafy.health.domain.account.entity.SnackCalories;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.DrinkNotFoundException;
import com.ssafy.health.domain.account.exception.MealNotFoundException;
import com.ssafy.health.domain.account.exception.SnackNotFoundException;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.FavoredRepository;
import com.ssafy.health.domain.account.repository.MealCaloriesRepository;
import com.ssafy.health.domain.account.repository.SnackCaloriesRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.character.dto.response.CharacterResponseDto;
import com.ssafy.health.domain.character.service.CharacterReadService;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserWriteService {
    //Todo: saveFavoredExercises 중복 및 개수제한 예외처리 추가,

    private final UserRepository userRepository;
    private final FavoredRepository favoredRepository;
    private final ExerciseRepository exerciseRepository;
    private final CharacterReadService characterReadService;
    private final MealCaloriesRepository mealCaloriesRepository;
    private final SnackCaloriesRepository snackCaloriesRepository;

    public UserRegisterResponseDto registerUser(UserRegisterRequestDto userRegisterRequestDto) {
        User user = User.builder()
                .userRegisterRequestDto(userRegisterRequestDto).build();

        user = userRepository.save(user);

        return UserRegisterResponseDto.builder()
                .id(user.getId())
                .sso(user.getSso())
                .role(user.getRole())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public void updateNameAndEmail(UserLoginUpdateRequestDto userLoginUpdateRequestDto) {
        User user = findUserById(userLoginUpdateRequestDto.getUserId());
        user.updateNameAndEmail(userLoginUpdateRequestDto);
    }

    public InfoSurveySuccessDto saveInfoSurvey(InfoSurveyRequestDto infoSurveyRequestDto) {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        user.saveUserInfo(infoSurveyRequestDto.getNickname(), infoSurveyRequestDto.getBirthday(),
                infoSurveyRequestDto.getGender());
        userRepository.save(user);

        return new InfoSurveySuccessDto();
    }

    public CaloriesSurveySuccessDto saveDailyCalories(CaloriesSurveyRequestDto caloriesSurveyRequestDto) {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        MealCalories mealCalories = mealCaloriesRepository.findByMealCountAndAndMealType(
                        caloriesSurveyRequestDto.getMealCount(), caloriesSurveyRequestDto.getMealType())
                .orElseThrow(MealNotFoundException::new);
        SnackCalories snackCalories = snackCaloriesRepository.findByTypeAndFrequency(CaloriesType.SNACK,
                caloriesSurveyRequestDto.getSnackFrequency()).orElseThrow(SnackNotFoundException::new);
        SnackCalories drinkCalories = snackCaloriesRepository.findByTypeAndFrequency(CaloriesType.DRINK,
                caloriesSurveyRequestDto.getDrinkFrequency()).orElseThrow(DrinkNotFoundException::new);

        Integer dailyCaloricIntake =
                mealCalories.getCalories() + snackCalories.getCalories() + drinkCalories.getCalories();
        user.saveDailyCaloricIntake(dailyCaloricIntake);
        userRepository.save(user);

        return new CaloriesSurveySuccessDto();
    }

    public SurveySuccessDto saveFavoredExercises(FavoredExercisesRequestDto requestDto) {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        List<Exercise> exerciseList = exerciseRepository.findByIdIn(requestDto.getFavoredExerciseIdList());

        exerciseList.forEach(exercise -> favoredRepository.save(
                FavoredExercise.builder()
                        .user(user)
                        .exercise(exercise)
                        .build()));

        user.updateSurveyCompleted();

        CharacterResponseDto characterResponseDto =  characterReadService.getCharacterInfo(user.getId());

        return SurveySuccessDto.builder()
                .characterUrl(characterResponseDto.getCharacterUrl())
                .bodyTypeId(characterResponseDto.getBodyTypeId())
                .build();
    }

    public DeviceRegisterResponseDto regiesterDevice(DeviceRegisterRequestDto deviceRegisterRequestDto) {
        User user = findUserById(SecurityUtil.getCurrentUserId());
        user.updateUserDevice(deviceRegisterRequestDto.getDeviceToken());
        return new DeviceRegisterResponseDto();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

}
