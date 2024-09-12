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
active_only = result[result['consumed_cal'] > 100].groupby(['age', 'sex']).size().unstack()

# 전체 인원에 대한 막대 그래프
plt.figure(figsize=(10, 6))
grouped_data.sum(axis=1).plot(kind='bar', color='lightblue', label='총 인원수')

# 운동 잘하는 사람에 대한 선 그래프
active_only.sum(axis=1).plot(kind='line', color='orange', marker='o', label='운동하는 사람 수')

# 그래프 꾸미기
plt.title('나이대별 총 인원과 운동하는 사람 수')
plt.xlabel('나이대 그룹 (age group)')
plt.ylabel('인원수 (count)')
plt.xticks(rotation=45)
plt.legend()
plt.grid(True)
plt.tight_layout()

plt.show()