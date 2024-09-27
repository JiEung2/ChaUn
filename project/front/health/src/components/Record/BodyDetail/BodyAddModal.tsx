import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import GeneralButton from '@/components/Button/GeneralButton';
import xCircle from '@/assets/svg/xCircle.svg';
import BodyType from '@/components/Survey/BodyType';
import EatingHabits from '@/components/Survey/EatingHabits';
import './BodyAddModal.scss';
import { surveySubmit2, surveySubmit3 } from '@/api/survey';

interface BodyAddModalProps {
  onClose: () => void;
}

interface BodyData {
  height: number;
  weight: number;
  skeletalMuscleMass: number;
  bodyFat: number;
  bodyMuscle: boolean;
  bodyShape: number;
}

export default function BodyAddModal({ onClose }: BodyAddModalProps) {
  const { register, watch } = useForm();
  const [bodyData, setBodyData] = useState<BodyData>({
    height: 0,
    weight: 0,
    skeletalMuscleMass: 0,
    bodyFat: 0,
    bodyMuscle: false,
    bodyShape: 0,
  });

  const mealsPerDay = watch('mealsPerDay');
  const foodType = watch('foodType');
  const snacksPerDay = watch('snacksPerDay');
  const drinksPerDay = watch('drinksPerDay');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 필수 몸 데이터 입력 검증 함수
  const isRequiredBodyDataComplete = () => {
    return bodyData.height > 0 && bodyData.weight > 0 && bodyData.bodyShape !== 0;
  };

  // 식습관 입력 검증
  const isEatingHabitsComplete = () => {
    return mealsPerDay && foodType && snacksPerDay && drinksPerDay;
  };

  // 데이터 완료 여부를 검증하고 버튼 활성화 상태를 업데이트
  const checkDataCompletion = () => {
    const isBodyDataComplete = isRequiredBodyDataComplete();
    const isEatingComplete = isEatingHabitsComplete();
    setIsButtonDisabled(!(isBodyDataComplete && isEatingComplete));
  };

  useEffect(() => {
    checkDataCompletion();
  }, [bodyData, mealsPerDay, foodType, snacksPerDay, drinksPerDay]);

  const handleComplete = async () => {
    if (!isButtonDisabled) {
      try {
        // 몸 데이터 전송 (surveySubmit2)
        const { height, weight, skeletalMuscleMass, bodyFat, bodyMuscle, bodyShape } = bodyData;
        await surveySubmit2(height, weight, skeletalMuscleMass, bodyFat, bodyMuscle, bodyShape);

        // 식습관 데이터 전송 (surveySubmit3)
        await surveySubmit3(mealsPerDay, foodType, snacksPerDay, drinksPerDay);

        onClose(); // 모든 API 전송 성공 시 모달 닫기
      } catch (error) {
        console.error('Error submitting survey:', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="bodyAddModal">
      <hr className="divider" />
      <img src={xCircle} alt="Close" className="closeIcon" onClick={onClose} />
      <div>
        <h1 className="title">체형 입력</h1>
        <p className="description">보다 정확한 체형 분석 및 예측을 위해 체형과 식습관 정보를 입력해주세요.</p>
      </div>
      <div className="scrollableContent">
        <BodyType onBodyDataChange={setBodyData} />
        <EatingHabits register={register} />
      </div>
      <GeneralButton
        buttonStyle={{ style: 'floating', size: 'semiTiny' }}
        onClick={handleComplete}
        className="completedButton"
        disabled={isButtonDisabled}>
        완료
      </GeneralButton>
    </div>
  );
}
