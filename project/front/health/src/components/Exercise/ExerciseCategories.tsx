import { useState, useEffect } from 'react';
import ExerciseList from './ExerciseList';
import { getExercise } from '@/api/exercise';

interface ExerciseCategoriesProps {
  onSelect: (items: { id: number; name: string }[]) => void;
  multiple?: boolean;
}

export default function ExerciseCategories({ onSelect, multiple = false }: ExerciseCategoriesProps) {
  const [selectedExercises, setSelectedExercises] = useState<{ id: number; name: string }[]>([]);
  const [exerciseData, setExerciseData] = useState<any[]>([]);
  const MAX_SELECTION = 5;

  const handlerExerciseData = async () => {
    try {
      const response = await getExercise();
      console.log('운동 종목', response);
      setExerciseData(response);
    } catch (e) {
      console.error(`API 호출 중 에러 발생: ${e}`);
    }
  };

  useEffect(() => {
    handlerExerciseData();
  }, []);

  // 선택한 운동을 객체 배열로 관리
  const handleSelect = (items: { id: number; name: string }[]) => {
    if (multiple) {
      if (items.length > MAX_SELECTION) {
        return;
      }
      setSelectedExercises(items);
      onSelect(items);
    } else {
      setSelectedExercises(items.length > 0 ? [items[0]] : []);
      onSelect(items.length > 0 ? [items[0]] : []);
    }
  };

  return (
    <div className="exerciseCategories">
      {exerciseData.map((category) => (
        <ExerciseList
          key={category.categoryName}
          title={category.categoryName}
          items={category.exercises}
          selectedItems={selectedExercises}
          onSelect={handleSelect}
          multiple={multiple}
        />
      ))}
    </div>
  );
}
