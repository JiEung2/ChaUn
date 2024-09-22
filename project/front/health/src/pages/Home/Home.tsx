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

// 데이터 인터페이스 정의
interface ChartDataInterface {
  day: string;
  time?: number;  // 운동 시간
  calories?: number;  // 칼로리
}

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

// 차트 데이터 예시
const chartData: ChartDataInterface[] = [
  { day: '일', time: 3, calories: 200 },
  { day: '월', time: 4, calories: 250 },
  { day: '화', time: 2, calories: 300 },
  { day: '수', time: 6, calories: 350 },
  { day: '목', time: 0, calories: 0 },
  { day: '금', time: 8, calories: 450 },
  { day: '토', time: 7, calories: 500 },
];

export default function HomePage() {
  const navigate = useNavigate();

  // 차트 데이터
  const data = {
    labels: chartData.map((data) => data.day),
    datasets: [
      {
        label: '운동 시간 (시간)',
        data: chartData.map((data) => data.time),
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        fill: false,
        tension: 0.1,
        yAxisID: 'time',  // 보조 y축을 사용
      },
      {
        label: '칼로리 (kcal)',
        data: chartData.map((data) => data.calories),
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        fill: false,
        tension: 0.1,
        yAxisID: 'calories',  // 주 y축으로 설정
      },
    ],
  };

  // 차트 옵션
  const options = {
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
          // 범례 색상 채우기
          generateLabels: (chart: any) => {
            return chart.data.datasets.map((dataset: any, i: number) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
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
      time: {
        beginAtZero: true,
        display: true,
        ticks: {
          stepSize: 1,
          callback: function(value: string | number) {
            // 숫자가 아닌 값에 대해 안전하게 처리
            if (typeof value === 'number') {
              return value.toString();  // 1단위로 표시
            }
            return ''; // 처리할 수 없는 경우 빈 문자열 반환
          },
        },
        min: 0,
        max: 10,
      },
      calories: {
        display: false,  // 칼로리 y축을 숨김
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
        <Line data={data} options={options} />
      </div>

      <div className="buttonSection">
        <div className="stylebutton">
          <StyledButton
            title="운동 추천"
            icon={HomeIcon1}
            onClick={() => navigate('/exercise/recommend')}
            backgroundColor="styledButton1"
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
}
