import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

import HomeIcon from '../../assets/svg/home.svg';
import CrewIcon from '../../assets/svg/crew.svg';
import ExerciseIcon from '../../assets/svg/exercise.svg';
import RecordIcon from '../../assets/svg/record.svg';
import MyPageIcon from '../../assets/svg/mypage.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__white">
        <Link to="/home" className="navbar__icon">
          <img src={HomeIcon} alt="Home" className="navbar__icon-img" />
          <div className="navbar__title">홈</div>
        </Link>
        <Link to="/crew" className="navbar__icon">
          <img src={CrewIcon} alt="Crew" className="navbar__icon-img" />
          <div className="navbar__title">크루</div>
        </Link>
        <div className="navbar__icon navbar__icon--center">
          <div className="navbar__center-icon">
            <img src={ExerciseIcon} alt="Center" className="navbar__icon-img--center" />
          </div>
        </div>
        <Link to="/record" className="navbar__icon">
          <img src={RecordIcon} alt="Records" className="navbar__icon-img" />
          <div className="navbar__title">기록</div>
        </Link>
        <Link to="/mypage" className="navbar__icon">
          <img src={MyPageIcon} alt="My Page" className="navbar__icon-img" />
          <div className="navbar__title">마이페이지</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
