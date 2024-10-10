import { exerciseRecord } from '@/api/home'; // API 호출 함수

interface AggregatedData {
  day: string;
  totalTime: number;
  totalCalories: number;
}

interface ExerciseRecord {
  id: number;
  exerciseDuration: number;
  burnedCalories: number;
  exerciseName: string;
  createdAt: string;
}
// 요일별 데이터 합산 함수
export const aggregateExerciseDataByDay = (exerciseRecords: ExerciseRecord[]): AggregatedData[] => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  // 요일별 데이터 초기화
  const aggregatedData = daysOfWeek.map((day) => ({
    day,
    totalTime: 0,
    totalCalories: 0,
  }));

  // 운동 기록 데이터를 요일별로 합산
  exerciseRecords.forEach((record) => {
    const date = new Date(record.createdAt);
    const dayIndex = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

    aggregatedData[dayIndex].totalTime += record.exerciseDuration; // 초 단위의 운동 시간을 추가
    aggregatedData[dayIndex].totalCalories += record.burnedCalories; // 칼로리를 추가
  });

  return aggregatedData;
};

// API 호출 및 요일별 데이터 묶기 함수
export const getAggregatedExerciseData = async (
  year: number,
  month: number,
  week: number
): Promise<AggregatedData[]> => {
  try {
    const response = await exerciseRecord(year, month, week);

    if (response && Array.isArray(response.exerciseHistoryList)) {
      return aggregateExerciseDataByDay(response.exerciseHistoryList);
    }

    return []; // 데이터가 없는 경우 빈 배열 반환
  } catch (error) {
    console.error('운동 기록을 가져오는 중 오류 발생:', error);
    throw new Error('운동 기록을 가져오는 데 실패했습니다.');
  }
};
