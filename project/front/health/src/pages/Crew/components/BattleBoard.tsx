import './BattleBoard.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ButtonState from './ButtonState';
import { randomMatching } from '../../../api/crew';
import querykeys from '../../../utils/querykeys';
import { useState } from 'react';

interface BattleBoardProps {
  crewId: number;
  battleId: number;
  myTeamName: string;
  myTeamScore: number;
  opponentTeamName: string;
  opponentTeamScore: number;
  exerciseName: string;
  dDay: number;
  battleStatus: string;
  buttonState: ButtonState;
}

export default function BattleBoard({
  crewId,
  battleId,
  myTeamName,
  myTeamScore,
  opponentTeamName,
  opponentTeamScore,
  exerciseName,
  dDay,
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
  // 배틀 랜덤 매칭
  const [battleData, setBattleData] = useState({
    myTeamName,
    myTeamScore,
    opponentTeamName,
    opponentTeamScore,
    exerciseName,
    dDay,
    battleStatus,
  });
  const randomMatchingMutation = useMutation({
    mutationFn: () => randomMatching(crewId),
    onSuccess: (data) => {
      console.log('랜덤 매칭 성공:', data);
      queryClient.invalidateQueries({
        queryKey: [querykeys.BATTLE_STATUS, crewId],
      });
      setBattleData({
        myTeamName: data.myTeamName,
        myTeamScore: data.myTeamScore,
        opponentTeamName: data.opponentTeamName,
        opponentTeamScore: data.opponentTeamScore,
        exerciseName: data.exerciseName,
        dDay: data.dDay,
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
            <div className="team-info">
              <div className="our-team">
                <p>{myTeamName}</p>
                <p className="sport"># {exerciseName}</p>
                <p>{myTeamScore}점</p>
              </div>
              <div className="vs-info">
                <div className="d-day">대결 D-{dDay}</div>
                <span>VS</span>
              </div>
              <div className="opponent-team">
                <p>{opponentTeamName}</p>
                <p className="sport"># {exerciseName}</p>
                <p>{opponentTeamScore}점</p>
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
