import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './CrewModal.scss';
import GeneralButton from '../Button/GeneralButton';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
import { getCrewRecommendModal } from '@/api/crew';
import { useEffect, useState } from 'react';
// import Coin from '../Coin/Coin';
import { useNavigate } from 'react-router-dom';
interface CrewModalProps {
  crewId: number;
  onClose: () => void;
}

interface Crew {
  crewName: string;
  exerciseName: string;
  crewProfileImage: string;
  description: string;
  bodyType: string;
  age: number;
  rank: number;
  dailyCaloricIntake: number;
  basicScore: number;
  activityScore: number;
  coin: number;
}

interface RadarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export default function CrewModal({ onClose, crewId }: CrewModalProps) {
  const [crewData, setCrewData] = useState<Crew | null>(null);
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const navigate = useNavigate();
  const getCrewData = async () => {
    try {
      const response = await getCrewRecommendModal(crewId);
      // console.log('가져온 크루 데이터', response);
      setCrewData(response.data);

      const radarData: RadarData = {
        labels: ['체형', '기본 점수', '활동 점수', '식습관 점수', '나이'],
        datasets: [
          {
            label: '크루 점수',
            data: [
              response.data.bodyType, // 예시로 bodyType 사용
              response.data.basicScore,
              response.data.activityScore,
              45, // 식습관 점수는 예시로 45를 넣음
              response.data.age,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      // radarData를 상태로 설정
      setRadarData(radarData);
    } catch (error) {
      console.error('크루추천 리스트 불러오기 실패', error);
    }
  };

  useEffect(() => {
    getCrewData();
  }, [crewId]);
  const moveCrewDetail = () => {
    navigate(`/crew/detail/${crewId}`);
  };
  if (!crewData || !radarData) {
    return null; // crewData나 radarData가 없으면 모달을 렌더링하지 않음
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
        <div className="crew-header">
          <div className="crew-profile-image" />
          <div className="crew-info">
            <h2>{crewData.crewName}</h2>
            <span className="crew-tag">{crewData.exerciseName}</span>
            <p>{crewData.description}</p>
          </div>
        </div>
        <div className="crew-stats">
          <p>#런닝 크루 랭킹: {crewData.rank}위</p>
          <div className="crew-points">{/* <Coin style="basic" amount={crewData.coin} /> */}</div>
        </div>
        <div className="radar-chart-container">
          {/* radarData를 Radar 컴포넌트에 전달 */}
          <Radar data={radarData} options={{ maintainAspectRatio: false }} />
        </div>
        <GeneralButton buttonStyle={{ style: 'primary', size: 'large' }} onClick={moveCrewDetail}>
          상세보기
        </GeneralButton>
      </div>
    </div>
  );
}
