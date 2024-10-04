import './AlarmModal.scss';
import CloseButton from '@/assets/svg/xCircle.svg';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '../Button/GeneralButton';
import { useMutation } from '@tanstack/react-query';
import { patchNotification } from '@/api/alarm';

interface ModalProps {
  data: {
    notificationId: number;
    battleId: number;
    ourTeamName: string;
    ourTeamSport: string;
    ourTeamScore: number;
    opponentTeamName: string;
    opponentTeamSport: string;
    opponentTeamScore: number;
    crewCoins: number;
    myCoin: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function AlarmModal({ data, isOpen, onClose }: ModalProps) {
  const { mutate } = useMutation({
    mutationFn: (notificationId: number) => patchNotification(notificationId),
    onSuccess: () => {
      console.log('알림이 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('알림 업데이트 중 오류 발생:', error);
    },
  });

  if (!isOpen) return null;

  const handleModalClose = () => {
    mutate(data.notificationId);
    onClose();
  };

  return (
    <div className="alarmModalOverlay" onClick={handleModalClose}>
      <div className="alarmModalContent" onClick={(e) => e.stopPropagation()}>
        <img src={CloseButton} alt="CloseButton" className="closeButton" onClick={handleModalClose} />
        <p className="battleResult">배틀 결과</p>
        <hr className="divider2" />

        <div className="teamInfo">
          <div className="ourTeam">
            <p>{data.ourTeamName}</p>
            <p className="sport"># {data.ourTeamSport}</p>
            <p>{data.ourTeamScore}점</p>
          </div>
          <div className="vsInfo">
            <span>VS</span>
            <div className="finished">대결종료</div>
          </div>
          <div className="opponentTeam">
            <p>{data.opponentTeamName}</p>
            <p className="sport"># {data.opponentTeamSport}</p>
            <p>{data.opponentTeamScore}점</p>
          </div>
        </div>
        <div className="battleReward">
          <p className="battleRewardTitle">보상</p>
          <hr className="divider2" />
          <div className="costDetail">
            <p className="costDetail">크루 저금통</p>
            <Coin amount={data.crewCoins} style="basic" />
          </div>
          <div className="costDetail">
            <p className="costDetail">개인 추가 보상</p>
            <Coin amount={data.myCoin} style="basic" />
          </div>
          <p className="rewardDescript">개인 추가 보상은 기여도 랭킹 3위까지 제공됩니다.</p>
        </div>
        <GeneralButton
          buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
          onClick={handleModalClose}
          className="checkButton">
          확인
        </GeneralButton>
      </div>
    </div>
  );
}
