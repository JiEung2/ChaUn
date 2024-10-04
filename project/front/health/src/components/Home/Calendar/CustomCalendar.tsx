import 'react-calendar/dist/Calendar.css';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import './CustomCalendar.scss';

interface CustomCalendarProps {
  onDateChange: (date: Date) => void;
  onMonthYearChange: (year: number, month: number) => void;
  exerciseDates: Date[]; // 운동 기록 날짜
  attendanceDates: Date[]; // 출석 체크 날짜
  selectedDate: Date;
}

export default function CustomCalendar({
  onDateChange,
  onMonthYearChange,
  exerciseDates,
  attendanceDates,
  selectedDate,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

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
    setCurrentMonth(date);
    console.log(week)
  }, []);

  useEffect(() => {
    if (selectedDate) {
      updateCurrentWeek(selectedDate);
    }
  }, [selectedDate, updateCurrentWeek]);

  const formatMonthYear = (_: string | undefined, date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}. ${month}`;
  };

  const renderWeekday = (_: string | undefined, date: Date): string => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  const onClickDay = (date: Date) => {
    onDateChange(date);
  };

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
        classes.push('today');
      }
      if (selectedDate && normalizeDate(date).getTime() === normalizeDate(selectedDate).getTime()) {
        classes.push('selected');
      }
      if (exerciseDates.some(exerciseDate => normalizeDate(exerciseDate).getTime() === normalizeDate(date).getTime())) {
        classes.push('highlight');
      }
      if (attendanceDates.some(attendanceDate => normalizeDate(attendanceDate).getTime() === normalizeDate(date).getTime())) {
        classes.push('attendance');
      }
    }
    return classes.join(' ');
  };

  // 날짜가 exerciseDates에 포함된 경우 점을 찍도록 설정
  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const isExerciseDate = exerciseDates.some(
        (exerciseDate) => 
          exerciseDate.getFullYear() === date.getFullYear() &&
          exerciseDate.getMonth() === date.getMonth() &&
          exerciseDate.getDate() === date.getDate()
      );

      if (isExerciseDate) {
        return <div className="highlight-dot" />; // 점을 찍기 위한 요소
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
        showNeighboringMonth={false}
        onClickDay={onClickDay}
        showNavigation={true}
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
}
