import GeneralButton from '../Button/GeneralButton';
import ExerciseCategories from '../Exercise/ExerciseCategories';
import { useState, useEffect } from 'react';
import styles from './4.module.scss';

interface FourProps {
  finishServey: () => void;
  handlePrev: () => void;
}

export default function Four({ finishServey, handlePrev }: FourProps) {
  const [selectedExercises, setSelectedExercises] = useState<{ id: number; name: string }[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // 운동 선택 핸들러
  const handleSelectExercises = (exercises: { id: number; name: string }[]) => {
    // 선택된 운동이 5개 미만이고, 이미 선택된 운동이 아닐 경우
    if (exercises.length < 5 && !selectedExercises.some(e => exercises.some(ex => ex.id === e.id))) {
      setSelectedExercises((prev) => [...prev, ...exercises]);
    }
  };

  // 상태 유효성 검사
  useEffect(() => {
    setIsFormValid(selectedExercises.length > 0 && selectedExercises.length <= 5);
  }, [selectedExercises]);

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
