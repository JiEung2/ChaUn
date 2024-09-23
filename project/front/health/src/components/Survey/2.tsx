import BodyType from './BodyType';
import GeneralButton from '../Button/GeneralButton';
import styles from './2.module.scss';
import { useState } from 'react';
interface TwoProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export default function Two({ handleNext, handlePrev }: TwoProps) {
  const [bodyData, setBodyData] = useState({
    height: '',
    weight: '',
    skeletalMuscleMass: '',
    bodyFat: '',
    bodyMuscle: '',
    bodyShape: '',
  });

  const handleBodyDataChange = (data: {
    height: string;
    weight: string;
    skeletalMuscleMass: string;
    bodyFat: string;
    bodyMuscle: string;
    bodyShape: string;
  }) => {
    setBodyData(data);
  };

  const handleNextStep = () => {
    // 여기에 bodyData에 대한 검증이나 서버 전송 등의 로직을 추가할 수 있습니다.
    console.log('Body Data:', bodyData);
    handleNext();
  };

  return (
    <div className={styles.container}>
      <h1 className="title">체형 정보</h1>
      <BodyType onBodyDataChange={handleBodyDataChange} />
      <div className={styles['nextPrevBtnWrapper']}>
        <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
          이전
        </GeneralButton>
        <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={handleNextStep}>
          다음
        </GeneralButton>
      </div>
    </div>
  );
}
