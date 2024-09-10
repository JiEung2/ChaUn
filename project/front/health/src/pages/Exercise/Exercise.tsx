import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Modal from '../../components/Exercise/ExerciseList';
import GeneralButton from '../../components/Button/GeneralButton';
import Start from '../../assets/svg/start.svg';
import Stop from '../../assets/svg/stop.svg';
import Finish from '../../assets/svg/finish.svg';

export default function Exercise() {
  // const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
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
    }
  };

  const handleFinish = () => {
    handleStopTimer();
    setIsFinished(true);
  };

  const calculateCalories = (seconds: number) => {
    return (seconds * 0.1).toFixed(2);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div style={{ textAlign: 'center' }}>
      <GeneralButton
        buttonStyle={{ style: 'semiOutlined', size: 'mini' }}
        onClick={() => navigate('/exercise/recommend')}>
        운동 추천
      </GeneralButton>
      <div>{/* Image placeholder */}</div>
      <GeneralButton
        buttonStyle={{ style: 'primary', size: 'large' }}
        // onClick={() => setShowModal(true)}
      >
        운동 선택
      </GeneralButton>

      {!isFinished ? (
        <>
          {/* {showModal && <Modal onClose={() => setShowModal(false)} />} */}
          <div>{new Date(timer * 1000).toISOString().substr(11, 8)}</div>
          {!isRunning ? (
            <button onClick={startTimer}>
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
        </>
      ) : (
        <div>
          <h2>운동이 종료되었습니다.</h2>
          <p>총 운동 시간: {new Date(timer * 1000).toISOString().substr(11, 8)}</p>
          <p>소모 칼로리: {calculateCalories(timer)} kcal</p>
        </div>
      )}
    </div>
  );
}
