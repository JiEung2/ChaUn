import { useRef, useState } from 'react';
import BattleBoard from './components/BattleBoard';
import StyledButton from '../../components/Button/StyledButton';
import { useNavigate } from 'react-router-dom';
import createIcon from '../../assets/svg/crewCreate.svg';
import recommendIcon from '../../assets/svg/crewRecommend.svg';
import rankingIcon from '../../assets/svg/crewRanking.svg';
import leftArrowIcon from '../../assets/svg/leftArrow.svg'; // 좌측 화살표 아이콘
import rightArrowIcon from '../../assets/svg/rightArrow.svg'; // 우측 화살표 아이콘
import '../Crew/Crew.scss';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse } from '../../api/crew';
import Crew from '@/components/Crew/Crew';
import queryKeys from '@/utils/querykeys';
import { getUserCrewList } from '@/api/crew';
import ButtonState from './components/ButtonState';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // 네비게이션 관련 CSS 추가
import { Navigation } from 'swiper/modules';

export default function CrewPage() {
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // 임시 dummy Id
  const userId = 1;

  // 가입된 크루 리스트
  const { data: userCrewList } = useSuspenseQuery({
    queryKey: [queryKeys.USER_CREW_LIST, userId],
    queryFn: () => getUserCrewList(Number(userId)),
    select: (response) => response.data.crewList || [],
  });

  // 크루의 배틀 현황 리스트
  const crewIds = userCrewList.map((crew: any) => crew.crewId);
  const {
    data: BattleList,
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

  // STARTED 상태의 배틀이 있는지 확인
  const startedBattles =
    BattleList === undefined ? [] : BattleList.filter((battle) => battle.battleStatus === 'STARTED');

  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/mycrew/${crewId}`);
  };
  const handleSwiperChange = (swiper: any) => {
    setShowPrevButton(!swiper.isBeginning);
    setShowNextButton(!swiper.isEnd);
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

      <div className="battleBoardList">
        {startedBattles.length > 0 ? (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={handleSwiperChange}
            onInit={(swiper) => {
              handleSwiperChange(swiper);
              swiperRef.current = swiper;
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}>
            {startedBattles.map((battleData, index) => (
              <SwiperSlide key={index}>
                <BattleBoard
                  crewId={battleData.crewId}
                  battleId={battleData.battleId || 0}
                  myTeamName={battleData.myTeamName || 'No Battle'}
                  myTeamScore={battleData.myTeamScore || 0}
                  opponentTeamName={battleData.opponentTeamName || 'No Opponent'}
                  opponentTeamScore={battleData.opponentTeamScore || 0}
                  exerciseName={battleData.exerciseName || 'N/A'}
                  dDay={battleData.dDay || 0}
                  battleStatus={battleData.battleStatus}
                  buttonState={battleData.battleStatus === 'none' ? ButtonState.NONE : ButtonState.BATTLE_ENTRY}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <BattleBoard
            crewId={0}
            battleId={0}
            myTeamName="No Battle"
            myTeamScore={0}
            opponentTeamName="No Opponent"
            opponentTeamScore={0}
            exerciseName="N/A"
            dDay={0}
            battleStatus="NONE"
            buttonState={ButtonState.NONE}
          />
        )}

        {showPrevButton && (
          <div className="swiper-button-prev" onClick={() => swiperRef.current && swiperRef.current.slidePrev()}>
            <img src={leftArrowIcon} alt="Previous" />
          </div>
        )}
        {showNextButton && (
          <div className="swiper-button-next" onClick={() => swiperRef.current && swiperRef.current.slideNext()}>
            <img src={rightArrowIcon} alt="Next" />
          </div>
        )}
      </div>

      <div className="buttonSection">
        <div className="crewButtonSection">
          <StyledButton
            title="크루 생성"
            icon={createIcon}
            onClick={() => navigate('/crew/create')}
            backgroundColor="styledButton1"
            description="새로운 크루를 만들어요!"
          />
          <StyledButton
            title="크루 추천"
            icon={recommendIcon}
            onClick={() => navigate('/crew/recommend')}
            backgroundColor="styledButton2"
            description="내게 더욱 맞는 크루를!"
          />
        </div>
        <div className="rankingButtonSection">
          <StyledButton
            title="실시간 크루 랭킹"
            icon={rankingIcon}
            onClick={() => navigate('/crew/ranking')}
            backgroundColor="styledButton3"
            description="우리 크루의 랭킹은 과연 몇등일지!   다른 크루들을 앞질러보세요!"
          />
        </div>
      </div>
    </>
  );
}
