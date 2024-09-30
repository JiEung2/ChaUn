import './AlarmModal.scss';
import CloseButton from '@/assets/svg/xCircle.svg';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '../Button/GeneralButton';
interface ModalProps {
  data: {
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
  if (!isOpen) return null;

  return (
    <div className="alarmModalOverlay" onClick={onClose}>
      <div className="alarmModalContent">
        <img src={CloseButton} alt="CloseButton" className="xloseButton" onClick={onClose} />
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
        <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={onClose} className="checkButton">
          확인
        </GeneralButton>
      </div>
    </div>
  );
}
