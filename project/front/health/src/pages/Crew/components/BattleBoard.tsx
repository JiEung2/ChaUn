import './BattleBoard.scss';
import Coin from '../../../assets/svg/coin.svg';

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

export default function BattleBoard({
  status,
  ourTeamName,
  opponentTeamName,
  ourTeamSport,
  opponentTeamSport,
  ourTeamScore,
  opponentTeamScore,
  dDay,
}: BattleBoardProps) {
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
            <div className="score-bar" />
            <button className="button receive-reward">
              <img src={Coin} alt="coin" />
              <p>보상받기</p>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="battle-board-container">{renderContent()}</div>;
}
