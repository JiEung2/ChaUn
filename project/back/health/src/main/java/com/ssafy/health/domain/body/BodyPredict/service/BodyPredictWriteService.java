package com.ssafy.health.domain.body.BodyPredict.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.common.util.RequestUtil;
import com.ssafy.health.common.util.WeeklyRequestDto;
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
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

    private String apiBaseUrlBuilder() {
        Long userId = SecurityUtil.getCurrentUserId();
        return fastApiUrl + "/users/" + userId.toString() + "/body/prediction";
    }

    public AnalysisRequestDto requestPrediction() throws JsonProcessingException {

        // TODO: 스프링 스케쥴러 이용, FastAPI에 분석 요청 보내기
        ExerciseDetailDto dto = ExerciseDetailDto.builder().build();
        return buildPredictionPayload(PredictionType.BASIC, dto);
    }

    public AnalysisRequestDto requestExtraAnalysis(ExerciseDetailDto exerciseDetail) throws JsonProcessingException {

        // TODO: API 요청 성공 유무에 따른 반환값 추가
        String apiUrl = apiBaseUrlBuilder() + "/extra/fast-api";

        AnalysisRequestDto dto = buildPredictionPayload(PredictionType.EXTRA, exerciseDetail);
        ResponseEntity<String> response = requestUtil.sendPostRequest(apiUrl, dto, String.class);
        return dto;
    }

    private AnalysisRequestDto buildPredictionPayload(
            PredictionType predictionType, ExerciseDetailDto exerciseDetail) {

        User user = findUserById(SecurityUtil.getCurrentUserId());

        LocalDate today = LocalDate.now();
        int weekNumber = today.get(WeekFields.of(Locale.KOREA).weekOfMonth());
        WeeklyRequestDto dateDto = new WeeklyRequestDto(today.getYear(), today.getMonthValue(), weekNumber - 1);
        ExerciseHistoryListResponseDto exerciseHistory = exerciseReadService.getWeeklyExerciseHistory(dateDto);

        BodyHistory bodyHistory = bodyRepository.findFirstByUserIdOrderByCreatedAtDesc(user.getId())
                .orElseThrow(BodyHistoryNotFoundException::new);

        // TODO: 조회된 운동 기록이 7개 이상일 경우 7개까지만 반환
        // TODO: 추가 예측 요청일 경우 3개까지만 반환
        List<AnalysisRequestDto.UserExerciseData> exerciseBasicList = exerciseHistory.getExerciseHistoryList()
                .stream()
                .map(exercise -> exerciseDataBuilder(user, bodyHistory, exercise.getBurnedCalories()))
                .toList();

        return AnalysisRequestDto.builder()
                .exerciseDetail(
                        (predictionType.equals(PredictionType.EXTRA)) ? exerciseDetail : null)
                .exerciseData(exerciseBasicList)
                .extraExerciseData(
                        (predictionType.equals(PredictionType.EXTRA)) ?
                                buildExtraPayload(user, bodyHistory, exerciseDetail) : null
                )
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

    private Integer calculateAge(LocalDate birthday) {

        LocalDate today = LocalDate.now();
        return Period.between(birthday, today).getYears();
    }
}
