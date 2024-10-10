import { useEffect, useState } from 'react';
import './MyCrew.scss';
import Coin from '@/components/Coin/Coin';
// import QuestItem from '../../../components/Home/Quest/QuestItem';
import Plus from '../../../assets/svg/plus.svg';
import Minus from '../../../assets/svg/minus.svg';
import Settings from '../../../assets/svg/setting.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { getCrewQuest } from '@/api/quest';
import {
  getCrewDetail,
  getCrewRanking,
  agreeRandomMatching,
  collectCrewCoin,
  crewBattleStatus,
  crewMemberDailyExerciseTime,
} from '@/api/crew';
// import querykeys from '@/utils/querykeys';
import CloseButton from '@/assets/svg/xCircle.svg';
// import CrewAndMemberList from '@/components/Crew/CrewAndMemberList';

export default function MyCrew() {
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCrewLeader, setIsCrewLeader] = useState(true); // 크루 대표 여부 상태
  const [isInBattle, setIsInBattle] = useState(true); // 배틀 참여 여부 상태
  const [opponentCrew, setOpponentCrew] = useState('3대 500만원'); // 상대 팀 정보

  const [crewInfo, setCrewInfo] = useState<CrewInfo>(); // 크루 상세 조회
  const [rankingMembers, setRankingMembers] = useState<RankingMember[]>(); // 크루 내 랭킹 조회
  const [_, setTodayQuests] = useState<todayQuest[]>(); // 크루 퀘스트
  const [battleStatus, setBattleStatus] = useState<battleStatus>();

  const [members, setMembers] = useState<member[]>();
  interface CrewInfo {
    crewId: number;
    crewName: string;
    profileImage: string;
    exerciseName: string;
    description: string;
    crewCoins: number;
    crewRanking: number;
    totalBattleCount: number;
    winCount: number;
    averageAge: number;
    activityScore: number;
    basicScore: number;
    role: string;
  }

  interface RankingMember {
    nickname: string;
    userId: number;
    // characterImageUrl: string;
    userProfileImage: string;
    exerciseTime: number;
  }

  interface todayQuest {
    questId: number;
    title: string;
    questPeriod: string;
    isCompleted: boolean;
  }

  interface battleStatus {
    myTeamName: string;
    myTeamScore: number;
    opponentTeamName: string;
    opponentTeamScore: number;
    exerciseName: string;
    battleStatus: string;
    dDay: number;
  }

  interface member {
    userId: number;
    nickname: string;
    exerciseTime: number;
    characterImageUrl: string;
  }
  const { crewId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const fetchCrewDetail = async (crewId: number) => {
    try {
      const response = await getCrewDetail(crewId);
      console.log('crew 상세보기', response);
      setCrewInfo(response);
      return response;
    } catch (error) {
      console.error('Error fetching crew detail:', error);
      throw error;
    }
  };
  const fetchCrewRanking = async (crewId: number) => {
    try {
      const response = await getCrewRanking(crewId);
      console.log('크루 내 랭킹 조회', setRankingMembers);
      setRankingMembers(response);
      return response;
    } catch (error) {
      console.error('Error fetching crew ranking:', error);
      throw error;
    }
  };
  const fetchCrewQuest = async (crewId: number) => {
    try {
      const response = await getCrewQuest(crewId);
      console.log('오늘의 퀘스트 조회', response);
      setTodayQuests(response);
      return response;
    } catch (error) {
      console.error('Error fetching crew quest:', error);
      throw error;
    }
  };
  // 코인 모금
  const collectCrewCoins = async (crewId: number, coinCount: number) => {
    try {
      const response = await collectCrewCoin({ crew_id: crewId, coin_count: coinCount });
      console.log('코인 모금 성공 여부', response);
      return response;
    } catch (error) {
      console.error('Error collecting crew coins:', error);
      throw error;
    }
  };
  const fetchCrewBattleStatus = async (crewId: number) => {
    try {
      const response = await crewBattleStatus(crewId);
      console.log('크루 BattleStatus', response);
      setBattleStatus(response);
      return response;
    } catch (error) {
      console.error('Error fetching crew battle status:', error);
      throw error;
    }
  };
  const fetchCrewMemberDailyExerciseTime = async (crewId: number) => {
    try {
      const response = await crewMemberDailyExerciseTime(crewId);
      console.log('크루 멤버들 조회', response);
      setMembers(response);
      return response;
    } catch (error) {
      console.error('Error fetching crew member daily exercise time:', error);
      throw error;
    }
  };
  const toggleRandomMatchingAgreement = async (crewId: number) => {
    try {
      const response = await agreeRandomMatching(crewId);
      return response;
    } catch (error) {
      console.error('Error toggling random matching agreement:', error);
      throw error;
    }
  };

  useEffect(() => {
    const num_crewId = Number(crewId);
    //초기 렌더링시 필요한 데이터들 모두 렌더링
    fetchCrewDetail(num_crewId);
    fetchCrewRanking(num_crewId);
    fetchCrewQuest(num_crewId);

    fetchCrewBattleStatus(num_crewId);
    fetchCrewMemberDailyExerciseTime(num_crewId);
    toggleRandomMatchingAgreement(num_crewId);
  }, []);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const formatExerciseTime = (timeInMs: number) => {
    // console.log('크루 운동 시간', timeInMs);
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const nextMember = () => {
    if (!members) return;
    setCurrentMemberIndex((prevIndex) => (prevIndex + 1) % members.length);
  };

  const prevMember = () => {
    if (!members) return;
    setCurrentMemberIndex((prevIndex) => (prevIndex - 1 + members.length) % members.length);
  };

  // const [todayQuests, setTodayQuests] = useState<quest[]>([]);

  // console.log(setIsCrewLeader);
  // console.log(setIsInBattle);
  // console.log(setOpponentCrew);

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
  // const todayQuests = [{ title: '크루 내 2명 이상의 팀원 하루에 합산 1시간 이상 운동하기', completed: true }];

  const [selectedCoins, setSelectedCoins] = useState(50); // 선택된 코인 수
  const [crewCoiins, setCrewCoins] = useState(300); // 크루 코인 수

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
    // mutation.mutate();
    collectCrewCoins(Number(crewId), crewCoiins);
    setIsDepositModalOpen(false); // 모금 후 모달 닫기
  };

  const [isRandomAllowed, setisRandomAllowed] = useState(true); // 배틀 랜덤 매칭 동의 상태
  const handleToggle = () => {
    setisRandomAllowed((prevState) => !prevState);
    //TODO - 크루 랜덤 매칭 활성화 여부를 어떻게 받을 것인지?
    agreeRandomMatching(Number(crewId));
  };
  useEffect(() => {
    if (crewInfo) {
      setSelectedCoins(50);
      setIsCrewLeader(crewInfo.role === 'LEADER');
    }
  }, [crewInfo]);

  useEffect(() => {
    if (battleStatus) {
      setIsInBattle(battleStatus.battleStatus === 'STARTED');
      setOpponentCrew(battleStatus.opponentTeamName);
    }
  }, [battleStatus]);
  const navigate = useNavigate();
  return (
    <>
      <div className="title">내 크루</div>
      <div className="crewInfoContainer">
        <div className="crewInfoHeader">
          <img className="crewProfileImage" src={crewInfo?.profileImage} alt="crew profile" />
          <div className="crewInfo">
            <div className="crewInfoTitle">
              <h3>{crewInfo?.crewName}</h3>
              <span className="exerciseTag"># {crewInfo?.exerciseName}</span>
              {isCrewLeader && (
                <img src={Settings} alt="settings" onClick={toggleSettingsModal} style={{ cursor: 'pointer' }} />
              )}
            </div>
            <p className="crewDescription">{crewInfo?.description}</p>
            <div className="crewCoins">
              <Coin amount={crewInfo?.crewCoins ?? 0} style="styled" />
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
              # {crewInfo?.exerciseName} 크루 랭킹: {Math.round(crewInfo?.crewRanking ?? 0)}위
            </p>
            <p>
              배틀 현황: {Math.round(crewInfo?.totalBattleCount ?? 0)}전 {Math.round(crewInfo?.winCount ?? 0)}승{' '}
              {Math.round((crewInfo?.totalBattleCount ?? 0) - (crewInfo?.winCount ?? 0))}패
            </p>
            <p>크루 평균 연령: {Math.round(crewInfo?.averageAge ?? 0)}세</p>
            <p>활동 점수: {Math.round(crewInfo?.activityScore ?? 0)}점</p>
            <p>기본 점수: {Math.round(crewInfo?.basicScore ?? 0)}점</p>
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
      {members && members.length > 0 && (
        <div className="crewCharacterContainer">
          <button className="prevButton" onClick={prevMember}>
            ←
          </button>
          <img
            className="memberProfileImage"
            src={members[currentMemberIndex].characterImageUrl}
            alt="member profile"
          />
          <div className="memberInfo">
            <h3>{members![currentMemberIndex].nickname}</h3>
            <p>크루 운동 시간</p>
            <p className="exerciseTime">{formatExerciseTime(members[currentMemberIndex].exerciseTime)}</p>
          </div>
          <button className="nextButton" onClick={nextMember}>
            →
          </button>
        </div>
      )}

      {/* 크루 랭킹 */}
      <div className="crewRankingContainer">{/* <CrewAndMemberList type="member" data={rankingMembers} /> */}</div>

      {/* 퀘스트 모달 */}
      {isQuestModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span className="modalTitle">오늘의 퀘스트</span>
            <img src={CloseButton} className="closeButton" onClick={toggleQuestModal}></img>
            <div className="questLayout">
              {/* {todayQuests &&
                todayQuests.map((questData, index) => (
                  <QuestItem key={index} title={questData.title} completed={questData.isCompleted} />
                ))} */}
            </div>
          </div>
        </div>
      )}

      {/* 배틀 모달 */}
      {isBattleModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span>크루 배틀 현황</span>
            <img src={CloseButton} className="closeButton" onClick={toggleBattleModal}></img>
            {isInBattle ? (
              <div>
                <div className="battleInfo">
                  <span className="vs">VS</span>
                  <span className="opponentCrew">{opponentCrew}</span>
                </div>
              </div>
            ) : (
              <p>진행중인 배틀이 없습니다.</p>
            )}

            {isCrewLeader ? (
              <button className="battleButton" onClick={() => navigate(`/crew/battle/${crewId}`)}>
                {isInBattle ? '입장하기' : '참여하기'}
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
              <h3>{crewInfo?.crewName}</h3>
              <img src={CloseButton} className="closeButton" onClick={toggleDepositModal}></img>
            </div>
            <div className="modalBody">
              <div className="coinSelector">
                <img src={Minus} className="decrement" onClick={decrementCoins}></img>
                <div className="coinContainer">
                  <Coin amount={selectedCoins ?? 0} style="styled" />
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
        <div className="modal">
          <div className="modalContent">
            <span>내 크루 설정</span>
            <img src={CloseButton} className="closeButton" onClick={toggleSettingsModal}></img>
            <div className="crewSettings">
              <div>
                <p className="settingTitle">크루 배틀 랜덤 매칭 동의</p>
                <p className="settingDescription">
                  상대가 배틀을 신청했을 때 자동으로 <br /> 수락됩니다. 참가비는 100코인입니다.
                </p>
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
