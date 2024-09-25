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

    # 운동을 안 하는 날도 존재, 20% 확률로 설정, 80에서 180 칼로리는 기본 활동으로 소모한다 가정
    no_exercise_days = np.random.choice([0, 1], size=980, p=[0.2, 0.8])
    df['consumed_cal'] = np.where(no_exercise_days == 0, np.random.normal(250, 15), df['consumed_cal'])
    df['intake_cal'] = np.where(df['sex'] == 1,
        np.random.choice([1600, 2100, 2600, 3100, 3600],size=980,replace=True,p=[0.15, 0.3, 0.4, 0.1, 0.05]),
        np.random.choice([1300, 1700, 2100, 2500, 2900],size=980,replace=True,p=[0.15, 0.3, 0.4, 0.1, 0.05]))

    '''
    전체 몸무게 변화는 (먹었던 것 - (기초 + 운동) / 7700)
    먹었던 것 > (기초 + 운동) = 찌는게 당연
    '''

    # 패턴 만들어 저장하는 함수
    def generate_weight_patterns():
        days = 0
        patterns = []
        min_day, max_day = 7, 60

        while days < 980:
            # 최소 7일 ~ 최대 60일까지의 수 중 하나 골라서 패턴 적용할 것 정하기
            pattern_length = np.random.randint(min_day, max_day)

            pattern_type = np.random.choice(['increase', 'decrease', 'maintain'])
            
            # 980일 이상으로 안만들기 위해 min 적용, 패턴 저장
            end = min(days+ pattern_length ,980)
            patterns.append((days, end, pattern_type))

            # days 최신화 (다음 번에 시작지점 정하기)
            days += pattern_length

        return patterns

    # 패턴 적용 함수
    '''
    전체 DF의 df['consumed_cal']를 조정할 필요도 있음.
    -> 매번 운동을 하진 않으니까 이 사람이 일주일에 운동을 몇 번 하는 사람임을 알아서 (하루 500 칼로리 이상 소모한다 = 운동하는 사람)
    (150분 이상 = 헬스 40분 = 4번급 = 3~7일, 운동 안하는 사람들 = 0,1,2)
    '''
    def apply_patterns(df, patterns):
        for start, end, pattern_type in patterns:
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

    # 패턴 저장이후, 적용
    patterns = generate_weight_patterns()
    # 패턴 확인
    print(patterns)
    df = apply_patterns(df, patterns)

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


    # 증가하는 패턴



    # 감소하는 패턴



    # 유지하는 패턴


    # 첫 번째 날의 BMR 계산 (Mifflin St. Jeor 공식)
    equation = (10 * df.loc[0, 'weight']) + (6.25 * df.loc[0, 'height']) - (5 * df.loc[0, 'age'])
    df.loc[0, 'BMR'] = np.where(
        df.loc[0, 'sex'] == 1,
        equation + 5,  # 남성
        equation - 161  # 여성
    )

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
    min_weight = 55 if df['sex'][0] == 1 else 40
    max_weight = 95 if df['sex'][0] == 1 else 80

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