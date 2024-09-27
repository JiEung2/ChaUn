import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Crew from '@/components/Crew/Crew';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Profile.scss';
import { getUserExerciseTime, getUserWeight6 } from '@/api/user';
import { getUserCrewList } from '@/api/crew';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [todayExerciseTime, setTodayExerciseTime] = useState<number>(0);
  const [thisWeekExerciseTime, setThisWeekExerciseTime] = useState<number>(0);
  const [userWeight, setUserWeight] = useState<{ date: string; weight: number }[]>([]);
  const [userCrewList, setUserCrewList] = useState<
    {
      crewId: number;
      crewName: string;
      exerciseName: string;
      crewProfileImage: string;
    }[]
  >([]);

  const handleUserProfile = async (userId: string) => {
    try {
      // API 호출을 병렬로 처리
      const [response1, response2, response3] = await Promise.all([
        getUserExerciseTime(Number(userId)),
        getUserWeight6(Number(userId)),
        getUserCrewList(Number(userId)),
      ]);

      // 운동 시간 데이터 처리
      const exerciseTimeData = response1.data.data;
      setTodayExerciseTime(exerciseTimeData.dailyAccumulatedExerciseTime);
      setThisWeekExerciseTime(exerciseTimeData.weeklyAccumulatedExerciseTime);

      // 체중 데이터 처리
      const weightDataList = response2.data.data.weightDataList || [];
      setUserWeight(weightDataList);

      // 크루 리스트 데이터 처리
      const crewList = response3.data.crewList || [];
      setUserCrewList(crewList);
    } catch (error) {
      console.error('Error fetching user detail:', error);
    }
  };

  // 6개월 전까지의 날짜 배열을 생성하는 함수
  const generateLast6Months = () => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.unshift(`${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}`);
    }

    return result;
  };

  const chartLabels = generateLast6Months();

  // 날짜 포맷팅 함수: yyyy-mm-dd 형식의 날짜를 yy.mm 형식으로 변환
  const formatDateToYearMonth = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const fillWeightData = (weightDataList: { date: string; weight: number }[], chartLabels: string[]) => {
    return chartLabels.map((label) => {
      const foundData = weightDataList.find((data) => formatDateToYearMonth(data.date) === label);
      return foundData ? foundData.weight : null;
    });
  };

  const formatExerciseTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: '체중 기록 (kg)',
        data: fillWeightData(userWeight, chartLabels),
        borderColor: '#A8C3FF',
        backgroundColor: '#CDE0FF',
        fill: false,
        tension: 0.1,
      },
    ],
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
          padding: 1,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
      },
    },
    layout: {
      padding: {
        left: -10,
        right: 20,
        bottom: -5,
      },
    },
  };

  useEffect(() => {
    if (userId) {
      handleUserProfile(userId);
    }
  }, [userId]);

  const handleCrewClick = (crewId: number) => {
    console.log(crewId); // TODO - 해당 크루 상세보기
  };

  return (
    <div className="profileContainer">
      <p className="titles">닉네임님</p>
      <div className="profileHeaderSection">
        <div className="time">
          <p className="timeTitle">오늘의 운동 시간</p>
          <span>{formatExerciseTime(todayExerciseTime)}</span>
          <p className="timeTitle">이번 주 운동 시간</p>
          <span>{formatExerciseTime(thisWeekExerciseTime)}</span>
        </div>
      </div>

      <div className="chartContainer">
        <Line data={chartData} options={options} />
      </div>

      <div className="crewContainer">
        <p className="titles">닉네임님의 크루</p>

        <div className="crewList">
          {userCrewList.length > 0 ? (
            userCrewList.map((crew) => (
              <Crew
                key={crew.crewId}
                imageUrl={crew.crewProfileImage}
                name={crew.crewName}
                tag={crew.exerciseName}
                onClick={() => handleCrewClick(crew.crewId)}
              />
            ))
          ) : (
            <p>해당 크루가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
