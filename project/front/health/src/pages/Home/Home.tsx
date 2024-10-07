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
import { exerciseTime, exerciseRecord } from '@/api/home';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { getUserDetail, patchDeviceToken } from '@/api/user';
import useUserStore from '@/store/userInfo';
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
  return useSuspenseQuery<ExerciseTimeResponse>({
    queryKey: ['exerciseTime'],
    queryFn: () => exerciseTime(),
  });
}

function useExerciseRecord(year: number, month: number, week: number) {
  return useSuspenseQuery<ExerciseRecord>({
    queryKey: ['exerciseRecord', year, month, week],
    queryFn: () => exerciseRecord(year, month, week),
  });
}

const formatTime = (timeInMs: number) => {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

// 운동 시간 표시 컴포넌트
function ExerciseTimeDisplay({ nickname }: { nickname: string }) {
  const { data: exerciseTimeData } = useExerciseTime();

  const characterContent = {
    nickname: nickname,
    todayTime: formatTime(exerciseTimeData?.dailyAccumulatedExerciseTime || 0),
    weeklyTime: formatTime(exerciseTimeData?.weeklyAccumulatedExerciseTime || 0),
  };

  return (
    <div className="myInfo">
      <img src="{Character}" alt="character" />
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
  const { data: exerciseRecordData } = useExerciseRecord(2024, 9, 3);
  const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const chartData = Array.isArray(exerciseRecordData)
    ? exerciseRecordData.map((record: any) => ({
        day: new Date(record.createdAt).toLocaleDateString('ko-KR', { weekday: 'short' }),
        time: record.exerciseDuration / 60, // 초 단위를 분으로 변환
        calories: record.burnedCalories,
      }))
    : [];
  // console.log('운동 기록', exerciseRecordData);
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

  if (!chartData || chartData.length === 0) {
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
      <div className="characterContainer">
        <div className="title">
          <p className="character">{nickname}</p>
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
        {/* 운동 기록 차트 Suspense로 감쌈 */}

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
  const { userId, nickname, setNickname, setHasCoin } = useUserStore();
  const [isTokenSent, setIsTokenSent] = useState(() => {
    return localStorage.getItem('isTokenSent') === 'true';
  });

  const tokenMutation = useMutation({
    mutationFn: (deviceToken: string) => patchDeviceToken(deviceToken),
    onSuccess: () => {
      localStorage.setItem('isTokenSent', 'true');
      setIsTokenSent(true);
    },
    onError: (error) => {
      console.error('FCM 토큰 서버 전송 중 오류:', error);
    },
  });

  useEffect(() => {
    if (!isTokenSent) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then(() => {
            console.log('서비스 워커가 등록되었습니다.');
          })
          .catch((error) => {
            console.error('서비스 워커 등록 실패:', error);
          });
      }

      const storedToken = sessionStorage.getItem('fcmToken');
      if (storedToken) {
        console.log('세션 스토리지에서 가져온 FCM 토큰:', storedToken);
        tokenMutation.mutate(storedToken);
      } else {
        console.warn('세션 스토리지에 저장된 FCM 토큰이 없습니다.');
      }
    }
  }, [isTokenSent, tokenMutation]);
  // 두 번째 useEffect: 유저 데이터 가져오기
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUserDetail(userId);
        setNickname(response.nickname);
        setHasCoin(response.coin);
      } catch (e) {
        console.log('유저 정보를 가져오는 중 에러:', e);
      }
    }

    fetchUserData();
  }, [userId, nickname, setNickname, setHasCoin]);

  return <HomePageContent nickname={nickname} />;
}
