import GeneralButton from '@/components/Button/GeneralButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Result.scss';
export default function ResultPage() {
  const navigate = useNavigate();

  const [nickname] = useState('닉네임');
  const moveMain = () => {
    navigate('/home');
  };
  return (
    <div className="container">
      <h3>{nickname}님의 캐릭터가 생성되었습니다!</h3>
      <GeneralButton buttonStyle={{ style: 'Primary', size: 'large' }} onClick={moveMain}>
        시작하기
      </GeneralButton>
    </div>
  );
}
