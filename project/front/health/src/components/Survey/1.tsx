import GeneralButton from '../Button/GeneralButton';
import SelectButton from '../Button/SelectButton';
import Input from '../Input/Input';
import { useState } from 'react';
import './1.scss'; // SCSS 파일을 불러오기

export default function One({ handleNext }: { handleNext: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthMonth(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDay(e.target.value);
  };

  // TODO - 정보를 상위 컴포넌트로 넘기기
  const handleSubmit = () => {
    // 년 월 일을 합쳐서 생년월일로 만들기
    const birthdate: string = `${birthYear}-${birthMonth}-${birthDay}`;
    console.log(birthdate);
    handleNext(); // 다음 페이지로 이동
  };
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력된 값을 상태로 업데이트
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender); // 성별 선택
  };

  return (
    <div className="container">
      <h1>기본 정보</h1>

      <h3>닉네임</h3>
      <div className="input-wrapper">
        <Input placeholder="" size="large" onChange={handleInputChange} value={inputValue} />
        <GeneralButton buttonStyle={{ style: 'check', size: 'small' }}>중복 확인</GeneralButton>
      </div>

      <h3>생년월일</h3>
      <div className="input-wrapper">
        <Input placeholder="YYYY" size="small" onChange={handleYearChange} value={inputValue} />
        <Input placeholder="MM" size="tiny" onChange={handleMonthChange} value={inputValue} />
        <Input placeholder="DD" size="tiny" onChange={handleDayChange} value={inputValue} />
      </div>

      <h3>성별</h3>
      <div className="gender-selection">
        <SelectButton label="남성" selected={selectedGender === '남성'} onClick={() => handleGenderSelect('남성')} />
        <SelectButton label="여성" selected={selectedGender === '여성'} onClick={() => handleGenderSelect('여성')} />
      </div>

      <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={handleSubmit} className="nextBtn">
        다음
      </GeneralButton>
    </div>
  );
}
