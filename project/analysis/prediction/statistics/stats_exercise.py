import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

plt.rcParams['font.family'] = 'Malgun Gothic'

csv_path = './output.csv'
result = pd.read_csv(csv_path)

# 나이대와 성별 기준으로 그룹화하여 개수 세기
grouped_data = result.groupby(['age', 'sex']).size().unstack()

# 나이대별로 운동 잘하는 사람만 필터링
active_only = result[result['consumed_cal'] >= 250].groupby(['age', 'sex']).size().unstack()

# 전체 인원에 대한 남자, 여자 막대 그래프
fig, ax = plt.subplots(figsize=(10, 6))  # Axes 객체 생성

# 전체 인원에 대한 배경 막대 그래프 (남자 + 여자 합계)
grouped_data.sum(axis=1).plot(kind='bar', color='skyblue', ax=ax, label='총 인원수', width=0.6)

# 막대 그래프를 왼쪽(남성), 오른쪽(여성)으로 분리해서 그리기
width = 0.3  # 막대 너비 설정

# 운동하는 남성 막대 (왼쪽)
ax.bar(grouped_data.index, active_only[1], width=-width, align='edge', color='navy', label='운동하는 남자')

# 운동하는 여성 막대 (오른쪽)
ax.bar(grouped_data.index, active_only[2], width=width, align='edge', color='crimson', label='운동하는 여자')

# 운동하는 사람의 수를 점선으로 표시 (남성)
ax.plot(grouped_data.index, active_only[1] + active_only[2], color='black', marker='o', linestyle='-', label='운동하는 인원수')

# 그래프 꾸미기
ax.set_title('나이대별 총 인원과 운동하는 남자/여자 수')
ax.set_xlabel('나이대 그룹 (age group)')
ax.set_ylabel('인원수 (count)')
ax.set_xticklabels(grouped_data.index, rotation=45)

# 범례 설정
ax.legend()

plt.grid(True)
plt.tight_layout()

plt.show()