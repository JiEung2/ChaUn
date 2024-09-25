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

type FormData = {
  mealsPerDay: string;
  foodType: string;
  snacksPerDay: string;
  drinksPerDay: string;
};

export default function BodyAddModal({ onClose }: BodyAddModalProps) {
  const { register } = useForm<FormData>();


  const [bodyData, setBodyData] = useState({
    height: 0,
    weight: 0,
    skeletalMuscleMass: null as number | null, // 선택 사항
    bodyFat: null as number | null, // 선택 사항
    bodyMuscle: false,
    bodyShape: 0,
  });


  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 필수 필드만 검증하는 함수
  const isRequiredBodyDataComplete = () => {
    const requiredBodyData = {
      height: bodyData.height,
      weight: bodyData.weight,
      bodyMuscle: bodyData.bodyMuscle,
      bodyShape: bodyData.bodyShape,
    };

    // 필수 데이터가 모두 입력되었는지 확인 (0이 아닌 경우 또는 값이 true여야 함)
    return Object.values(requiredBodyData).every(value => {
      return value !== 0 && value !== false;
    });
  };

  // 모든 데이터가 입력되었는지 확인하는 함수
  const checkDataCompletion = () => {
    // 필수 데이터가 모두 입력되었는지 확인
    const isBodyDataComplete = isRequiredBodyDataComplete();

    // 필수 데이터가 모두 입력된 경우에만 버튼 활성화 (선택 사항은 무시)
    setIsButtonDisabled(!isBodyDataComplete);
  };

  // useEffect: 데이터가 변경될 때마다 체크
  useEffect(() => {
    checkDataCompletion(); // 첫 번째 렌더링 시에도 검증 수행
  }, [bodyData]); // bodyData만 실시간으로 추적

  // 완료 버튼 클릭하면 데이터 전송 및 모달 닫기
  const handleComplete = () => {
    if (!isButtonDisabled) {
      // POST 요청 또는 다른 작업 수행
      onClose();
    }
  };

  return (
    <div className="bodyAddModal">
      <hr className="divider" />
      <img
        src={xCircle}
        alt="Close"
        className="closeIcon"
        onClick={onClose}
      />
      <div>
        <h1 className="title">체형 입력</h1>
        <p className="description">보다 정확한 체형 분석 및 예측을 위해 체형과 식습관 정보를 입력해주세요.</p>
      </div>
      <div className="scrollableContent">
        <BodyType onBodyDataChange={setBodyData} />
        <EatingHabits register={register} />
      </div>
      <GeneralButton
        buttonStyle={{ style: "floating", size: "semiTiny" }}
        onClick={handleComplete}
        className="completedButton"
        disabled={isButtonDisabled}
      >
        완료
      </GeneralButton>
    </div>
  );
}
