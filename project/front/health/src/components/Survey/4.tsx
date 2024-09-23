import GeneralButton from '../Button/GeneralButton';
import ExerciseCategories from '../Exercise/ExerciseCategories';
import { useState } from 'react';
import styles from './4.module.scss';
interface FourProps {
  //TODO - 성공 화면으로 이동
  finishServey: () => void;
  handlePrev: () => void;
}
export default function Four({ finishServey, handlePrev }: FourProps) {
  const handleSelectExercises = (exercises: string | string[]) => {
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    if (typeof exercises === 'string') {
      setSelectedExercises([exercises]);
    } else {
      setSelectedExercises(exercises);
    }

    console.log(selectedExercises);
  };
  return (
    <div className={styles.container}>
      <h1 className="title">선호하는 운동</h1>
      <h3>최대 5개까지 선택 가능합니다.</h3>
      <ExerciseCategories onSelect={handleSelectExercises} multiple={true} />
      <div className={styles.buttonGroup}>
        <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
          이전
        </GeneralButton>
        <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={finishServey}>
          완료
        </GeneralButton>
      </div>
    </div>
  );
}
