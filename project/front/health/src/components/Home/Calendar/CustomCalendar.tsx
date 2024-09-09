import 'react-calendar/dist/Calendar.css';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import './CustomCalendar.scss';

interface CustomCalendarProps {
  onDateChange: (date: Date) => void;
  onMonthYearChange: (year: number, month: number) => void;
  highlightDates: Date[]; // 강조할 날짜 목록
  selectedDate: Date; 
}

export default function CustomCalendar({ onDateChange, onMonthYearChange, highlightDates, selectedDate }: CustomCalendarProps) {
  const [_, setCurrentWeek] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // 날짜를 정규화하여 비교에 사용할 수 있는 포맷으로 변환
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // 주간 업데이트를 위한 함수
  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(date);
    startDate.setDate(diff);
    return new Date(startDate.setHours(0, 0, 0, 0));
  };

  const updateCurrentWeek = useCallback((date: Date) => {
    const startOfWeek = getStartOfWeek(date);
    const week = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000));
    setCurrentWeek(week);
  }, []);

  // 선택한 날짜의 주간을 업데이트
  useEffect(() => {
    if (selectedDate) {
      updateCurrentWeek(selectedDate);
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate, updateCurrentWeek]);

  // 년, 월 포맷 (2024. 09)
  const formatMonthYear = (_: string | undefined, date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}. ${month}`;
  };

  // 요일을 커스터마이징
  const renderWeekday = (_: string | undefined, date: Date): string => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  // 날짜를 클릭했을 때 이벤트 핸들러
  const onClickDay = (date: Date) => {
    onDateChange(date);
  };

  // 타일 스타일 설정 (오늘 날짜, 선택된 날짜 등)
  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    const classes = [];
    if (view === 'month') {
      if (date.getDay() === 6) {
        classes.push('saturday');
      }
      if (date.getDay() === 0) {
        classes.push('sunday');
      }
      if (normalizeDate(date).getTime() === normalizeDate(new Date()).getTime()) {
        classes.push('today'); // 오늘 날짜 표시
      }
      if (selectedDate && normalizeDate(date).getTime() === normalizeDate(selectedDate).getTime()) {
        classes.push('selected'); // 선택된 날짜 표시
      }
      if (highlightDates.some(highlightDate => normalizeDate(highlightDate).getTime() === normalizeDate(date).getTime())) {
        classes.push('highlight'); // 운동 기록 있는 날짜 표시
      }
    }
    return classes.join(' ');
  };

  // 타일의 커스텀 컨텐츠 (운동 기록이 있는 날)
  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const isHighlighted = highlightDates.some(
        (highlightDate) => highlightDate.toDateString() === date.toDateString()
      );

      if (isHighlighted) {
        return <div className="highlight-dot" />; // 운동 기록이 있는 날짜의 점 표시
      }
    }
    return null;
  };

  return (
    <div className='customCalendarContainer'>
      <Calendar
        activeStartDate={currentMonth}
        onActiveStartDateChange={({ activeStartDate }) => {
          const date = activeStartDate as Date;
          setCurrentMonth(date);
          onMonthYearChange(date.getFullYear(), date.getMonth() + 1);
        }}
        locale="en-US"
        formatMonthYear={(_, date) => formatMonthYear(_, date)}
        tileClassName={getTileClassName}
        tileContent={tileContent}
        formatShortWeekday={renderWeekday}
        showNeighboringMonth={false} // 이번 달이 아닌 날짜 숨김
        onClickDay={onClickDay}
      />
    </div>
  );
}
