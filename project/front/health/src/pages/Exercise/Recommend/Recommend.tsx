import { useState } from 'react';
import './Recommend.scss';
import GeneralButton from '../../../components/Button/GeneralButton';

export default function ExerciseRecommendPage() {
  const tabs = ['테니스', '수영', '스쿼트', '플랭크'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]); // 첫 번째 운동 종목을 초기값으로 설정

  // 탭 클릭 시 상태 업데이트
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="exerciseRecommendContainer">
      <h2 className="greeting">닉네임님,</h2>
      <h3 className="recommendTitle">
        이런 <span className="highlight">운동</span>을 추천드려요!
      </h3>

      {/* 운동 카테고리 선택 버튼 */}
      <div className="tabs">
        {tabs.map((tab) => (
          <GeneralButton
            buttonStyle={{ style: 'outlined', size: 'semiTiny' }}
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={selectedTab === tab ? 'active' : ''} // active 클래스 추가
          >
            {tab}
          </GeneralButton>
        ))}
      </div>

      {/* 운동 이유 및 방법 */}
      <div className="recommendSection">
        <h4 className="sectionTitle">추천 이유</h4>
        <p className="sectionContent">
          배드민턴과 유사하게 라켓을 사용하는 스포츠로, 더 큰 공을 사용해 강한 팔과 다리 근력을 키우며, 민첩성을 훈련할 수 있습니다. 축구에서의 빠른 방향 전환과 유사한 움직임이 많아 연관성도 있습니다.
        </p>
      </div>

      <div className="methodSection">
        <h4 className="sectionTitle">운동 방법</h4>
        <p className="sectionContent">
          테니스는 넓은 코트에서 혼자 또는 팀으로 진행되며, 상대의 코트에 공을 보내 득점을 목표로 합니다. 기본적인 테니스 스윙(포핸드, 백핸드)을 익히고, 짧은 거리에 긴 거리의 스트로크 연습을 통해 실력을 키울 수 있습니다.
        </p>
      </div>

      {/* 운동 이미지 및 캐릭터 */}
      <div className="characterSection">
        {/* <img src="/path/to/character-image.png" alt="운동 캐릭터" className="characterImage" /> */}
      </div>
    </div>
  );
}
