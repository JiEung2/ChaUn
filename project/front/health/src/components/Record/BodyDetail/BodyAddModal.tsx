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
  skeletalMuscleMass: number;
  bodyFat: number;
  bodyMuscle: boolean;
  bodyShape: number;
}

export default function BodyAddModal({ onClose }: BodyAddModalProps) {
  const { register } = useForm(); // react-hook-form을 사용하여 register 정의
  const [bodyData, setBodyData] = useState<BodyData>({
    height: 0,
    weight: 0,
    skeletalMuscleMass: 0,
    bodyFat: 0,
    bodyMuscle: false,
    bodyShape: 0,
  });
  console.log(bodyData);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [bodyData, setBodyData] = useState({
    height: 0,
    weight: 0,
    skeletalMuscleMass: null as number | null,
    bodyFat: null as number | null,
    bodyMuscle: false,
    bodyShape: 0,
  });

    // 모든 필드가 입력되었는지 확인
    const isDataComplete = Object.values(data).every((value) => value !== 0 && value !== false);
    setIsButtonDisabled(!isDataComplete); // 모든 필드가 입력되면 버튼 활성화
  };

  // 식습관 입력 검증
  const isEatingHabitsComplete = () => {
    const mealsPerDay = watch('mealsPerDay');
    const foodType = watch('foodType');
    const snacksPerDay = watch('snacksPerDay');
    const drinksPerDay = watch('drinksPerDay');

    return mealsPerDay && foodType && snacksPerDay && drinksPerDay;
  };

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
      // POST 요청
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
