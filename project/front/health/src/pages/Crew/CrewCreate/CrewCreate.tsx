import React, { useState } from 'react';
import './CrewCreate.scss';
import ExerciseModal from '@/components/Exercise/ExerciseModal';

export default function CrewCreate() {
  const [crewName, setCrewName] = useState<string>('');
  const [profileImage, setprofileImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [_, setExerciseId] = useState<number | null>(null);
  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrewName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setprofileImage(event.target.files[0]);
    }
  };

  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDuplicateCheck = () => {
    // 닉네임 중복 확인 로직 구현 필요
    alert(`"${crewName}" 중복 확인 기능은 구현되지 않았습니다.`);
  };

  const handleSubmit = () => {
    // 크루 생성 API 호출 등 제출 로직 구현 필요
    console.log('Crew 생성 정보:', {
      crewName,
      exerciseName,
      profileImage,
      description,
    });
    alert('크루가 성공적으로 생성되었습니다.');
  };

  const handleExerciseSelect = (selected: { id: number; name: string } | { id: number; name: string }[]) => {
    // 배열일 경우 첫 번째 요소를 선택
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
              <button className="validationButton" onClick={handleDuplicateCheck}>
                중복 확인
              </button>
            </div>
          </div>

          <div className="crewCreate__form-group">
            <label>운동 종목</label>
            <button className="exerciseSelectButton" onClick={() => setShowExerciseModal(true)}>
              {/* {exerciseName ? exerciseName.name : '선택'} */}
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
          multiple={false} // 한 가지 운동만 선택 가능
        />
      )}
    </>
  );
}
