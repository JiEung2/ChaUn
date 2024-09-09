package com.ssafy.health.domain.account.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.dto.request.UserLoginUpdateRequestDto;
import com.ssafy.health.domain.account.dto.request.UserRegisterRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
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

    private Date birthday;

    private Gender gender;

    @NotNull
    private Boolean surveyCompleted;

    @NotNull
    private String sso;

    @NotNull
    private Long coin;

    @NotNull
    private UserRole role;

    @Builder
    public User(UserRegisterRequestDto userRegisterRequestDto) {
        this.name = userRegisterRequestDto.getName();
        this.email = userRegisterRequestDto.getEmail();
        this.sso = userRegisterRequestDto.getSso();
        this.role = userRegisterRequestDto.getRole();
        this.surveyCompleted = false;
        this.coin = 0L;
    }

}
