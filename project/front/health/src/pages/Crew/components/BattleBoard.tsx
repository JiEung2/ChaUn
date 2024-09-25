import './BattleBoard.scss';
import CloseButton from '@/assets/svg/xCircle.svg';
import Coin from '@/components/Coin/Coin';

interface BattleBoardProps {
  status: 'not-started' | 'started' | 'finished';
  ourTeamName?: string;
  opponentTeamName?: string;
  ourTeamSport?: string;
  opponentTeamSport?: string;
  ourTeamScore?: number;
  opponentTeamScore?: number;
  dDay?: string;
}

interface battleRewardProps {
  crewCoins: number;
}

export default function BattleBoard(
  {
    status,
    ourTeamName,
    opponentTeamName,
    ourTeamSport,
    opponentTeamSport,
    ourTeamScore,
    opponentTeamScore,
    dDay,
  }: BattleBoardProps,
  { crewCoins }: battleRewardProps
) {
  const renderContent = () => {
    switch (status) {
      case 'not-started':
        return (
          <div className="battle-board">
            <p>아직 참여중인 배틀이 없어요!</p>
            <button className="button join-crew">크루 배틀 입장</button>
          </div>
        );
      case 'started':
        return (
          <div className="battle-board">
            <div className="team-info">
              <div className="our-team">
                <p>{ourTeamName}</p>
                <p className="sport"># {ourTeamSport}</p>
                <p>{ourTeamScore}점</p>
              </div>
              <div className="vs-info">
                <div className="d-day"> 대결 D-{dDay}</div>
                <span>VS</span>
              </div>
              <div className="opponent-team">
                <p>{opponentTeamName}</p>
                <p className="sport"># {opponentTeamSport}</p>
                <p>{opponentTeamScore}점</p>
              </div>
            </div>
            <div className="score-bar" />
            <button className="button join-crew">크루 배틀 입장</button>
          </div>
        );
      case 'finished':
        return (
          <div className="battle-board">
            <div className="battleBoardTitle">
              <img src={CloseButton} alt="CloseButton" className="closeButton" />
              <p>배틀 결과</p>
            </div>
            <hr className="divider2" />
            <div className="team-info">
              <div className="our-team">
                <p>{ourTeamName}</p>
                <p className="sport"># {ourTeamSport}</p>
                <p>{ourTeamScore}점</p>
              </div>
              <div className="vs-info">
                <span>VS</span>
                <div className="finished">대결종료</div>
              </div>
              <div className="opponent-team">
                <p>{opponentTeamName}</p>
                <p className="sport"># {opponentTeamSport}</p>
                <p>{opponentTeamScore}점</p>
              </div>
            </div>
            <div className="battleReward">
              <p>보상</p>
              <hr className="divider2" />
              <div>
                <p>크루 저금통</p>
                <Coin amount={crewCoins} />
              </div>
            </div>
            <button className="button receive-reward">
              <p>확인</p>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="battle-board-container">{renderContent()}</div>;
}
