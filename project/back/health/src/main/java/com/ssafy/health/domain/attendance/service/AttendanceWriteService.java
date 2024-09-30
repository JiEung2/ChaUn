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
import com.ssafy.health.domain.quest.entity.UserQuest;
import com.ssafy.health.domain.quest.repository.UserQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;

@Service
@Transactional
@RequiredArgsConstructor
public class AttendanceWriteService {

    private final CoinService coinService;
    private final UserRepository userRepository;
    private final AttendanceValidator attendanceValidator;
    private final AttendanceRepository attendanceRepository;
    private final UserQuestRepository userQuestRepository;

    public AttendanceSuccessDto markAttendance() {

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
            UserQuest quest = userQuestRepository.findUserQuestWithCriteria(
                    user, QuestStatus.CREATED, "2주 이상 출석");

            // TODO: 퀘스트 완료 알림 전송
            quest.updateStatus(QuestStatus.COMPLETED);
            coinService.grantCoins(user, quest.getQuest().getCompletionCoins());
        }

        return new AttendanceSuccessDto();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
