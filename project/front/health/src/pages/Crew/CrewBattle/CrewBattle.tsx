import { useQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse } from '../../../api/crew';
import queryKeys from '@/utils/querykeys';
import { useParams } from 'react-router-dom';
import BattleBoard from '../components/BattleBoard';
import './CrewBattle.scss';

export default function CrewBattle() {
  const { crewId } = useParams<{ crewId: string }>();
  // battleStatus 받아와서 상태에 따라 컴포넌트 렌더링
  const { data: battleList } = useQuery<CrewBattleStatusResponse>({
    queryKey: [queryKeys.BATTLE_STATUS, Number(crewId)],
    queryFn: () => fetchCrewBattleStatus(Number(crewId)),
    enabled: !!crewId, // crewId가 있을 때만 쿼리를 실행
  });

  if (!battleList || battleList.length === 0) {
    return <div></div>;
  }
  const battleData = battleList[0];
  // console.log(battleList);

  return (
    <div>
      {battleData.battleStatus === 'NONE' ? (
        <div className="none">
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
            showButton={false}
          />
          <div className="ranking__none"></div>
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
            showButton={false}
          />
          <div className="ranking__started"></div>
        </div>
      ) : (
        <div>Invalid battle status.</div>
      )}
    </div>
  );
}
