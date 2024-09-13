import GeneralButton from '@/components/Button/GeneralButton';
import { useNavigate } from 'react-router-dom';
export default function Result() {
  const navigate = useNavigate();
  const moveMain = () => {
    navigate('/home');
  };
  return (
    <div>
      <GeneralButton buttonStyle={{ style: 'Primary', size: 'large' }} onClick={moveMain}>
        시작하기
      </GeneralButton>
    </div>
  );
}
