package com.ssafy.health.domain.body.BodyPredict.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.common.util.RequestUtil;
import com.ssafy.health.domain.account.entity.Gender;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.exception.BodyHistoryNotFoundException;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import com.ssafy.health.domain.body.BodyPredict.dto.request.AnalysisRequestDto;
import com.ssafy.health.domain.body.BodyPredict.entity.PredictionType;
import com.ssafy.health.domain.exercise.dto.response.ExerciseHistoryListResponseDto;
import com.ssafy.health.domain.exercise.entity.Exercise;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import com.ssafy.health.domain.exercise.service.ExerciseHistoryReadService;
import com.ssafy.health.domain.exercise.service.ExerciseHistoryWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BodyPredictWriteService {

    @Value("${health.analysis.api.url}")
    private String fastApiUrl;

    private final UserRepository userRepository;
    private final BodyHistoryRepository bodyRepository;
    private final ExerciseHistoryReadService exerciseReadService;
    private final ExerciseHistoryWriteService exerciseWriteService;
    private final ExerciseRepository exerciseRepository;
    private final RequestUtil requestUtil;

    private String apiBaseUrlBuilder(Long userId) {
        return fastApiUrl + "/users/" + userId + "/body/prediction";
    }

    @Scheduled(cron = "0 30 4 * * *")
    public Void requestPrediction() {

        List<User> userList = userRepository.findAll();

        userList.forEach(user -> {
            String apiUrl = apiBaseUrlBuilder(user.getId()) + "/fast-api";

            ExerciseDetailDto dto = ExerciseDetailDto.builder().build();
            AnalysisRequestDto requestDto = buildPredictionPayload(user.getId(), PredictionType.BASIC, dto);

            try {
                requestUtil.sendPostRequest(apiUrl, requestDto, String.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
        return null;
    }

    public AnalysisRequestDto requestExtraAnalysis(ExerciseDetailDto exerciseDetail) throws JsonProcessingException {

        Long userId = SecurityUtil.getCurrentUserId();
        String apiUrl = apiBaseUrlBuilder(userId) + "/extra/fast-api";

        AnalysisRequestDto dto = buildPredictionPayload(userId, PredictionType.EXTRA, exerciseDetail);
        ResponseEntity<String> response = requestUtil.sendPostRequest(apiUrl, dto, String.class);
        return dto;
    }

    private AnalysisRequestDto buildPredictionPayload(
            Long userId, PredictionType predictionType, ExerciseDetailDto exerciseDetail) {

        User user = findUserById(userId);
        ExerciseHistoryListResponseDto exerciseHistory = exerciseReadService.getLastWeekExerciseHistory(userId);

        BodyHistory bodyHistory = bodyRepository.findFirstByUserIdOrderByCreatedAtDesc(user.getId())
                .orElseThrow(BodyHistoryNotFoundException::new);

        List<AnalysisRequestDto.UserExerciseData> exerciseBasicList = exerciseHistory.getExerciseHistoryList()
                .stream()
                .map(exercise -> exerciseDataBuilder(user, bodyHistory, exercise.getBurnedCalories()))
                .toList();

        if (predictionType.equals(PredictionType.EXTRA) && exerciseBasicList.size() > 3) {
            exerciseBasicList = exerciseBasicList.subList(0, 3);
        } else if (predictionType.equals(PredictionType.BASIC) && exerciseBasicList.size() > 7) {
            exerciseBasicList = exerciseBasicList.subList(0, 7);
        }

        return AnalysisRequestDto.builder()
                .exerciseDetail(
                        (predictionType.equals(PredictionType.EXTRA)) ? exerciseDetail : null)
                .exerciseData(exerciseBasicList)
                .extraExerciseData(
                        (predictionType.equals(PredictionType.EXTRA)) ?
                                buildExtraPayload(user, bodyHistory, exerciseDetail) : null)
                .build();
    }

    private List<AnalysisRequestDto.UserExerciseData> buildExtraPayload(
            User user, BodyHistory bodyHistory, ExerciseDetailDto exerciseDetail) {

        float burnedCalories = calculateBurnedCalories(
                bodyHistory.getWeight(), exerciseDetail.getExerciseId(), exerciseDetail.getDuration());
        List<AnalysisRequestDto.UserExerciseData> exerciseDataList = new ArrayList<>();

        // TODO: Frontend에서 2개 개수 제한이 없을 경우에 대한 처리
        for (int i = 0; i < exerciseDetail.getCount(); i++) {
            exerciseDataList.add(exerciseDataBuilder(user, bodyHistory, burnedCalories));
        }
        return exerciseDataList;
    }

    private AnalysisRequestDto.UserExerciseData exerciseDataBuilder(
            User user, BodyHistory bodyHistory, Float calories) {
        return AnalysisRequestDto.UserExerciseData.builder()
                .age(calculateAge(user.getBirthday()))
                .sex((user.getGender().equals(Gender.MAN)) ? 1 : 2)
                .bmi(bodyHistory.getWeight() / (bodyHistory.getHeight() * bodyHistory.getHeight()) * 10000)
                .weight(bodyHistory.getWeight())
                .calories(calories)
                .build();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    private Float calculateBurnedCalories(Float weight, Long exerciseId, Integer duration) {

        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow();
        Float met = exercise.getMet();
        return (met * exerciseWriteService.getOxygenIntake() * weight * duration / 1000 * 5);
    }

    public Integer calculateAge(LocalDate birthday) {

        LocalDate today = LocalDate.now();
        return Period.between(birthday, today).getYears();
    }
}
