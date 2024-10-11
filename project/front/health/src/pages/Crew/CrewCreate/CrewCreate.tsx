import React, { useState } from 'react';
import './CrewCreate.scss';
import ExerciseModal from '@/components/Exercise/ExerciseModal';
import { createCrew, checkCrewName } from '@/api/crew';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/utils/querykeys';

export default function CrewCreate() {
  const [crewName, setCrewName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [nameCheckMessage, setNameCheckMessage] = useState<string | null>(null); // 중복 체크 메시지 상태 추가
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null); // 이름 유효 여부 상태 추가
  const { userId } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 크루 생성 요청을 처리하는 mutation
  const createCrewMutation = useMutation({
    mutationFn: (formData: FormData) => createCrew(formData),
    onSuccess: () => {
      // 크루 생성 성공 시 크루 리스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER_CREW_LIST] });
      alert('크루가 성공적으로 생성되었습니다.');
      navigate('/crew'); // 크루 메인 페이지로 이동
    },
    onError: (error) => {
      console.error('크루 생성 실패:', error);
      alert('크루 생성에 실패했습니다.');
    },
  });

  // 크루명 중복 체크 mutation
  const nameCheckMutation = useMutation({
    mutationFn: (crewName: string) => checkCrewName(crewName),
    onSuccess: () => {
      setIsNameValid(true);
      setNameCheckMessage('사용 가능한 이름입니다.');
    },
    onError: () => {
      setIsNameValid(false);
      setNameCheckMessage('중복된 이름입니다.');
    },
  });

  const sendCreateCrew = () => {
    const formData = new FormData();
    formData.append(
      'createCrewRequestDto',
      JSON.stringify({
        userId: userId,
        name: crewName,
        description: description,
        exerciseId: exerciseId,
      })
    );
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    createCrewMutation.mutate(formData); // 크루 생성 요청
  };

  const handleNameCheck = () => {
    if (crewName) {
      nameCheckMutation.mutate(crewName); // 크루명 중복 체크 요청
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrewName(event.target.value);
    setIsNameValid(null); // 이름이 변경될 때는 메시지를 초기화
    setNameCheckMessage(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    sendCreateCrew(); // 크루 생성 요청
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
                placeholder="크루명을 입력하세요."
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
