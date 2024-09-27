import './BattleBoard.scss';

interface BattleBoardProps {
  myTeamName: string;
  myTeamScore: number;
  opponentTeamName: string;
  opponentTeamScore: number;
  exerciseName: string;
  dDay: number;
  battleStatus: 'STARTED' | 'FINISHED' | 'WAITING' | 'NONE';
}

export default function BattleBoard({
  myTeamName,
  myTeamScore,
  opponentTeamName,
  opponentTeamScore,
  exerciseName,
  dDay,
  battleStatus,
}: BattleBoardProps) {
  const renderContent = () => {
    switch (battleStatus) {
      case 'NONE':
        return (
          <div className="battle-board">
            <p>아직 참여중인 배틀이 없어요!</p>
            <button className="button join-crew">크루 배틀 입장</button>
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
            <button className="button join-crew">크루 배틀 입장</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="battle-board-container">{renderContent()}</div>;
}
