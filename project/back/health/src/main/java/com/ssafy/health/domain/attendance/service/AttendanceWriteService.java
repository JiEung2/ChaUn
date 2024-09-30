package com.ssafy.health.domain.attendance.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.attendance.dto.response.AttendanceSuccessDto;
import com.ssafy.health.domain.attendance.entity.Attendance;
import com.ssafy.health.domain.attendance.repository.AttendanceRepository;
import com.ssafy.health.domain.coin.service.CoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AttendanceWriteService {

    private final CoinService coinService;
    private final UserRepository userRepository;
    private final AttendanceValidator attendanceValidator;
    private final AttendanceRepository attendanceRepository;

    public AttendanceSuccessDto markAttendance() {
        attendanceValidator.validateTodayAttendance();

        User user = findUserById(SecurityUtil.getCurrentUserId());
        attendanceRepository.save(Attendance.builder().user(user).build());

        coinService.giveAttendanceReward(user);

        return new AttendanceSuccessDto();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
