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
import Crew from '@/components/Crew/Crew';
import CrewImg from '@/assets/image/customItem.jpg';

export default function CrewPage() {
  const navigate = useNavigate();

  const crew_id = 123;

  // 가입된 크루 조회 /api/v1/users/{user_id}/crew-list
  const myCrews = [
    {
      id: 1,
      imageUrl: CrewImg,
      name: '달리는 번개라오라오',
      tag: '런닝',
    },
    {
      id: 2,
      imageUrl: CrewImg,
      name: '달리는 번개',
      tag: '런닝',
    },
    {
      id: 3,
      imageUrl: CrewImg,
      name: '달리는 번개',
      tag: '런닝',
    },
    {
      id: 4,
      imageUrl: 'data:image/png;base64,...',
      name: '달리는 번개',
      tag: '런닝',
    },
    {
      id: 5,
      imageUrl: 'data:image/png;base64,...',
      name: '달리는 번개',
      tag: '런닝',
    },
  ];
  const { data, error, isLoading } = useQuery<CrewBattleStatusResponse>({
    queryKey: ['crewBattleStatus', crew_id],
    queryFn: ({ queryKey }) => fetchCrewBattleStatus(Number(queryKey[1])), // queryKey에서 crew_id를 추출하여 전달
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching battle status: {error.message}</div>;
  }

  const battleData = data?.data;
  // console.log(battleData);

  // 내 크루 이동
  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/mycrew/${crewId}`);
  };

  return (
    <>
      <div className="my-crew">
        <p>닉네임님의 크루</p>

        <div className="crewList">
          {myCrews.map((crew, index) => (
            <Crew
              key={index}
              imageUrl={crew.imageUrl}
              name={crew.name}
              tag={crew.tag}
              onClick={() => handleCrewClick(crew.id)}
            />
          ))}
        </div>
      </div>
      <BattleBoard
        myTeamName={battleData?.myTeamName || 'No Battle'}
        myTeamScore={battleData?.myTeamScore || 0}
        opponentTeamName={battleData?.opponentTeamName || 'No Opponent'}
        opponentTeamScore={battleData?.opponentTeamScore || 0}
        exerciseName={battleData?.exerciseName || 'N/A'}
        dDay={battleData?.dDay || 0}
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
