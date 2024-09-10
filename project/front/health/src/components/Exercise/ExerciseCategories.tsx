import ExerciseList from './ExerciseList';

export default function ExerciseCategories() {
  return (
    <div className="exerciseCategories">
      <ExerciseList title="유산소" items={['걷기', '계단 오르기', '달리기', '등산', '복싱', '스피닝', '스케이팅', '요가', '에어로빅', '수영', '자전거', '킥복싱', '펜싱', '폴댄스', '필라테스']} />
      <ExerciseList title="근력운동" items={['푸시업', '클라이밍', '크로스 핏', '헬스']} />
      <ExerciseList title="구기종목" items={['농구', '축구', '족구', '탁구', '풋살']} />
      <ExerciseList title="기타" items={['기타 운동 (저강도)', '기타 운동 (중강도)', '기타 운동 (고강도)']} />
    </div>
  );
}