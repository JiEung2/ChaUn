import os
import pandas as pd
import matplotlib.pyplot as plt

# 예측할 CSV 파일 경로 설정
csv_path = './outputs/test/csv'
csv_files = [f for f in os.listdir(csv_path) if f.endswith('.csv')]

for csv in csv_files:
    df = pd.read_csv(csv_path + '/' + csv)

    # 데이터프레임을 월별로 그룹화하여 평균 몸무게 계산
    df['date'] = pd.to_datetime(df['date'])  # 'date' 열을 datetime 타입으로 변환
    df_monthly = df.resample('ME', on='date').mean()  # 월 단위로 평균 계산

    # 필요한 데이터만 선택해서 확인
    df_monthly_weight = df_monthly[['weight']].copy()

    # 결측치 처리 (경고 해결)
    df_monthly_weight['weight'] = df_monthly_weight['weight'].ffill()  # 결측치가 있으면 앞의 값으로 채움

    # 그래프 그리기 (남성은 파란색, 여성은 빨간색)
    plt.figure(figsize=(10, 6))
    color = 'b' if df['sex'][0] == 1 else 'r'  # 성별에 따른 색상 선택
    marker = 'o' if df['sex'][0] == 1 else 'x'  # 성별에 따른 마커 선택

    name = csv[:-4]

    # 월 별 차이 계산
    df_monthly_weight['diff'] = df_monthly_weight['weight'].diff()  # 월별 차이 계산
    max_diff = df_monthly_weight['diff'].abs().max()  # 가장 큰 월별 차이 찾기

    # max와 min 값 계산
    max_weight = df_monthly_weight['weight'].max()
    min_weight = df_monthly_weight['weight'].min()

    # 그래프 그리기
    plt.plot(df_monthly_weight.index, df_monthly_weight['weight'], marker=marker, linestyle='-', color=color)

    # 데이터 포인트 위에 수치 표시
    for x, y in zip(df_monthly_weight.index, df_monthly_weight['weight']):
        plt.text(x, y, f'{y:.1f}', ha='center', va='bottom', fontsize=8, color=color)

    # max, min 값 표시
    max_index = df_monthly_weight['weight'].idxmax()
    min_index = df_monthly_weight['weight'].idxmin()
    
    if pd.notna(max_index) and pd.notna(min_index):  # max_index, min_index 값이 NaN이 아닐 때만
        plt.text(max_index, df_monthly_weight.loc[max_index, 'weight'],
                 f'Max: {max_weight:.1f}kg', ha='left', va='bottom', fontsize=10, color='green')
        plt.text(min_index, df_monthly_weight.loc[min_index, 'weight'],
                 f'Min: {min_weight:.1f}kg', ha='left', va='top', fontsize=10, color='red')

    # 월 별 최대 차이값 표시
    max_diff_index = df_monthly_weight['diff'].abs().idxmax()
    if pd.notna(max_diff_index):  # max_diff_index 값이 NaN이 아닐 때만
        plt.text(max_diff_index, df_monthly_weight.loc[max_diff_index, 'weight'],
                 f'Biggest diff: {max_diff:.1f}kg', ha='left', va='bottom', fontsize=10, color='purple')

    # y축 범위를 성별에 맞춰 설정
    plt.ylim(df['weight'].min(), df['weight'].max())

    # 그래프 제목과 축 레이블 설정
    plt.title('Monthly Average Weight Trend', fontsize=16)
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Average Weight (kg)', fontsize=12)

    # 그리드 추가
    plt.grid(True)

    # plt, png 저장
    png_file = os.path.join('./outputs/test/chart/details', f'{name}.png')
    plt.savefig(png_file)
    print(f'{name}.png Saved!')

    # plt.show()
    plt.close()
