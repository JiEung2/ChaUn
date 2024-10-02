import { useState } from 'react';
import './Recommend.scss';
import GeneralButton from '../../../components/Button/GeneralButton';
import { useQuery } from '@tanstack/react-query';
import { getExerciseRecommendation } from '@/api/exercise';
import queryKeys from '@/utils/querykeys'; // 제공된 쿼리 키를 가져옴

interface ExerciseRecommendation {
  id: number;
  name: string;
  description: string;
}

export default function ExerciseRecommendPage() {
  const [selectedTab, setSelectedTab] = useState<string>(''); // 첫 번째 탭 초기값 설정

  // useQuery를 사용하여 API 호출 및 캐싱 관리
  const {
    data: recommendations,
    isLoading,
    isError,
  } = useQuery<ExerciseRecommendation[]>({
    queryKey: [queryKeys.EXERCISE_RECOMMEND],
    queryFn: () => getExerciseRecommendation(),
  });

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
    return recommendations?.find((rec) => rec.name === selectedTab);
  };

  return (
    <div className="exerciseRecommendContainer">
      <h2 className="greeting">닉네임님,</h2>
      <h3 className="recommendTitle">
        이런 <span className="highlight">운동</span>을 추천드려요!
      </h3>

      {/* 운동 카테고리 선택 버튼 */}
      <div className="tabs">
        {recommendations &&
          recommendations?.map((rec) => (
            <GeneralButton
              buttonStyle={{ style: 'outlined', size: 'semiTiny' }}
              key={rec.id}
              onClick={() => handleTabClick(rec.name)}
              className={selectedTab === rec.name ? 'active' : ''} // active 클래스 추가
            >
              {rec.name}
            </GeneralButton>
          ))}
      </div>

      {/* 선택된 운동에 대한 설명 표시 */}
      {getSelectedExercise() && (
        <div className="recommendSection">
          <h4 className="sectionTitle">추천 운동</h4>
          <p className="sectionContent">{getSelectedExercise()?.description}</p>
        </div>
      )}
    </div>
  );
}
