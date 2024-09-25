import alarmIcon from '@/assets/svg/bell.svg';
import back from '@/assets/svg/back.svg';
import './Header.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  // 경로에 따라 헤더의 텍스트를 설정
  const getHeaderTitle = () => {
    const path = location.pathname.toLowerCase();
    switch (path) {
      case '/home':
        return '캐운';
      case '/home/quest':
        return '퀘스트';
      case '/home/calendar':
        return '캘린더';
      case '/home/quest':
        return '퀘스트';
      case '/exercise/recommend':
        return '운동 추천';
      case '/exercise':
        return '운동';
      case '/record':
        return '기록';
      case '/record/bodyDetail':
        return '체형조회';
      case '/crew':
        return '크루';
      case '/crew/recommend':
        return '크루 추천';
      case '/mypage':
        return '마이페이지';
      case '/alarm':
        return '알림';
      default:
        // 프로필 페이지일 때 처리
        if (path.startsWith('/profile')) {
          return '프로필';
        }
        return '캐운';
    }
  };

  // back 버튼을 숨길 경로 목록
  const hiddenBackButtonPaths = ['/home', '/record', '/mypage'];

  // 현재 경로가 숨길 경로 목록에 있는지 확인
  const showBackBtn = !hiddenBackButtonPaths.includes(location.pathname);

  // alarm 버튼을 숨길 경로 목록
  const hiddenAlarmButtonPaths = ['/exercise/recommend', '/record/bodyDetail', '/alarm']; //TODO -  알람 페이지 경로 수정 예정

  const showAlarmBtn = !hiddenAlarmButtonPaths.includes(location.pathname);

  // 특정 경로에서는 헤더를 숨기도록 설정
  const hideHeaderPaths = ['/', '/survey', '/surveyResult', '/exercise'];

  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }
  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기 기능 구현
  };
  return (
    <div className="header">
      <div className="left-section">
        <button
          className="back-button"
          style={{ visibility: showBackBtn ? 'visible' : 'hidden' }}
          onClick={handleBackClick}>
          <img src={back} alt="뒤로가기" className="icon" />
        </button>

        <h3 className="headerTitle">{getHeaderTitle()}</h3>
      </div>
      <img
        src={alarmIcon}
        alt="알림"
        className="icon bell-icon"
        style={{ visibility: showAlarmBtn ? 'visible' : 'hidden' }}
        onClick={() => navigate('/alarm')}
      />
    </div>
  );
}
