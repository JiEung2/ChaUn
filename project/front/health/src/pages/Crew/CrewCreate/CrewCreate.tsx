import React, { useState } from 'react';
import './CrewCreate.scss';
import ExerciseModal from '@/components/Exercise/ExerciseModal';
import { createCrew, checkCrewName } from '@/api/crew';

export default function CrewCreate() {
  const [crewName, setCrewName] = useState<string>('');
  const [profileImage, setprofileImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [nameCheckMessage, setNameCheckMessage] = useState<string | null>(null); // 중복 체크 메시지 상태 추가
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null); // 이름 유효 여부 상태 추가

  const sendCreatCrew = () => {
    const formData = new FormData();

    formData.append(
      'createCrewRequestDto',
      JSON.stringify({
        name: crewName,
        description: description,
        exerciseId: exerciseId,
      })
    );

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    createCrew(formData);
  };

  const handleNameCheck = async () => {
    try {
      const response = await checkCrewName(crewName);
      console.log('크루명 중복 체크 결과:', response);
      setIsNameValid(true);
      setNameCheckMessage('사용 가능한 이름입니다.');
    } catch (error) {
      console.error('크루명 중복 체크 실패', error);
      setIsNameValid(false);
      setNameCheckMessage('중복된 이름입니다.');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrewName(event.target.value);
    setIsNameValid(null); // 이름이 변경될 때는 메시지를 초기화
    setNameCheckMessage(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setprofileImage(event.target.files[0]);
    }
  };

  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Crew 생성 정보:', {
      crewName,
      exerciseName,
      profileImage,
      description,
    });

    sendCreatCrew();
    alert('크루가 성공적으로 생성되었습니다.');
  };

  const handleExerciseSelect = (selected: { id: number; name: string } | { id: number; name: string }[]) => {
    const exercise = Array.isArray(selected) ? selected[0] : selected;
    setExerciseId(exercise.id);
    setExerciseName(exercise.name);
    setShowExerciseModal(false);
  };

  return (
    <>
      <h2>크루 생성</h2>
      <div className="crewCreate">
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
              <button className="validationButton" onClick={handleNameCheck}>
                중복 확인
              </button>
            </div>
            {nameCheckMessage && <p className={`message ${isNameValid ? 'valid' : 'invalid'}`}>{nameCheckMessage}</p>}
          </div>

          <div className="crewCreate__form-group">
            <label>운동 종목</label>
            <button className="exerciseSelectButton" onClick={() => setShowExerciseModal(true)}>
              {exerciseName ? exerciseName : '선택'}
            </button>
          </div>

          <div className="crewCreate__form-group">
            <label>대표 이미지</label>
            <div className="crewCreate__image-input">
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>

          <div className="crewCreate__form-group">
            <label htmlFor="description">한줄 소개</label>
            <div className="crewCreate__input-group">
              <input
                type="text"
                id="description"
                value={description}
                onChange={handledescriptionChange}
                placeholder="한줄 소개를 입력하세요."
              />
            </div>
          </div>
          <button className="submitButton" onClick={handleSubmit}>
            크루 생성하기
          </button>
        </div>
      </div>

      {showExerciseModal && (
        <ExerciseModal
          onSelectExercise={handleExerciseSelect}
          onClose={() => setShowExerciseModal(false)}
          multiple={false}
        />
      )}
    </>
  );
}
