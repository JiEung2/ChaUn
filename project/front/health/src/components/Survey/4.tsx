import GeneralButton from '../Button/GeneralButton';
import ExerciseCategories from '../Exercise/ExerciseCategories';
import { useState } from 'react';
import styles from './4.module.scss';

interface FourProps {
  finishServey: () => void;
  handlePrev: () => void;
}

export default function Four({ finishServey, handlePrev }: FourProps) {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  // 운동 선택 핸들러
  const handleSelectExercises = (exercises: string | string[]) => {
    if (typeof exercises === 'string') {
      if (selectedExercises.length < 5 && !selectedExercises.includes(exercises)) {
        setSelectedExercises((prev) => [...prev, exercises]);
      }
    } else {
      if (exercises.length <= 5) {
        setSelectedExercises(exercises);
      }
    }
  };

  // 선택한 운동이 5개일 때만 다음 버튼 활성화
  const isFormValid = selectedExercises.length > 0 && selectedExercises.length <= 5;

  return (
    <div className={styles.container}>
      <h1 className="title">선호하는 운동</h1>
      <h3>최대 5개까지 선택 가능합니다.</h3>
      <ExerciseCategories onSelect={handleSelectExercises} multiple={true} />

      {/* 이전, 다음 버튼 */}
      <div className={styles.buttonGroup}>
        <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
          이전
        </GeneralButton>
        <GeneralButton
          buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
          onClick={finishServey}
          disabled={!isFormValid} // 5개 항목 선택이 완료되면 활성화
        >
          완료
        </GeneralButton>
      </div>
    </div>
  );
}
