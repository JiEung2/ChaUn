import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCrewDetail, getCrewRanking, joinToCrew } from '@/api/crew';
import Coin from '@/components/Coin/Coin';
import styles from './CrewDetail.module.scss';
interface CrewInfo {
  crewProfileImage: string;
  crewName: string;
  exerciseName: string;
  crewRanking: number;
  totalBattleCount: number;
  winCount: number;
  averageAge: number;
  activityScore: number;
  basicScore: number;
  crewCoins: number;
  description: string;
}

interface Member {
  nickname: string;
  userId: number;
  userProfileImage: string;
  exerciseTime: number;
}

const CrewDetail = () => {
  const { crew_id } = useParams<{ crew_id: string }>();
  const [crewInfo, setCrewInfo] = useState<CrewInfo>({
    crewProfileImage: '',
    exerciseName: '',
    crewName: '',
    description: '',
    crewRanking: 0,
    totalBattleCount: 0,
    winCount: 0,
    averageAge: 0,
    activityScore: 0,
    basicScore: 0,
    crewCoins: 0,
  });
  const [members, setMembers] = useState<Member[]>([]);

  const applyCrew = async () => {
    try {
      const response = await joinToCrew(Number(crew_id));
      console.log('크루 가입 신청 결과', response);
    } catch (error) {
      console.error('크루 가입 신청 실패', error);
    }
  };
  const formatExerciseTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // const members: Member[] = [
  //   {
  //     nickname: '달리기 왕자',
  //     userId: 20,
  //     characterImage: 'character01.jpg',
  //     userProfileImage: 'crew-profile-image.jpg',
  //     thisWeekExerciseTime: 27900000, // ms -> 7h 45m
  //   },
  //   {
  //     nickname: '달리기 공주',
  //     userId: 21,
  //     characterImage: 'character01.jpg',
  //     userProfileImage: 'crew-profile-image.jpg',
  //     thisWeekExerciseTime: 18000000, // ms -> 5h 0m
  //   },
  // ];

  const getCrewDetailData = async () => {
    try {
      // TODO - Number로 크루 아이디 변환 잘 되는지 확인하기
      const numberCrewId = Number(crew_id);
      const response = await getCrewDetail(numberCrewId);
      console.log('크루 디테일 데이터', response);
      setCrewInfo(response.data);
    } catch (error) {
      console.error('크루 상세 정보 불러오기 실패', error);
    }
  };

  const getCrewRankingData = async (sendCrewId: string) => {
    console.log('크루 아이디', sendCrewId);
    try {
      const response = await getCrewRanking(Number(sendCrewId));
      console.log('크루 랭킹 데이터', response);
      setMembers(response.data);
    } catch (error) {
      console.error('크루 랭킹 정보 불러오기 실패', error);
    }
  };

  // crewId를 number로 변환하는 로직 필요
  useEffect(() => {
    getCrewDetailData();
    getCrewRankingData(crew_id!); // crew_id가 undefinedd일 때 가장 먼저 확인
  }, []);
  //TODO - 이미 가입된 크루일 떄 가입 신청 비활성화
  return (
    <div>
      <div className={styles.crewInfoContainer}>
        <div className={styles.crewInfoHeader}>
          <img className={styles.crewProfileImage} src={crewInfo.crewProfileImage} />
          <div className={styles.crewInfo}>
            <div className={styles.crewInfoTitle}>
              <h3 className={styles.crewName}>{crewInfo.crewName}</h3>
              <span className={styles.exerciseTag}># {crewInfo.exerciseName}</span>
            </div>
            <p className={styles.crewDescription}>{crewInfo.description}</p>
            <div className={styles.crewCoins}>
              <Coin amount={crewInfo.crewCoins} style="styled" />
            </div>
          </div>
        </div>
        <button className={styles.applyButton} onClick={applyCrew}>
          가입 신청
        </button>
        <div className={styles.crewInfoDetails}>
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
      </div>
      <div className={styles.crewRankingContainer}>
        {members.map((member, index) => (
          <div key={member.userId} className={styles.rankingList}>
            <div className={styles.rankingItem}>
              <span>{index + 1}</span>
              <img className={styles.memberProfileImageSmall} src={member.userProfileImage} alt="member profile" />
              <span>{member.nickname}</span>
              <span className={styles.time}>{formatExerciseTime(member.exerciseTime)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewDetail;
