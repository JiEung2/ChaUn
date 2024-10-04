import numpy as np
import pandas as pd

total_count = 0

# dataset maker define
def generate_data(row_data, N):
    global total_count

    result_data = []
    
    for _, row in row_data.iterrows():
        age_group = row['age']
        # 조건: 40대까지는 더 반영하고, 50대 이상은 덜 반영
        if age_group in ['19-29', '30-39', '40-49']:
            row['percent'] *= 1.2  # 40대까지 가중치 추가
        elif age_group in ['50-59', '60-69', '70+']:
            row['percent'] *= 0.7  # 50대 이상은 가중치 감소

    # 전체 퍼센트를 받아서 그걸 총 인구라 생각
    male_population = row_data[row_data['sex']==1]['percent'].sum()
    female_population = row_data[row_data['sex']==2]['percent'].sum()

    # 이중 For문을 돌면서 성별 분류별 데이터 생성
    for _, row in row_data.iterrows():
        age_group = row['age']
        sex_group = row['sex']

        # 받은 n에 대해서 성별 나눠서 분포 만들기
        M = N//2

        # 그 나이대의 전체 비율 만들기
        if sex_group == 1:
            group_population = int(M * (row['percent']/male_population) + 0.7)
        else:
            group_population = int(M * (row['percent']/female_population) + 0.7)

        active_ratio = int((row['percent']/100) * group_population)
        # print(f'{sex_group}, {age_group}, {active_ratio}, {group_population}')
        total_count += group_population

        print(f'{age_group}, {sex_group}, {active_ratio}, {group_population - active_ratio}')
        # 데이터 생성 라인
        # 운동을 잘하는 사람 데이터
        for _ in range(active_ratio):
            user_data = {
                'age': age_group,
                'sex': sex_group,
                'consumed_cal' : 0,
                'intake_cal': 0,
                'BMI': 0,  # Placeholder for future calculation
                'fat': np.random.normal(18, 2),  # Fat percentage with some variation
                'muscle': np.random.normal(19, 2),  # Muscle percentage with some variation
                'BMR': 0  # Placeholder for future calculation
            }

            user_data['consumed_cal'] = 450 + round(np.random.normal(100, 75), 2)
            result_data.append(user_data)

        # 운동을 잘 안하는 사람 데이터
        for _ in range(active_ratio, group_population):
            user_data = {
                'age': age_group,
                'sex': sex_group,
                'consumed_cal' : 0,
                'intake_cal': 0,
                'BMI': 0,  # Placeholder for future calculation
                'fat': np.random.normal(18, 2),  # Fat percentage with some variation
                'muscle': np.random.normal(19, 2),  # Muscle percentage with some variation
                'BMR': 0  # Placeholder for future calculation
            }

            user_data['consumed_cal'] = 100 + round(np.random.normal(100, 50), 2) # 운동량 적음
            result_data.append(user_data)

    return pd.DataFrame(result_data)

file_path = './korean_health_stats/exercise_total.csv'
data = pd.read_csv(file_path)

# 샘플 데이터 생성 (200000 -> 200002개 생성)
# n = 200000

# 테스트 데이터
n = 1000

# 데이터 출력 이후, 나이와 성별로 정렬
result = generate_data(data, n)
result = result.sort_values(by=['age', 'sex'])

print(f'{total_count}개의 개인 DB가 만들어졌습니다!')

result.to_csv('./korean_health_stats/output.csv', index=False)