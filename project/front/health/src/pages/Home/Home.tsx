import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import QuestIcon from '../../assets/svg/quest.svg';
import CalendarIcon from '../../assets/svg/calendar.svg';
import StyledButton from '../../components/Button/StyledButton';
import HomeIcon1 from '../../assets/svg/homeIcon1.svg';
import HomeIcon2 from '../../assets/svg/homeIcon2.svg';
import Character from '@/assets/image/model.png';
import 'chart.js/auto';
import './Home.scss';

interface CharacterContent {
  nickname: string;
  todayTime: string;
  weeklyTime: string;
}
  
const characterContent: CharacterContent = {
    nickname: '민영',
    todayTime: '1h 48m',
    weeklyTime: '16h 45m',
};

export default function HomePage () {
  const navigate = useNavigate();

  // 그래프 데이터 예시
  const chartData = {
    labels: ['일', '월', '화', '수', '목', '금', '토'],
    datasets: [
      {
        label: '시간',
        data: [3, 4, 5, 6, 7, 8, 7],
        borderColor: '#FF6384',
        fill: false,
        tension: 0.1,
      },
      {
        label: '칼로리',
        data: [200, 250, 300, 350, 400, 450, 500],
        borderColor: '#36A2EB',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        fullWidth: false,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 10,
          },
          boxWidth: 8,
          boxHeight: 8,
          padding: 10,
          generateLabels: (chart: any) => {
            return chart.data.datasets.map((dataset: any, i: number) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              strokeStyle: dataset.borderColor,
              lineWidth: 2,
              pointStyle: 'circle',
              hidden: !chart.isDatasetVisible(i),
              index: i,
            }));
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="homeContainer">
        <div className="characterContainer">
          <div className="title">
            <p className="character">{characterContent.nickname}님</p>   
            <div className="iconWrapper">
              <div className="navIcon" onClick={() => navigate('/home/quest')}>
                <img src={QuestIcon} alt="Quest Icon" className="icon" />
              </div>
              <div className="navIcon" onClick={() => navigate('/home/calendar')}>
                <img src={CalendarIcon} alt="Calendar Icon" className="icon" />
              </div>
            </div>
          </div>
          <div className="myInfo">
            <img src={Character} alt="character" />
            <div className="time">
              <p className="timeTitle">오늘 운동 시간</p>
              <span>{characterContent.todayTime}</span>
              <p className="timeTitle">이번 주 운동 시간</p>
              <span>{characterContent.weeklyTime}</span>
            </div>            
          </div>

        </div>


      <div className="chartSection">
        <h2>이번 주 운동 그래프</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="buttonSection">
        <div className="stylebutton">
          <StyledButton
            title="운동 추천"
            icon={HomeIcon1}
            onClick={() => navigate('/exercise/recommend')}
            backgroundColor="styledButton1" // SASS에서 정의한 클래스 사용
          />          
        </div>
        <div className="stylebutton">
          <StyledButton
            title="내 크루 보러가기"
            icon={HomeIcon2}
            onClick={() => navigate('/crew')}
            backgroundColor="styledButton2"
          />          
        </div>
      </div>
    </div>
  );
};
