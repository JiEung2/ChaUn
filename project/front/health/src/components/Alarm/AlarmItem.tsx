import './AlarmItem.scss';
import Icon from '@/assets/svg/home/Icon2.svg';
import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/svg/rightArrow.svg';

interface AlarmItemProps {
  type: string;
  date: string;
  time: string;
}

export default function AlarmItem({ type, date, time }: AlarmItemProps) {
  const navigate = useNavigate();

  // 알림 타입에 따라 다른 문구 설정
  const getMessage = () => {
    switch (type) {
      case 'prediction':
        return '체형 입력을 통해 정확도 높은 예측을 받아보세요!';
      case 'battleEnded':
        return '크루 배틀이 종료되었어요! 결과를 확인하세요!';
      case 'battleStarted':
        return '크루 배틀이 시작되었어요! 현황을 확인하세요!';
      default:
        return '';
    }
  };

  // 알림 타입에 따라 다른 페이지로 이동 설정
  const handleNavigation = () => {
    switch (type) {
      case 'prediction':
        navigate('/record/bodyDetail');
        break;
      case 'battleEnded':
        navigate('/battle/result');
        break;
      case 'battleStarted':
        navigate('/battle/status');
        break;
      default:
        break;
    }
  };

  return (
    <div className="alarmItemContainer">
      <img src={Icon} alt="Icon" className="alarmIcon" />
      <div className="messageContainer">
        <p className="message">{getMessage()}</p>
        <p className="date">{`${date} ${time}`}</p>
      </div>
      <img src={RightArrow} alt="moveArrow" className="arrow" onClick={handleNavigation} />
    </div>
  );
}