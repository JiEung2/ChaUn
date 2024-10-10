package com.ssafy.health.domain.account.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.response.SurveyCompletedResponseDto;
import com.ssafy.health.domain.account.dto.response.UserDetailDto;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.RecommendCrewListNotFoundException;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserCrewRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.body.BodyPredict.service.BodyPredictWriteService;
import com.ssafy.health.domain.body.BodyType.service.BodyTypeReadService;
import com.ssafy.health.domain.character.entity.Character;
import com.ssafy.health.domain.character.entity.CharacterSet;
import com.ssafy.health.domain.character.exception.CharacterSetNotFoundException;
import com.ssafy.health.domain.character.respository.CharacterSetRepository;
import com.ssafy.health.domain.crew.dto.analysis.MaxScoresDto;
import com.ssafy.health.domain.crew.dto.analysis.ScoreData;
import com.ssafy.health.domain.crew.service.CrewReadService;
import com.ssafy.health.domain.recommendation.dto.response.RecommendedCrewResponseDto;
import com.ssafy.health.domain.recommendation.entity.RecommendedCrew;
import com.ssafy.health.domain.recommendation.repository.mongodb.RecommendedCrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserReadService {

    private final UserRepository userRepository;
    private final RecommendedCrewRepository recommendedCrewRepository;
    private final CrewReadService crewReadService;
    private final BodyHistoryRepository bodyHistoryRepository;
    private final BodyPredictWriteService bodyPredictWriteService;
    private final BodyTypeReadService bodyTypeReadService;
    private final UserCrewRepository userCrewRepository;
    private final CharacterSetRepository characterSetRepository;

    public UserDetailDto getUserDetail(Long userId) {
        User user = findUserById(userId);

        CharacterSet characterSet = characterSetRepository.findByUserId(userId).orElseThrow(
                CharacterSetNotFoundException::new);

        Character myCharacter = characterSet.getCharacter();

        return UserDetailDto.builder()
                .nickname(user.getNickname())
                .characterImageUrl(myCharacter.getCharacterImage())
                .characterFileUrl(myCharacter.getCharacterFile())
                .gender(user.getGender())
                .coins(user.getCoin())
                .build();
    }

    public SurveyCompletedResponseDto getSurveyCompleted() {
        User user = findUserById(SecurityUtil.getCurrentUserId());

        return SurveyCompletedResponseDto.builder()
                .surveyCompleted(user.getSurveyCompleted())
                .build();
    }

    public RecommendedCrewResponseDto getRecommendedCrew() {
        Long userId = SecurityUtil.getCurrentUserId();
        Optional<RecommendedCrew> recommendedCrew = recommendedCrewRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);

        if (recommendedCrew.isPresent()) {
            return crewReadService.createCrewListResponseDto(recommendedCrew.get());
        } else {
            throw new RecommendCrewListNotFoundException();
        }
    }

    public ScoreData calculateUserScore(Long userId) {
        User user = findUserById(userId);
        BodyHistory bodyHistory = bodyHistoryRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElse(null);
        int age = bodyPredictWriteService.calculateAge(user.getBirthday());
        float bodyType = bodyTypeReadService.bodyTypeCoverter(bodyHistory.getBodyType());

        MaxScoresDto scoresDto = userCrewRepository.findMaxScoresByUserId(userId);

        return ScoreData.builder()
                .mType(bodyType > 6 ? bodyType : 0)
                .type(bodyType > 6 ? 0 : bodyType)
                .age(age)
                .basicScore(scoresDto.getBasicScore())
                .activityScore(scoresDto.getActivityScore())
                .intakeScore((float) user.getDailyCaloricIntake())
                .build();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
