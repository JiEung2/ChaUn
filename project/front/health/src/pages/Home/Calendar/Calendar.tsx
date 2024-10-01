import { useState, useEffect } from 'react';
import GeneralButton from '../../../components/Button/GeneralButton';
import ExerciseItem from '@/components/Exercise/ExerciseItem';
import DailyRecord from '../../../components/Home/Calendar/DailyRecord';
import CustomCalendar from '../../../components/Home/Calendar/CustomCalendar';
import { getExerciseHistory } from '@/api/exercise';
import './Calendar.scss';
//TODO - 특정 달의 운동 기록을 모두 가져와 캘린더로 필터링하여 보여주는 방식?
export default function CalendarPage() {
  const today = new Date();
  today.setHours(12, 0, 0, 0); // 시간을 정오로 설정하여 UTC 변환 시 날짜 오류 방지
  const todayString = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(todayString);

  const [records] = useState<
    Record<
      string,
      {
        types: { [key: string]: { time: string; calories: number } };
      } | null
    >
  >({
    '2024-09-10': {
      types: {
        전체: { time: '01:23:02', calories: 596 },
        요가: { time: '00:30:00', calories: 150 },
        필라테스: { time: '00:53:02', calories: 446 },
      },
    },
  });

  interface exerciseRecord {
    id: number;
    exerciseDuration: number;
    burnedCalories: number;
    exerciseName: string;
    createdAt: string;
  }
  const [exerciseDates] = useState<Date[]>([]);

  const [attendanceDates, setAttendanceDates] = useState<Date[]>([]);
  const [isAttendance, setIsAttendance] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('전체');
  // 문제 있을 경우 아래 코드를 수정
  const getExerciseHistoryData = async (sendYear: number, sendMonth: number) => {
    try {
      const response = await getExerciseHistory(sendYear, sendMonth);
      console.log(response);
      response.forEach((record: exerciseRecord) => {
        const date = new Date(record.createdAt);
        const dateString = date.toISOString().split('T')[0];
        if (records[dateString]) {
          records[dateString]!.types[record.exerciseName] = {
            time: new Date(record.exerciseDuration * 1000).toISOString().substr(11, 8),
            calories: record.burnedCalories,
          };
        } else {
          records[dateString] = {
            types: {
              [record.exerciseName]: {
                time: new Date(record.exerciseDuration * 1000).toISOString().substr(11, 8),
                calories: record.burnedCalories,
              },
            },
          };
        }
      }, []);
    } catch (error) {
      console.error('운동 기록 불러오기 실패', error);
    }
  };
  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendanceDates') || '[]');
    const storedLastAttendance = localStorage.getItem('lastAttendanceDate');
    setAttendanceDates(storedAttendance.map((date: string) => new Date(date)));
    getExerciseHistoryData(today.getFullYear(), today.getMonth() + 1); // 이번 달의 운동 기록을 가져옴
    const todayDate = new Date();
    todayDate.setHours(12, 0, 0, 0); // 시간을 정오로 설정하여 정확히 오늘 날짜가 되도록
    const todayDateString = todayDate.toISOString().split('T')[0];
    setIsAttendance(storedLastAttendance === todayDateString);

    setSelectedDate(todayDateString); // 렌더링 시 오늘 날짜로 설정
  }, []);

  const handleDateClick = (date: Date) => {
    date.setHours(12, 0, 0, 0); // 선택된 날짜의 시간을 정오로 설정
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleAttendance = () => {
    if (!isAttendance) {
      const todayDate = new Date();
      todayDate.setHours(12, 0, 0, 0); // 시간을 정오로 설정하여 정확한 날짜로 기록
      const todayDateString = todayDate.toISOString().split('T')[0];
      const newAttendanceDates = [...attendanceDates, todayDate];
      setAttendanceDates(newAttendanceDates);
      localStorage.setItem(
        'attendanceDates',
        JSON.stringify(newAttendanceDates.map((date) => date.toISOString().split('T')[0]))
      );
      localStorage.setItem('lastAttendanceDate', todayDateString);
      setIsAttendance(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const record = records[selectedDate || ''];

  return (
    <div className="calendarPage">
      <div className="calendar">
        <CustomCalendar
          onDateChange={handleDateClick}
          onMonthYearChange={(year, month) => console.log(`Year: ${year}, Month: ${month}`)}
          exerciseDates={exerciseDates}
          attendanceDates={attendanceDates}
          selectedDate={new Date(selectedDate!)}
        />
      </div>
      <GeneralButton
        buttonStyle={{ style: 'semiPrimary', size: 'large' }}
        onClick={handleAttendance}
        disabled={isAttendance}
        className="attendance">
        출석하기
      </GeneralButton>
      <hr className="attendanceHr" />
      {selectedDate && (
        <>
          <div>{formatDate(selectedDate)}</div>
          <div className="recordTitle">일일 운동 기록</div>
          <div className="dailyRecordSection">
            <div className="tabButtons">
              {record &&
                Object.keys(record.types).map((type) => (
                  <ExerciseItem
                    key={type}
                    label={type}
                    selected={activeTab === type}
                    onClick={() => setActiveTab(type)}
                  />
                ))}
            </div>
            {record && record.types[activeTab] ? (
              <DailyRecord time={record.types[activeTab].time} calories={record.types[activeTab].calories} />
            ) : (
              <p>해당 날짜에 운동 기록이 없습니다.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
