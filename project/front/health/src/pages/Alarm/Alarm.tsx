// import AlarmItem from '@/components/Alarm/AlarmItem';

// type AlarmData = {
//   notificationId: number,
//   notificationType: string,
//   additionalData: string,
//   content: string,
//   createdAt: Date,

// }
// const alarmData = [
//     {
//       "notificationId": 1,
//       "notificationType": "BODY_SURVEY",
//       "additionalData": null,
//       "content": "테스트 알림 1",
//       "createdAt": "2024-09-20T00:00:00"
//     },
//     {
//       "notificationId": 2,
//       "notificationType": "BATTLE",
//       "additionalData": {
//           "battleId": 1
//       },
//       "content": "테스트 알림 2",
//       "createdAt": "2024-09-20T00:00:00"
//     },
// ];

export default function AlarmPage() {
  return (
    <div className="alarmContainer">
      {/* {alarmData.map((alarm, index) => (
        <AlarmItem key={index} type={alarm.type} date={alarm.date} time={alarm.time} />
      ))} */}
    </div>
  );
}