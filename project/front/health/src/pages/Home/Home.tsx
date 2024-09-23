import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import QuestIcon from '../../assets/svg/quest.svg';
import CalendarIcon from '../../assets/svg/calendar.svg';
import StyledButton from '../../components/Button/StyledButton';
import HomeIcon1 from '../../assets/svg/homeIcon1.svg';
import HomeIcon2 from '../../assets/svg/homeIcon2.svg';
import Character from '@/assets/image/model.png';
import 'chart.js/auto';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import './Home.scss';

Chart.register(annotationPlugin);

interface ChartDataInterface {
  day: string;
  time?: number;
  calories?: number;
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

const chartData: ChartDataInterface[] = [
  { day: '일', time: 30, calories: 200 },
  { day: '월', time: 40, calories: 250 },
  { day: '화', time: 120, calories: 300 },
  { day: '수', time: 60, calories: 350 },
  { day: '목', time: 0, calories: 0 },
  { day: '금', time: 100, calories: 450 },
  { day: '토', time: 150, calories: 500 },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  // 그래프 클릭 시 칼로리 값을 설정하는 함수
  const handleChartClick = (_: any, elements: any) => {
    if (elements.length > 0) {
      const clickedElementIndex = elements[0].index;
      const clickedData = chartData[clickedElementIndex];
      setSelectedCalories(clickedData.calories || 0); // 선택된 칼로리 값 설정
      setClickedIndex(clickedElementIndex); // 클릭된 인덱스를 설정
    }
  };

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
        },
      },
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
      },
      annotation: {
        annotations: clickedIndex !== null
          ? [
              {
                type: 'label' as const,
                xValue: chartData[clickedIndex].day,
                yValue: chartData[clickedIndex].time || 0, // null 값을 0으로 처리
                content: [`${chartData[clickedIndex].time || 0} 분`, `${selectedCalories || 0} kcal`], // null 값을 0으로 처리
                enabled: true,
                font: {
                  size: 10,
                  weight: 'bold' as const,
                },
                padding: {
                  top: 5,
                  bottom: 5,
                  left: 5,
                  right: 5,
                },
                yAdjust: chartData[clickedIndex].time === 0 || (chartData[clickedIndex].time && chartData[clickedIndex].time <= 100) ? -20 : 20, // 위아래 조정
                xAdjust: clickedIndex === 0 ? 20 : clickedIndex === chartData.length - 1 ? -20 : 0,
              },
            ]
          : [],
      },
    },
    onClick: handleChartClick,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      time: {
        type: 'linear' as const,
        axis: 'y' as const,
        beginAtZero: true,
        display: true,
        ticks: {
          stepSize: 10, 
          callback: function (value: string | number) {
            return `${value}`;
          },
        },
        min: 0,
        max: 160,
      },
    },
  };


  // null 값 처리하는 함수
  const processedChartData = chartData.map((data) => ({
    ...data,
    time: data.time || 0,
    calories: data.calories || 0,
  }));

  const data = {
    labels: processedChartData.map((data) => data.day),
    datasets: [
      {
        label: '운동 시간 (분)',
        data: processedChartData.map((data) => data.time),
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'time',
      },
    ],
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
        <p className="chartTitle">이번 주 운동 그래프</p>
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
};
