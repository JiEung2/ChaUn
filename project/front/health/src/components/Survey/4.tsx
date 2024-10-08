import GeneralButton from '../Button/GeneralButton';
import ExerciseCategories from '../Exercise/ExerciseCategories';
import { useState, useEffect } from 'react';
import styles from './4.module.scss';
import { surveySubmit4 } from '@/api/survey';
import { useMutation } from '@tanstack/react-query';

interface FourProps {
  finishServey: () => void;
  handlePrev: () => void;
}

export default function Four({ finishServey, handlePrev }: FourProps) {
  const [selectedExercises, setSelectedExercises] = useState<{ id: number; name: string }[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // useMutation을 이용해 데이터 전송 함수 추가
  const mutation = useMutation({
    mutationFn: (exerciseIds: number[]) => surveySubmit4(exerciseIds),
    onSuccess: () => {
      console.log('운동 정보 전송 성공');
      finishServey(); // 성공 시 설문 종료 함수 호출
    },
    onError: (error) => {
      console.error('운동 정보 전송 실패:', error);
    },
  });

  // 운동 선택 핸들러
  const handleSelectExercises = (exercises: { id: number; name: string }[]) => {
    // 새로운 선택 항목을 추가하고 중복을 제거
    setSelectedExercises((prevSelected) => {
      const mergedExercises = [...prevSelected, ...exercises];

      // 중복된 운동 ID를 제거
      const uniqueExercises = mergedExercises.reduce<{ id: number; name: string }[]>((acc, current) => {
        if (!acc.some((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      // 최대 5개의 운동만 선택 가능하도록 처리
      return uniqueExercises.slice(0, 5);
    });
  };

  // 상태 유효성 검사
  useEffect(() => {
    setIsFormValid(selectedExercises.length > 0 && selectedExercises.length <= 5);
  }, [selectedExercises]);

  // 완료 버튼 클릭 시 선택된 운동 데이터를 서버로 전송
  const handleComplete = () => {
    const exerciseIds = selectedExercises.map((exercise) => exercise.id); // 선택된 운동의 id만 추출하여 배열로 변환
    mutation.mutate(exerciseIds); // 변환된 id 배열을 서버로 전송
  };

  return (
    <div className={styles.container}>
      <h1 className="title">선호하는 운동</h1>
      <h3>최대 5개까지 선택 가능합니다.</h3>
      <ExerciseCategories onSelect={handleSelectExercises} multiple={true} />

      {/* 이전, 완료 버튼 */}
      <div className={styles.buttonGroup}>
        <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
          이전
        </GeneralButton>
        <GeneralButton
          buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
          onClick={handleComplete} // 완료 버튼 클릭 시 handleComplete 함수 실행
          disabled={!isFormValid} // 5개 항목 선택이 완료되면 활성화
        >
          완료
        </GeneralButton>
      </div>
    </div>
  );
}
