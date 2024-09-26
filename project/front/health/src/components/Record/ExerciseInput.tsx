import { useState } from 'react';
import GeneralButton from '@/components/Button/GeneralButton';
import InputField from '@/components/Input/Input';
import ExerciseModal from '@/components/Exercise/ExerciseModal';
import DropDown from '@/assets/svg/dropDown.svg';
import DropUp from '@/assets/svg/dropUp.svg';
import './ExerciseInput.scss';

interface ExerciseInputProps {
  onShowPrediction: (exerciseId: number, day: string, duration: string) => void;
  setExerciseId: (id: number) => void;
  setDuration: (duration: string) => void;
  setDay: (day: string) => void;
  isButtonEnabled: boolean;
  exerciseId: string;
  duration: string;
  day: string;
}

export default function ExerciseInput({
  onShowPrediction,
  setExerciseId,
  setDuration,
  setDay,
  isButtonEnabled,
  exerciseId,
  duration,
  day,
}: ExerciseInputProps) {
  const [exerciseName, setExerciseName] = useState('');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  // 선택된 운동 처리 함수 (배열 또는 단일 객체 처리)
  const handleExerciseSelect = (selected: { id: number; name: string } | { id: number; name: string }[]) => {
    // 배열일 경우 첫 번째 요소를 선택
    const exercise = Array.isArray(selected) ? selected[0] : selected;
    setExerciseId(exercise.id);
    setExerciseName(exercise.name);
    setShowExerciseModal(false);
  };

  const handleCloseModal = () => {
    setShowExerciseModal(false);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) >= 1 || value === '') {
      setDuration(value);
    }
  };

  return (
    <div className="exerciseInput">
      <div className="inputBox">
        <button className="inputField semiMedium" onClick={() => setShowExerciseModal(true)}>
          {exerciseName || '운동 종목'}
        </button>
        {showExerciseModal && (
          <ExerciseModal onSelectExercise={handleExerciseSelect} multiple={false} onClose={handleCloseModal} />
        )}
        <button className="inputField semiSmall dayInput" onClick={() => setShowDayDropdown(!showDayDropdown)}>
          {day || ''}
          <img
            src={showDayDropdown ? DropUp : DropDown}
            alt={showDayDropdown ? 'DropUp' : 'DropDown'}
            className="dropDown"
          />
        </button>
        {showDayDropdown && (
          <div className="dayDropdown">
            <div
              onClick={() => {
                setDay('1');
                setShowDayDropdown(false);
              }}>
              1
            </div>
            <div
              onClick={() => {
                setDay('2');
                setShowDayDropdown(false);
              }}>
              2
            </div>
          </div>
        )}
        일
        <InputField placeholder="" value={duration} onChange={handleDurationChange} size="semiTiny" type="number" />분
      </div>
      <GeneralButton
        buttonStyle={{ style: 'primary', size: 'medium' }}
        disabled={!isButtonEnabled}
        onClick={() => onShowPrediction(Number(exerciseId), day, duration)}
        className="predictButton">
        체형 예측
      </GeneralButton>
    </div>
  );
}
