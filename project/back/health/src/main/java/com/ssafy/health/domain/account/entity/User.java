package com.ssafy.health.domain.account.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.dto.request.UserLoginUpdateRequestDto;
import com.ssafy.health.domain.account.dto.request.UserRegisterRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Column(unique = true)
    private String nickname;

    private String email;

    private LocalDate birthday;

    private String profileImage;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    private Boolean surveyCompleted;

    @NotNull
    private String sso;

    @NotNull
    private Integer coin;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Integer dailyCaloricIntake;

    private String deviceToken;

    @Builder
    public User(UserRegisterRequestDto userRegisterRequestDto) {
        this.name = userRegisterRequestDto.getName();
        this.email = userRegisterRequestDto.getEmail();
        this.sso = userRegisterRequestDto.getSso();
        this.role = userRegisterRequestDto.getRole();
        this.surveyCompleted = false;
        this.coin = 0;
    }

    public void updateNameAndEmail(UserLoginUpdateRequestDto userLoginUpdateRequestDto) {
        this.name = userLoginUpdateRequestDto.getName();
        this.email = userLoginUpdateRequestDto.getEmail();
    }

    public void saveUserInfo(String nickname, LocalDate birthday, Gender gender) {
        this.nickname = nickname;
        this.birthday = birthday;
        this.gender = gender;
    }

    public void updateSurveyCompleted() {
        this.surveyCompleted = true;
    }

    public void saveDailyCaloricIntake(Integer dailyCaloricIntake) {
        this.dailyCaloricIntake = dailyCaloricIntake;
    }

    public void increaseCoin(Integer coin) {
        this.coin += coin;
    }

    public void decreaseCoin(Integer coin) {
        this.coin -= coin;
    }

    public void updateUserDevice(String deviceToken) {
        this.deviceToken = deviceToken;
    }

}
