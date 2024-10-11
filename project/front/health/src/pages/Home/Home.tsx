import { useState, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import QuestIcon from '../../assets/svg/quest.svg';
import CalendarIcon from '../../assets/svg/calendar.svg';
import StyledButton from '../../components/Button/StyledButton';
import HomeIcon1 from '../../assets/svg/homeIcon1.svg';
import HomeIcon2 from '../../assets/svg/homeIcon2.svg';
import 'chart.js/auto';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import './Home.scss';
import { exerciseTime } from '@/api/home';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { patchDeviceToken } from '@/api/user';
import CharacterCanvas from '@/components/Character/CharacterCanvas';
import useUserStore from '@/store/userInfo';
import { getAggregatedExerciseData } from '@/utils/exerciseUtils';

Chart.register(annotationPlugin);

interface ExerciseTimeResponse {
  dailyAccumulatedExerciseTime: number;
  weeklyAccumulatedExerciseTime: number;
}

interface AggregatedData {
  day: string;
  totalTime: number;
  totalCalories: number;
}

const formatTime = (timeInMs: number): string => {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

// 운동 시간 표시 컴포넌트
function ExerciseTimeDisplay({ nickname }: { nickname: string }) {
  const { gender, characterFileUrl } = useUserStore();
  const { data: exerciseTimeData } = useSuspenseQuery<ExerciseTimeResponse>({
    queryKey: ['exerciseTime'],
    queryFn: exerciseTime,
  });

  const characterContent = {
    nickname: nickname,
    todayTime: formatTime(exerciseTimeData?.dailyAccumulatedExerciseTime || 0),
    weeklyTime: formatTime(exerciseTimeData?.weeklyAccumulatedExerciseTime || 0),
  };

  return (
    <div className="myInfo">
      <div className="myProfileInfo">
        <CharacterCanvas glbUrl={characterFileUrl} gender={gender} />
      </div>
      <div className="time">
        <p className="timeTitle">오늘 운동 시간</p>
        <span>{characterContent.todayTime}</span>
        <p className="timeTitle">이번 주 운동 시간</p>
        <span>{characterContent.weeklyTime}</span>
      </div>
    </div>
  );
}

// 운동 기록 차트 컴포넌트
function ExerciseRecordChart() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
  const currentWeek = Math.ceil(currentDate.getDate() / 7); // 날짜를 7로 나누어 몇 번째 주인지 계산

  const [aggregatedData, setAggregatedData] = useState<AggregatedData[]>([]);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      const data = await getAggregatedExerciseData(currentYear, currentMonth, currentWeek);

      console.log('날짜 정리한 데이터', data);
      setAggregatedData(data);
    };

    fetchAggregatedData();
  }, [currentYear, currentMonth, currentWeek]);

  const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const chartData = aggregatedData.map((item) => ({
    day: item.day,
    time: item.totalTime || 0, // totalTime이 0이어도 차트에 표시될 수 있도록 수정
    calories: item.totalCalories || 0, // totalCalories이 0이어도 표시될 수 있도록 수정
  }));

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
                  content: [`${formatTime(chartData[clickedIndex].time!) || 0}`, `${selectedCalories || 0} kcal`],
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

                  yAdjust: chartData[clickedIndex].time && chartData[clickedIndex].time <= 100 ? -100 : -100,
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
        display: false,
        // ticks: {
        //   stepSize: 10,
        //   callback: function (value: string | number) {
        //     return `${value}`;
        //   },
        // },
        // min: Math.min(...chartData.map((data) => (data.time % (1000 * 60 * 60)) / 24), 0),
        // max: Math.max(...chartData.map((data) => (data.time % (1000 * 60 * 60)) / 24), 160), // 데이터의 최대 값에 맞춰 max 값 조정
      },
    },
  };

  const dataConfig = {
    labels: chartData.map((data) => data.day),
    datasets: [
      {
        label: '운동 시간 (분)',
        data: chartData.map((data) => data.time),
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

  if (!aggregatedData || aggregatedData.length === 0) {
    return (
      <div className="noChartDataContainer">
        <div className={`noChartData blurred`}>
          <Line data={dataConfig} options={options} />
        </div>
        <div className="noChartDataMessage">
          <p>이번 주 운동 기록이 없습니다.</p>
        </div>
      </div>
    );
  }

  return <Line data={dataConfig} options={options} />;
}

function HomePageContent({ nickname }: { nickname: string }) {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <p className="character">{nickname}님, 오늘 운동도 파이팅!</p>
      <div className="characterContainer">
        <div className="title">
          <div className="iconWrapper">
            <div className="navIcon" onClick={() => navigate('/home/quest')}>
              <img src={QuestIcon} alt="Quest Icon" className="icon" />
            </div>
            <div className="navIcon" onClick={() => navigate('/home/calendar')}>
              <img src={CalendarIcon} alt="Calendar Icon" className="icon" />
            </div>
          </div>
        </div>

        <Suspense fallback={<div>Loading exercise time...</div>}>
          <ExerciseTimeDisplay nickname={nickname} />
        </Suspense>
      </div>

      <div className="chartSection">
        <p className="chartTitle">이번 주 운동 그래프</p>
        <p className="snapshotdDescript">해당 기록을 누르면 운동 시간과 소모된 칼로리가 보여요</p>
        <Suspense fallback={<div>Loading chart...</div>}>
          <ExerciseRecordChart />
        </Suspense>
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

export default function HomePage() {
  const { userId, nickname } = useUserStore();
  const [isTokenSent, setIsTokenSent] = useState(false);

  const tokenMutation = useMutation({
    mutationFn: (deviceToken: string) => patchDeviceToken(deviceToken),
    onSuccess: () => {
      setIsTokenSent(true);
    },
    onError: (error) => {
      console.error('FCM 토큰 서버 전송 중 오류:', error);
    },
  });

  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(() => {
          console.log('서비스 워커가 등록되었습니다.');
          const storedToken = sessionStorage.getItem('fcmToken');
          console.log('세션 스토리지에서 가져온 FCM 토큰:', storedToken);
          if (storedToken) {
            tokenMutation.mutate(storedToken);
          } else {
            console.warn('세션 스토리지에 저장된 FCM 토큰이 없습니다.');
          }
        })
        .catch((error) => {
          console.error('서비스 워커 등록 실패:', error);
        });
    }
  };

  useEffect(() => {
    if (!isTokenSent && userId) {
      registerServiceWorker();
    }
  }, [isTokenSent, userId, tokenMutation]);

  return <HomePageContent nickname={nickname} />;
}
