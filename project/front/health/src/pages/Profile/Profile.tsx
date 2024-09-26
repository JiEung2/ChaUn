import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Coin from '@/components/Coin/Coin';
import Crew from '@/components/Crew/Crew';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js의 자동 등록을 위해 필요
import './Profile.scss';
import { getUserDetail } from '@/api/user';

// 필요한 데이터
// 몸무게 6개월 (params : userId)
// 회원 디테일 (params : userId)
// 운동 시간 (params : userId)
// 가입된 크루 조회 (params : userId)

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [userDetail, setUserDetail] = useState<{ nickname: string; coin: number } | null>(null);

  // 비동기로 사용자 프로필 데이터 받아오기
  const handleUserProfile = async (userId: string) => {
    try {
      const response = await getUserDetail(Number(userId));
      const userData = response.data;
      setUserDetail(userData); // 받아온 데이터를 상태로 저장
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

  const [chartData] = useState({
    labels: ['2024.03', '2024.04', '2024.05', '2024.06', '2024.07', '2024'],
    datasets: [
      {
        label: '체중 기록 (kg)',
        data: [70, 72, 71, 73, 74, 72], // 체중 기록 예시 데이터
        borderColor: '#A8C3FF',
        backgroundColor: '#CDE0FF',
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (userId) {
      handleUserProfile(userId);
    }
  }, [userId]);

  const handleCrewClick = (crewId: number) => {
    //TODO - 해당 크루 상세보기
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
        <Line data={chartData} />
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
