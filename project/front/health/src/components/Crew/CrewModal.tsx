import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './CrewModal.scss';
import GeneralButton from '../Button/GeneralButton';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
import { getCrewRecommendModal } from '@/api/crew';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CrewModalProps {
  crewId: number;
  onClose: () => void;
  userScore: {
    age: number;
    bodyType: number;
    basicScore: number;
    activityScore: number;
    intakeScore: number;
  };
}

interface Crew {
  crewId: number;
  crewName: string;
  exerciseName: string;
  description: string;
  crewProfileImage: string;
  crewCoins: number;
  crewRanking: number;
  averageAge: number;
  averageBodyType: number;
  basicScore: number;
  activityScore: number;
  intakeScore: number;
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

export default function CrewModal({ onClose, crewId, userScore }: CrewModalProps) {
  const [crewData, setCrewData] = useState<Crew>();
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const navigate = useNavigate();

  const getCrewData = async () => {
    try {
      const response = await getCrewRecommendModal(crewId);
      setCrewData(response);

      const radarData: RadarData = {
        labels: ['체형', '기본 점수', '활동 점수', '식습관 점수', '나이'],
        datasets: [
          {
            label: '크루 점수',
            data: [
              response.averageBodyType,
              response.basicScore,
              response.activityScore,
              response.intakeScore,
              response.averageAge,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: '유저 점수',
            data: [
              userScore.bodyType,
              userScore.basicScore,
              userScore.activityScore,
              userScore.intakeScore,
              userScore.age,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      setRadarData(radarData);
    } catch (error) {
      console.error('크루추천 리스트 불러오기 실패', error);
    }
  };

  useEffect(() => {
    getCrewData();
  }, [crewId]);

  const moveCrewDetail = () => {
    navigate(`/crew/crewDetail/${crewId}`);
  };

  if (!crewData || !radarData) {
    return null; // 데이터가 없으면 모달을 렌더링하지 않음
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
        <div className="radar-chart-container">
          <Radar data={radarData} options={{ maintainAspectRatio: false }} />
        </div>
        <GeneralButton buttonStyle={{ style: 'primary', size: 'large' }} onClick={moveCrewDetail}>
          상세보기
        </GeneralButton>
      </div>
    </div>
  );
}
