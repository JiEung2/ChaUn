import { useState } from 'react';
import './MyCrew.scss';
import Coin from '@/components/Coin/Coin';
import QuestItem from '../../../components/Home/Quest/QuestItem';
import Plus from '../../../assets/svg/plus.svg';
import Minus from '../../../assets/svg/minus.svg';
import Settings from '../../../assets/svg/setting.svg';
import { useNavigate } from 'react-router-dom';

export default function MyCrew() {
  interface CrewInfo {
    crewName: string;
    crewProfileImage: string;
    exerciseName: string;
    description: string;
    crewCoins: number;
    crewRanking: number;
    totalBattleCount: number;
    winCount: number;
    averageAge: number;
    activityScore: number;
    basicScore: number;
  }

  interface Member {
    nickname: string;
    userId: number;
    characterImage: string;
    userProfileImage: string;
    thisWeekExerciseTime: number;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const crewInfo: CrewInfo = {
    crewName: '달리는 번개',
    crewProfileImage: 'crew-profile-image.png',
    exerciseName: '런닝',
    description: '번개맨보다 빠른 러너들의 모임',
    crewCoins: 300,
    crewRanking: 3,
    totalBattleCount: 10,
    winCount: 7,
    averageAge: 20,
    activityScore: 1200,
    basicScore: 850,
  };

  const members: Member[] = [
    {
      nickname: '달리기 왕자',
      userId: 20,
      characterImage: 'character01.jpg',
      userProfileImage: 'crew-profile-image.jpg',
      thisWeekExerciseTime: 27900000, // ms -> 7h 45m
    },
    {
      nickname: '달리기 공주',
      userId: 21,
      characterImage: 'character01.jpg',
      userProfileImage: 'crew-profile-image.jpg',
      thisWeekExerciseTime: 18000000, // ms -> 5h 0m
    },
  ];

  const formatExerciseTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const nextMember = () => {
    setCurrentMemberIndex((prevIndex) => (prevIndex + 1) % members.length);
  };

  const prevMember = () => {
    setCurrentMemberIndex((prevIndex) => (prevIndex - 1 + members.length) % members.length);
  };

  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCrewLeader, setIsCrewLeader] = useState(true); // 크루 대표 여부 상태
  const [isInBattle, setIsInBattle] = useState(true); // 배틀 참여 여부 상태
  const [opponentTeam, setOpponentTeam] = useState('3대 500만원'); // 상대 팀 정보

  console.log(setIsCrewLeader);
  console.log(setIsInBattle);
  console.log(setOpponentTeam);

  const toggleQuestModal = () => {
    setIsQuestModalOpen(!isQuestModalOpen);
  };

  const toggleBattleModal = () => {
    setIsBattleModalOpen(!isBattleModalOpen);
  };

  const toggleDepositModal = () => {
    setIsDepositModalOpen(!isDepositModalOpen);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen); // Settings 모달 열고 닫기
  };

  //   오늘의 퀘스트
  const todayQuests = [{ title: '크루 내 2명 이상의 팀원 하루에 합산 1시간 이상 운동하기', completed: true }];

  const [selectedCoins, setSelectedCoins] = useState(100); // 선택된 코인 수
  const [_, setCrewCoins] = useState(300); // 크루 코인 수

  const incrementCoins = () => {
    setSelectedCoins((prev) => prev + 50);
  };

  const decrementCoins = () => {
    if (selectedCoins > 50) {
      setSelectedCoins((prev) => prev - 50);
    }
  };

  const handleDeposit = () => {
    setCrewCoins((prev) => prev + selectedCoins);
    setIsDepositModalOpen(false); // 모금 후 모달 닫기
  };

  const [isRandomAllowed, setisRandomAllowed] = useState(true); // 배틀 랜덤 매칭 동의 상태
  const handleToggle = () => {
    setisRandomAllowed((prevState) => !prevState);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="title">내 크루</div>
      <div className="crewInfoContainer">
        <div className="crewInfoHeader">
          <img className="crewProfileImage" src={crewInfo.crewProfileImage} alt="crew profile" />
          <div className="crewInfo">
            <div className="crewInfoTitle">
              <h3>{crewInfo.crewName}</h3>
              <span className="exerciseTag"># {crewInfo.exerciseName}</span>
              {isCrewLeader && (
                <img src={Settings} alt="settings" onClick={toggleSettingsModal} style={{ cursor: 'pointer' }} />
              )}
            </div>
            <p className="crewDescription">{crewInfo.description}</p>
            <div className="crewCoins">
              <Coin amount={crewInfo.crewCoins} style="styled" />
              <button className="deposit" onClick={toggleDepositModal}>
                모금하기
              </button>
            </div>
          </div>
        </div>
        <button className="detailButton" onClick={toggleDetails}>
          {isOpen ? '상세 닫기' : '상세 보기'}
        </button>
        {isOpen && (
          <div className="crewInfoDetails">
            <p>
              # {crewInfo.exerciseName} 크루 랭킹: {crewInfo.crewRanking}위
            </p>
            <p>
              배틀 현황: {crewInfo.totalBattleCount}전 {crewInfo.winCount}승{' '}
              {crewInfo.totalBattleCount - crewInfo.winCount}패
            </p>
            <p>크루 평균 연령: {crewInfo.averageAge}대 후반</p>
            <p>활동 점수: {crewInfo.activityScore}점</p>
            <p>기본 점수: {crewInfo.basicScore}점</p>
          </div>
        )}
      </div>

      {/* 버튼 */}
      <div className="buttonContainer">
        <div className="quest" onClick={toggleQuestModal}>
          오늘의 퀘스트
        </div>
        <div className="battle" onClick={toggleBattleModal}>
          크루 배틀 현황
        </div>
      </div>

      {/* 크루원 캐러셀 */}
      <div className="crewCharacterContainer">
        <button className="prevButton" onClick={prevMember}>
          ←
        </button>
        <img className="memberProfileImage" src={members[currentMemberIndex].characterImage} alt="member profile" />
        <div className="memberInfo">
          <h3>{members[currentMemberIndex].nickname}</h3>
          <p>크루 운동 시간</p>
          <p className="exerciseTime">{formatExerciseTime(members[currentMemberIndex].thisWeekExerciseTime)}</p>
        </div>
        <button className="nextButton" onClick={nextMember}>
          →
        </button>
      </div>

      {/* 크루 랭킹 */}
      <div className="crewRankingContainer">
        {members.map((member, index) => (
          <div key={member.userId} className="rankingList">
            <div className="rankingItem">
              <span>{index + 1}</span>
              <img className="memberProfileImageSmall" src={member.userProfileImage} alt="member profile" />
              <span>{member.nickname}</span>
              <span className="time">{formatExerciseTime(member.thisWeekExerciseTime)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 퀘스트 모달 */}
      {isQuestModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span className="modalTitle">오늘의 퀘스트</span>
            <button className="closeButton" onClick={toggleQuestModal}>
              &times;
            </button>
            <div className="questLayout">
              {todayQuests.map((quest, index) => (
                <QuestItem key={index} title={quest.title} completed={quest.completed} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 배틀 모달 */}
      {isBattleModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span>크루 배틀 현황</span>
            <button className="closeButton" onClick={toggleBattleModal}>
              &times;
            </button>
            {isInBattle ? (
              <div>
                <div className="battleInfo">
                  <span className="vs">VS</span>
                  <span className="opponentTeam">{opponentTeam}</span>
                </div>
              </div>
            ) : (
              <p>진행중인 배틀이 없습니다.</p>
            )}

            {isCrewLeader ? (
              <button className="battleButton" onClick={() => navigate('/crew/battle')}>
                참여하기
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      )}

      {/* 모금하기 모달 */}
      {isDepositModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalHeader">
              <h3>{crewInfo.crewName}</h3>
              <button className="closeButton" onClick={toggleDepositModal}>
                &times;
              </button>
            </div>
            <div className="modalBody">
              <div className="coinSelector">
                <img src={Minus} className="decrement" onClick={decrementCoins}></img>
                <div className="coinContainer">
                  <Coin amount={crewInfo.crewCoins} style="styled" />
                </div>
                <img src={Plus} className="increment" onClick={incrementCoins}></img>
              </div>
              <div className="depositButton" onClick={handleDeposit}>
                모금하기
              </div>
            </div>
          </div>
        </div>
      )}

      {/*크루 설정 모달 */}
      {isSettingsModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span>내 크루 설정</span>
            <button className="closeButton" onClick={toggleSettingsModal}>
              &times;
            </button>
            <div className="crewSettings">
              <div>
                <p className="settingTitle">크루 배틀 랜덤 매칭 동의</p>
                <p className="settingDescription">상대가 배틀을 신청했을 때 자동으로 수락됩니다.</p>
              </div>
              <label className="toggleSwitch">
                <input type="checkbox" checked={isRandomAllowed} onChange={handleToggle} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
