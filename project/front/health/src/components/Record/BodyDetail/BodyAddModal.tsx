import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import GeneralButton from '@/components/Button/GeneralButton';
import xCircle from '@/assets/svg/xCircle.svg';
import BodyType from '@/components/Survey/BodyType';
import EatingHabits from '@/components/Survey/EatingHabits';
import './BodyAddModal.scss';

interface BodyAddModalProps {
  onClose: () => void;
}

interface BodyData {
  height: number;
  weight: number;
  skeletalMuscleMass: number | null;
  bodyFat: number | null;
  bodyMuscle: boolean;
  bodyShape: number;
}

export default function BodyAddModal({ onClose }: BodyAddModalProps) {
  const { register, watch } = useForm(); // react-hook-form의 watch 메서드를 통해 폼 필드 추적
  const [bodyData, setBodyData] = useState<BodyData>({
    height: 0,
    weight: 0,
    skeletalMuscleMass: null,
    bodyFat: null,
    bodyMuscle: false,
    bodyShape: 0,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 필수 몸 데이터 입력 검증 함수
  const isRequiredBodyDataComplete = () => {
    return bodyData.height > 0 && bodyData.weight > 0 && bodyData.bodyShape !== 0;
  };

  // 식습관 입력 검증
  const isEatingHabitsComplete = () => {
    const mealsPerDay = watch('mealsPerDay');
    const foodType = watch('foodType');
    const snacksPerDay = watch('snacksPerDay');
    const drinksPerDay = watch('drinksPerDay');

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
  }, [bodyData, watch('mealsPerDay'), watch('foodType'), watch('snacksPerDay'), watch('drinksPerDay')]);

  const handleComplete = () => {
    if (!isButtonDisabled) {
      // POST 요청 실행
      onClose();
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
