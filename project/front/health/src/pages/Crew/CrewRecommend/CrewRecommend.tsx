import Crew from '../../../components/Crew/Crew';
import { useState, useEffect } from 'react';
import './CrewRecommend.scss';
import CrewModal from '../../../components/Crew/CrewModal';
import { getCrewRecommendList } from '@/api/crew';

interface Crew {
  id: number;
  crewProfileImage: string;
  crewName: string;
  exerciseName: string;
}
export default function CrewRecommend() {
  const [nickname] = useState('닉네임');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrewId, setSelectedCrewId] = useState(1);
  const [crews, setCrews] = useState<Crew[]>([]); // crews 배열을 상태로 관리

  // 크루 추천 리스트 가져오기 (MSW로 대체 예정)
  useEffect(() => {
    const getCrewRecommendListData = async () => {
      try {
        const response = await getCrewRecommendList();
        setCrews(response.data.crewList); // API 호출 후 데이터를 상태에 저장
      } catch (error) {
        console.error('크루추천 리스트 불러오기 실패', error);
      }
    };
    getCrewRecommendListData();
  }, []);

  // Crew 클릭 시 모달을 여는 함수
  const handleCrewClick = (id: number) => {
    setSelectedCrewId(id);
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
          {crews.map((crew, index) => (
            <Crew
              key={index}
              imageUrl={crew.crewProfileImage}
              name={crew.crewName}
              tag={crew.exerciseName}
              onClick={() => handleCrewClick(crew.id)}
            />
          ))}
        </div>

        {isModalOpen && <CrewModal crewId={selectedCrewId} onClose={closeModal} />}
      </div>
    </div>
  );
}
