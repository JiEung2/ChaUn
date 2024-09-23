import Input from '../Input/Input';
import SelectButton from '../Button/SelectButton';
import GeneralButton from '../Button/GeneralButton';

import { useState } from 'react';
import styles from './2.module.scss';

interface TwoProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export default function Two({ handleNext, handlePrev }: TwoProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skeletalMuscleMass, setSkeletalMuscleMass] = useState(''); // 골격근량
  const [bodyFat, setBodyFat] = useState(''); // 체지방률
  const [bodyMuscle, setBodyMuscle] = useState(''); // 근육 여부
  const [bodyShape, setBodyShape] = useState(''); // 체형

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleSkeletalMuscleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkeletalMuscleMass(e.target.value);
  };

  const handleBodyFatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBodyFat(e.target.value);
  };
  const handleBodyMuscle = (bodyMuscle: string) => {
    setBodyMuscle(bodyMuscle);
  };

  const handleBodyShape = (bodyShape: string) => {
    setBodyShape(bodyShape);
  };
  return (
    <div className={styles.container}>
      <h1 className="title">체형 정보</h1>
      <div className={styles['input-wrapper']}>
        <h2>키</h2>
        <Input placeholder="" size="medium" onChange={handleHeightChange} value={height} />
      </div>
      <div className={styles['input-wrapper']}>
        <h2>몸무게</h2>
        <Input placeholder="" size="medium" onChange={handleWeightChange} value={weight} />
      </div>
      <div className={styles['input-wrapper']}>
        <h2>골격근량</h2>
        <Input placeholder="" size="medium" onChange={handleSkeletalMuscleMassChange} value={skeletalMuscleMass} />
      </div>
      <div className={styles['input-wrapper']}>
        <h2>체지방률</h2>
        <Input placeholder="" size="medium" onChange={handleBodyFatChange} value={bodyFat} />
      </div>
      <h2>근육 여부</h2>
      <div className={styles['selectButton-wrapper']}>
        <SelectButton
          label="근육 많음"
          selected={bodyMuscle === '근육많음'}
          onClick={() => handleBodyMuscle('근육많음')}
        />
        <SelectButton
          label="근육 적음"
          selected={bodyMuscle === '근육적음'}
          onClick={() => handleBodyMuscle('근육적음')}
        />
      </div>
      <h2>체형</h2>
      <div className={styles['body-shape-wrapper']}>
        <SelectButton label="슬림" selected={bodyShape === '슬림'} onClick={() => handleBodyShape('슬림')} />
        <SelectButton
          label="슬림 탄탄"
          selected={bodyShape === '슬림탄탄'}
          onClick={() => handleBodyShape('슬림탄탄')}
        />
        <SelectButton
          label="약간 슬림"
          selected={bodyShape === '약간슬림'}
          onClick={() => handleBodyShape('약간슬림')}
        />
        <SelectButton label="보통" selected={bodyShape === '보통'} onClick={() => handleBodyShape('보통')} />
        <SelectButton label="통통" selected={bodyShape === '통통'} onClick={() => handleBodyShape('통통')} />
        <SelectButton
          label="많이 통통"
          selected={bodyShape === '많이통통'}
          onClick={() => handleBodyShape('많이통통')}
        />
      </div>
      <div className={styles['nextPrevBtn-wrapper']}>
        <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
          이전
        </GeneralButton>
        <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={handleNext}>
          다음
        </GeneralButton>
      </div>
    </div>
  );
}
