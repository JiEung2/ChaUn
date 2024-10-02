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
  bodyShape: string;
}

export default function BodyAddModal({ onClose }: BodyAddModalProps) {
  const { register, watch } = useForm();
  const [bodyData, setBodyData] = useState<BodyData>({
    height: 0,
    weight: 0,
    skeletalMuscleMass: 0,
    bodyFat: 0,
    bodyMuscle: false,
    bodyShape: '',
  });

  // 식습관 데이터를 watch로 감시
  const mealsPerDay = watch('mealsPerDay');
  const foodType = watch('foodType');
  const snacksPerDay = watch('snacksPerDay');
  const drinksPerDay = watch('drinksPerDay');

  const [isFormValid, setIsFormValid] = useState(false);

  // 필수 몸 데이터 및 식습관 데이터 입력 검증 함수
  const validateForm = () => {
    const { height, weight } = bodyData;
    const isBodyDataValid = height > 0 && weight > 0;
    const isEatingHabitsValid = mealsPerDay && foodType && snacksPerDay && drinksPerDay;

    // 몸 데이터와 식습관 데이터가 모두 유효할 때만 버튼 활성화
    setIsFormValid(isBodyDataValid && isEatingHabitsValid);
  };

  // BodyType 데이터 변경 핸들러
  const handleBodyDataChange = (data: {
    height: number;
    weight: number;
    skeletalMuscleMass: number;
    bodyFat: number;
    bodyMuscle: boolean;
    bodyShape: string;
  }) => {
    setBodyData(data);
  };

  // bodyData 또는 식습관 데이터가 변경될 때마다 유효성 검사
  useEffect(() => {
    validateForm();
  }, [bodyData, mealsPerDay, foodType, snacksPerDay, drinksPerDay]);

  // 다음 단계로 이동 및 데이터 전송 함수
  const handleComplete = async () => {
    try {
      const { height, weight, skeletalMuscleMass, bodyFat, bodyMuscle, bodyShape } = bodyData;
      await surveySubmit2(height, weight, skeletalMuscleMass, bodyFat, bodyMuscle, bodyShape);
      await surveySubmit3(mealsPerDay, foodType, snacksPerDay, drinksPerDay);
      onClose();
    } catch (error) {
      console.error('데이터 전송 중 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
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
        <BodyType onBodyDataChange={handleBodyDataChange} />
        <EatingHabits register={register} />
      </div>
      <GeneralButton
        buttonStyle={{ style: 'floating', size: 'semiTiny' }}
        onClick={handleComplete}
        className="completedButton"
        disabled={!isFormValid}>
        완료
      </GeneralButton>
    </div>
  );
}
