package com.ssafy.health.domain.attendance.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.attendance.dto.response.AttendanceSuccessDto;
import com.ssafy.health.domain.attendance.entity.Attendance;
import com.ssafy.health.domain.attendance.repository.AttendanceRepository;
import com.ssafy.health.domain.coin.service.CoinService;
import com.ssafy.health.domain.quest.entity.QuestStatus;
import com.ssafy.health.domain.quest.service.QuestWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.concurrent.ExecutionException;

@Service
@Transactional
@RequiredArgsConstructor
public class AttendanceWriteService {

    private final CoinService coinService;
    private final UserRepository userRepository;
    private final AttendanceValidator attendanceValidator;
    private final AttendanceRepository attendanceRepository;
    private final QuestWriteService questWriteService;

    public AttendanceSuccessDto markAttendance() throws ExecutionException, InterruptedException {

        YearMonth yearMonth = YearMonth.from(LocalDateTime.now());
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(LocalTime.MAX);

        attendanceValidator.validateTodayAttendance();

        User user = findUserById(SecurityUtil.getCurrentUserId());
        attendanceRepository.save(Attendance.builder().user(user).build());

        coinService.giveAttendanceReward(user);

        // 출석 퀘스트 확인
        int attendCount = attendanceRepository
                .findByUserIdAndCreatedAtBetween(user.getId(), startOfMonth, endOfMonth).size();

        if (attendCount >= 14) {
            questWriteService.updateUserQuestStatus(user, "2주 이상 출석", QuestStatus.CREATED);
        }

        return new AttendanceSuccessDto();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
