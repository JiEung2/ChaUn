import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import GeneralButton from '@/components/Button/GeneralButton';
import xCircle from '@/assets/svg/xCircle.svg';
import BodyType from '@/components/Survey/BodyType';
import EatingHabits from '@/components/Survey/EatingHabits';
import './BodyAddModal.scss';
import { surveySubmit2, surveySubmit3 } from '@/api/survey';
import { useMutation } from '@tanstack/react-query';

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
  const handleBodyDataChange = (data: BodyData) => {
    setBodyData(data);
  };

  // bodyData 또는 식습관 데이터가 변경될 때마다 유효성 검사
  useEffect(() => {
    validateForm();
  }, [bodyData, mealsPerDay, foodType, snacksPerDay, drinksPerDay]);

  // BodyData 전송 mutation
  const bodyMutation = useMutation({
    mutationFn: (data: BodyData) =>
      surveySubmit2(data.height, data.weight, data.skeletalMuscleMass, data.bodyFat, data.bodyMuscle, data.bodyShape),
    onSuccess: () => {},
    onError: (error) => {
      console.error('체형 정보 전송 실패:', error);
    },
  });

  // EatingHabits 전송 mutation
  const eatingHabitsMutation = useMutation({
    mutationFn: (data: { mealsPerDay: string; foodType: string; snacksPerDay: string; drinksPerDay: string }) =>
      surveySubmit3(data.mealsPerDay, data.foodType, data.snacksPerDay, data.drinksPerDay),
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      console.error('식습관 설문 전송 실패:', error);
    },
  });

  // 다음 단계로 이동 및 데이터 전송 함수
  const handleComplete = () => {
    bodyMutation.mutate(bodyData);
    eatingHabitsMutation.mutate({ mealsPerDay, foodType, snacksPerDay, drinksPerDay });
  };
  console.log(mealsPerDay, foodType, snacksPerDay, drinksPerDay);

  return (
    <div className="bodyAddModal">
      <hr className="divider" />
      <img src={xCircle} alt="Close" className="closeIcon" onClick={onClose} />
      <div>
        <h1 className="title">체형 입력</h1>
        <p className="description">보다 정확한 체형 분석 및 예측을 위해 체형과 식습관 정보를 입력해주세요</p>
      </div>

      <div className="scrollableContent">
        <BodyType onBodyDataChange={handleBodyDataChange} />
        <EatingHabits register={register} />
        <div className="completedButton">
          <GeneralButton
            buttonStyle={{ style: 'floating', size: 'semiTiny' }}
            onClick={handleComplete}
            disabled={!isFormValid}
            className="completedButton">
            완료
          </GeneralButton>
        </div>
      </div>
    </div>
  );
}
