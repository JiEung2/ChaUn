import alarmIcon from '@/assets/icons/alarm.png';
import back from '@/assets/icons/navigate_before.png';
import './Header.scss';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // 경로에 따라 헤더의 텍스트를 설정
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/home':
        return '페이지';
      case '/home/calendar':
        return '캘린더';
      case '/home/quest':
        return '퀘스트';
      case '/exercise/recommend':
        return '운동 추천';
      case '/exercise':
        return '운동';
      default:
        return '크루';
    }
  };

  // back 버튼을 숨길 경로 목록
  const hiddenBackButtonPaths = ['/home', '/login', '/settings'];

  // 현재 경로가 숨길 경로 목록에 있는지 확인
  const showBackBtn = !hiddenBackButtonPaths.includes(location.pathname);

  // 특정 경로에서는 헤더를 숨기도록 설정
  const hideHeaderPaths = ['/', '/login'];

  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="header">
      <div className="left-section">
        <button className="back-button" style={{ visibility: showBackBtn ? 'visible' : 'hidden' }}>
          <img src={back} alt="뒤로가기" className="icon" />
        </button>
        <h1 className="title">{getHeaderTitle()}</h1>
      </div>
      <img src={alarmIcon} alt="알림" className="icon bell-icon" />
    </div>
  );
}
