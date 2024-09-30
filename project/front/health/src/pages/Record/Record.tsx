import './Record.scss';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyWeightRecord from '@/components/Record/BodyWeightRecord';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseInput from '@/components/Record/ExerciseInput';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { getPredictBasic, getPredictExtra, postPredictExerciseDetail } from '@/api/record';
import { getWeeklyExerciseRecord } from '@/api/exercise';
import queryKeys from '@/utils/querykeys';

export default function RecordPage() {
  const navigate = useNavigate();
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [duration, setDuration] = useState('');
  const [day, setDay] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [exerciseDays, setExerciseDays] = useState(0);
  const [showBodyWeightRecord, setShowBodyWeightRecord] = useState(false);

  // 운동 예측 데이터 POST 요청을 위한 useMutation
  const mutation = useMutation({
    mutationFn: ({ exerciseId, day, duration }: { exerciseId: number; day: string; duration: string }) =>
      postPredictExerciseDetail(exerciseId, Number(day), Number(duration)),
    onSuccess: () => {
      console.log('운동 예측 요청 성공');
    },
    onError: (error) => {
      console.error(`운동 예측 요청 중 에러 발생: ${error}`);
    },
  });

  const { data: weeklyExerciseTime } = useSuspenseQuery({
    queryKey: [queryKeys.EXERCISE_HISTORY_WEEK],
    queryFn: () => getWeeklyExerciseRecord(),
  });

  const { data: predictionData } = useSuspenseQuery({
    queryKey: [queryKeys.MY_BODY_PREDICT],
    queryFn: getPredictBasic,
    select: (response) => {
      const { current, p30, p90 } = response.data.data;
      return [
        { time: '현재', weight: current },
        { time: '1달 후', weight: p30 },
        { time: '3달 후', weight: p90 },
      ];
    },
  });

  const { data: predictionExtraData } = useSuspenseQuery({
    queryKey: [queryKeys.MY_BODY_PREDICT_EXTRA],
    queryFn: getPredictExtra,
    select: (response) => {
      const { current, p30, p90 } = response.data.data;
      return [
        { time: '현재', weight: current },
        { time: '1달 후', weight: p30 },
        { time: '3달 후', weight: p90 },
      ];
    },
  });

  useEffect(() => {
    const weeklyExerciseCount = weeklyExerciseTime.data.data.exerciseHistoryList.length;
    setExerciseDays(weeklyExerciseCount);
  }, [weeklyExerciseTime]);

  useEffect(() => {
    if (exerciseId && day && duration) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [exerciseId, day, duration]);

  const handleShowBodyWeightRecord = (exerciseId: number, day: string, duration: string) => {
    setShowBodyWeightRecord(true);
    mutation.mutate({ exerciseId, day, duration });
  };

  const handleResetInput = () => {
    setShowBodyWeightRecord(false);
    setExerciseId(null);
    setDuration('');
    setDay('');
  };

  return (
    <div className="recordsContainer">
      <GeneralButton
        buttonStyle={{ style: 'primary', size: 'large' }}
        onClick={() => navigate('/record/bodyDetail')}
        className="bodyDetailButton">
        상세 체형 기록 조회
      </GeneralButton>

      <div className="currentPrediction">
        <p className="predictionText">
          <strong>민영님</strong>의 이번 주 운동을 유지했을 때, 체형 예측 결과예요
        </p>
        <BodyWeightRecord data={predictionData} />
      </div>

      <div>
        {!showBodyWeightRecord && exerciseDays < 4 ? (
          <div className="exercisePrediction">
            <p className="predictionText">
              <strong>민영님</strong>의 운동 강도를 높였을 때, 체형 예측 결과를 조회해보세요
            </p>
            <ExerciseInput
              onShowPrediction={handleShowBodyWeightRecord}
              setExerciseId={setExerciseId}
              setDuration={setDuration}
              setDay={setDay}
              isButtonEnabled={isButtonEnabled}
              exerciseId={exerciseId ? String(exerciseId) : ''}
              duration={duration}
              day={day}
            />
          </div>
        ) : showBodyWeightRecord ? (
          <div className="predictionResult">
            <p className="predictionText">
              <strong>민영님</strong>이 선택한 운동을 하루 <strong>{duration}분</strong>, <br />
              <strong>총 {exerciseDays}일</strong> 추가로 진행했을 때 <br />
              예측되는 체형을 알려드릴게요!
            </p>
            <BodyWeightRecord data={predictionExtraData} />
            <GeneralButton
              buttonStyle={{ style: 'primary', size: 'large' }}
              onClick={handleResetInput}
              className="resetButton">
              운동 다시 입력하기
            </GeneralButton>
          </div>
        ) : (
          <div className="exerciseAdvice">
            <p className="adviceText">
              <strong>민영님</strong>, <br />
              이번 주 운동을 <strong>{exerciseDays}회</strong> 진행하셨군요!
              <p>
                꾸준한 건강 관리 및 부상 방지를 위해 <br />
                주 2~3회 운동을 권장하고 있습니다. <br />
                다음 주도 힘내서 달려볼까요~?
              </p>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
