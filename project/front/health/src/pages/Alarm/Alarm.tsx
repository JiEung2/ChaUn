import './Alarm.scss';
import bodyIcon from '@/assets/svg/home/Icon2.svg';
import battleStartIcon from '@/assets/svg/crewRecommend.svg';
import questIcon from '@/assets/svg/homeIcon1.svg';
import battleFinishIcon from '@/assets/svg/crewRanking.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RightArrow from '@/assets/svg/rightArrow.svg';
import { format } from 'date-fns';
import { getNotificationList, patchNotification } from '@/api/alarm';
import AlarmModal from '@/components/Alarm/AlarmModal';

interface Notification {
  notificationId: number;
  notificationType: string;
  additionalData?: {
    battleDetail: {
      myTeamName: string;
      myTeamScore: number;
      opponentTeamName: string;
      opponentTeamScore: number;
      exerciseName: string;
      battleStatus: string;
      battleId: number;
    };
  };
  content: string;
  createdAt: string;
}

export default function AlarmPage() {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<Notification | null>(null);

  // 알림 목록을 가져오는 함수
  const handleAlarms = async () => {
    try {
      const response = await getNotificationList();
      setAlarms(response.data.data); // API 응답이 제대로 도착하면 데이터 설정
    } catch (e) {
      console.error(`API 호출 중 에러 발생: ${e}`);
    }
  };

  // 알림 타입에 따라 다른 페이지로 이동 설정
  const handleNavigation = (alarm: Notification) => {
    if (alarm.notificationType === 'BATTLE' && alarm.additionalData) {
      const { battleStatus, battleId } = alarm.additionalData.battleDetail;
      switch (battleStatus) {
        case 'STARTED':
          navigate(`/crew/${battleId}/crewbattle`);
          patchNotification(alarm.notificationId);
          break;
        case 'FINISHED':
          setSelectedAlarm(alarm);
          setIsModalOpen(true);
          patchNotification(alarm.notificationId);
          break;
        default:
          break;
      }
    } else if (alarm.notificationType === 'SURVEY') {
      navigate('/record/bodyDetail');
      patchNotification(alarm.notificationId);
    } else if (alarm.notificationType === 'QUEST') {
      navigate('/home/quest');
      patchNotification(alarm.notificationId);
    }
  };

  // 아이콘 선택 함수
  const getIcon = (alarm: Notification) => {
    if (alarm.notificationType === 'BATTLE' && alarm.additionalData) {
      const { battleStatus } = alarm.additionalData.battleDetail;
      if (battleStatus === 'STARTED') {
        return battleStartIcon;
      } else if (battleStatus === 'FINISHED') {
        return battleFinishIcon;
      }
    } else if (alarm.notificationType === 'SURVEY') {
      return bodyIcon;
    } else if (alarm.notificationType === 'QUEST') {
      return questIcon;
    }
    return bodyIcon; // 기본 아이콘
  };

  // 날짜 포맷팅 함수 (24.07.01 08:02 형식)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yy.MM.dd HH:mm');
  };

  useEffect(() => {
    handleAlarms();
  }, []);

  return (
    <div className="alarmContainer">
      {alarms.map((alarm) => (
        <div className="alarmItemContainer" key={alarm.notificationId}>
          <img src={getIcon(alarm)} alt="Icon" className="alarmIcon" />
          <div className="messageContainer">
            <p className="message">{alarm.content}</p>
            <p className="date">{formatDate(alarm.createdAt)}</p>
          </div>
          <img src={RightArrow} alt="moveArrow" className="arrow" onClick={() => handleNavigation(alarm)} />
        </div>
      ))}

      {isModalOpen && selectedAlarm && selectedAlarm.additionalData && (
        <AlarmModal
          data={{
            battleId: selectedAlarm.additionalData.battleDetail.battleId,
            ourTeamName: selectedAlarm.additionalData.battleDetail.myTeamName,
            ourTeamSport: selectedAlarm.additionalData.battleDetail.exerciseName,
            ourTeamScore: selectedAlarm.additionalData.battleDetail.myTeamScore,
            opponentTeamName: selectedAlarm.additionalData.battleDetail.opponentTeamName,
            opponentTeamSport: selectedAlarm.additionalData.battleDetail.exerciseName,
            opponentTeamScore: selectedAlarm.additionalData.battleDetail.opponentTeamScore,
            crewCoins: 100,
            myCoin: 50, // 실제 데이터를 받아와야 함
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
