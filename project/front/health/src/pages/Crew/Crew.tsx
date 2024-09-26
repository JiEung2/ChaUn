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

export default function CrewPage() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<CrewBattleStatusResponse>({
    queryKey: ['crewBattleStatus'],
    queryFn: fetchCrewBattleStatus, // Function that fetches the data
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching battle status: {error.message}</div>;
  }

  const battleData = data?.data;

  return (
    <>
      <div className="my-crew">
        <p>닉네임님의 크루</p>
        {/* <CrewList crews={crews} /> */}
      </div>
      <BattleBoard
        myTeamName={battleData?.myTeamName || 'No Battle'}
        myTeamScore={battleData?.myTeamScore || 0}
        opponentTeamName={battleData?.opponentTeamName || 'No Opponent'}
        opponentTeamScore={battleData?.opponentTeamScore || 0}
        exerciseName={battleData?.exerciseName || 'N/A'}
        dDay={battleData?.dDay.toString() || '0'}
        battleStatus={battleData?.battleStatus === 'NONE' ? 'STARTED' : 'FINISHED'}
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
