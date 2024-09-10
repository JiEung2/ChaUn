import { useState } from 'react';
import GeneralButton from '../../../components/Button/GeneralButton';
import DailyRecord from '../../../components/Home/Calendar/DailyRecord';
import CustomCalendar from '../../../components/Home/Calendar/CustomCalendar';
import './Calendar.scss';

export default function CalendarPage () {
  // 기본값을 오늘 날짜로 설정
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 오늘 날짜를 얻음
  const [selectedDate, setSelectedDate] = useState<string | null>(today); // 기본값을 오늘 날짜로 설정
  const [records, _] = useState<Record<string, { time: string; calories: number } | null>>({
    '2024-09-10': { time: '01:23:02', calories: 596 },
    // 추가적인 날짜와 기록을 여기 추가할 수 있습니다.
  });
  const [highlightDates, __] = useState<Date[]>([
    new Date('2024-09-10'), // 운동 기록이 있는 날짜 예시
    // 추가적인 강조 날짜를 여기에 추가할 수 있습니다.
  ]);

  const handleDateClick = (date: Date) => {
    date.setHours(12, 0, 0, 0); // 시간 오차 방지를 위해 날짜를 정오로 설정
    setSelectedDate(date.toISOString().split('T')[0]); // 'YYYY-MM-DD' 형식으로 변환하여 설정
  };

  const handleMonthYearChange = (year: number, month: number) => {
    // 선택한 년, 월이 바뀔 때 추가적인 로직을 처리할 수 있음
    console.log(`Year: ${year}, Month: ${month}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  const record = records[selectedDate || ''];

  return (
    <div className="calendarPage">
      <div className="calendar">
        <CustomCalendar 
          onDateChange={handleDateClick} 
          onMonthYearChange={handleMonthYearChange} 
          highlightDates={highlightDates} 
          selectedDate={new Date(selectedDate!)} // 선택된 날짜를 Date 객체로 전달
        />
      </div>
      <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'large' }}>출석하기</GeneralButton>
      {selectedDate && (
        <div className="dailyRecordSection">
          <div>{formatDate(selectedDate)}</div>
          <div>일일 운동 기록</div>
          {record ? (
            <DailyRecord time={record.time} calories={record.calories} />
          ) : (
            <p>해당 날짜에 운동 기록이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};
