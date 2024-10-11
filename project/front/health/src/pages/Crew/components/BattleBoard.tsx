import './BattleBoard.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ButtonState from './ButtonState';
import { randomMatching } from '../../../api/crew';
import querykeys from '../../../utils/querykeys';
import useBattleDataStore from '@/store/battleInfo'; // zustand 전역 상태 스토어 임포트

interface BattleBoardProps {
  crewId: number;
  battleId: number;
  myCrewName: string;
  myCrewScore: number;
  opponentCrewName: string;
  opponentCrewScore: number;
  exerciseName: string;
  dday: number;
  battleStatus: string;
  buttonState: ButtonState;
}

export default function BattleBoard({
  crewId,
  battleId,
  myCrewName,
  myCrewScore,
  opponentCrewName,
  opponentCrewScore,
  exerciseName,
  dday,
  battleStatus,
  buttonState,
}: BattleBoardProps) {
  const navigate = useNavigate();
  const navigateBattlePage = () => {
    console.log('battleId', battleId);
    navigate(`/crew/battle/${crewId}`);
  };
  console.log(battleId);

  const queryClient = useQueryClient();
  const { setBattleData } = useBattleDataStore(); // zustand의 setBattleData 가져오기

  // 배틀 랜덤 매칭
  const randomMatchingMutation = useMutation({
    mutationFn: () => randomMatching(crewId),
    onSuccess: (data) => {
      console.log('랜덤 매칭 성공:', data);
      queryClient.invalidateQueries({
        queryKey: [querykeys.BATTLE_STATUS, crewId],
      });
      // 전역 상태에 배틀 데이터 업데이트
      setBattleData({
        crewId,
        battleId: data.battleId,
        myCrewName: data.myCrewName,
        myCrewScore: data.myCrewScore,
        opponentCrewName: data.opponentCrewName,
        opponentCrewScore: data.opponentCrewScore,
        exerciseName: data.exerciseName,
        dday: data.dday,
        battleStatus: 'STARTED',
      });
      navigate(`/crew/battle/${crewId}`);
    },
    onError: (error) => {
      console.error('랜덤 매칭 오류 발생:', error);
    },
  });

  const handleStartBattle = () => {
    randomMatchingMutation.mutate();
  };

  const renderContent = () => {
    switch (battleStatus) {
      case 'NONE':
        return (
          <div className="battle-board">
            <p>아직 참여중인 배틀이 없어요!</p>
            {buttonState === ButtonState.NONE && <div></div>}
            {buttonState === ButtonState.RANDOM_MATCHING && (
              <button className="button randomMatch" onClick={handleStartBattle}>
                랜덤 매칭
              </button>
            )}
          </div>
        );
      case 'STARTED':
        return (
          <div className="battle-board">
            <div className="Crew-info">
              <div className="our-Crew">
                <p>{myCrewName}</p>
                <p className="sport"># {exerciseName}</p>
                <p>{myCrewScore}점</p>
              </div>
              <div className="vs-info">
                <div className="d-day">대결 D-{dday}</div>
                <span>VS</span>
              </div>
              <div className="opponent-Crew">
                <p>{opponentCrewName}</p>
                <p className="sport"># {exerciseName}</p>
                <p>{opponentCrewScore}점</p>
              </div>
            </div>
            <div className="score-bar" />
            {buttonState === ButtonState.NONE && <div></div>}
            {buttonState === ButtonState.BATTLE_ENTRY && (
              <button className="button join-crew" onClick={navigateBattlePage}>
                크루 배틀 입장
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="battle-board-container">{renderContent()}</div>;
}
