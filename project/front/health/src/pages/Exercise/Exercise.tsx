import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ExerciseModal from '../../components/Exercise/ExerciseModal';
import GeneralButton from '../../components/Button/GeneralButton';
import Start from '../../assets/svg/start.svg';
import Stop from '../../assets/svg/stop.svg';
import Finish from '../../assets/svg/finish.svg';
import './Exercise.scss';

Modal.setAppElement('#root');

export default function Exercise() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{ id: number; name: string } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isStopped, setIsStopped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const startTimer = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
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
    setIsFinished(true);
  };

  const calculateCalories = (seconds: number) => {
    return (seconds * 0.1).toFixed(2);
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
          <div className="timer">{new Date(timer * 1000).toISOString().substr(11, 8)}</div>
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
              <span className="kcal">{calculateCalories(timer)} kcal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
