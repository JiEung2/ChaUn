import Input from '../Input/Input';
import SelectButton from '../Button/SelectButton';
import styles from './2.module.scss';
import { useState, useEffect } from 'react';

interface BodyTypeProps {
  onBodyDataChange: (data: {
    height: number;
    weight: number;
    skeletalMuscleMass: number;
    bodyFat: number;
    bodyMuscle: boolean;
    bodyShape: string;
  }) => void;
}

export default function BodyType({ onBodyDataChange }: BodyTypeProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skeletalMuscleMass, setSkeletalMuscleMass] = useState(''); // 골격근량
  const [bodyFat, setBodyFat] = useState(''); // 체지방률
  const [bodyMuscle, setBodyMuscle] = useState(''); // 근육 여부
  const [bodyShape, setBodyShape] = useState(''); // 체형

  // useEffect를 사용하여 상태 변경 후에 handleDataChange 호출
  useEffect(() => {
    handleDataChange();
  }, [height, weight, skeletalMuscleMass, bodyFat, bodyMuscle, bodyShape]); // 각 상태가 변경될 때마다 실행

  const handleDataChange = () => {
    onBodyDataChange({
      height: Number(height),
      weight: Number(weight),
      skeletalMuscleMass: Number(skeletalMuscleMass),
      bodyFat: Number(bodyFat),
      bodyMuscle: bodyMuscle === '근육많음',
      bodyShape: bodyShape,
    });
  };

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

  const handleBodyMuscleChange = (muscle: string) => {
    setBodyMuscle(muscle);
  };

  const handleBodyShapeChange = (shape: string) => {
    setBodyShape(shape);
  };

  return (
    <div className={styles.container}>
      <div className={styles['inputWrapper']}>
        <h2>키</h2>
        <Input placeholder="숫자만 입력해주세요." size="medium" onChange={handleHeightChange} value={height} />
      </div>
      <div className={styles['inputWrapper']}>
        <h2>몸무게</h2>
        <Input placeholder="숫자만 입력해주세요." size="medium" onChange={handleWeightChange} value={weight} />
      </div>
      <div className={styles['inputWrapper']}>
        <h2>골격근량</h2>
        <Input
          placeholder="숫자만 입력해주세요."
          size="medium"
          onChange={handleSkeletalMuscleMassChange}
          value={skeletalMuscleMass}
        />
      </div>
      <div className={styles['inputWrapper']}>
        <h2>체지방률</h2>
        <Input placeholder="숫자만 입력해주세요." size="medium" onChange={handleBodyFatChange} value={bodyFat} />
      </div>
      <h2>근육 여부</h2>
      <div className={styles['selectButtonWrapper']}>
        <SelectButton
          label="근육 많음"
          selected={bodyMuscle === '근육많음'}
          onClick={() => handleBodyMuscleChange('근육많음')}
        />
        <SelectButton
          label="근육 적음"
          selected={bodyMuscle === '근육적음'}
          onClick={() => handleBodyMuscleChange('근육적음')}
        />
      </div>
      <h2>체형</h2>
      <div className={styles['bodyShapeWrapper']}>
        <SelectButton label="슬림" selected={bodyShape === '슬림'} onClick={() => handleBodyShapeChange('슬림')} />
        <SelectButton
          label="슬림 탄탄"
          selected={bodyShape === '슬림탄탄'}
          onClick={() => handleBodyShapeChange('슬림탄탄')}
        />
        <SelectButton
          label="약간 슬림"
          selected={bodyShape === '약간슬림'}
          onClick={() => handleBodyShapeChange('약간슬림')}
        />
        <SelectButton label="보통" selected={bodyShape === '보통'} onClick={() => handleBodyShapeChange('보통')} />
        <SelectButton label="통통" selected={bodyShape === '통통'} onClick={() => handleBodyShapeChange('통통')} />
        <SelectButton
          label="많이 통통"
          selected={bodyShape === '많이통통'}
          onClick={() => handleBodyShapeChange('많이통통')}
        />
      </div>
    </div>
  );
}
