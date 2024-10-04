import './BattleBoard.scss';
import { useNavigate } from 'react-router-dom';

interface BattleBoardProps {
  crewId: number;
  battleId: number;
  myTeamName: string;
  myTeamScore: number;
  opponentTeamName: string;
  opponentTeamScore: number;
  exerciseName: string;
  dDay: number;
  battleStatus: string;
  showButton?: boolean;
}

export default function BattleBoard({
  crewId,
  battleId,
  myTeamName,
  myTeamScore,
  opponentTeamName,
  opponentTeamScore,
  exerciseName,
  dDay,
  battleStatus,
  showButton,
}: BattleBoardProps) {
  const navigate = useNavigate();
  console.log(crewId);
  const navigateBattlePage = () => {
    navigate(`/crew/battle/${crewId}`);
  };

  const renderContent = () => {
    switch (battleStatus) {
      case 'NONE':
        return (
          <div className="battle-board">
            <p>아직 참여중인 배틀이 없어요!</p>
            {showButton && (
              <button className="button join-crew" onClick={navigateBattlePage}>
                크루 배틀 입장
              </button>
            )}
          </div>
        );
      case 'STARTED':
        return (
          <div className="battle-board">
            <div className="team-info">
              <div className="our-team">
                <p>{myTeamName}</p>
                <p className="sport"># {exerciseName}</p>
                <p>{myTeamScore}점</p>
              </div>
              <div className="vs-info">
                <div className="d-day">대결 D-{dDay}</div>
                <span>VS</span>
              </div>
              <div className="opponent-team">
                <p>{opponentTeamName}</p>
                <p className="sport"># {exerciseName}</p>
                <p>{opponentTeamScore}점</p>
              </div>
            </div>
            <div className="score-bar" />
            {showButton && (
              <button className="button join-crew" onClick={navigateBattlePage}>
                크루 배틀 입장
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="battle-board-container">{renderContent()}</div>;
}
