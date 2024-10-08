import { useState } from 'react';
import './Recommend.scss';
import GeneralButton from '../../../components/Button/GeneralButton';
import { useQuery } from '@tanstack/react-query';
import { getExerciseRecommendation } from '@/api/exercise';
import queryKeys from '@/utils/querykeys'; // 제공된 쿼리 키를 가져옴
import useUserStore from '@/store/userInfo';
import ExerciseRecommendImage from '@/assets/image/exerciseRecommendImage.png';

interface ExerciseRecommendation {
  id: number;
  exerciseName: string;
  reason: string;
  description: string;
}

export default function ExerciseRecommendPage() {
  const { nickname } = useUserStore();
  const [selectedTab, setSelectedTab] = useState<string>(''); // 첫 번째 탭 초기값 설정

  // useQuery를 사용하여 API 호출 및 캐싱 관리
  const {
    data: recommendations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.EXERCISE_RECOMMEND],
    queryFn: () => getExerciseRecommendation(),
  });

  console.log('recommendations:', recommendations);
  // 데이터가 로딩 중일 때
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시
  if (isError) {
    return <div>Error loading data.</div>;
  }

  // 탭 클릭 시 상태 업데이트
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  // 선택된 운동의 설명을 찾는 함수
  const getSelectedExercise = () => {
    return recommendations?.recommendedExerciseList?.find(
      (rec: ExerciseRecommendation) => rec.exerciseName === selectedTab
    );
  };

  return (
    <div className="exerciseRecommendContainer">
      <h2 className="greeting">{nickname}님,</h2>
      <h3 className="recommendTitle">
        이런 <span className="exerciseSpan">운동</span>을 추천드려요!
      </h3>

      {/* 운동 카테고리 선택 버튼 */}
      <div className="tabs">
        {recommendations &&
          recommendations.recommendedExerciseList?.map((rec: ExerciseRecommendation) => (
            <GeneralButton
              buttonStyle={{ style: 'outlined', size: 'semiTiny' }}
              key={rec.id}
              onClick={() => handleTabClick(rec.exerciseName)}
              className={selectedTab === rec.exerciseName ? 'active' : ''} // active 클래스 추가
            >
              {rec.exerciseName}
            </GeneralButton>
          ))}
      </div>

      {/* 선택된 운동에 대한 설명 표시 */}
      {getSelectedExercise() && (
        <div>
          <div className="recommendSection">
            <h4 className="sectionTitle">운동 설명</h4>
            <p className="sectionContent">{getSelectedExercise()?.description}</p>
          </div>
          <div className="recommendSection">
            <h4 className="sectionTitle">추천 이유</h4>
            <p className="sectionContent">{getSelectedExercise()?.reason}</p>
          </div>
        </div>
      )}
      <div className="ExerciseRecommendImage">
        <img src={ExerciseRecommendImage} alt="ExerciseRecommendImage" />
      </div>
    </div>
  );
}
