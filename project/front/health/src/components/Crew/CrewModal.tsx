import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './CrewModal.scss';
import GeneralButton from '../Button/GeneralButton';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface CrewModalProps {
  crewId: number;
  onClose: () => void;
}

// 임시 크루 데이터
const crewDataList = [
  {
    id: 1,
    name: '달리는 번개',
    tag: '#런닝',
    description: '번개맨보다 빠른 러너들의 모임',
    rank: 3,
    points: 300,
    radarData: {
      labels: ['체형', '기본 점수', '활동 점수', '식습관 점수', '나이'],
      datasets: [
        {
          label: '크루 점수',
          data: [70, 50, 65, 45, 55],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
  },
  // 추가 데이터는 여기에 넣을 수 있음
];

export default function CrewModal({ onClose, crewId }: CrewModalProps) {
  // crewId를 이용해 해당 크루 데이터를 찾음
  const crewData = crewDataList.find((crew) => crew.id === crewId);

  if (!crewData) {
    return null; // crewId에 해당하는 데이터가 없을 경우 모달을 렌더링하지 않음
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
            <h2>{crewData.name}</h2>
            <span className="crew-tag">{crewData.tag}</span>
            <p>{crewData.description}</p>
          </div>
        </div>
        <div className="crew-stats">
          <p>#런닝 크루 랭킹: {crewData.rank}위</p>
          <div className="crew-points">
            <span className="points">{crewData.points}</span>
          </div>
        </div>
        <div className="radar-chart-container">
          <Radar data={crewData.radarData} options={{ maintainAspectRatio: false }} />
        </div>
        <GeneralButton buttonStyle={{ style: 'primary', size: 'large' }}>상세보기</GeneralButton>
      </div>
    </div>
  );
}
