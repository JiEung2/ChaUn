import GeneralButton from '../Button/GeneralButton';
import { useForm } from 'react-hook-form';
import EatingHabits from './EatingHabits'; // EatingHabits 컴포넌트 import
import styles from './3.module.scss'; // SCSS 파일을 모듈로 가져옴
import { useMutation } from '@tanstack/react-query'; // useMutation 추가
import { surveySubmit3 } from '@/api/survey'; // API 함수 가져오기

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
  const { register, handleSubmit, watch } = useForm<FormData>();

  // watch로 폼 데이터를 실시간으로 감시
  const mealsPerDay = watch('mealsPerDay');
  const foodType = watch('foodType');
  const snacksPerDay = watch('snacksPerDay');
  const drinksPerDay = watch('drinksPerDay');

  // 모든 필드가 선택되었는지 확인
  const isFormValid = mealsPerDay && foodType && snacksPerDay && drinksPerDay;

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      surveySubmit3(data.mealsPerDay, data.foodType, data.snacksPerDay, data.drinksPerDay),
    onSuccess: () => {
      console.log('식습관 정보 전송 성공');
      // handleNext 함수를 호출하여 다음 단계로 이동
      handleNext({ mealsPerDay, foodType, snacksPerDay, drinksPerDay });
    },
    onError: (error) => {
      console.error('식습관 정보 전송 실패:', error);
    },
  });

  // 데이터를 저장하고, handleNext 함수로 넘김
  const onSubmit = (data: FormData) => {
    // 서버로 데이터 전송
    mutation.mutate(data);
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
          <GeneralButton
            buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
            onClick={handleSubmit(onSubmit)}
            disabled={!isFormValid} // 모든 radio 버튼이 선택되지 않으면 버튼 비활성화
          >
            다음
          </GeneralButton>
        </div>
      </form>
    </div>
  );
}
