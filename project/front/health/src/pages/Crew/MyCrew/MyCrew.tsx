import React, { useState } from 'react';
import './MyCrew.scss';
import Coin from '../../../assets/svg/coin.svg';

export default function MyCrew() {
  interface CrewInfo {
    crewName: string;
    crewProfileImage: string;
    exerciseName: string;
    description: string;
    crewCoins: number;
    crewRanking: number;
    totalBattleCount: number;
    winCount: number;
    averageAge: number;
    activityScore: number;
    basicScore: number;
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const crewInfo: CrewInfo = {
    crewName: '달리는 번개',
    crewProfileImage: 'crew-profile-image.png',
    exerciseName: '런닝',
    description: '번개맨보다 빠른 러너들의 모임',
    crewCoins: 300,
    crewRanking: 3,
    totalBattleCount: 10,
    winCount: 7,
    averageAge: 20,
    activityScore: 1200,
    basicScore: 850,
  };
  return (
    <>
      <div className="title">내 크루</div>
      <div className="crewInfoContainer">
        <div className="crewInfoHeader">
          <img className="crewProfileImage" src={crewInfo.crewProfileImage} alt="crew profile" />
          <div className="crewInfo">
            <div className="crewInfoTitle">
              <h3>{crewInfo.crewName}</h3>
              <span className="exerciseTag"># {crewInfo.exerciseName}</span>
            </div>
            <p className="crewDescription">{crewInfo.description}</p>
            <div className="crewCoins">
              <img src={Coin} alt="coin" />
              <span>{crewInfo.crewCoins}</span>
            </div>
          </div>
        </div>
        <button className="detailButton" onClick={toggleDetails}>
          {isOpen ? '상세 닫기' : '상세 보기'}
        </button>
        {isOpen && (
          <div className="crewInfoDetails">
            <p>
              # {crewInfo.exerciseName} 크루 랭킹: {crewInfo.crewRanking}위
            </p>
            <p>
              배틀 현황: {crewInfo.totalBattleCount}전 {crewInfo.winCount}승{' '}
              {crewInfo.totalBattleCount - crewInfo.winCount}패
            </p>
            <p>크루 평균 연령: {crewInfo.averageAge}대 후반</p>
            <p>활동 점수: {crewInfo.activityScore}점</p>
            <p>기본 점수: {crewInfo.basicScore}점</p>
          </div>
        )}
      </div>
      <div className="buttonContainer">
        <div className="quest">오늘의 퀘스트</div>
        <div className="battle">크루 배틀 현황</div>
      </div>
      <div className="crewCharacterContainer"></div>
      <div className="crewRankingContainer"></div>
    </>
  );
}
