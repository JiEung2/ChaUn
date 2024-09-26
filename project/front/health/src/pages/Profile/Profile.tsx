import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Coin from '@/components/Coin/Coin';
import Crew from '@/components/Crew/Crew';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js의 자동 등록을 위해 필요
import './Profile.scss';
import { getUserDetail, getUserWeight6 } from '@/api/user';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [userDetail, setUserDetail] = useState<{ nickname: string; coin: number } | null>(null);
  const [userWeight, setUserWeight] = useState<{ date: string; weight: number }[]>([]);

  // 비동기로 사용자 프로필 데이터 받아오기
  const handleUserProfile = async (userId: string) => {
    try {
      const response = await getUserDetail(Number(userId));
      const response2 = await getUserWeight6(Number(userId)); // weight 데이터를 받아오는 API
      const userData = response.data;
      setUserDetail(userData);

      const weightDataList = response2.data.weightDataList || [];
      setUserWeight(weightDataList);
    } catch (error) {
      console.error('Error fetching user detail:', error);
    }
  };

  const [totalExerciseTime] = useState('150h 48m');
  const [weeklyExerciseTime] = useState('20h 45m');
  const myCrews = [
    {
      id: 1,
      imageUrl: 'data:image/png;base64,...',
      name: '달리는 번개',
      tag: '런닝',
    },
    // 나머지 크루 데이터 생략...
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };
  // 차트 데이터를 weightDataList 기반으로 동적으로 설정
  const chartData = {
    labels: userWeight.map((data) => formatDate(data.date)), // x축을 날짜로 설정
    datasets: [
      {
        label: '체중 기록 (kg)',
        data: userWeight.map((data) => data.weight), // y축을 weight로 설정
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
          padding: 10,
        },
      },
    },
  };

  useEffect(() => {
    if (userId) {
      handleUserProfile(userId);
    }
  }, [userId]);

  const handleCrewClick = (crewId: number) => {
    // TODO - 해당 크루 상세보기
    console.log(crewId);
  };

  return (
    <div className="profileContainer">
      <div className="profileHeaderSection">
        {userDetail && <h3 className="username">{userDetail.nickname}님</h3>}
        {userDetail && <Coin amount={userDetail.coin} style="styled" />}
      </div>

      <div className="exercise-summary">
        <p>총 운동 시간</p>
        <h1>{totalExerciseTime}</h1>
        <p>이번 주 운동 시간</p>
        <h1>{weeklyExerciseTime}</h1>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      <div className="crew-container">
        <h3>{userDetail?.nickname}님의 크루</h3>

        <div className="crew-list">
          {myCrews.map((crew, index) => (
            <Crew
              key={index}
              imageUrl={crew.imageUrl}
              name={crew.name}
              tag={crew.tag}
              onClick={() => handleCrewClick(crew.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
