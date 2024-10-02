import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ExerciseModal from '../../components/Exercise/ExerciseModal';
import GeneralButton from '../../components/Button/GeneralButton';
import Start from '../../assets/svg/start.svg';
import Stop from '../../assets/svg/stop.svg';
import Finish from '../../assets/svg/finish.svg';
import './Exercise.scss';
import { postExerciseRecord } from '../../api/exercise';
import { useMutation } from '@tanstack/react-query';
import { set } from 'date-fns';

Modal.setAppElement('#root');
function formatTime(timer: number) {
  const hours = Math.floor(timer / 3600000)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((timer % 3600000) / 60000)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((timer % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  const milliseconds = Math.floor((timer % 1000) / 100); // 밀리초를 0.1초 단위로 표시
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
interface ExerciseProps {
  exerciseId: number;
  exerciseTime: number;
  exerciseStartTime: string;
  exerciseEndTime: string;
}

export default function Exercise() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{ id: number; name: string } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isStopped, setIsStopped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [calories, setCalories] = useState(0);
  const navigate = useNavigate();

  // 서버에 운동 기록을 전송하고, 성공하면 칼로리 값을 업데이트
  const mutation = useMutation({
    mutationFn: () =>
      //TODO - 운동 시작시간, 끝나는 시간 수정 예정
      postExerciseRecord(selectedExercise!.id, timer, new Date().toISOString(), new Date().toISOString()),
    onSuccess: (data) => {
      console.log('운동기록 등록에 성공했습니다.', data);
      setCalories(data.burnedCalories); // 서버에서 받아온 칼로리 값 저장
    },
    onError: (error) => {
      console.error('운동기록 등록에 실패했습니다.', error);
    },
  });

  const startTimer = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setTimer((prev) => prev + 10); // 10ms 단위로 증가
    }, 10); // 10ms마다 업데이트
    setIntervalId(id);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsStopped(true);
    }
  };

  const handleFinish = () => {
    handleStopTimer();

    mutation.mutate(); // 운동 기록 서버 전송
    setIsFinished(true);
  };

  const handleSelectExercise = (selected: { id: number; name: string } | { id: number; name: string }[]) => {
    if (Array.isArray(selected)) {
      setSelectedExercise(selected[0]);
    } else {
      setSelectedExercise(selected);
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="exerciseContainer">
      <div className="exerciseRecommendButton">
        <GeneralButton
          buttonStyle={{ style: 'semiOutlined', size: 'mini' }}
          onClick={() => navigate('/exercise/recommend')}>
          운동 추천
        </GeneralButton>
      </div>
      <div>{/* Image placeholder */}</div>
      <GeneralButton
        buttonStyle={{ style: 'primary', size: 'large' }}
        onClick={() => setShowModal(true)}
        className="selectExercise"
        disabled={isRunning || isFinished || isStopped}>
        {selectedExercise?.name || '운동 선택'}
      </GeneralButton>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="modalContent"
        overlayClassName="modalOverlay">
        <ExerciseModal onSelectExercise={handleSelectExercise} multiple={false} onClose={handleCloseModal} />
      </Modal>

      {!isFinished ? (
        <>
          <div className="timer">{formatTime(timer)}</div>
          <div className="timerButton">
            {!isRunning ? (
              <button onClick={startTimer} disabled={!selectedExercise}>
                <img src={Start} alt="start" />
              </button>
            ) : (
              <button onClick={handleStopTimer}>
                <img src={Stop} alt="stop" />
              </button>
            )}
            <button onClick={handleFinish} disabled={!isRunning && timer === 0}>
              <img src={Finish} alt="finish" />
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="finishMent">운동이 종료되었습니다!</p>
          <div className="recordContainer">
            <div className="recordItem">
              <p>⏱ 운동 시간</p>
              <span className="time">{new Date(timer * 1000).toISOString().substr(11, 8)}</span>
            </div>
            <div className="recordItem">
              <p>🔥 칼로리</p>
              {/* 서버에서 받아온 칼로리 값 표시 */}
              <span className="kcal">{calories} kcal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
