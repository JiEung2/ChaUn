import { useNavigate } from 'react-router-dom';
import styles from '@/pages/Crew/CrewDetail/CrewDetail.module.scss';
import UserImg from '@/assets/image/userImg.png';

interface Member {
  userId: number;
  userProfileImage: string | null;
  nickname: string;
  exerciseTime: number;
}

interface Crew {
  crewId: number;
  crewName: string;
  exerciseName: string;
  crewProfileImage: string;
  basicScore: number;
  activityScore: number;
}

interface Props {
  type: 'member' | 'crew';
  data: Member[] | Crew[];
}

export default function CrewAndMemberList({ type, data }: Props) {
  const navigate = useNavigate();

  const formatExerciseTime = (timeInMs: number | undefined) => {
    if (!timeInMs) return 'N/A';
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  const handleMemberClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const handleCrewClick = (crewId: number) => {
    navigate(`/crew/crewDetail/${crewId}`);
  };

  if (type === 'member') {
    return (
      <div className={styles.crewRankingContainer}>
        {(data as Member[]).map((member, index) => (
          <div key={member.userId} className={styles.rankingList}>
            <div className={styles.rankingItem}>
              <span>{index + 1}</span>
              <img
                className={styles.memberProfileImageSmall}
                src={member.userProfileImage || UserImg}
                alt="memberProfile"
                onClick={() => handleMemberClick(member.userId)}
                style={{ cursor: 'pointer' }}
              />
              <span className={styles.memberNickname}>{member.nickname}</span>
              <span className={styles.time}>{formatExerciseTime(member.exerciseTime)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'crew') {
    const firstCrew = (data as Crew[])[0];

    return (
      <>
        {firstCrew && <p className={styles.exerciseTag}># {firstCrew.exerciseName}</p>}
        <div className={styles.exerciseRankingContainer}>
          {(data as Crew[]).map((crew, index) => (
            <div key={crew.crewId} className={styles.rankingList}>
              <div className={styles.rankingItem}>
                <span>{index + 1}</span>
                <img
                  className={styles.memberProfileImageSmall}
                  src={crew.crewProfileImage}
                  alt="crewProfile"
                  onClick={() => handleCrewClick(crew.crewId)}
                  style={{ cursor: 'pointer' }}
                />
                <span className={styles.memberNickname}>{crew.crewName}</span>
                <span className={styles.basicScore}>{Math.round(crew.basicScore + crew.activityScore || 0)}점</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return null;
}
