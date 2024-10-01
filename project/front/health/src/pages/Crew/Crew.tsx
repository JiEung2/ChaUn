import BattleBoard from './components/BattleBoard';
// import CrewList from './components/CrewList';
import StyledButton from '../../components/Button/StyledButton';
import { useNavigate } from 'react-router-dom';
import createIcon from '../../assets/svg/crewCreate.svg';
import recommendIcon from '../../assets/svg/crewRecommend.svg';
import rankingIcon from '../../assets/svg/crewRanking.svg';
import '../Crew/Crew.scss';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse } from '../../api/crew';
import Crew from '@/components/Crew/Crew';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/utils/querykeys';
import { getUserCrewList } from '@/api/crew';

export default function CrewPage() {
  const navigate = useNavigate();

  const crew_id = 123;

  const { data, error, isLoading } = useQuery<CrewBattleStatusResponse>({
    queryKey: [queryKeys.BATTLE_STATUS, crew_id],
    queryFn: ({ queryKey }) => {
      const [, crewIds] = queryKey as [string, number]; // 튜플 형태로 타입 지정
      return fetchCrewBattleStatus(crewIds);
    },
  });

  // 임시 dummy Id
  const userId = 1;
  const { data: userCrewList } = useSuspenseQuery({
    queryKey: [queryKeys.USER_CREW_LIST, userId],
    queryFn: () => getUserCrewList(Number(userId)),
    select: (response) => response.data.crewList || [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching battle status: {error.message}</div>;
  }

  // console.log(userCrewList);
  const crewIds = userCrewList.map((crew: any) => crew.crewId);
  const battleData = data;

  // 내 크루 이동
  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/mycrew/${crewId}`);
  };

  return (
    <>
      <div className="my-crew">
        <p>닉네임님의 크루</p>

        <div className="crewList">
          {userCrewList && userCrewList.length > 0 ? (
            userCrewList.map((crew: any) => (
              <Crew
                key={crew.crewId}
                imageUrl={crew.crewProfileImage}
                name={crew.crewName}
                tag={crew.exerciseName}
                onClick={() => handleCrewClick(crew.crewId)}
              />
            ))
          ) : (
            <p>해당 크루가 없습니다.</p>
          )}
        </div>
      </div>

      <BattleBoard
        myTeamName={battleData?.[0]?.myTeamName || 'No Battle'}
        myTeamScore={battleData?.[0]?.myTeamScore || 0}
        opponentTeamName={battleData?.[0]?.opponentTeamName || 'No Opponent'}
        opponentTeamScore={battleData?.[0]?.opponentTeamScore || 0}
        exerciseName={battleData?.[0]?.exerciseName || 'N/A'}
        dDay={battleData?.[0]?.dDay || 0}
        battleStatus={battleData?.[0]?.battleStatus}
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
