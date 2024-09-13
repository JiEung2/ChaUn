package com.ssafy.health.common.fcm.controller;

import com.ssafy.health.common.fcm.dto.DeviceRegisterRequestDto;
import com.ssafy.health.common.fcm.dto.DeviceRegisterResponseDto;
import com.ssafy.health.common.fcm.service.FcmService;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FcmController implements FcmControllerApi {

    private FcmService fcmService;
    private UserRepository userRepository;

    @PostMapping("/api/v1/users/register-device")
    public DeviceRegisterResponseDto register(@RequestBody final DeviceRegisterRequestDto deviceRegisterRequestDto) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(UserNotFoundException::new);
        return fcmService.regiesterDevice(user, deviceRegisterRequestDto);
    }
}
