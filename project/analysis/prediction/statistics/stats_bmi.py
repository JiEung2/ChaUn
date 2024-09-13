import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'

# updated_output.csv 파일을 읽어옵니다.
csv_path = './updated_output.csv'
result = pd.read_csv(csv_path)

# BMI 기준으로 두 그룹으로 나누기
under_bmi_23 = result[result['BMI'] < 23].groupby(['age', 'sex']).size().unstack()  # BMI 23 미만
over_bmi_23 = result[result['BMI'] >= 23].groupby(['age', 'sex']).size().unstack()  # BMI 23 이상

# 전체 인원에 대한 남자, 여자 막대 그래프
fig, ax = plt.subplots(figsize=(10, 6))

# 나이대별로 BMI 23 미만인 사람들의 총 인원
under_bmi_23.sum(axis=1).plot(kind='bar', color='lightgreen', ax=ax, label='BMI 23 미만', width=0.6)

# 막대 그래프를 왼쪽(남성), 오른쪽(여성)으로 분리해서 그리기
width = 0.3  # 막대 너비 설정

# BMI 23 미만인 남성 막대 (왼쪽)
if 1 in under_bmi_23.columns:
    ax.bar(under_bmi_23.index, under_bmi_23[1], width=-width, align='edge', color='green', label='BMI 23 미만 남성')

# BMI 23 미만인 여성 막대 (오른쪽)
if 2 in under_bmi_23.columns:
    ax.bar(under_bmi_23.index, under_bmi_23[2], width=width, align='edge', color='limegreen', label='BMI 23 미만 여성')

# BMI 23 이상인 사람들의 막대 (남성 + 여성) - 나이대별로 표시
if 1 in over_bmi_23.columns and 2 in over_bmi_23.columns:
    over_bmi_23.sum(axis=1).plot(kind='bar', color='lightcoral', ax=ax, label='BMI 23 이상', alpha=0.5, width=0.6)

# BMI 23 이상인 남성 막대 (왼쪽)
if 1 in over_bmi_23.columns:
    ax.bar(over_bmi_23.index, over_bmi_23[1], width=-width, align='edge', color='red', label='BMI 23 이상 남성')

# BMI 23 이상인 여성 막대 (오른쪽)
if 2 in over_bmi_23.columns:
    ax.bar(over_bmi_23.index, over_bmi_23[2], width=width, align='edge', color='darkred', label='BMI 23 이상 여성')

# 그래프 제목, 라벨 설정
ax.set_title('나이대별 BMI 23 미만과 23 이상 인원 분포')
ax.set_xlabel('나이대 그룹 (age group)')
ax.set_ylabel('인원수 (count)')
ax.set_xticklabels(under_bmi_23.index, rotation=45)

# 범례 추가
ax.legend()

# 그래프에 격자 추가
plt.grid(True)

# 레이아웃 최적화
plt.tight_layout()

# 그래프 표시
plt.show()
