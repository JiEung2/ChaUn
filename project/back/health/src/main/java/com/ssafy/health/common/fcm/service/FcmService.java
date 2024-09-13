package com.ssafy.health.common.fcm.service;

import com.ssafy.health.common.fcm.dto.DeviceRegisterRequestDto;
import com.ssafy.health.common.fcm.dto.DeviceRegisterResponseDto;
import com.ssafy.health.domain.account.entity.User;
import org.springframework.stereotype.Service;

@Service
public class FcmService {

    public DeviceRegisterResponseDto regiesterDevice(User user, DeviceRegisterRequestDto deviceRegisterRequestDto) {

        user.updateUserDevice(deviceRegisterRequestDto);
        return new DeviceRegisterResponseDto();
    }
}
