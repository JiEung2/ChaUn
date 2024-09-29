import React, { useState } from 'react';
import './CrewCreate.scss';

export default function CrewCreate() {
  const [crewName, setCrewName] = useState<string>('');
  const [sportType, setSportType] = useState<string>('');
  const [crewImage, setCrewImage] = useState<File | null>(null);
  const [introduction, setIntroduction] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrewName(event.target.value);
  };

  const handleSportTypeChange = (type: string) => {
    setSportType(type);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCrewImage(event.target.files[0]);
    }
  };

  const handleIntroductionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntroduction(event.target.value);
  };

  const handleDuplicateCheck = () => {
    // 닉네임 중복 확인 로직 구현 필요
    alert(`"${crewName}" 중복 확인 기능은 구현되지 않았습니다.`);
  };

  const handleSubmit = () => {
    // 크루 생성 API 호출 등 제출 로직 구현 필요
    console.log('Crew 생성 정보:', {
      crewName,
      sportType,
      crewImage,
      introduction,
    });
    alert('크루가 성공적으로 생성되었습니다.');
  };

  return (
    <>
      <h2>크루 생성</h2>
      <div className="crewCeate">
        <div className="crewCreate__form">
          <div className="crewCreate__form-group">
            <label htmlFor="crewName">크루명</label>
            <div className="crewCreate__input-group">
              <input
                type="text"
                id="crewName"
                value={crewName}
                onChange={handleNameChange}
                placeholder="닉네임을 입력하세요."
              />
              <button className="validationButton" onClick={handleDuplicateCheck}>
                중복 확인
              </button>
            </div>
          </div>

          <div className="crewCreate__form-group">
            <label>운동 종목</label>
            <button className="exerciseSelectButton" onClick={() => handleSportTypeChange('selected')}>
              선택
            </button>
          </div>

          <div className="crewCreate__form-group">
            <label>대표 이미지</label>
            <div className="crewCreate__image-input">
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>

          <div className="crewCreate__form-group">
            <label htmlFor="introduction">한줄 소개</label>
            <div className="crewCreate__input-group">
              <input
                type="text"
                id="introduction"
                value={introduction}
                onChange={handleIntroductionChange}
                placeholder="한줄 소개를 입력하세요."
              />
              {/* 내용 삭제 버튼 */}
            </div>
          </div>

          <button className="submitButton" onClick={handleSubmit}>
            크루 생성하기
          </button>
        </div>
      </div>
    </>
  );
}
