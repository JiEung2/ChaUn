import { useRef, useState, useEffect } from 'react';
import BattleBoard from './components/BattleBoard';
import StyledButton from '../../components/Button/StyledButton';
import { useNavigate } from 'react-router-dom';
import createIcon from '../../assets/svg/crewCreate.svg';
import recommendIcon from '../../assets/svg/crewRecommend.svg';
import rankingIcon from '../../assets/svg/crewRanking.svg';
import leftArrowIcon from '../../assets/svg/leftArrow.svg';
import rightArrowIcon from '../../assets/svg/rightArrow.svg';
import '../Crew/Crew.scss';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchCrewBattleStatus, CrewBattleStatusResponse } from '../../api/crew';
import Crew from '@/components/Crew/Crew';
import queryKeys from '@/utils/querykeys';
import { getUserCrewList } from '@/api/crew';
import ButtonState from './components/ButtonState';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useUserStore from '@/store/userInfo';
import useBattleDataStore from '@/store/battleInfo';

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
  const swiperRef = useRef<any>(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { userId, nickname } = useUserStore();
  const { setMultipleBattles, battles } = useBattleDataStore(); // Use the global store to manage battle data

  // Fetch the user's crew list
  const { data: userCrewList = [] } = useSuspenseQuery({
    queryKey: [queryKeys.USER_CREW_LIST, userId],
    queryFn: () => getUserCrewList(Number(userId)),
    select: (response) => response.crewList || [],
  });

  console.log('userCrewList:', userCrewList);

  // Get the crew IDs
  const crewIds = userCrewList.map((crew: CrewData) => crew.crewId);
  console.log('crewIds', crewIds);

  // Fetch the battle status for all crews
  const {
    data: BattleList = [],
    error,
    isLoading,
  } = useQuery<CrewBattleStatusResponse[]>({
    queryKey: [queryKeys.BATTLE_STATUS, crewIds],
    queryFn: ({ queryKey }) => {
      const [, crewIds] = queryKey as [string, number[]];
      return Promise.all(
        crewIds.map(async (crewId) => {
          const crewBattleStatus = await fetchCrewBattleStatus(crewId);
          return { ...crewBattleStatus, crewId }; // Attach crewId to each battle status
        })
      );
    },
  });

  console.log('BattleList', BattleList);

  useEffect(() => {
    // Once the battle list is fetched, store it globally
    if (BattleList.length > 0) {
      setMultipleBattles(BattleList); // Set all battles in the global store
    }
  }, [BattleList, setMultipleBattles]);

  // Filter only the battles that have started
  const startedBattles = battles.filter((battle) => battle.battleStatus === 'STARTED');
  console.log('Battles in global store:', battles);
  console.log('Started Battles:', startedBattles);

  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/mycrew/${crewId}`);
  };

  const handleSwiperChange = (swiper: any) => {
    setShowPrevButton(!swiper.isBeginning);
    setShowNextButton(!swiper.isEnd);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching battle status: {error.message}</div>;
  }

  return (
    <>
      <div className="my-crew">
        <h3>{nickname}님의 크루</h3>
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
                  myCrewName={battleData.myCrewName || 'No Battle'}
                  myCrewScore={battleData.myCrewScore || 0}
                  opponentCrewName={battleData.opponentCrewName || 'No Opponent'}
                  opponentCrewScore={battleData.opponentCrewScore || 0}
                  exerciseName={battleData.exerciseName || 'N/A'}
                  dday={battleData.dday || 0}
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
            myCrewName="No Battle"
            myCrewScore={0}
            opponentCrewName="No Opponent"
            opponentCrewScore={0}
            exerciseName="N/A"
            dday={0}
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
