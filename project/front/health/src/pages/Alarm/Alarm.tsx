import AlarmItem from '@/components/Alarm/AlarmItem';

const alarmData = [
  { type: 'prediction', date: '24.07.01', time: '08:02' },
  { type: 'prediction', date: '24.07.01', time: '08:02' },
  { type: 'battleEnded', date: '24.07.01', time: '08:02' },
  { type: 'battleStarted', date: '24.07.01', time: '08:02' },
];

export default function AlarmPage() {
  return (
    <div className="alarmContainer">
      {alarmData.map((alarm, index) => (
        <AlarmItem key={index} type={alarm.type} date={alarm.date} time={alarm.time} />
      ))}
    </div>
  );
}