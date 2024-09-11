package com.ssafy.health.domain.account.dto.request;

import com.ssafy.health.domain.account.entity.Gender;
import lombok.Getter;

import java.util.Date;

@Getter
public class InfoSurveyRequestDto {
    private String nickname;
    private Date birthday;
    private Gender gender;
}
