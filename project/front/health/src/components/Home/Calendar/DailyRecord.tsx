import React from 'react';
import './DailyRecord.scss';

interface DailyRecordProps {
  time: string;
  calories: number;
}

const DailyRecord: React.FC<DailyRecordProps> = ({ time, calories }) => {
  return (
    <div className="dailyRecord">
      <div className="recordItem">
        <span>⏰ 운동 시간</span>
        <span>{time}</span>
      </div>
      <div className="recordItem">
        <span>🔥 칼로리</span>
        <span>{calories}kcal</span>
      </div>
    </div>
  );
};

export default DailyRecord;
