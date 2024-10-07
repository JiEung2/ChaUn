import './Alarm.scss';
import bodyIcon from '@/assets/svg/home/Icon2.svg';
import battleStartIcon from '@/assets/svg/crewRecommend.svg';
import questIcon from '@/assets/svg/homeIcon1.svg';
import battleFinishIcon from '@/assets/svg/crewRanking.svg';
import bellOffImage from '@/assets/svg/bellOff.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RightArrow from '@/assets/svg/rightArrow.svg';
import { format } from 'date-fns';
import { getNotificationList, patchNotification } from '@/api/alarm';
import AlarmModal from '@/components/Alarm/AlarmModal';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import querykeys from '@/utils/querykeys';

interface Notification {
  notificationId: number;
  notificationType: string;
  additionalData?: {
    battleDetail?: {
      myTeamName: string;
      myTeamScore: number;
      opponentTeamName: string;
      opponentTeamScore: number;
      exerciseName: string;
      battleStatus: string;
      battleId: number;
    };
    coinDetail?: {
      crewCoin: number;
      myCoin: number;
    };
    questDetail?: {
      type: string;
      questId: number;
      crewId?: number;
      crewName?: string;
      title: string;
      coins: number;
    };
  };
  content: string;
  createdAt: string;
}

export default function AlarmPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: [querykeys.NOTIFICATION] });
      console.log(data);
    },
    onError(error) {
      console.error('에러 발생: ', error.message);
    },
  });

  // 알림 타입에 따라 다른 페이지로 이동 설정
  const handleNavigation = (alarm: Notification) => {
    if (alarm.notificationType === 'BATTLE' && alarm.additionalData) {
      const battleStatus = alarm.additionalData.battleDetail?.battleStatus;
      const battleId = alarm.additionalData.battleDetail?.battleId;
      switch (battleStatus) {
        case 'STARTED':
          mutate(alarm.notificationId);
          navigate(`/crew/crewbattle/${battleId}`);
          break;
        case 'FINISHED':
          setSelectedAlarm(alarm);
          setIsModalOpen(true);
          break;
        default:
          break;
      }
    } else if (alarm.notificationType === 'SURVEY') {
      mutate(alarm.notificationId);
      navigate('/record/bodyDetail');
    } else if (alarm.notificationType === 'QUEST' && alarm.additionalData?.questDetail) {
      const { type, crewId } = alarm.additionalData.questDetail;
      if (type === 'CREW') {
        mutate(alarm.notificationId);
        navigate(`/crew/${crewId}/detail`);
      } else if (type === 'INDIVIDUAL') {
        mutate(alarm.notificationId);
        navigate('/home/quest');
      }
    }
  };

  // 아이콘 선택 함수
  const getIcon = (alarm: Notification) => {
    if (alarm.notificationType === 'BATTLE' && alarm.additionalData?.battleDetail) {
      const { battleStatus } = alarm.additionalData?.battleDetail;
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

  // 알림 메시지 렌더링 함수
  const renderMessage = (alarm: Notification) => {
    const { questDetail } = alarm.additionalData || {};
    const { battleDetail } = alarm.additionalData || {};

    if (questDetail?.type === 'INDIVIDUAL') {
      return (
        <p className="message">
          {alarm.content} <span className="alarmSpan">+ {questDetail.coins}</span>
        </p>
      );
    }

    if (questDetail?.type === 'CREW') {
      return (
        <p className="message">
          <span>{questDetail.crewName}</span>의 '{questDetail.title}' {alarm.content}
        </p>
      );
    }

    if (battleDetail) {
      return (
        <p className="message">
          <span>{battleDetail.myTeamName}</span>의 {alarm.content}
        </p>
      );
    }

    return <p className="message">{alarm.content}</p>;
  };
  // console.log(alarmList.data.data.length);

  return (
    <div className="alarmContainer">
      {alarmList.data.length > 0 ? (
        alarmList.data.data.map((alarm: Notification) => (
          <div className="alarmItemContainer" key={alarm.notificationId}>
            <img src={getIcon(alarm)} alt="Icon" className="alarmIcon" />
            <div className="messageContainer">
              {renderMessage(alarm)}
              <p className="date">{formatDate(alarm.createdAt)}</p>
            </div>
            <img src={RightArrow} alt="moveArrow" className="arrow" onClick={() => handleNavigation(alarm)} />
          </div>
        ))
      ) : (
        <div className="noAlarm">
          <img src={bellOffImage} alt="noAlarm" />
          <p className="noAlarmMessage">
            새로운 알림이 없습니다. <br /> 크루 활동 및 퀘스트를 통해 알림을 받아보세요.
          </p>
        </div>
      )}

      {isModalOpen && selectedAlarm && selectedAlarm.additionalData?.battleDetail && (
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
            crewCoins: selectedAlarm.additionalData.coinDetail?.crewCoin ?? 0,
            myCoin: selectedAlarm.additionalData.coinDetail?.myCoin ?? 0,
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
