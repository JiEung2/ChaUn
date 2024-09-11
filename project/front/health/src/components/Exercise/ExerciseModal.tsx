import { useState } from 'react';
import ExerciseCategories from './ExerciseCategories';
import GeneralButton from '../Button/GeneralButton';
import './ExerciseModal.scss';

interface ExerciseModalProps {
  onSelectExercise: (selected: string | string[]) => void;
  multiple?: boolean;
}

export default function ExerciseModal({ onSelectExercise, multiple = false }: ExerciseModalProps) {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleSelectExercises = (exercises: string | string[]) => {
    if (typeof exercises === 'string') {
      setSelectedExercises([exercises]);
    } else {
      setSelectedExercises(exercises);
    }
  };

  const handleComplete = () => {
    if (selectedExercises.length > 0) {
      onSelectExercise(multiple ? selectedExercises : selectedExercises[0]);
    }
  };

  return (
    <div className="exerciseModal">
      <hr />
      <div className="scrollableContent">
        <ExerciseCategories onSelect={handleSelectExercises} multiple={multiple} />
      </div>
      <GeneralButton
        buttonStyle={{ style: 'floating', size: 'semiTiny' }}
        onClick={handleComplete}
        disabled={selectedExercises.length === 0}
      >
        완료
      </GeneralButton>
    </div>
  );
}
