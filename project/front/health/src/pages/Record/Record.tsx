import './Record.scss';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyWeightRecord from '@/components/Record/BodyWeightRecord';
import PredictionResult from '@/components/Record/PredictionResult';
import InputField from '@/components/Input/Input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseModal from '@/components/Exercise/ExerciseModal';
import DropDown from '@/assets/svg/dropDown.svg';
import DropUp from '@/assets/svg/dropUp.svg';

export default function RecordPage() {
  const navigate = useNavigate();
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [day, setDay] = useState('');
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [exerciseDays, setExerciseDays] = useState(0);
  const [showBodyWeightRecord, setShowBodyWeightRecord] = useState(false); // State to control visibility of BodyWeightRecord

  const data = [
    { time: '현재', weight: 62.0 },
    { time: '1달 후', weight: 61.3 },
    { time: '3달 후', weight: 58.6 },
  ];

  // ExerciseModal에서 선택한 운동 종목을 처리하는 함수
  const handleExerciseSelect = (selected: string | string[]) => {
    const exercise = Array.isArray(selected) ? selected[0] : selected;
    setExerciseType(exercise);
    setShowExerciseModal(false);
  };

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setShowExerciseModal(false);
  };

  // 렌더링 되었을 때 운동이 며칠 진행되었는지 확인하는 함수
  useEffect(() => {
    const fetchExerciseDays = () => {
      const dummyExerciseData = {
        exerciseDays: 2, 
      };
      setExerciseDays(dummyExerciseData.exerciseDays);
    };

    fetchExerciseDays();
  }, []);

  // 모든 필드가 채워졌는지 확인하는 함수
  useEffect(() => {
    if (exerciseType && day && duration) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [exerciseType, day, duration]);

  // Handle showing BodyWeightRecord and updating the display when the button is clicked
  const handleShowBodyWeightRecord = () => {
    setShowBodyWeightRecord(true);
  };

  return (
    <div className="recordsContainer">
      <GeneralButton
        buttonStyle={{ style: 'primary', size: 'large' }}
        onClick={() => navigate('/record/bodyDetail')}
      >
        상세 체형 기록 조회
      </GeneralButton>

      <div className="currentPrediction">
        <p className="predictionText">
          <strong>민영님</strong>의 이번주 운동을 유지했을 때, 체형 예측 결과예요
        </p>
        <BodyWeightRecord data={data} />
      </div>

      <div>
        {!showBodyWeightRecord && exerciseDays < 4 ? (
          <div className="exercisePrediction">
            <p className="predictionText">
              <strong>민영님</strong>의 운동 강도를 높였을 때, 체형 예측 결과를 조회해보세요
            </p>
            <div className="exerciseInput">
              <div className="inputBox">
                <button
                  className="inputField semiMedium"
                  onClick={() => setShowExerciseModal(true)}
                >
                  {exerciseType || '운동 종목'}
                </button>
                {showExerciseModal && (
                  <ExerciseModal
                    onSelectExercise={handleExerciseSelect}
                    multiple={false}
                    onClose={handleCloseModal}
                  />
                )}

                <button
                  className="inputField semiSmall dayInput"
                  onClick={() => setShowDayDropdown(!showDayDropdown)}
                >
                  {day || ''}
                  <img
                    src={showDayDropdown ? DropUp : DropDown}
                    alt={showDayDropdown ? 'DropUp' : 'DropDown'}
                    className="dropDown"
                  />
                </button>
                {showDayDropdown && (
                  <div className="dayDropdown">
                    <div
                      onClick={() => {
                        setDay('1');
                        setShowDayDropdown(false);
                      }}
                    >
                      1
                    </div>
                    <div
                      onClick={() => {
                        setDay('2');
                        setShowDayDropdown(false);
                      }}
                    >
                      2
                    </div>
                  </div>
                )}
                일

                <InputField
                  placeholder=""
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  size="semiTiny"
                />
                분
              </div>
              <GeneralButton
                buttonStyle={{ style: 'primary', size: 'medium' }}
                disabled={!isButtonEnabled}
                onClick={handleShowBodyWeightRecord}
              >
                체형 예측
              </GeneralButton>
            </div>
          </div>
        ) : showBodyWeightRecord ? (
          <div className="predictionResult">
            <p className="predictionText">
              <strong>민영님</strong>이 {exerciseType}을 하루 {duration}분, 총 {exerciseDays}일 <br />
              추가로 진행했을 때 예측되는 체형을 알려드릴게요!
            </p>
            <PredictionResult data={data} />
          </div>
        ) : (
          <div className="exerciseAdvice">
            <p className="adviceText">
              민영님, <br />
              이번 주 운동을 {exerciseDays}회 진행하셨군요! <br />
              꾸준한 건강 관리 및 부상 방지를 위해 <br />
              주 2~3회 운동을 권장하고 있습니다. <br />
              다음 주도 힘내서 달려볼까요~?
            </p>
            {/* 로띠 추가 */}
          </div>
        )}        
      </div>


    </div>
  );
}
