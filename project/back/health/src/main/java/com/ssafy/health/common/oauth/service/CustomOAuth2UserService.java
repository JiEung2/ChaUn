package com.ssafy.health.common.oauth.service;

import com.ssafy.health.common.oauth.dto.CustomOAuth2User;
import com.ssafy.health.common.oauth.dto.GoogleResponse;
import com.ssafy.health.common.oauth.dto.KakaoResponse;
import com.ssafy.health.common.oauth.dto.OAuth2Response;
import com.ssafy.health.domain.account.dto.request.UserLoginUpdateRequestDto;
import com.ssafy.health.domain.account.dto.request.UserRegisterRequestDto;
import com.ssafy.health.domain.account.dto.response.UserRegisterResponseDto;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.entity.UserRole;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.account.service.UserWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final UserWriteService userWriteService;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {
            return null;
        }

        //리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듦
        String sso = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        User existData = userRepository.findBySso(sso);

        if (existData == null) {
            UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
                    .name(oAuth2Response.getName())
                    .sso(sso)
                    .email(oAuth2Response.getEmail())
                    .role(UserRole.USER)
                    .build();

            UserRegisterResponseDto userRegisterResponseDto = userWriteService.registerUser(userRegisterRequestDto);

            return new CustomOAuth2User(userRegisterResponseDto);
        } else {
            UserLoginUpdateRequestDto memberLoginUpdateRequestDto = UserLoginUpdateRequestDto.builder()
                    .userId(existData.getId())
                    .email(oAuth2Response.getEmail())
                    .name(oAuth2Response.getName())
                    .build();

            userWriteService.updateNameAndEmail(memberLoginUpdateRequestDto);

            UserRegisterResponseDto userRegisterResponseDto = UserRegisterResponseDto.builder()
                    .id(existData.getId())
                    .name(existData.getName())
                    .sso(existData.getSso())
                    .email(existData.getEmail())
                    .role(existData.getRole())
                    .build();

            return new CustomOAuth2User(userRegisterResponseDto);
        }

    }

}
