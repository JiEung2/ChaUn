
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# 데이터 불러오기
user_data = pd.read_csv('user_data.csv')  # 사용자 데이터 = 사용자ID, 나이, 체형, 점수 3종류
crew_data = pd.read_csv('crew_data.csv')  # 크루 데이터 = 나이, 체형, 점수 3종류

# 데이터 정규화
scaler = MinMaxScaler() # 정규화 스케일러
user_data_scaled = scaler.fit_transform(user_data[['age', 'body_type', 'base_score', 'activity_score', 'diet_score']]) # 나이, 체형, 기본 점수, 활동 점수, 식습관 점수
crew_data_scaled = scaler.transform(crew_data[['age', 'body_type', 'base_score', 'activity_score', 'diet_score']])

# DataFrame생성 (Matrix)
user_df = pd.DataFrame(user_data_scaled, columns=['age', 'body_type', 'base_score', 'activity_score', 'diet_score'])
crew_df = pd.DataFrame(crew_data_scaled, columns=['age', 'body_type', 'base_score', 'activity_score', 'diet_score'])

# 나보다 비슷하거나 나보다 더 건강할 경우 유사도 높게 설정
def body_type_similarity(user_body_type, crew_body_type):
    # 1 = 저체중, 2 = 마름, 3 = 보기 좋은, 4 = 정상, 5 = 과체중, 6 = 비만
    # 3 ~ 4 를 권장하게 만들고 싶다.
    # 1,2 인 사람들은 3,4로 만들고, 5,6인 사람들은 3,4를 추천하는게 필요하다.
    # 수정중...
    if user_body_type >= crew_body_type:
        if 2 <= crew_body_type <= 4:
            return 1 - abs(user_body_type - crew_body_type)
        else:
            return 0.5 - abs(user_body_type - crew_body_type)
    else:
        return 0.5 - abs(user_body_type - crew_body_type)

# 피어슨 상관계수 유사도 계산을 통해 가까운 거리 판단
def pearson_similarity(user, crew):
    # 사용자와 크루의 각 매트릭스 비교 (나이, 활동 점수, 식습관 점수)
    similarity = np.corrcoef(user[:-1], crew[:-1])[0, 1]  # 체형(body_type)을 제외한 유사도
    body_similarity = body_type_similarity(user[-1], crew[-1])  # 체형 유사도 계산
    # 체형 가중치를 높이기 위해 기존 유사도와 체형 유사도를 결합
    combined_similarity = (0.7 * similarity) + (0.3 * body_similarity)
    return combined_similarity

# 유저와 가장 유사한 크루 9개를 추천하는 함수
def recommend_crews(user_index, user_df, crew_df, top_n=9):
    user = user_df.iloc[user_index].values  # 추천을 받을 사용자의 데이터에서 필요한 정보만 가져오기
    print('user 정보')
    print(user)

    similarities = []
    for i in range(len(crew_df)):
        crew = crew_df.iloc[i].values
        sim = pearson_similarity(user, crew)  # 유사도 계산
        similarities.append((i, sim))  # (크루 인덱스, 유사도) 저장
    
    # 유사도 내림차순으로 정렬 후 상위 top_n 크루 선택
    similarities.sort(key=lambda x: x[1], reverse=True)
    top_crews = [crew_df.iloc[i[0]] for i in similarities[:top_n]]
    
    return top_crews

# user_id를 입력 받아서 추천 시스템 실행
def get_user_index_by_id(user_id, user_data):
    # user_id가 있는 컬럼이 있다고 가정하고 해당 인덱스를 반환
    user_index = user_data[user_data['user_id'] == user_id].index[0]
    return user_index

# user_id를 입력 받고 추천 실행
user_id = int(input("user_id를 입력하세요: "))  # user_id 입력
user_index = get_user_index_by_id(user_id, user_data)  # user_id에 해당하는 인덱스 찾기

recommended_crews = recommend_crews(user_index, user_df, crew_df)
print("추천된 크루 목록:")
print('-----')
for crew in recommended_crews:
    print(crew)
    print()
