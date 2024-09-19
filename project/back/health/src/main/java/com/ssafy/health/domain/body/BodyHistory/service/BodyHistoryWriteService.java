package com.ssafy.health.domain.body.BodyHistory.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.dto.request.BodySurveyRequestDto;
import com.ssafy.health.domain.account.dto.response.BodySurveySuccessDto;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyHistory.entity.BodyHistory;
import com.ssafy.health.domain.body.BodyHistory.repository.BodyHistoryRepository;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import com.ssafy.health.domain.body.BodyType.repository.BodyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BodyHistoryWriteService {

    private final BodyHistoryRepository bodyHistoryRepository;
    private final UserRepository userRepository;
    private final BodyTypeRepository bodyTypeRepository;

    private static final float MUSCLE_MIN_PER = 0.35F;
    private static final long BODY_TYPE_MIDDLE_NUMBER = 3;
    private static final long MUSCLE_BODY_TYPE_OFFSET = 6;

    public BodySurveySuccessDto saveBodyHistory(BodySurveyRequestDto bodySurveyRequestDto) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(UserNotFoundException::new);
        Boolean isMuscle = calculateIsMuscle(bodySurveyRequestDto);
        Long bodyTypeId = adjustBodyTypeId(isMuscle, bodySurveyRequestDto.getBodyType());

        BodyType bodyType = bodyTypeRepository.findById(bodyTypeId).orElseThrow();
        saveBodyHistoryRecord(bodySurveyRequestDto, user, isMuscle, bodyType);

        return new BodySurveySuccessDto();
    }

    private Boolean calculateIsMuscle(BodySurveyRequestDto dto) {
        if (dto.getSkeletalMuscleMass().isPresent()) {
            return dto.getSkeletalMuscleMass().get() >= (dto.getWeight() * MUSCLE_MIN_PER);
        }

        return dto.getIsMuscle();
    }

    private Long adjustBodyTypeId(Boolean isMuscle, Long bodyTypeId) {
        if (isMuscle && bodyTypeId <= BODY_TYPE_MIDDLE_NUMBER) {
            return bodyTypeId + MUSCLE_BODY_TYPE_OFFSET;
        }
        return bodyTypeId;
    }

    private void saveBodyHistoryRecord(BodySurveyRequestDto dto, User user, Boolean isMuscle, BodyType bodyType) {
        Float bodyFatRatio = dto.getBodyFatRatio().orElse(0F);
        Float skeletalMuscleMass = dto.getSkeletalMuscleMass().orElse(0F);

        bodyHistoryRepository.save(BodyHistory.builder()
                .height(dto.getHeight())
                .weight(dto.getWeight())
                .bodyFatRatio(bodyFatRatio)
                .skeletalMuscleMass(skeletalMuscleMass)
                .user(user)
                .isMuscle(isMuscle)
                .bodyType(bodyType)
                .build());
    }
}

