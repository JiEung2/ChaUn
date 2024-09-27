import BattleBoard from './components/BattleBoard';
// import CrewList from './components/CrewList';
import StyledButton from '../../components/Button/StyledButton';
import { useNavigate } from 'react-router-dom';
import createIcon from '../../assets/svg/crewCreate.svg';
import recommendIcon from '../../assets/svg/crewRecommend.svg';
import rankingIcon from '../../assets/svg/crewRanking.svg';
import '../Crew/Crew.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse } from '../../api/crew';
import querykeys from '@/utils/querykeys';

export default function CrewPage() {
  const navigate = useNavigate();

  const crew_id = 123;
  const { data, error, isLoading } = useQuery<CrewBattleStatusResponse>({
    queryKey: [querykeys.BATTLE_STATUS, crew_id],
    queryFn: () => fetchCrewBattleStatus(Number(crew_id)), // queryKey에서 crew_id를 추출하여 전달
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching battle status: {error.message}</div>;
  }

  console.log(data);

  return (
    <>
      <div className="my-crew">
        <p>닉네임님의 크루</p>
        {/* <CrewList crews={crews} /> */}
      </div>
      <BattleBoard
        myTeamName={data?.myTeamName || 'No Battle'}
        myTeamScore={data?.myTeamScore || 0}
        opponentTeamName={data?.opponentTeamName || 'No Opponent'}
        opponentTeamScore={data?.opponentTeamScore || 0}
        exerciseName={data?.exerciseName || 'N/A'}
        dDay={data?.dDay || 0}
        battleStatus={data?.battleStatus === 'NONE' ? 'STARTED'}
      />
      <div className="buttonSection">
        <div className="crewButtonSection">
          <StyledButton
            title="크루 생성"
            icon={createIcon}
            onClick={() => navigate('/crew/create')}
            backgroundColor="styledButton1"
          />
          <StyledButton
            title="크루 추천"
            icon={recommendIcon}
            onClick={() => navigate('/crew/recommend')}
            backgroundColor="styledButton2"
          />
        </div>
        <div className="rankingButtonSection">
          <StyledButton
            title="실시간 크루랭킹"
            icon={rankingIcon}
            onClick={() => navigate('/crew/ranking')}
            backgroundColor="styledButton3"
          />
        </div>
      </div>
    </>
  );
}
