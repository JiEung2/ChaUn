import { useQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse, getBattleRanking } from '../../../api/crew';
import queryKeys from '@/utils/querykeys';
import { useParams } from 'react-router-dom';
import BattleBoard from '../components/BattleBoard';
import './CrewBattle.scss';
import ButtonState from '../components/ButtonState';
import BattleNoneImg from '../../../assets/svg/battlenoneImg.svg';

export default function CrewBattle() {
  const { crewId } = useParams<{ crewId: string }>();

  const { data: battleData } = useQuery<CrewBattleStatusResponse>({
    queryKey: [queryKeys.BATTLE_STATUS, Number(crewId)],
    queryFn: () => fetchCrewBattleStatus(Number(crewId)),
    enabled: !!crewId, // crewId가 있을 때만 쿼리를 실행
  });
  if (!battleData) {
    return null;
  }
  console.log(crewId);
  console.log(battleData);

  // 기여도 랭킹 조회
  // dummy battleId
  const battleId = 3;
  const { data: battleRankings } = useQuery({
    queryKey: [queryKeys.BATTLE_RANKING, battleId],
    queryFn: () => getBattleRanking(Number(battleId)),
  });

  console.log('배틀 랭킹', battleRankings);

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
          <div className="ranking__started"></div>
        </div>
      ) : (
        <div>Invalid battle status.</div>
      )}
    </div>
  );
}
