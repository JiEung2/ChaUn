import { useQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse, getBattleRanking } from '../../../api/crew';
import queryKeys from '@/utils/querykeys';
import { useParams } from 'react-router-dom';
import BattleBoard from '../components/BattleBoard';
import './CrewBattle.scss';
import ButtonState from '../components/ButtonState';
import BattleNoneImg from '../../../assets/svg/battlenoneImg.svg';
import CrewAndMemberList from '../../../components/Crew/CrewAndMemberList';
import { useState, useEffect } from 'react';
import useBattleDataStore from '@/store/battleInfo';

export default function CrewBattle() {
  const { crewId } = useParams<{ crewId: string }>();
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  const { battles, setBattleData } = useBattleDataStore();

  const existingBattle = battles.find((battle) => battle.crewId === Number(crewId));

  const handleTeamSwitch = (team: 'home' | 'away') => {
    setSelectedTeam(team);
  };

  // 배틀 현황
  const { data: battleData, isLoading: isBattleDataLoading } = useQuery<CrewBattleStatusResponse>({
    queryKey: [queryKeys.BATTLE_STATUS, Number(crewId)],
    queryFn: () => fetchCrewBattleStatus(Number(crewId)),
    enabled: !!crewId && !existingBattle, //
  });

  useEffect(() => {
    if (battleData) {
      console.log(battleData);
      setBattleData({ ...battleData, crewId: Number(crewId) });
    }
  }, [battleData]);

  const battleToRender = existingBattle || battleData;

  // 배틀 랭킹
  const battleId = battleToRender ? battleToRender.battleId : 0;
  const { data: battleRankings, isLoading: isRankingsLoading } = useQuery({
    queryKey: [queryKeys.BATTLE_RANKING, battleId],
    queryFn: () => getBattleRanking(Number(battleId)),
  });

  if (isBattleDataLoading || isRankingsLoading) {
    return <div>Loading...</div>;
  }

  if (!battleToRender) {
    return <div>No battle data available.</div>;
  }

  return (
    <div>
      {battleToRender.battleStatus === 'NONE' ? (
        <div className="none">
          <h3>배틀 중인 크루</h3>
          <BattleBoard
            crewId={Number(crewId)}
            battleId={battleToRender.battleId}
            battleStatus={battleToRender.battleStatus}
            dDay={battleToRender.dDay}
            exerciseName={battleToRender.exerciseName}
            myTeamName={battleToRender.myTeamName}
            myTeamScore={battleToRender.myTeamScore}
            opponentTeamName={battleToRender.opponentTeamName}
            opponentTeamScore={battleToRender.opponentTeamScore}
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
      ) : battleToRender.battleStatus === 'STARTED' ? (
        <div className="started">
          <h3>배틀 중인 크루</h3>
          <BattleBoard
            crewId={Number(crewId)}
            battleId={battleToRender.battleId}
            battleStatus={battleToRender.battleStatus}
            dDay={battleToRender.dDay}
            exerciseName={battleToRender.exerciseName}
            myTeamName={battleToRender.myTeamName}
            myTeamScore={battleToRender.myTeamScore}
            opponentTeamName={battleToRender.opponentTeamName}
            opponentTeamScore={battleToRender.opponentTeamScore}
            buttonState={ButtonState.NONE}
          />
          <div className="ranking__started">
            <div className="team-toggle">
              <button
                onClick={() => handleTeamSwitch('home')}
                className={`team-btn ${selectedTeam === 'home' ? 'active' : ''}`}>
                {battleToRender.myTeamName}
              </button>
              <button
                onClick={() => handleTeamSwitch('away')}
                className={`team-btn ${selectedTeam === 'away' ? 'active' : ''}`}>
                {battleToRender.opponentTeamName}
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
