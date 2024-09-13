import One from '@/components/Survey/1';
import Two from '../../components/Survey/2';
import Three from '../../components/Survey/3';
import Four from '../../components/Survey/4';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Survey() {
  const [step, setStep] = useState(1);
  const totalSteps: number = 4;
  const navigate = useNavigate();
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // TODO - 서버로 보내는 데이터 형식 보류
    }
  };

  const handlePrev = function () {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const finishServey = () => {
    // TODO - 서버로 완료된 데이터를 보냄
    console.log('finish');
    navigate('/surveyResult');
  };
  const renderSuervey = () => {
    switch (step) {
      case 1:
        return <One handleNext={handleNext} />;
      case 2:
        return <Two handleNext={handleNext} handlePrev={handlePrev} />;
      case 3:
        return <Three handleNext={handleNext} handlePrev={handlePrev} />;
      case 4:
        return <Four finishServey={finishServey} handlePrev={handlePrev} />;
    }
  };
  return <div>{renderSuervey()}</div>;
}
