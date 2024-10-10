import Crew from '../../../components/Crew/Crew';
import { useState, useEffect } from 'react';
import './CrewRecommend.scss';
import CrewModal from '../../../components/Crew/CrewModal';
import { getCrewRecommendList } from '@/api/crew';
import useUserStore from '@/store/userInfo';

interface CrewDetail {
  crewId: number;
  crewProfileImage: string;
  name: string;
  exerciseName: string;
}
interface userScore {
  age: number;
  bodyType: number;
  basicScore: number;
  activityScore: number;
  intakeScore: number;
}

export default function CrewRecommend() {
  const [nickname] = useState(useUserStore.getState().nickname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrewId, setSelectedCrewId] = useState<number | null>(null);
  const [crews, setCrews] = useState<CrewDetail[]>([]); // CrewDetail[]로 타입 지정
  const [userScore, setUserScore] = useState<userScore>({
    age: 0,
    bodyType: 0,
    basicScore: 0,
    activityScore: 0,
    intakeScore: 0,
  });
  const getCrewRecommendListData = async () => {
    try {
      const response = await getCrewRecommendList();
      console.log('크루 추천 페이지에서 response', response);

      setUserScore(response.userScore);
      // 각 크루의 세부 정보를 포함하는 배열로 crews 상태를 업데이트
      const mappedCrews = response.crewList.map((crew: CrewDetail) => ({
        crewId: crew.crewId,
        crewProfileImage: crew.crewProfileImage,
        name: crew.name,
        exerciseName: crew.exerciseName,
      }));

      setCrews(mappedCrews); // 상태 업데이트
    } catch (error) {
      console.error('크루추천 리스트 불러오기 실패', error);
    }
  };

  useEffect(() => {
    getCrewRecommendListData();
  }, []);

  // Crew 클릭 시 모달을 여는 함수
  const handleCrewClick = (crewId: number) => {
    setSelectedCrewId(crewId);
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3 className="recommendTitle">
        {nickname}님, 이런 <span className="exerciseSpan">크루</span>를 추천드려요!
      </h3>
      <div className="crew-recommend">
        <div className="crew-grid">
          {crews?.map((crew) => (
            <Crew
              key={crew.crewId} // crewId로 key 설정
              imageUrl={crew.crewProfileImage}
              name={crew.name}
              tag={crew.exerciseName}
              onClick={() => handleCrewClick(crew.crewId)}
            />
          ))}
        </div>
        {isModalOpen && selectedCrewId !== null && (
          <CrewModal crewId={selectedCrewId} onClose={closeModal} userScore={userScore} />
        )}
      </div>
    </div>
  );
}
