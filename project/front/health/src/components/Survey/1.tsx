import GeneralButton from '../Button/GeneralButton';
import SelectButton from '../Button/SelectButton';
import Input from '../Input/Input';
import { useState } from 'react';
import styles from './1.module.scss'; // CSS 모듈 import

export default function One({ handleNext }: { handleNext: () => void }) {
  const [nickname, setNickname] = useState('');
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

  const handleSubmit = () => {
    const birthdate: string = `${birthYear}-${birthMonth}-${birthDay}`;
    // console.log(birthdate);
    handleNext(); // 다음 페이지로 이동
  };
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleNincknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender); // 성별 선택
  };

  return (
    <div className={styles.container}>
      <h1>기본 정보</h1>

      <h3>닉네임</h3>
      <div className={styles['input-wrapper']}>
        <Input placeholder="" size="large" onChange={handleNincknameChange} value={nickname} />
        <GeneralButton buttonStyle={{ style: 'check', size: 'small' }}>중복 확인</GeneralButton>
      </div>

      <h3>생년월일</h3>
      <div className={styles['input-wrapper']}>
        <Input placeholder="YYYY" size="tiny" onChange={handleYearChange} value={birthYear} />
        <Input placeholder="MM" size="tiny" onChange={handleMonthChange} value={birthMonth} />
        <Input placeholder="DD" size="tiny" onChange={handleDayChange} value={birthDay} />
      </div>

      <h3>성별</h3>
      <div className={styles['input-gender']}>
        <SelectButton label="남성" selected={selectedGender === '남성'} onClick={() => handleGenderSelect('남성')} />
        <SelectButton label="여성" selected={selectedGender === '여성'} onClick={() => handleGenderSelect('여성')} />
      </div>

      <GeneralButton
        buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
        onClick={handleSubmit}
        className={styles.nextBtn}>
        다음
      </GeneralButton>
    </div>
  );
}
