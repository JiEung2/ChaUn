import { useState, useEffect, Suspense } from 'react';
import GeneralButton from '../../../components/Button/GeneralButton';
import ExerciseItem from '@/components/Exercise/ExerciseItem';
import DailyRecord from '../../../components/Home/Calendar/DailyRecord';
import CustomCalendar from '../../../components/Home/Calendar/CustomCalendar';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getExerciseHistory } from '@/api/exercise';

import './Calendar.scss';
import querykeys from '@/utils/querykeys';

export default function CalendarPage() {
  const today = new Date();
  today.setHours(12, 0, 0, 0); // 시간을 정오로 설정하여 UTC 변환 시 날짜 오류 방지
  const todayString = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(todayString);
  const [activeTab, setActiveTab] = useState<string>('전체');
  const [attendanceDates, setAttendanceDates] = useState<Date[]>([]);
  const [isAttendance, setIsAttendance] = useState<boolean>(false);
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth() + 1);
  // React Query를 이용해 데이터를 fetch
  const { data: exerciseRecords } = useSuspenseQuery({
    queryKey: [querykeys.EXERCISE_HISTORY_MONTH, year, month],
    queryFn: () => getExerciseHistory(year, month),
  });

  // records 형식의 데이터 정리
  const records = exerciseRecords?.reduce(
    (acc: Record<string, { types: { [key: string]: { time: string; calories: number } } }>, record: any) => {
      const date = new Date(record.createdAt).toISOString().split('T')[0];
      if (acc[date]) {
        acc[date].types[record.exerciseName] = {
          time: new Date(record.exerciseDuration * 1000).toISOString().substr(11, 8),
          calories: record.burnedCalories,
        };
      } else {
        acc[date] = {
          types: {
            [record.exerciseName]: {
              time: new Date(record.exerciseDuration * 1000).toISOString().substr(11, 8),
              calories: record.burnedCalories,
            },
          },
        };
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendanceDates') || '[]');
    const storedLastAttendance = localStorage.getItem('lastAttendanceDate');
    setAttendanceDates(storedAttendance.map((date: string) => new Date(date)));
    const todayDate = new Date();
    todayDate.setHours(12, 0, 0, 0);
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
      todayDate.setHours(12, 0, 0, 0);
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

  const record = records ? records[selectedDate || ''] : null;

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <div className="calendarPage">
        <div className="calendar">
          <CustomCalendar
            onDateChange={handleDateClick}
            onMonthYearChange={(year, month) => console.log(`Year: ${year}, Month: ${month}`)}
            exerciseDates={Object.keys(records || {}).map((date) => new Date(date))}
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
    </Suspense>
  );
}
