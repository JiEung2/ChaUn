import './DailyRecord.scss';

interface DailyRecordProps {
  time: string;
  calories: number;
}

export default function DailyRecord({ time, calories }:DailyRecordProps) {
  return (
    <div className="dailyRecord">
      <div className="recordItem">
        <p>⏱ 운동 시간</p>
        <span className="time">{time}</span>
      </div>
      <div className="recordItem">
        <p>🔥 칼로리</p>
        <span className="kcal">{calories} kcal</span>
      </div>
    </div>
  );
};
