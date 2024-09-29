import Crew from '../../../components/Crew/Crew';
import { useState, useEffect } from 'react';
import './CrewRecommend.scss';
import CrewModal from '../../../components/Crew/CrewModal';
import { getCrewRecommendList } from '@/api/crew';

interface Crew {
  crewId: number;
  crewProfileImage: string;
  crewName: string;
  exerciseName: string;
}

export default function CrewRecommend() {
  const [nickname] = useState('닉네임');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrewId, setSelectedCrewId] = useState<number | null>(null);
  const [crews, setCrews] = useState<Crew[]>([]); // crews 배열을 상태로 관리

  const getCrewRecommendListData = async () => {
    try {
      const response = await getCrewRecommendList();
      // console.log('크루 추천 페이지에서 response', response);
      setCrews(response); // API 호출 후 데이터를 상태에 저장
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
      <h3>
        <span className="nickname">{nickname}</span>님, 이런 <span className="highlight">크루</span>를 추천드려요!
      </h3>
      <div className="crew-recommend">
        <div className="crew-grid">
          {crews.map((crew) => (
            <Crew
              key={crew.crewId}
              imageUrl={crew.crewProfileImage}
              name={crew.crewName}
              tag={crew.exerciseName}
              onClick={() => handleCrewClick(crew.crewId)}
            />
          ))}
        </div>

        {isModalOpen && selectedCrewId !== null && <CrewModal crewId={selectedCrewId} onClose={closeModal} />}
      </div>
    </div>
  );
}
