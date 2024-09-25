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
        'consumed_cal' : np.random.normal(person_data['consumed_cal'], 3, 980),
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

    # 기초 대사량 채워 넣기
    equation = (10 * df['weight']) + (6.25 * df['height']) - (5 * df['age'])
    df['BMR'] = np.where(
        df['sex'] == 1,
        # Mifflin St.Jeor 미핀 세인트 젤 공식 - 기초 대사량 BMR
        equation + 5, # 1 = 남성
        equation - 161 # 2 = 여성
    )

    '''
    전체 몸무게 변화는 (먹었던 것 - (기초 + 운동) / 7700)
    먹었던 것 > (기초 + 운동) = 찌는게 당연
    '''

    # 하루의 몸무게 변화 = (먹었던 것 - (기초 대사 + 활동 대사)) / 7700
    df['day_variable'] = round((df['intake_cal'] - (df['BMR'] + df['consumed_cal'])) / 7700, 2)

    # 연산으로 얻어낸 몸무게 변화라고 가정
    df.loc[0, 'est_weight'] = df.loc[0, 'weight'] + df.loc[0, 'day_variable']

    # 랜덤한 패턴 추가
    random_period_effect = np.random.normal(0, 0.05, size=980)  # 소량의 랜덤 노이즈
    seasonal_effect = np.random.uniform(-0.08, 0.03, size=980)  # 불규칙한 계절성 효과 추가
    random_effect_combined = random_period_effect + seasonal_effect

    # 체중 유지되는 구간을 추가 (10% 확률로 체중 변화 없음)
    df['weight_change_effect'] = np.where(np.random.rand(980) < 0.9, random_effect_combined, 0)

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


    # 이후 체중 변화 및 추정 체중을 weight에 반영
    for i in range(1, len(df)):
        # 하루 동안 체중이 주기적으로 체중을 쟀다고 했을 경우, 자연스러운 단기 변동 추가
        daily_fluctuation = np.random.uniform(-0.05, 0.05)
        # 기존 체중(weight) + 변화량에 단기 변동 반영
        df.loc[i, 'weight'] = df.loc[i-1, 'est_weight'] + daily_fluctuation

        # 몸무게 랜덤 패턴 반영한 오늘의 est_weight 계산
        df.loc[i, 'est_weight'] = (df.loc[i-1, 'weight'] + df.loc[i, 'weight']) / 2 + df.loc[i, 'day_variable'] + df.loc[i, 'weight_change_effect']

        # 나이에 따른 체중 변동 상한선 설정 (남성과 여성에 따라 다르게 설정)
        if df.loc[i, 'sex'] == 1:  # 남성
            df.loc[i, 'est_weight'] = np.clip(df.loc[i, 'est_weight'], 55, 95)  # 남성: 최소 55kg, 최대 95kg
        else:  # 여성
            df.loc[i, 'est_weight'] = np.clip(df.loc[i, 'est_weight'], 40, 80)  # 여성: 최소 40kg, 최대 80kg

        # BMI 계산해서 df에 넣기
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