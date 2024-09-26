import GeneralButton from '../Button/GeneralButton';
import SelectButton from '../Button/SelectButton';
import Input from '../Input/Input';
import { useState } from 'react';
import styles from './1.module.scss'; // CSS 모듈 import
import { nicknameCheck, surveySubmit1 } from '@/api/survey';

export default function One({ handleNext }: { handleNext: () => void }) {
  const [nickname, setNickname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [isNicknameError, setIsNicknameError] = useState(false); // 올바른 닉네임 여부
  const [isNicknameChecked, setIsNicknameChecked] = useState(1); // 초기상태 1, 닉네임 중복 2, 닉네임 사용 가능 3
  const [selectedGender, setSelectedGender] = useState<string>('');

  // 닉네임 입력 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameError(false);
  };

  // 닉네임 중복 체크 핸들러
  const handleNicknameCheck = async () => {
    if (!nickname) {
      setIsNicknameError(true);
      setIsNicknameChecked(1);
    } else {
      try {
        const response = await nicknameCheck(nickname);

        if (response.status === 200) {
          setIsNicknameChecked(3); // 닉네임 중복 아님
        }
      } catch (e: any) {
        if (e.response && e.response.status === 409) {
          setIsNicknameChecked(2); // 중복된 닉네임
        } else {
          console.error('닉네임 중복 체크 중 에러 발생:', e);
        }
      }
    }
  };

  // 생년월일 입력 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => setBirthYear(e.target.value);
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => setBirthMonth(e.target.value);
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => setBirthDay(e.target.value);

  // 성별 선택 핸들러
  const handleGenderSelect = (gender: string) => setSelectedGender(gender);

  // 제출 핸들러
  const handleSubmit = async () => {
    const birthdate: string = `${birthYear}-${birthMonth}-${birthDay}`;
    try {
      if (isNicknameChecked === 3) {
        const response = await surveySubmit1(nickname, birthdate, selectedGender);
        console.log(response);
        handleNext();
      }
    } catch (e) {
      console.error('서버로 데이터 전송 중 에러 발생:', e);
    }
  };

  // 다음 버튼 활성화 여부
  const isFormValid =
    nickname && isNicknameChecked === 3 && birthYear && birthMonth && birthDay && selectedGender;

  return (
    <div className={styles.container}>
      <h1 className="title">기본 정보</h1>
      <h1>닉네임</h1>
      <div className={styles['inputWrapper']}>
        <Input placeholder="" size="large" onChange={handleNicknameChange} value={nickname} />
        <GeneralButton buttonStyle={{ style: 'check', size: 'small' }} onClick={handleNicknameCheck}>
          중복 확인
        </GeneralButton>
      </div>
      {isNicknameError && <p className={styles['errorText']}>닉네임을 올바르게 입력해주세요</p>}
      {isNicknameChecked === 2 && <p className={styles['errorText']}>중복된 닉네임입니다.</p>}
      {isNicknameChecked === 3 && <p className={styles['successText']}>사용 가능한 닉네임입니다.</p>}

      <h3>생년월일</h3>
      <div className={styles['inputWrapper']}>
        <Input placeholder="YYYY" size="tiny" onChange={handleYearChange} value={birthYear} />
        <Input placeholder="MM" size="tiny" onChange={handleMonthChange} value={birthMonth} />
        <Input placeholder="DD" size="tiny" onChange={handleDayChange} value={birthDay} />
      </div>

      <h3>성별</h3>
      <div className={styles['inputGender']}>
        <SelectButton label="남성" selected={selectedGender === '남성'} onClick={() => handleGenderSelect('남성')} />
        <SelectButton label="여성" selected={selectedGender === '여성'} onClick={() => handleGenderSelect('여성')} />
      </div>

      <GeneralButton
        buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
        onClick={handleSubmit}
        className={styles.nextBtn}
        disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
      >
        다음
      </GeneralButton>
    </div>
  );
}
