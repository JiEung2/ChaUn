import './Alarm.scss';
import bodyIcon from '@/assets/svg/home/Icon2.svg';
import battleStartIcon from '@/assets/svg/crewRecommend.svg';
import questIcon from '@/assets/svg/homeIcon1.svg';
import battleFinishIcon from '@/assets/svg/crewRanking.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RightArrow from '@/assets/svg/rightArrow.svg';
import { format } from 'date-fns';
import { getNotificationList, patchNotification } from '@/api/alarm';
import AlarmModal from '@/components/Alarm/AlarmModal';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import querykeys from '@/utils/querykeys';

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
    coinDetail: {
      crewCoin: number;
      myCoin: number;
    };
  };
  content: string;
  createdAt: string;
}

export default function AlarmPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<Notification | null>(null);

  // 알림 목록 가져오기
  const { data: alarmList } = useSuspenseQuery({
    queryKey: [querykeys.NOTIFICATION],
    queryFn: () => getNotificationList(),
  });

  // 알림 상태 변경을 위한 mutation 생성
  const { mutate } = useMutation({
    mutationFn: (notificationId: number) => patchNotification(notificationId),
    onSuccess(data) {
      console.log('mutate', data);
    },
  });

  // 알림 타입에 따라 다른 페이지로 이동 설정
  const handleNavigation = (alarm: Notification) => {
    if (alarm.notificationType === 'BATTLE' && alarm.additionalData) {
      const { battleStatus, battleId } = alarm.additionalData.battleDetail;
      switch (battleStatus) {
        case 'STARTED':
          navigate(`/crew/${battleId}/crewbattle`);
          mutate(alarm.notificationId);
          break;
        case 'FINISHED':
          setSelectedAlarm(alarm);
          setIsModalOpen(true);
          break;
        default:
          break;
      }
    } else if (alarm.notificationType === 'SURVEY') {
      navigate('/record/bodyDetail');
      mutate(alarm.notificationId);
    } else if (alarm.notificationType === 'QUEST') {
      navigate('/home/quest');
      mutate(alarm.notificationId);
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
    return bodyIcon;
  };

  // 날짜 포맷팅 함수 (24.07.01 08:02 형식)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yy.MM.dd HH:mm');
  };

  return (
    <div className="alarmContainer">
      {alarmList.data.data.map((alarm: any) => (
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
            notificationId: selectedAlarm.notificationId,
            battleId: selectedAlarm.additionalData.battleDetail.battleId,
            ourTeamName: selectedAlarm.additionalData.battleDetail.myTeamName,
            ourTeamSport: selectedAlarm.additionalData.battleDetail.exerciseName,
            ourTeamScore: selectedAlarm.additionalData.battleDetail.myTeamScore,
            opponentTeamName: selectedAlarm.additionalData.battleDetail.opponentTeamName,
            opponentTeamSport: selectedAlarm.additionalData.battleDetail.exerciseName,
            opponentTeamScore: selectedAlarm.additionalData.battleDetail.opponentTeamScore,
            crewCoins: selectedAlarm.additionalData.coinDetail.crewCoin,
            myCoin: selectedAlarm.additionalData.coinDetail.myCoin,
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
