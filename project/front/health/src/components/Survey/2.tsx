import Input from '../Input/Input';
// import SelectButton from '../Button/SelectButton';
import GeneralButton from '../Button/GeneralButton';

import { useState } from 'react';
import './2.scss';

interface TwoProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export default function Two({ handleNext, handlePrev }: TwoProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skeletalMuscleMass, setSkeletalMuscleMass] = useState(''); // 골격근량
  const [bodyFat, setBodyFat] = useState(''); // 체지방률

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

  return (
    <div className="container">
      <h1>체형 정보</h1>

      <div className="input-wrapper">
        <h2>키</h2>
        <Input placeholder="" size="medium" onChange={handleHeightChange} value={height} />
      </div>

      <div className="input-wrapper">
        <h2>몸무게</h2>
        <Input placeholder="" size="medium" onChange={handleWeightChange} value={weight} />
      </div>

      <div className="input-wrapper">
        <h2>골격근량</h2>
        <Input placeholder="" size="medium" onChange={handleSkeletalMuscleMassChange} value={skeletalMuscleMass} />
      </div>

      <div className="input-wrapper">
        <h2>체지방률</h2>
        <Input placeholder="" size="medium" onChange={handleBodyFatChange} value={bodyFat} />
      </div>

      <div className="input-wrapper">
        <h2>근육 여부</h2>
        {/* <SelectButton label="근육 많음" selected={selectedGender === '남성'} onClick={() => handleGenderSelect('남성')} /> */}
      </div>

      <GeneralButton buttonStyle={{ style: 'semiOutlined', size: 'tiny' }} onClick={handlePrev}>
        이전
      </GeneralButton>
      <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={handleNext}>
        다음
      </GeneralButton>
    </div>
  );
}
