
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

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

# 유저와 유사한 크루 7개 추천하는 함수
def recommend_crews(user_index, user_df, crew_df, top_n=7):
    user_value = user_df.iloc[user_index].values  # 추천을 받을 사용자의 데이터에서 필요한 정보만 가져오기
    print('user 정보')
    print(user_value)

    similarities = []
    for i in range(len(crew_df)):
        crew = crew_df.iloc[i].values
        crew_sports = crew_list['crew_list'][i]['sport']

        # 콘텐츠 기반 필터링
        content_similarity = 0
        if user['favorite_sports'] and crew_sports in user['favorite_sports']:
            content_similarity = 0.8  # 선호하는 운동일 경우, 최대치 보다 조금 낮은 정도의 추천도
        else:
            content_similarity = 0.5  # 선호하지 않는 운동인 경우, 그래도 이런 크루도 어떤가요식 추천해주는 편으로

        # 유저와 크루간 협업 필터링
        sim = pearson_similarity(user_value, crew)  # 유사도 계산

        # 협업 필터링과 콘텐츠 필터링의 가중치를 합산 (7:3)
        combined_similarity = (0.7 * sim) + (0.3 * content_similarity)
        similarities.append((i, combined_similarity))  # (크루 인덱스, 유사도) 저장
    
    # 유사도 내림차순으로 정렬 후 상위 top_n 크루 선택
    similarities.sort(key=lambda x: x[1], reverse=True)
    top_crews = [crew_df.iloc[i[0]] for i in similarities[:top_n]]
    
    return top_crews

# user_id를 입력 받아서 추천 시스템 실행
def get_user_index_by_id(user_id, user_data):
    # user_id가 있는 컬럼이 있다고 가정하고 해당 인덱스를 반환
    user_index = user_data[user_data['user_id'] == user_id].index[0]
    print(user_index)
    return user_index

'''
Dummy Data

- 현재 유저 정보 (유저 아이디, 관심 운동 목록)
- 전체 회원 목록 (유저 아이디, 5개 점수 평균) [나의 지표를 정규화 하기 위해서]
- 크루의 운동 종목과 5개 점수 평균 -> 협업 필터링

'''

user = {
    'user_id' : 14,
    'favorite_sports' : ['Soccer', 'Baseball'],
    'crew_list' : [1,3,10]
}

user_list = {
    'user_list' : [
        {
            'user_id' : 1,
            'age' : 22,
            'type' : 3, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1400,
            'score_2' : 1500,
            'score_3' : 1000
        },
        {
            'user_id' : 2,
            'age' : 25,
            'type' : 2, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1700,
            'score_2' : 1800,
            'score_3' : 800
        },
        {
            'user_id' : 3,
            'age' : 27,
            'type' : 6, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1000,
            'score_2' : 1800,
            'score_3' : 1700
        },
        {
            'user_id' : 4,
            'age' : 21,
            'type' : 2, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 900,
            'score_2' : 2000,
            'score_3' : 1800
        },
        {
            'user_id' : 5,
            'age' : 32,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1500,
            'score_2' : 900,
            'score_3' : 1200
        },
        {
            'user_id' : 6,
            'age' : 44,
            'type' : 6, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1800,
            'score_2' : 1200,
            'score_3' : 1400
        },
        {
            'user_id' : 7,
            'age' : 45,
            'type' : 4, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1800,
            'score_2' : 1200,
            'score_3' : 800
        },
        {
            'user_id' : 8,
            'age' : 33,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 800,
            'score_2' : 1200,
            'score_3' : 900
        },
        {
            'user_id' : 9,
            'age' : 26,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 1500,
            'score_3' : 1200
        },
        {
            'user_id' : 10,
            'age' : 30,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1400,
            'score_2' : 1500,
            'score_3' : 1000
        },
        {
            'user_id' : 11,
            'age' : 34,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1400,
            'score_2' : 1500,
            'score_3' : 1000
        },
        {
            'user_id' : 12,
            'age' : 76,
            'type' : 3, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 2100,
            'score_2' : 1800,
            'score_3' : 1800
        },
        {
            'user_id' : 13,
            'age' : 55,
            'type' : 6, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1800,
            'score_2' : 1200,
            'score_3' : 2100
        },
        {
            'user_id' : 14,
            'age' : 43,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 1800,
            'score_3' : 1500
        },
        {
            'user_id' : 15,
            'age' : 26,
            'type' : 8, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 900,
            'score_3' : 1500
        },
        {
            'user_id' : 16,
            'age' : 25,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 1500,
            'score_3' : 1500
        },
        {
            'user_id' : 17,
            'age' : 23,
            'type' : 10, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 800,
            'score_2' : 800,
            'score_3' : 900
        },
        {
            'user_id' : 18,
            'age' : 37,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1500,
            'score_2' : 1200,
            'score_3' : 1200
        }
    ]
}

crew_list = {
    'crew_list' : [
        {
            'crew_id': 1,
            'sport': 'Soccer',
            'age': 26,
            'type': 5,
            'score_1' : 1700,
            'score_2' : 1400,
            'score_3' : 1600
        },
        {
            'crew_id': 2,
            'sport': 'Running',
            'age': 33,
            'type': 4,
            'score_1' : 1800,
            'score_2' : 1800,
            'score_3' : 1000
        },
        {
            'crew_id': 3,
            'sport': 'Baseball',
            'age': 22,
            'type': 7,
            'score_1' : 1100,
            'score_2' : 1800,
            'score_3' : 1500
        },
        {
            'crew_id': 4,
            'sport': 'Soccer',
            'age': 28,
            'type': 8,
            'score_1' : 1200,
            'score_2' : 1100,
            'score_3' : 1100
        },
        {
            'crew_id': 5,
            'sport': 'Running',
            'age': 37,
            'type': 8,
            'score_1' : 1200,
            'score_2' : 1100,
            'score_3' : 1100
        },
        {
            'crew_id': 6,
            'sport': 'Soccer',
            'age': 35,
            'type': 3,
            'score_1' : 1800,
            'score_2' : 1900,
            'score_3' : 1500
        },
        {
            'crew_id': 7,
            'sport': 'Swimming',
            'age': 28,
            'type': 3,
            'score_1' : 1800,
            'score_2' : 1700,
            'score_3' : 1400
        },
        {
            'crew_id': 8,
            'sport': 'Running',
            'age': 30,
            'type': 9,
            'score_1' : 1100,
            'score_2' : 1300,
            'score_3' : 980
        },
        {
            'crew_id': 9,
            'sport': 'Soccer',
            'age': 31,
            'type': 3,
            'score_1' : 1600,
            'score_2' : 1900,
            'score_3' : 1150
        },
        {
            'crew_id': 10,
            'sport': 'Baseball',
            'age': 22,
            'type': 4,
            'score_1' : 1500,
            'score_2' : 1700,
            'score_3' : 1600
        },
    ]
}
'''
'user_id' : 14,
'age' : 43,
'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
'score_1' : 1200,
'score_2' : 1800,
'score_3' : 1500
sport 반영 안했을 때, 3, 10, 8, 9, 6, 4, 7
sport 반영 했을 때(7:3까지 적용), 3, 10, 9, 6, 8, 4, 1

만약 유저가 이미 크루에 들어가 있다면, 예외 처리
-> 가중치 계산 이후, append할 때 체크

'''

# Convert the user list to a pandas DataFrame
user_data = pd.DataFrame(user_list['user_list'])
crew_data = pd.DataFrame(crew_list['crew_list'])


# 데이터 정규화
scaler = MinMaxScaler() # 정규화 스케일러
user_data_scaled = scaler.fit_transform(user_data[['age', 'type', 'score_1', 'score_2', 'score_3']]) # 나이, 체형, 기본 점수, 활동 점수, 식습관 점수
crew_data_scaled = scaler.transform(crew_data[['age', 'type', 'score_1', 'score_2', 'score_3']])

# DataFrame생성 (Matrix)
user_df = pd.DataFrame(user_data_scaled, columns=['age', 'type', 'score_1', 'score_2', 'score_3'])
crew_df = pd.DataFrame(crew_data_scaled, columns=['age', 'type', 'score_1', 'score_2', 'score_3'])

### MAIN

# user_id를 입력 받고 추천 실행
user_id = user['user_id']  # user_id 입력
user_index = get_user_index_by_id(user_id, user_data)  # user_id에 해당하는 인덱스 찾기

recommended_crews = recommend_crews(user_index, user_df, crew_df)
print("추천된 크루 목록:")
print('-----')
for crew in recommended_crews:
    print(crew)
    print()
