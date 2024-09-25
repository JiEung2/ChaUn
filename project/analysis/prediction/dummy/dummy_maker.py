import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os

# 1인 980일에 대한 데이터 만들기 (22년 1월 1일부터 24년 9월 6일까지의 기록)
# Daily Dummy를 받는다고 가정...
# np.random.normal -> loc, scale, size => centre, standard deviation, size = (int, tuple, etc...)
people_data = pd.read_csv('../statistics/updated_output.csv')

for sample_id in range(len(people_data)):
    person_data = people_data.iloc[sample_id]

    ### DF 사용할 data 만들기
    data = {
        'date' : pd.date_range(start='2022-01-01', periods=980, freq='D'),
        'user_id': sample_id,
        'sex' : person_data['sex'],
        'age' : person_data['age'],
        'weight' : person_data['weight'],
        'height' : person_data['height'],
        'BMI' : person_data['BMI'],
        'fat' : person_data['fat'],
        'muscle' : person_data['muscle'],
        'consumed_cal' : person_data['consumed_cal'],
        'intake_cal' : 0,
        'BMR': person_data['BMR'],
        'day_variable' : 0,
        'est_weight': np.zeros(980)
    }
    df = pd.DataFrame(data)

    ### 칼로리 분배를 위한 전처리
    # 1. 사용자 운동 습관 분석
    if person_data['consumed_cal'] >= 400:
        exercise_habit = True
    else:
        exercise_habit = False

    # 2. 7일 단위 패턴 만들기
    def generate_7days_patterns(flag):
        weekly_pattern = []
        
        # 일주일에 몇 번 운동할지
        if flag:
            num_exercise_days = np.random.randint(3, 8)
        else:
            num_exercise_days = np.random.randint(0, 4)

        # 운동하는 날과 하지 않는 날 구분
        exercise_days = np.random.choice(range(7), size=num_exercise_days, replace=False)
        for day in range(7):
            if day in exercise_days:
                if flag:
                    consumed_cal = 450 + round(np.random.normal(100, 75), 2)  # 운동량이 높은 날
                else:
                    consumed_cal = 250 + round(np.random.normal(100, 25), 2)  # 운동량이 낮은 날
            else:
                # 운동안할 때 기본 활동량
                consumed_cal = 100 + round(np.random.normal(100, 50), 2)
        weekly_pattern.append(consumed_cal)
        
        return weekly_pattern

    # 3. 140주 동안 패턴 생성 및 섞기
    def generate_and_shuffle_patterns(exercise_habit):
        # 전체 패턴 리스트
        all_patterns = []
        for _ in range(140):
            # 각 주간 패턴 생성
            weekly_pattern = generate_7days_patterns(exercise_habit)
            all_patterns.append(weekly_pattern)
        
        # 전체 패턴을 무작위로 섞기
        np.random.shuffle(all_patterns)
        # 길이가 980짜리 하나의 활동 칼로리 리스트로 펼치기
        flattened_patterns = [cal for weekly_pattern in all_patterns for cal in weekly_pattern]
        return flattened_patterns

    # 4. df에 반영하기
    consumed_cal_patterns = generate_and_shuffle_patterns(exercise_habit)
    df['consumed_cal'] = consumed_cal_patterns


    df['intake_cal'] = np.where(df['sex'] == 1,
        np.random.choice([1600, 2100, 2600, 3100, 3600],size=980,replace=True,p=[0.15, 0.3, 0.4, 0.1, 0.05]),
        np.random.choice([1300, 1700, 2100, 2500, 2900],size=980,replace=True,p=[0.15, 0.3, 0.4, 0.1, 0.05]))

    '''
    전체 몸무게 변화는 (먹었던 것 - (기초 + 운동) / 7700)
    먹었던 것 > (기초 + 운동) = 찌는게 당연
    '''

    # 1. 패턴 만들어 저장하는 함수
    def generate_weight_patterns():
        days = 0
        if df['consumed_cal'] >= 500:
            user_type = np.random.choice(['increase', 'decrease', 'maintain'], p=[0.1, 0.3, 0.6])
        else:
            user_type = np.random.choice(['increase', 'decrease', 'maintain'], p=[0.25, 0.25, 0.5])
            
        patterns = []
        min_day, max_day = 7, 60

        while days < 980:
            # 최소 7일 ~ 최대 60일까지의 수 중 하나 골라서 패턴 적용할 것 정하기
            pattern_length = np.random.randint(min_day, max_day)
            
            # 유저 타입에 따라 패턴 확률을 다르게 가져간다.
            if user_type == 'increase': # 증가형, 증가를 많이 가져가게
                pattern_type = np.random.choice(['increase', 'decrease', 'maintain'], p=[0.5, 0.2, 0.3])
            elif user_type == 'decrease': # 감소형, 감소를 많이 가져가게
                pattern_type = np.random.choice(['increase', 'decrease', 'maintain'], p=[0.2, 0.5, 0.3])
            elif user_type == 'maintain': # 유지형, 증가-감소를 가져가고, 유지가 더 많이
                pattern_type = np.random.choice(['increase', 'decrease', 'maintain'], p=[0.3, 0.3, 0.4])

            # 980일 이상으로 안만들기 위해 min 적용, 패턴 저장
            end = min(days+ pattern_length ,980)
            patterns.append((days, end, pattern_type))

            # days 최신화 (다음 번에 시작지점 정하기)
            days += pattern_length

        return user_type, patterns

    # 2. 패턴 적용 함수
    '''
    전체 DF의 df['consumed_cal']를 조정할 필요도 있음.
    -> 매번 운동을 하진 않으니까 이 사람이 일주일에 운동을 몇 번 하는 사람임을 알아서 (하루 500 칼로리 이상 소모한다 = 운동하는 사람)
    (150분 이상 = 헬스 40분 = 4번급 = 3~7일, 운동 안하는 사람들 = 0,1,2)
    '''
    def apply_patterns(df, user_type, patterns):
        
        # 최소, 최대 몸무게 변화를 지정해 전체 기간 중 결과적으로 얼마나 변화를 줄지
        if user_type == 'increase': # 전체 기간 동안 3키로 증가 ~ 10키로 증가
            min_variable = 3
            max_variable = 10
        elif user_type == 'decrease': # 전체 기간 동안 2키로 감소 ~ 5키로 감소
            min_variable = -5
            max_variable = -2
        else: # 거의 유지되는 정도 전체 기간동안 2키로 감소 ~ 2키로 증가
            min_variable = -2
            max_variable = 2

        # 전체 기간 동안의 목표를 설정
        aim = np.random.randint(min_variable, max_variable)

        # 제일 처음과 제일 끝의 차이는 결국 aim값에 맞춰져야한다.

        # 아래 패턴을 이용해서 aim으로 잘 가게금 유도하기 (근데 급하게 틀면 안됨)

        for start, end, pattern_type in patterns:
            days_in_pattern = end - start + 1


            # 길이가 길면, 몸무게 증가하는 양도 늘고, 길이가 줄면, 몸무게 감소 + 유지하는 양도 높아진다.
            if pattern_type == 'increase':
                # 증가 패턴: 하루에 0.1~0.5kg 증가
                df.loc[start:end, 'weight_change_effect'] += np.linspace(0, 0.5, end-start+1)
            elif pattern_type == 'decrease':
                # 감소 패턴: 하루에 0.1~0.5kg 감소
                df.loc[start:end, 'weight_change_effect'] -= np.linspace(0, 0.5, end-start+1)
            elif pattern_type == 'maintain':
                # 유지 패턴: weight_change_effect 추가 없음
                df.loc[start:end, 'weight_change_effect'] = 0  # 유지 패턴은 기본적인 fluctuation만 반영



        return df

    # 저장된 패턴을 불러와 적용
    user_type, patterns = generate_weight_patterns()
    # print(patterns)
    df = apply_patterns(df, user_type, patterns)

    '''
    유저 타입
    - 장기간 감소 (3~7키로)
    - 장기간 증가 (5~9키로)
    - 유지 (~2키로 내외)
    
    패턴 타입 (일주일 단위)
    - 증가 패턴 (일주일에 0.5키로 이상 지속 증가)
    - 감소 패턴 (일주일에 0.5키로 이상 지속 감소)
    - 유지 패턴 (일주일에 ~ 0.3 이내 Fluctuation)
    '''

    # 첫째날 하루의 몸무게 변화 = (먹었던 것 - (기초 대사 + 활동 대사)) / 7700
    df.loc[0, 'day_variable'] = round((df.loc[0, 'intake_cal'] - (df.loc[0, 'BMR'] + df.loc[0, 'consumed_cal'])) / 7700, 2)

    # 연산으로 얻어낸 몸무게 변화라고 가정
    df.loc[0, 'est_weight'] = df.loc[0, 'weight'] + df.loc[0, 'day_variable']

    # 시계열 반영 데이터 추가
    for i in range(1, len(df)):

        # 1. 기존 체중(weight)을 예상 체중으로 덮어 씌우기
        fluctuation = np.random.uniform(-0.2, 0.2)
        df.loc[i, 'weight'] = df.loc[i-1, 'est_weight'] + fluctuation

        # 2. 오늘 하루 BMR 반영
        equation = (10 * df.loc[i, 'weight']) + (6.25 * df.loc[i, 'height']) - (5 * df.loc[i, 'age'])
        df.loc[i, 'BMR'] = np.where(
            df.loc[i, 'sex'] == 1,
            equation + 5,  # 남성
            equation - 161  # 여성
        )

        # 3. 하루의 체중 변화량 = (섭취한 칼로리 - (BMR + 소모된 칼로리)) / 7700
        df.loc[i, 'day_variable'] = round((df.loc[i, 'intake_cal'] - (df.loc[i, 'BMR'] + df.loc[i, 'consumed_cal'])) / 7700, 2)

        # 4. 오늘의 est_weight 계산 (어제의 몸무게, 오늘의 몸무게의 평균 + 체중 변화량 + 패턴 변화량)
        df.loc[i, 'est_weight'] = (df.loc[i-1, 'weight'] + df.loc[i, 'weight']) / 2 + df.loc[i, 'day_variable'] + df.loc[i, 'weight_change_effect']

        # 5. 변화하는 BMI 계산해서 df에 넣기
        df['BMI'] = round(df['weight'] / ((df['height']/100) ** 2), 2)

    # 결과 확인
    # print(df.head(10))

    # csv로 저장하기
    csv_file = os.path.join('./outputs/csv', f'sample_{sample_id}.csv')
    df.to_csv(csv_file, index=False)
    print(f'{csv_file} Saved!')

    # 데이터프레임을 월별로 그룹화하여 평균 몸무게 계산
    df['date'] = pd.to_datetime(df['date'])  # 'date' 열을 datetime 타입으로 변환
    df_monthly = df.resample('ME', on='date').mean()  # 월 단위로 평균 계산

    # 필요한 데이터만 선택해서 확인
    df_monthly_weight = df_monthly[['est_weight']].copy()

    # 그래프 그리기 (남성은 파란색, 여성은 빨간색)
    plt.figure(figsize=(10, 6))
    # 남성일 경우 파란색, 여성일 경우 빨간색
    color = 'b' if df['sex'][0] == 1 else 'r'  # 성별에 따른 색상 선택
    marker = 'o' if df['sex'][0] == 1 else 'x'  # 성별에 따른 마커 선택
    min_weight = min(df['weight'])
    max_weight = max(df['weight'])

    plt.plot(df_monthly_weight.index, df_monthly_weight['est_weight'], marker=marker, linestyle='-', color=color)
    
    # 데이터 포인트 위에 수치 표시
    for x, y in zip(df_monthly_weight.index, df_monthly_weight['est_weight']):
        plt.text(x, y, f'{y:.1f}', ha='center', va='bottom', fontsize=8, color=color)

    # y축 범위를 성별에 맞춰 설정
    plt.ylim(min_weight, max_weight)

    # 그래프 제목과 축 레이블 설정
    plt.title('Monthly Average Weight Trend', fontsize=16)
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Average Weight (kg)', fontsize=12)

    # 그리드 추가
    plt.grid(True)

    # plt, png 저장
    png_file = os.path.join('./outputs/chart', f'sample_{sample_id}.png')
    plt.savefig(png_file)
    print(f'{png_file} Saved!')
    
    # plt.show()
    plt.close()