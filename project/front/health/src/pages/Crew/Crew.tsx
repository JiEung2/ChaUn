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
import queryKeys from '@/utils/querykeys';
import { getUserCrewList } from '@/api/crew';
import ButtonState from './components/ButtonState';
import useUserStore from '@/store/userInfo';

interface CrewData {
  crewId: number;
  crewName: string;
  exerciseName: string;
  crewProfileImage: string;
  basicScore: number;
  activityScore: number;
}
export default function CrewPage() {
  const navigate = useNavigate();
  const { userId, nickname } = useUserStore();
  // 임시 dummy Id
  // const userId = 1;
  // 가입된 크루 리스트
  // console.log('크루 리스트 userId:', userId);
  const { data: userCrewList = [] } = useSuspenseQuery({
    queryKey: [queryKeys.USER_CREW_LIST, userId],
    queryFn: () => getUserCrewList(Number(userId)),
    select: (response) => response.data.crewList || [],
  });
  console.log('userCrewList:', userCrewList);

  // 크루의 배틀 현황 리스트
  const crewIds = userCrewList.map((crew: CrewData) => crew.crewId);
  console.log('crewIds', crewIds);
  const {
    data: BattleList = [],
    error,
    isLoading,
  } = useQuery<CrewBattleStatusResponse[]>({
    queryKey: [queryKeys.BATTLE_STATUS, crewIds],
    queryFn: ({ queryKey }) => {
      const [, crewIds] = queryKey as [string, number[]]; // crewIds가 배열 형태로 지정됨
      return Promise.all(
        crewIds.map(async (crewId) => {
          const crewBattleStatus = await fetchCrewBattleStatus(crewId);
          return { ...crewBattleStatus, crewId }; // 각 객체에 id 추가
        })
      );
    },
  });
  console.log('BattleList:', BattleList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching battle status: {error.message}</div>;
  }

  // 내 크루 이동
  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/mycrew/${crewId}`);
  };

  return (
    <>
      <div className="my-crew">
        <p>{nickname}님의 크루</p>

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

      <div className="battleBoardList">
        {BattleList && BattleList.length > 0 ? (
          BattleList.map((battleData, index) => (
            <BattleBoard
              key={index}
              crewId={battleData?.crewId}
              battleId={battleData?.battleId || 0}
              myTeamName={battleData?.myTeamName || 'No Battle'}
              myTeamScore={battleData?.myTeamScore || 0}
              opponentTeamName={battleData?.opponentTeamName || 'No Opponent'}
              opponentTeamScore={battleData?.opponentTeamScore || 0}
              exerciseName={battleData?.exerciseName || 'N/A'}
              dDay={battleData?.dDay || 0}
              battleStatus={battleData?.battleStatus}
              buttonState={battleData?.battleStatus === 'none' ? ButtonState.NONE : ButtonState.BATTLE_ENTRY}
            />
          ))
        ) : (
          <p>현재 진행 중인 배틀이 없습니다.</p>
        )}
      </div>

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
