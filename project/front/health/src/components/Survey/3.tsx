import GeneralButton from '../Button/GeneralButton';
import { useForm } from 'react-hook-form';
import EatingHabits from './EatingHabits'; // EatingHabits 컴포넌트 import
import styles from './3.module.scss'; // SCSS 파일을 모듈로 가져옴

interface ThreeProps {
  handleNext: (data: FormData) => void;
  handlePrev: () => void;
}

type FormData = {
  mealsPerDay: string;
  foodType: string;
  snacksPerDay: string;
  drinksPerDay: string;
};

export default function Three({ handleNext, handlePrev }: ThreeProps) {
  const { register, handleSubmit } = useForm<FormData>();

  // 데이터를 저장하고, handleNext 함수로 넘김
  const onSubmit = (data: FormData) => {
    handleNext(data); // handleNext 함수에 formData 전달
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.surveyForm}>
        <h1 className="title">식습관</h1>
        <EatingHabits register={register} />

        {/* 이전, 다음 버튼 */}
        <div className={styles.buttonGroup}>
          <GeneralButton buttonStyle={{ style: 'outlined', size: 'tiny' }} onClick={handlePrev}>
            이전
          </GeneralButton>
          <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={handleSubmit(onSubmit)}>
            다음
          </GeneralButton>
        </div>
      </form>
    </div>
  );
}
