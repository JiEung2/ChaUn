import { useNavigate, useParams } from 'react-router-dom';
import Crew from '@/components/Crew/Crew';
import CharacterCanvas from '@/components/Character/CharacterCanvas';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Profile.scss';
import { getUserDetail, getUserExerciseTime, getUserWeight6 } from '@/api/user';
import { getUserCrewList } from '@/api/crew';
import { useSuspenseQuery } from '@tanstack/react-query';
import queryKeys from '@/utils/querykeys';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // 회원 디테일
  const { data: userDetailData } = useSuspenseQuery({
    queryKey: [queryKeys.USER_DETAIL, userId],
    queryFn: () => getUserDetail(Number(userId)),
  });

  // 운동 시간 가져오기
  const { data: exerciseTimeData } = useSuspenseQuery({
    queryKey: [queryKeys.USER_EXERCISE_TIME, userId],
    queryFn: () => getUserExerciseTime(Number(userId)),
  });

  // 체중 기록 가져오기
  const { data: weight6Data } = useSuspenseQuery({
    queryKey: [queryKeys.USER_WEIGHT, userId],
    queryFn: () => getUserWeight6(Number(userId)),
  });

  // 크루 리스트 가져오기
  const { data: userCrewList } = useSuspenseQuery({
    queryKey: [queryKeys.USER_CREW_LIST, userId],
    queryFn: () => getUserCrewList(Number(userId)),
  });

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

  // 체중 데이터 매핑 함수
  const fillWeightData = (weightDataList: { date: string; weight: number }[], chartLabels: string[]) => {
    return chartLabels?.map((label) => {
      const foundData = weightDataList.find((data) => formatDateToYearMonth(data.date) === label);
      return foundData ? foundData.weight : null;
    });
  };

  // 운동 시간 포맷팅 함수
  const formatExerciseTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    const hoursText = hours ? `${hours}h` : '0h';
    const minutesText = minutes ? `${minutes}m` : '0m';

    return `${hoursText} ${minutesText}`.trim();
  };

  // 차트 데이터 설정
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: '체중 기록 (kg)',
        data: fillWeightData(weight6Data.weightDataList || [], chartLabels),
        backgroundColor: '#CDE0FF',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // 차트 옵션 설정
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

  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/crewDetail/${crewId}`);
  };

  console.log(weight6Data);
  const hasWeightData = weight6Data.weightDataList?.length > 0;
  return (
    <div className="profileContainer">
      <p className="titles">{userDetailData.nickname}님</p>
      <div className="profileHeaderSection">
        <div className="userProfileInfo">
          <CharacterCanvas glbUrl={userDetailData.characterFileUrl} gender={userDetailData.gender} />
        </div>

        <div className="time">
          <p className="timeTitle">오늘의 운동 시간</p>
          <span>{formatExerciseTime(exerciseTimeData.dailyAccumulatedExerciseTime)}</span>
          <p className="timeTitle">이번 주 운동 시간</p>
          <span>{formatExerciseTime(exerciseTimeData.weeklyAccumulatedExerciseTime)}</span>
        </div>
      </div>

      <div className="userChartContainer">
        <div className={`userChartContent ${!hasWeightData ? 'blurred' : ''}`}>
          <Line data={chartData} options={options} />
        </div>
        {!hasWeightData && (
          <div className="noWeightMessage">
            <p>
              지난 6개월 동안 <br />
              입력된 체형 정보가 없습니다.
            </p>
          </div>
        )}
      </div>

      <div className="crewContainer">
        <p className="titles">{userDetailData.nickname}님의 크루</p>

        <div className="crewList">
          {userCrewList && userCrewList.crewList?.length > 0 ? (
            userCrewList.crewList?.map((crew: any) => (
              <Crew
                key={crew.crewId}
                imageUrl={crew.crewProfileImage}
                crewName={crew.crewName}
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
