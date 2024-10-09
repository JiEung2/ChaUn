import { useState, useEffect } from 'react';
import GeneralButton from '../../../components/Button/GeneralButton';
import ExerciseItem from '@/components/Exercise/ExerciseItem';
import DailyRecord from '../../../components/Home/Calendar/DailyRecord';
import CustomCalendar from '../../../components/Home/Calendar/CustomCalendar';
import { getExerciseHistory } from '@/api/exercise'; // 운동 기록 API
import './Calendar.scss';

export default function CalendarPage() {
  const today = new Date();
  today.setHours(12, 0, 0, 0); // 시간을 정오로 설정하여 UTC 변환 시 날짜 오류 방지
  const todayString = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(todayString);

  const [records, setRecords] = useState<
    Record<
      string,
      {
        types: { [key: string]: { time: string; calories: number } };
      } | null
    >
  >({});

  const [exerciseDates, setExerciseDates] = useState<Date[]>([]);

  const [attendanceDates, setAttendanceDates] = useState<Date[]>([]);
  const [isAttendance, setIsAttendance] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('전체');

  // 선택된 날짜에 대한 운동 기록 가져오기
  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendanceDates') || '[]');
    const storedLastAttendance = localStorage.getItem('lastAttendanceDate');
    setAttendanceDates(storedAttendance.map((date: string) => new Date(date)));

    const todayDate = new Date();
    todayDate.setHours(12, 0, 0, 0); // 시간을 정오로 설정하여 정확히 오늘 날짜가 되도록
    const todayDateString = todayDate.toISOString().split('T')[0];
    setIsAttendance(storedLastAttendance === todayDateString);

    setSelectedDate(todayDateString); // 렌더링 시 오늘 날짜로 설정
  }, []);

  // 특정 연도, 월의 운동 기록을 가져옴
  const fetchExerciseHistory = async (year: number, month: number) => {
    const data = await getExerciseHistory(year, month);
    const historyList = data.exerciseHistoryList.map((record: any) => ({
      ...record,
      createdAt: new Date(record.createdAt),
    }));
    setExerciseDates(historyList.map((record: any) => record.createdAt));

    const formattedRecords = historyList.reduce((acc: any, record: any) => {
      const dateKey = record.createdAt.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { types: {} };
      }
      acc[dateKey].types[record.exerciseName] = {
        time: new Date(record.exerciseDuration * 1000).toISOString().substr(11, 8),
        calories: record.burnedCalories,
      };
      return acc;
    }, {});

    setRecords(formattedRecords);
  };

  // 날짜 선택 시
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

  // 특정 연도, 월 변경 시 운동 기록 가져오기
  const handleMonthYearChange = (year: number, month: number) => {
    fetchExerciseHistory(year, month);
  };

  const record = records[selectedDate || ''];

  return (
    <div className="calendarPage">
      <div className="calendar">
        <CustomCalendar
          onDateChange={handleDateClick}
          onMonthYearChange={handleMonthYearChange}
          exerciseDates={exerciseDates}
          attendanceDates={attendanceDates}
          selectedDate={new Date(selectedDate!)}
        />
      </div>
      <GeneralButton
        buttonStyle={{ style: 'semiPrimary', size: 'large' }}
        onClick={handleAttendance}
        disabled={isAttendance}>
        출석하기
      </GeneralButton>
      <hr />
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
