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
  // 초기상태 1, 닉네임이 중봉된 상태 2. 닉네임이 사용 가능한 상태 3
  const [isNicknameChecked, setIsNicknameChecked] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string>('');

  const handleNincknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameError(false);
    setIsNicknameChecked(1); // 닉네임이 변경되면 중봉 확인 상태를 초기화
  };

  const handleNincknameCheck = async () => {
    if (!nickname) {
      setIsNicknameError(true);
      setIsNicknameChecked(1);
    } else {
      try {
        const response = await nicknameCheck(nickname);

        if (response.status === 200) {
          setIsNicknameChecked(3); // 닉네임 중봉 아닙
        }
      } catch (e: any) {
        if (e.response && e.response.status === 409) {
          setIsNicknameChecked(2);
        } else {
          console.error('닉네임 중봉 체크 중 에러 발생:', e);
        }
      }
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 4) {
      setBirthYear(e.target.value);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 2) {
      setBirthMonth(e.target.value);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 2) {
      setBirthDay(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const birthdate: string = `${birthYear}-${birthMonth}-${birthDay}`;
    try {
      if (
        isNicknameChecked === 3 &&
        birthYear.length === 4 &&
        birthMonth.length === 2 &&
        birthDay.length === 2 &&
        selectedGender
      ) {
        // 빈 문자열을 전송하는 경우, 예제처리를 해야할까?
        try {
          const response = await surveySubmit1(nickname, birthdate, selectedGender);

          console.log(response);
        } catch (e) {
          console.error('사용자 정보 전송 중 에러', e);
        }

        handleNext();
      }
    } catch (e) {
      console.error('서버로 데이터 전송 중 에러 발생:', e);
    }
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender); // 성별 선택
  };

  const isNextButtonDisabled =
    !nickname ||
    isNicknameChecked !== 3 ||
    birthYear.length !== 4 ||
    birthMonth.length !== 2 ||
    birthDay.length !== 2 ||
    !selectedGender;

  return (
    <div className={styles.container}>
      <h1 className="title">기본 정보</h1>
      <h3>닉네임</h3>
      <div className={styles['inputWrapper']}>
        <Input placeholder="" size="large" onChange={handleNincknameChange} value={nickname} />
        <GeneralButton buttonStyle={{ style: 'check', size: 'small' }} onClick={handleNincknameCheck}>
          중복 확인
        </GeneralButton>
      </div>
      {isNicknameError && <p className={styles['errorText']}>닉네임을 올바른기 입력해주세요</p>}
      {isNicknameChecked === 2 && <p className={styles['errorText']}>중봉된 닉네임입니다.</p>}
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
        disabled={isNextButtonDisabled}>
        다음
      </GeneralButton>
    </div>
  );
}
