import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os

# 1인 980일에 대한 데이터 만들기 (22년 1월 1일부터 24년 9월 6일까지의 기록)
# Daily Dummy를 받는다고 가정...
# np.random.normal -> loc, scale, size => centre, standard deviation, size = (int, tuple, etc...)
for sample_id in range(1, 11):
    data = {
        'date' : pd.date_range(start='2022-01-01', periods=980, freq='D'),
        'user_id': sample_id,
        'sex' : np.random.choice([1, 2]),
        'age' : 25,
        'weight' : 0,
        'height' : 0,
        'BMI' : 0, # 초기 설정값
        'fat' : 18,
        'muscle' : 19,
        'consumed_cal' : 150 + np.random.normal(150, 9, 980),
        'intake_cal' : np.random.choice([1500, 1800, 2400, 3000, 3300],
                                        size=980,
                                        replace=True,
                                        p=[0.2, 0.25, 0.4, 0.1, 0.05]),
        'day_variable': 0,
        'BMR': 0,
        'est_weight': np.zeros(980)
    }
    df = pd.DataFrame(data)

    # 성별에 따른 평균 몸무게 넣기 (아직 추정)
    df['weight'] = np.where(
        df['sex'] == 1,
        np.random.uniform(60, 95), # 1 = 남성
        np.random.uniform(40, 75) # 2 = 여성
    )

    df['height'] = np.where(
        df['sex'] == 1,
        np.random.uniform(160, 194), # 1 = 남성
        np.random.uniform(140, 174) # 2 = 여성
    )

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

    # 이후 체중 변화 및 추정 체중을 weight에 반영
    for i in range(1, len(df)):
        # 기존 체중(weight)과 칼로리 변화를 반영한 체중 변화 공식
        df.loc[i, 'weight'] = df.loc[i-1, 'est_weight'] + np.random.uniform(-0.5, 0.5)
        
        # 오늘의 est_weight 계산
        df.loc[i, 'est_weight'] = (df.loc[i-1, 'weight'] + df.loc[i, 'weight']) / 2 + df.loc[i, 'day_variable'] + np.random.uniform(-0.2 ,0.1)

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

    plt.plot(df_monthly_weight.index, df_monthly_weight['est_weight'], marker=marker, linestyle='-', color=color)
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