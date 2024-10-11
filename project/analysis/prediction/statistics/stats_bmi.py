import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'

# updated된 파일을 불러오기 (BMI 계산된 개인별 체형정보)
csv_path = './updated_output.csv'
result = pd.read_csv(csv_path)

# BMI 기준으로 두 그룹으로 나누기
over_bmi_23 = result[result['BMI'] >= 23].groupby(['age', 'sex']).size().unstack()  # BMI 23 이상

# 전체 인원에 대한 막대 그래프 (배경)
total_people_per_age_group = result.groupby(['age']).size()  # 전체 인원

# 그래프 그리기
fig, ax = plt.subplots(figsize=(10, 6))

# 나이대별로 전체 인원 막대 그래프 (배경)
total_people_per_age_group.plot(kind='bar', color='skyblue', ax=ax, label='전체 인원', alpha=0.3, width=0.6)

# BMI 23 이상 남성 및 여성 막대 그리기
width = 0.3  # 막대 너비 설정

# BMI 23 이상 남성 막대 (왼쪽)
if 1 in over_bmi_23.columns:
    ax.bar(over_bmi_23.index, over_bmi_23[1], width=-width, align='edge', color='navy', label='BMI 23 이상 남성')

# BMI 23 이상 여성 막대 (오른쪽)
if 2 in over_bmi_23.columns:
    ax.bar(over_bmi_23.index, over_bmi_23[2], width=width, align='edge', color='crimson', label='BMI 23 이상 여성')

# BMI 23 이상인 나이대별 총합을 점선 그래프로 표시
total_over_bmi_23 = over_bmi_23.sum(axis=1)
ax.plot(total_over_bmi_23.index, total_over_bmi_23.values, linestyle='-', color='black', marker='o', label='BMI 23 이상 (총합)')

# 그래프 제목, 라벨 설정
ax.set_title('나이대별 전체 인원과 BMI 23 이상 인원 분포')
ax.set_xlabel('나이대 그룹 (age group)')
ax.set_ylabel('인원수 (count)')
ax.set_xticklabels(total_people_per_age_group.index, rotation=45)

# 범례 추가
ax.legend()

# 그래프에 격자 추가
plt.grid(True)

# 레이아웃 최적화
plt.tight_layout()

# 그래프 표시
plt.show()