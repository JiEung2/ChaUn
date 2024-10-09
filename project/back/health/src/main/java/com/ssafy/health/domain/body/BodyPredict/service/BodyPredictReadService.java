package com.ssafy.health.domain.body.BodyPredict.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.Gender;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.body.BodyPredict.dto.ExerciseDetailDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.BasicPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.dto.response.ExtraPredictionResponseDto;
import com.ssafy.health.domain.body.BodyPredict.entity.BodyBasicPrediction;
import com.ssafy.health.domain.body.BodyPredict.entity.BodyExtraPrediction;
import com.ssafy.health.domain.body.BodyPredict.repository.BodyBasicPredictRepository;
import com.ssafy.health.domain.body.BodyPredict.repository.BodyExtraPredictRepository;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import com.ssafy.health.domain.body.BodyType.exception.BodyTypeNotFoundException;
import com.ssafy.health.domain.body.BodyType.repository.BodyTypeRepository;
import com.ssafy.health.domain.character.respository.CharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BodyPredictReadService {

    private final BodyHistoryRepository bodyHistoryRepository;
    private final BodyBasicPredictRepository basicRepository;
    private final BodyExtraPredictRepository extraRepository;
    private final BodyTypeRepository bodyTypeRepository;
    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;

    public BasicPredictionResponseDto getBasicPrediction() {

        Long userId = SecurityUtil.getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Optional<BodyBasicPrediction> basicPrediction = basicRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);
        Optional<BodyHistory> bodyHistory = bodyHistoryRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);

        if (basicPrediction.isPresent() && bodyHistory.isPresent()) {
            return basicPrediction.map(bodyBasicPrediction -> BasicPredictionResponseDto.builder()
                    .userId(bodyBasicPrediction.getUserId())
                    .current(bodyHistory.get().getWeight())
                    .currentImage(characterRepository.findFirstByBodyTypeId(
                            bodyHistory.get().getBodyType().getId()).getCharacterImage())
                    .p30(bodyBasicPrediction.getP30())
                    .p30Image(characterRepository.findFirstByBodyTypeId(findBodyTypeByBmi(
                                    bodyHistory.get().getHeight(),
                                    bodyBasicPrediction.getP30(),
                                    user.getGender()))
                            .getCharacterImage())
                    .p90(bodyBasicPrediction.getP90())
                    .p90Image(characterRepository.findFirstByBodyTypeId(findBodyTypeByBmi(
                                    bodyHistory.get().getHeight(),
                                    bodyBasicPrediction.getP90(),
                                    user.getGender()))
                            .getCharacterImage())
                    .createdAt(bodyBasicPrediction.getCreatedAt())
                    .build()).orElse(null);
        } else {
            return null;
        }
    }

    public ExtraPredictionResponseDto getExtraPrediction() {

        Long userId = SecurityUtil.getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Optional<BodyExtraPrediction> extraPrediction = extraRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);
        Optional<BodyHistory> bodyHistory = bodyHistoryRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);

        if (extraPrediction.isPresent() && bodyHistory.isPresent()) {
            return extraPrediction.map(bodyExtraPrediction -> ExtraPredictionResponseDto.builder()
                    .userId(bodyExtraPrediction.getUserId())
                    .current(bodyHistory.get().getWeight())
                    .currentImage(characterRepository.findFirstByBodyTypeId(
                            bodyHistory.get().getBodyType().getId()).getCharacterImage())
                    .p30(bodyExtraPrediction.getP30())
                    .p30Image(characterRepository.findFirstByBodyTypeId(findBodyTypeByBmi(
                                    bodyHistory.get().getHeight(),
                                    bodyExtraPrediction.getP30(),
                                    user.getGender()))
                            .getCharacterImage())
                    .p90(bodyExtraPrediction.getP90())
                    .p90Image(characterRepository.findFirstByBodyTypeId(findBodyTypeByBmi(
                                    bodyHistory.get().getHeight(),
                                    bodyExtraPrediction.getP90(),
                                    user.getGender()))
                            .getCharacterImage())
                    .exercise(ExerciseDetailDto.builder()
                            .exerciseId(bodyExtraPrediction.getExercise().getExerciseId())
                            .duration(bodyExtraPrediction.getExercise().getDuration())
                            .count(bodyExtraPrediction.getExercise().getCount())
                            .build())
                    .createdAt(bodyExtraPrediction.getCreatedAt())
                    .build()).orElse(null);
        } else {
            return null;
        }
    }

    private Long findBodyTypeByBmi(Float height, Float weight, Gender gender) {

        float bmi = weight / (height * height) * 10000;
        Optional<BodyType> bodyType = bodyTypeRepository.findByBmiAndGender((int) bmi, gender);

        if (bodyType.isPresent()) {
            return bodyType.get().getId();
        } else {
            throw new BodyTypeNotFoundException();
        }
    }
}
