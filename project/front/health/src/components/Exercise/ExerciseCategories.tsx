import { useState } from 'react';
import ExerciseList from './ExerciseList';

interface ExerciseCategoriesProps {
  onSelect: (items: string[]) => void;
  multiple?: boolean;
}

export default function ExerciseCategories({ onSelect, multiple = false }: ExerciseCategoriesProps) {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const MAX_SELECTION = 5;

  const handleSelect = (items: string[]) => {
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
      <ExerciseList
        title="유산소"
        items={['걷기', '계단 오르기', '달리기', '등산', '복싱', '스피닝', '스케이팅', '요가', '에어로빅', '수영', '자전거', '킥복싱', '펜싱', '폴댄스', '필라테스']}
        selectedItems={selectedExercises}
        onSelect={handleSelect}
        multiple={multiple}
      />
      <ExerciseList
        title="근력운동"
        items={['푸시업', '클라이밍', '크로스 핏', '헬스']}
        selectedItems={selectedExercises}
        onSelect={handleSelect}
        multiple={multiple}
      />
      <ExerciseList
        title="구기종목"
        items={['농구', '축구', '족구', '탁구', '풋살']}
        selectedItems={selectedExercises}
        onSelect={handleSelect}
        multiple={multiple}
      />
      <ExerciseList
        title="기타"
        items={['기타 운동 (저강도)', '기타 운동 (중강도)', '기타 운동 (고강도)']}
        selectedItems={selectedExercises}
        onSelect={handleSelect}
        multiple={multiple}
      />
    </div>
  );
}
