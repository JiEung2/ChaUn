import BodyType from './BodyType';
import GeneralButton from '../Button/GeneralButton';
import styles from './2.module.scss';
import { useState, useEffect } from 'react';
import { surveySubmit2 } from '@/api/survey';

interface TwoProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export default function Two({ handleNext, handlePrev }: TwoProps) {
  const [bodyData, setBodyData] = useState({
    height: 0,
    weight: 0,
    skeletalMuscleMass: 0, // 필수 입력에서 제외
    bodyFat: 0, // 필수 입력에서 제외
    bodyMuscle: false,
    bodyShape: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // 체형 정보 변경 핸들러
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

  // useEffect를 사용하여 bodyData가 업데이트될 때마다 유효성 검사를 수행
  useEffect(() => {
    const { height, weight } = bodyData;
    // height, weight, bodyShape 값만 유효성 검사를 통해 버튼 활성화 여부 결정
    setIsFormValid(height > 0 && weight > 0);
  }, [bodyData]);

  // 다음 단계로 이동
  const handleNextStep = async () => {
    try {
      const response = await surveySubmit2(
        bodyData.height,
        bodyData.weight,
        bodyData.skeletalMuscleMass,
        bodyData.bodyFat,
        bodyData.bodyMuscle,
        bodyData.bodyShape
      );
      console.log(response);
      handleNext();
    } catch (e) {
      console.error('서버로 데이터 전송 중 에러 발생:', e);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="title">체형 정보</h1>
      <BodyType onBodyDataChange={handleBodyDataChange} />
      <div className={styles['nextPrevBtnWrapper']}>
        <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
          이전
        </GeneralButton>
        <GeneralButton
          buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
          onClick={handleNextStep}
          disabled={!isFormValid} // 필수 값이 없으면 버튼 비활성화
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}
