package com.ssafy.health.domain.account.dto.request;

import com.ssafy.health.domain.account.entity.Gender;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class InfoSurveyRequestDto {
    private String nickname;
    private LocalDate birthday;
    private Gender gender;
}
