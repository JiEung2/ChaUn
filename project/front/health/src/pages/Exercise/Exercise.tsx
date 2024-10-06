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
  const milliseconds = Math.floor((timer % 1000) / 100);
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
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
  const [startTime, setStartTime] = useState<Date | null>(null);
  //불필요해서 우선 주석처리
  // const [endTime, setEndTime] = useState<Date | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ startTime, endTime }: { startTime: string; endTime: string }) =>
      postExerciseRecord(selectedExercise!.id, timer, startTime, endTime),
    onSuccess: (data) => {
      console.log('운동기록 등록에 성공했습니다.', data);
      setCalories(data.burnedCalories);
    },
    onError: (error) => {
      console.error('운동기록 등록에 실패했습니다.', error);
    },
  });

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(new Date()); // 운동 시작 시간 기록
    const id = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
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
    const now = new Date();
    // setEndTime(now); // 운동 끝나는 시간 기록

    if (startTime) {
      mutation.mutate({
        startTime: startTime.toISOString(),
        endTime: now.toISOString(),
      });
    } else {
      console.error('Start time is null');
    }

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
      <div>{/* 이미지 자리 */}</div>
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
              <span className="time">{formatTime(timer)}</span>
            </div>
            <div className="recordItem">
              <p>🔥 칼로리</p>
              <span className="kcal">{calories} kcal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
