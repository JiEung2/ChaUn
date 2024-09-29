import { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
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
import { exerciseTime, exerciseRecord } from '@/api/home';

Chart.register(annotationPlugin);

interface ExerciseTimeResponse {
  dailyAccumulatedExerciseTime: number;
  weeklyAccumulatedExerciseTime: number;
}
interface ChartData {
  day: string;
  time: number;
  calories: number;
}
interface ExerciseRecord {
  createdAt: string;
  exerciseDuration: number; // 초 단위의 운동 시간
  burnedCalories: number; // 소모된 칼로리
}
// 데이터 fetch 함수
function useExerciseTime() {
  return useQuery<ExerciseTimeResponse>(['exerciseTime'], () => exerciseTime(), {
    suspense: true, // Suspense 활성화
  });
}

function useExerciseRecord(year: number, month: number, week: number) {
  return useQuery<ExerciseRecord>(['exerciseRecord', year, month, week], () => exerciseRecord(year, month, week), {
    suspense: true, // Suspense 활성화
  });
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function HomePageContent() {
  const navigate = useNavigate();
  const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  // 데이터 가져오기
  const { data: exerciseTimeData } = useExerciseTime();
  const { data: exerciseRecordData } = useExerciseRecord(2024, 9, 3); // 임의로 2024년 9월 3주차 데이터 사용

  // msw에서 모킹된 API 응답을 사용하여 운동 시간을 표시
  const characterContent = {
    nickname: '민영',
    todayTime: formatTime(exerciseTimeData?.dailyAccumulatedExerciseTime || 0),
    weeklyTime: formatTime(exerciseTimeData?.weeklyAccumulatedExerciseTime || 0),
  };

  // exerciseRecordData에서 chart에 맞는 형식으로 변환
  const chartData = Array.isArray(exerciseRecordData)
    ? exerciseRecordData.map((record: any) => ({
        day: new Date(record.createdAt).toLocaleDateString('ko-KR', { weekday: 'short' }),
        time: record.exerciseDuration / 60, // 초 단위를 분으로 변환
        calories: record.burnedCalories,
      }))
    : [];

  // 그래프 클릭 시 칼로리 값을 설정하는 함수
  const handleChartClick = (_: any, elements: any) => {
    if (elements.length > 0) {
      const clickedElementIndex = elements[0].index;
      const clickedData = chartData[clickedElementIndex];
      setSelectedCalories(clickedData.calories || 0);
      setClickedIndex(clickedElementIndex);
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
        annotations:
          clickedIndex !== null
            ? [
                {
                  type: 'label' as const,
                  xValue: chartData[clickedIndex].day,
                  yValue: chartData[clickedIndex].time || 0,
                  content: [`${chartData[clickedIndex].time || 0} 분`, `${selectedCalories || 0} kcal`],
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
                  yAdjust: chartData[clickedIndex].time <= 100 ? -20 : 20,
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

  const dataConfig = {
    labels: chartData.map((data: ChartData) => data.day),
    datasets: [
      {
        label: '운동 시간 (분)',
        data: chartData.map((data: ChartData) => data.time),
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
        <Line data={dataConfig} options={options} />
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

// Suspense를 통해 비동기 데이터 처리
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
