import { useState } from 'react';
import GeneralButton from '@/components/Button/GeneralButton';
import InputField from '@/components/Input/Input';
import ExerciseModal from '@/components/Exercise/ExerciseModal';
import DropDown from '@/assets/svg/dropDown.svg';
import DropUp from '@/assets/svg/dropUp.svg';
import './ExerciseInput.scss'

interface ExerciseInputProps {
  onShowPrediction: () => void;
  setExerciseType: (type: string) => void;
  setDuration: (duration: string) => void;
  setDay: (day: string) => void;
  isButtonEnabled: boolean;
  exerciseType: string;
  duration: string;
  day: string;
}

export default function ExerciseInput({
  onShowPrediction,
  setExerciseType,
  setDuration,
  setDay,
  isButtonEnabled,
  exerciseType,
  duration,
  day,
}: ExerciseInputProps) {
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  const handleExerciseSelect = (selected: string | string[]) => {
    const exercise = Array.isArray(selected) ? selected[0] : selected;
    setExerciseType(exercise);
    setShowExerciseModal(false);
  };

  const handleCloseModal = () => {
    setShowExerciseModal(false);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 1 이상인 값만 허용
    if (Number(value) >= 1 || value === '') {
      setDuration(value);
    }
  };

  return (
    <div className="exerciseInput">
      <div className="inputBox">
        <button
          className="inputField semiMedium"
          onClick={() => setShowExerciseModal(true)}
        >
          {exerciseType || '운동 종목'}
        </button>
        {showExerciseModal && (
          <ExerciseModal
            onSelectExercise={handleExerciseSelect}
            multiple={false}
            onClose={handleCloseModal}
          />
        )}

        <button
          className="inputField semiSmall dayInput"
          onClick={() => setShowDayDropdown(!showDayDropdown)}
        >
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
              }}
            >
              1
            </div>
            <div
              onClick={() => {
                setDay('2');
                setShowDayDropdown(false);
              }}
            >
              2
            </div>
          </div>
        )}
        일
        <InputField
          placeholder=""
          value={duration}
          onChange={handleDurationChange}
          size="semiTiny"
          type="number"
        />
        분
      </div>
      <GeneralButton
        buttonStyle={{ style: 'primary', size: 'medium' }}
        disabled={!isButtonEnabled}
        onClick={onShowPrediction}
      >
        체형 예측
      </GeneralButton>
    </div>
  );
}
