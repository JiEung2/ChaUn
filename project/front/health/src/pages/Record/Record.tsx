import './Record.scss';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyWeightRecord from '@/components/Record/BodyWeightRecord';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseInput from '@/components/Record/ExerciseInput';
import { getPredictBasic } from '@/api/record';

export default function RecordPage() {
  const navigate = useNavigate();
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [day, setDay] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [exerciseDays, setExerciseDays] = useState(0);
  const [showBodyWeightRecord, setShowBodyWeightRecord] = useState(false);
  const [predictionData, setPredictionData] = useState([
    { time: '현재', weight: 0 },
    { time: '1달 후', weight: 0 },
    { time: '3달 후', weight: 0 },
  ]);

  const handlePredictBasic = async () => {
    try {
      const response = await getPredictBasic();
      const { current, p30, p90 } = response.data.data;
      setPredictionData([
        { time: '현재', weight: current },
        { time: '1달 후', weight: p30 },
        { time: '3달 후', weight: p90 },
      ]);
    } catch (e) {
      console.error(`API 호출 중 에러 발생: ${e}`);
    }
  };

  useEffect(() => {
    handlePredictBasic();
    const fetchExerciseDays = () => {
      const dummyExerciseData = {
        exerciseDays: 2,
      };
      setExerciseDays(dummyExerciseData.exerciseDays);
    };

    fetchExerciseDays();
  }, []);

  useEffect(() => {
    if (exerciseType && day && duration) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [exerciseType, day, duration]);

  const handleShowBodyWeightRecord = () => {
    setShowBodyWeightRecord(true);
    handlePredictBasic(); // 예측 데이터를 호출하여 업데이트
  };

  const handleResetInput = () => {
    setShowBodyWeightRecord(false);
    setExerciseType('');
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
          <strong>민영님</strong>의 이번주 운동을 유지했을 때, 체형 예측 결과예요
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
              setExerciseType={setExerciseType}
              setDuration={setDuration}
              setDay={setDay}
              isButtonEnabled={isButtonEnabled}
              exerciseType={exerciseType}
              duration={duration}
              day={day}
            />
          </div>
        ) : showBodyWeightRecord ? (
          <div className="predictionResult">
            <p className="predictionText">
              <strong>민영님</strong>이 <strong>{exerciseType}</strong>을 하루 <strong>{duration}분</strong>, <br />
              <strong>총 {exerciseDays}일</strong> 추가로 진행했을 때 <br />
              예측되는 체형을 알려드릴게요!
            </p>
            <BodyWeightRecord data={predictionData} />
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
