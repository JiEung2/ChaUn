import { useQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse, getBattleRanking } from '../../../api/crew';
import queryKeys from '@/utils/querykeys';
import { useParams } from 'react-router-dom';
import BattleBoard from '../components/BattleBoard';
import './CrewBattle.scss';
import ButtonState from '../components/ButtonState';
import BattleNoneImg from '../../../assets/svg/battlenoneImg.svg';
import CrewAndMemberList from '../../../components/Crew/CrewAndMemberList';
import { useState } from 'react';

export default function CrewBattle() {
  const { crewId } = useParams<{ crewId: string }>();

  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  const handleTeamSwitch = (team: 'home' | 'away') => {
    setSelectedTeam(team);
  };

  // Fetch battle data
  const { data: battleData, isLoading: isBattleDataLoading } = useQuery<CrewBattleStatusResponse>({
    queryKey: [queryKeys.BATTLE_STATUS, Number(crewId)],
    queryFn: () => fetchCrewBattleStatus(Number(crewId)),
    enabled: !!crewId, // crewId가 있을 때만 쿼리를 실행
  });

  // Fetch ranking data, use dummy battleId = 3 for now
  const battleId = 3;
  const { data: battleRankings, isLoading: isRankingsLoading } = useQuery({
    queryKey: [queryKeys.BATTLE_RANKING, battleId],
    queryFn: () => getBattleRanking(Number(battleId)),
  });

  // Handle loading or error state
  if (isBattleDataLoading || isRankingsLoading) {
    return <div>Loading...</div>;
  }

  if (!battleData) {
    return <div>No battle data available.</div>;
  }

  return (
    <div>
      {battleData.battleStatus === 'NONE' ? (
        <div className="none">
          <h3>배틀 중인 크루</h3>
          <BattleBoard
            crewId={Number(crewId)}
            battleId={battleData.battleId}
            battleStatus={battleData.battleStatus}
            dDay={battleData.dDay}
            exerciseName={battleData.exerciseName}
            myTeamName={battleData.myTeamName}
            myTeamScore={battleData.myTeamScore}
            opponentTeamName={battleData.opponentTeamName}
            opponentTeamScore={battleData.opponentTeamScore}
            buttonState={ButtonState.RANDOM_MATCHING}
          />
          <div className="ranking__none">
            <div className="noneContainer">
              <img src={BattleNoneImg} alt="" />
              <span>
                배틀을 시작하지 않아서 <br />
                아직 순위 정보가 없어요!
              </span>
            </div>
          </div>
        </div>
      ) : battleData.battleStatus === 'STARTED' ? (
        <div className="started">
          <h3>배틀 중인 크루</h3>
          <BattleBoard
            crewId={Number(crewId)}
            battleId={battleData.battleId}
            battleStatus={battleData.battleStatus}
            dDay={battleData.dDay}
            exerciseName={battleData.exerciseName}
            myTeamName={battleData.myTeamName}
            myTeamScore={battleData.myTeamScore}
            opponentTeamName={battleData.opponentTeamName}
            opponentTeamScore={battleData.opponentTeamScore}
            buttonState={ButtonState.NONE}
          />
          <div className="ranking__started">
            <div className="team-toggle">
              <button
                onClick={() => handleTeamSwitch('home')}
                className={`team-btn ${selectedTeam === 'home' ? 'active' : ''}`}>
                {battleData.myTeamName}
              </button>
              <button
                onClick={() => handleTeamSwitch('away')}
                className={`team-btn ${selectedTeam === 'away' ? 'active' : ''}`}>
                {battleData.opponentTeamName}
              </button>
            </div>
            <div className="ranking__list">
              {selectedTeam === 'home' ? (
                <CrewAndMemberList type="member" data={battleRankings?.homeCrewMembers} />
              ) : (
                <CrewAndMemberList type="member" data={battleRankings?.awayCrewMembers} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Invalid battle status.</div>
      )}
    </div>
  );
}
