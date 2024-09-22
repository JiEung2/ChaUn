import GeneralButton from '../Button/GeneralButton';
import { useForm } from 'react-hook-form';
import styles from './3.module.scss'; // SCSS 모듈 파일 import

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

  const onSubmit = (data: FormData) => {
    handleNext(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.surveyForm}>
        <h1>식습관</h1>

        {/* Question 1 */}
        <h2>Q1 하루에 몇 끼를 섭취하십니까?</h2>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="1끼" {...register('mealsPerDay')} />
            1끼
          </label>
          <label>
            <input type="radio" value="2끼" {...register('mealsPerDay')} />
            2끼
          </label>
          <label>
            <input type="radio" value="3끼" {...register('mealsPerDay')} />
            3끼
          </label>
          <label>
            <input type="radio" value="4끼 이상" {...register('mealsPerDay')} />
            4끼 이상
          </label>
        </div>

        {/* Question 2 */}
        <h2>Q2 주로 어떤 종류의 음식을 섭취하십니까?</h2>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="주로 채식" {...register('foodType')} />
            주로 채식 (채소, 과일 중심)
          </label>
          <label>
            <input type="radio" value="균형 잡힌 식사" {...register('foodType')} />
            균형 잡힌 식사 (단백질, 탄수화물, 지방의 균형)
          </label>
          <label>
            <input type="radio" value="주로 고기류와 탄수화물" {...register('foodType')} />
            주로 고기류와 탄수화물
          </label>
          <label>
            <input type="radio" value="주로 패스트푸드" {...register('foodType')} />
            주로 패스트푸드, 가공식품
          </label>
        </div>

        {/* Question 3 */}
        <h2>Q3 하루에 간식을 얼마나 섭취하십니까?</h2>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="전혀 섭취하지 않음" {...register('snacksPerDay')} />
            전혀 섭취하지 않음
          </label>
          <label>
            <input type="radio" value="가끔" {...register('snacksPerDay')} />
            가끔 (1-2회)
          </label>
          <label>
            <input type="radio" value="자주" {...register('snacksPerDay')} />
            자주 (3-4회)
          </label>
          <label>
            <input type="radio" value="매우 자주" {...register('snacksPerDay')} />
            매우 자주 (5회 이상)
          </label>
        </div>

        {/* Question 4 */}
        <h2>Q4 하루에 얼마나 자주 음료(물 제외)를 섭취하십니까?</h2>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="전혀 섭취하지 않음" {...register('drinksPerDay')} />
            전혀 섭취하지 않음
          </label>
          <label>
            <input type="radio" value="가끔" {...register('drinksPerDay')} />
            가끔 (1-2회)
          </label>
          <label>
            <input type="radio" value="자주" {...register('drinksPerDay')} />
            자주 (3-4회)
          </label>
          <label>
            <input type="radio" value="매우 자주" {...register('drinksPerDay')} />
            매우 자주 (5회 이상)
          </label>
        </div>

        {/* 이전, 다음 버튼 */}
        <div className={styles.buttonGroup}>
          <GeneralButton buttonStyle={{ style: 'semiOutlined', size: 'tiny' }} onClick={handlePrev}>
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
