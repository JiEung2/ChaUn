import '@/components/Alarm/AlarmItem.scss';
import './Alarm.scss';
import Icon from '@/assets/svg/home/Icon2.svg';
import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/svg/rightArrow.svg';
import { format } from 'date-fns'; // date-fns를 사용하여 날짜 형식 변환

interface AlarmData {
  notificationId: number;
  notificationType: string;
  additionalData?: any[] | null;
  content: string;
  createdAt: string;
}

interface AlarmPageProps {
  alarms?: AlarmData[]; // 알림 데이터를 props로 받음 (optional로 변경)
}

// 화살표 누르면 notificationId를 패치로 보내주기
// get으로 받을 때 additonalData : 코인
// 샘플 데이터
const sampleAlarmData: AlarmData[] = [
  {
    notificationId: 1,
    notificationType: 'BODY_SURVEY',
    additionalData: null,
    content: '테스트 알림 1',
    createdAt: '2024-09-20T00:00:00',
  },
  {
    notificationId: 2,
    notificationType: 'BATTLE',
    additionalData: [{ battleId: 1 }],
    content: '테스트 알림 2',
    createdAt: '2024-09-20T00:00:00',
  },
];

export default function AlarmPage({ alarms = sampleAlarmData }: AlarmPageProps) {
  const navigate = useNavigate();

  // 알림 타입에 따라 다른 페이지로 이동 설정
  const handleNavigation = (notificationType: string) => {
    switch (notificationType) {
      case 'BODY_SURVEY':
        navigate('/record/bodyDetail');
        break;
      case 'BATTLE':
        navigate('/battle/result');
        break;
      case 'BATTLE_STARTED':
        navigate('/battle/status');
        break;
      default:
        break;
    }
  };

  // 날짜 포맷팅 함수 (24.07.01 08:02 형식)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yy.MM.dd HH:mm'); // 원하는 형식으로 변환
  };

  return (
    <div className="alarmContainer">
      {alarms.map((alarm) => (
        <div className="alarmItemContainer" key={alarm.notificationId}>
          <img src={Icon} alt="Icon" className="alarmIcon" />
          <div className="messageContainer">
            <p className="message">{alarm.content}</p>
            <p className="date">{formatDate(alarm.createdAt)}</p> {/* 날짜 포맷팅 */}
          </div>
          <img
            src={RightArrow}
            alt="moveArrow"
            className="arrow"
            onClick={() => handleNavigation(alarm.notificationType)} // 알림 타입에 따라 이동
          />
        </div>
      ))}
    </div>
  );
}
