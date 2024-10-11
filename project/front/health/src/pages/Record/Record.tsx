import './Record.scss';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyWeightRecord from '@/components/Record/BodyWeightRecord';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseInput from '@/components/Record/ExerciseInput';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { getPredictBasic, postPredictExerciseDetail } from '@/api/record';
import { exerciseRecord } from '@/api/home';
import queryKeys from '@/utils/querykeys';
import useUserStore from '@/store/userInfo';

export default function RecordPage() {
  const { nickname } = useUserStore();
  const navigate = useNavigate();
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [duration, setDuration] = useState('');
  const [day, setDay] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [exerciseDays, setExerciseDays] = useState(0);
  const [showBodyWeightRecord, setShowBodyWeightRecord] = useState(false);
  interface Prediction {
    time: string;
    weight: number; // weight를 숫자로 정의
  }

  interface PredictionData {
    predictions: Prediction[];
    current_image: string; // 이미지 경로는 문자열로 정의
    p30_image: string;
    p90_image: string;
  }

  const [exercisePredictionData, setExercisePredictionData] = useState<PredictionData | null>(null);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    const getMondayOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      const monday = new Date(date);
      monday.setDate(date.getDate() + diff);
      return monday;
    };

    const calculateWeekOfMonth = (date: Date) => {
      const firstMonday = getMondayOfWeek(new Date(date.getFullYear(), date.getMonth(), 1));
      const currentMonday = getMondayOfWeek(date);
      const diff = Math.ceil((currentMonday.getTime() - firstMonday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
      return diff > 5 ? 5 : diff;
    };

    const getPreviousWeek = () => {
      let lastWeekDate = new Date();
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);
      return lastWeekDate;
    };

    let lastWeekDate = getPreviousWeek();
    let lastWeek = calculateWeekOfMonth(lastWeekDate);
    let updatedYear = lastWeekDate.getFullYear();
    let updatedMonth = lastWeekDate.getMonth() + 1;

    if (lastWeek === 1) {
      updatedMonth -= 1;
      if (updatedMonth === 0) {
        updatedMonth = 12;
        updatedYear -= 1;
      }
      const lastDayOfPreviousMonth = new Date(updatedYear, updatedMonth, 0);
      lastWeek = calculateWeekOfMonth(lastDayOfPreviousMonth);
    } else {
      lastWeek -= 1;
    }

    setWeek(lastWeek);
    setYear(updatedYear);
    setMonth(updatedMonth);
  }, []);

  // 운동 예측 데이터 POST 요청을 위한 useMutation
  const mutation = useMutation({
    mutationFn: ({ exerciseId, day, duration }: { exerciseId: number; day: string; duration: string }) =>
      postPredictExerciseDetail(exerciseId, Number(day), Number(duration)),
    onSuccess: (response) => {
      const { data } = response;

      // 데이터를 가공하여 predictions 배열과 이미지를 포함한 객체로 변환
      const formattedData = {
        predictions: [
          { time: '현재', weight: data.current },
          { time: '1달 후', weight: data.p30 },
          { time: '3달 후', weight: data.p90 },
        ],
        current_image: data.current_image,
        p30_image: data.p30_image,
        p90_image: data.p90_image,
      };

      console.log('운동 예측 요청 성공', formattedData);
      setExercisePredictionData(formattedData); // 가공한 데이터를 상태로 저장
      setShowBodyWeightRecord(true);
    },
    onError: (error) => {
      console.error(`운동 예측 요청 중 에러 발생: ${error}`);
    },
  });
  // 주간 운동 기록 데이터 요청
  const { data: weeklyExerciseTime } = useSuspenseQuery({
    queryKey: [queryKeys.EXERCISE_HISTORY_WEEK, year, month, week],
    queryFn: () => exerciseRecord(year, month, week),
  });

  const { data: predictionData } = useSuspenseQuery({
    queryKey: [queryKeys.MY_BODY_PREDICT],
    queryFn: getPredictBasic,
    select: (response) => {
      const { current, p30, p90, current_image, p30_image, p90_image } = response;
      return {
        predictions: [
          { time: '현재', weight: current },
          { time: '1달 후', weight: p30 },
          { time: '3달 후', weight: p90 },
        ],
        current_image,
        p30_image,
        p90_image,
      };
    },
  });

  useEffect(() => {
    const weeklyExerciseCount = weeklyExerciseTime.exerciseHistoryList?.length || 0;
    setExerciseDays(weeklyExerciseCount);
  }, [weeklyExerciseTime]);

  useEffect(() => {
    if (exerciseId && day && duration) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [exerciseId, day, duration]);

  const handleShowBodyWeightRecord = () => {
    if (exerciseId && day && duration) {
      mutation.mutate({ exerciseId, day, duration });
    }
  };

  const handleResetInput = () => {
    setShowBodyWeightRecord(false);
    setExerciseId(null);
    setDuration('');
    setDay('');
    setExercisePredictionData(null); // 운동 예측 데이터 초기화
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
          <strong>{nickname}님</strong>의 이번 주 운동을 유지했을 때, 체형 예측 결과예요
        </p>
        {predictionData !== undefined ? (
          <BodyWeightRecord data={predictionData} />
        ) : (
          <p>
            체형 예측 정보가 없습니다. <br /> 운동을 시작하면 예측을 받아볼 수 있습니다.
          </p>
        )}
      </div>

      <div className="ExtraPrediction">
        {!showBodyWeightRecord && exerciseDays < 4 ? (
          <div className="exercisePrediction">
            <p className="predictionText">
              <strong>{nickname}님</strong>의 운동 강도를 높였을 때, 체형 예측 결과를 조회해보세요
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
              <strong>{nickname}님</strong>이 선택한 운동을 하루 <strong>{duration}분</strong>, <br />
              <strong>총 {day}일</strong> 추가로 진행했을 때 <br />
              예측되는 체형을 알려드릴게요!
            </p>
            {mutation.isSuccess && exercisePredictionData ? (
              <BodyWeightRecord data={exercisePredictionData} />
            ) : (
              <p>운동에 따른 체형 예측 정보가 없습니다.</p>
            )}
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
              <strong>{nickname}님</strong>, <br />
              저번 주 운동을 <strong>{exerciseDays}일</strong> 진행하셨군요!
              <p>
                꾸준한 건강 관리 및 부상 방지를 위해 <br />
                주 2~3일 운동을 권장하고 있습니다. <br />
                이번 주도 힘내서 달려볼까요~?
              </p>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
