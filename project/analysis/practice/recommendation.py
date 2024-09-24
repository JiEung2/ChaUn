
import numpy as np
import pandas as pd
import requests
from sklearn.preprocessing import MinMaxScaler

# 피어슨 유사도 계산 함수 - 협업 필터링
def pearson_similarity(user, crew):
    # 사용자-크루간 4개 지표 상관관계수 유사도 (나이, 기본 점수, 활동 점수, 식습관 점수)
    similarity = np.corrcoef(user[2:], crew[2:-1])[0, 1]  # age, score_1~3
    
    if user[0]:
        # m_type
        body_similarity =  1 - (abs(user[0] - crew[0]) * 0.5 + abs(user[0] - crew[1] * 0.65)) # 근육질 아닌 곳에 대한 가중치 늘리기(멀리) 
    else:
        body_similarity = 1 - (abs(user[1] - crew[0]) * 0.35 + abs(user[1] - crew[1]) * 0.5) # 근육질인 곳을 줄여 가까워지기

    # 체형 유사도: 전체 유사도 3:7
    combined_similarity = (0.7 * similarity) + (0.3 * body_similarity)
    return combined_similarity

# 메인 추천 함수
def recommend_crews(user_index, user_df, crew_df, top_n=6):
    user_value = user_df.iloc[user_index].values  # 추천을 받을 사용자의 데이터에서 필요한 정보만 가져오기

    similarities = []
    for i in range(len(crew_df)):
        # 크루에 속해 있지 않을 때 (새로운 크루만 추천 받게)
        if crew_list['crew_list'][i]['crew_id'] not in user['crew_list']:
            crew = crew_df.iloc[i].values
            crew_sports = crew_list['crew_list'][i]['exerciseName']

            # 콘텐츠 기반 필터링 (너무 편향되지 않게)
            content_similarity = 0.8 if crew_sports in user['favorite_sports'] else 0.5
            content_similarity *= 0.3

            # 유저와 크루간 협업 필터링 (return combined_sim)
            pearson_sim = pearson_similarity(user_value, crew)

            # 협업 필터링과 콘텐츠 필터링의 가중치를 합산 (7:3) # 컨텐츠 필터링 = 0.24, 0.15
            combined_similarity = (0.7 * pearson_sim) + content_similarity

            similarities.append((crew_list['crew_list'][i]['crew_id'], combined_similarity, pearson_sim, content_similarity))  # (crew_id, total_sim) 저장
    
    # 유사도 내림차순으로 정렬 후 상위 top_n 크루 선택
    similarities.sort(key=lambda x: x[1], reverse=True)
    # 유사도가 0.2 이상인 항목만 필터링 (= 적당히 유사해야 한다.)
    filtered_similarities = [item for item in similarities[:20] if item[1] >= 0.2]
    print('필터 된 목록 :', len(filtered_similarities))

    # 유사도 0.2 이상 상위 20개가 9개가 될 경우
    if len(filtered_similarities) >= 9 :
        top_crews = filtered_similarities[:top_n] # 상위 6개는 가져가자
        top_crews += list(np.random.choice(similarities[top_n:], 3, replace=False)) # 6개 제외, 상위 20개 중 3개는 뽑아가기
    else :
        top_crews = filtered_similarities
    
    np.random.shuffle(top_crews)
    return top_crews

# user_id를 입력 받아서 추천 시스템 실행
def get_user_index_by_id(user_id, user_data):
    # user_id가 있는 컬럼이 있다고 가정하고 해당 인덱스를 반환
    user_index = user_data[user_data['user_id'] == user_id].index[0]
    print(f'user_index : {user_index} || user_id : {user_id}')
    return user_index

'''
Dummy Data

- 현재 유저 정보 (유저 아이디, 관심 운동 목록)
- 전체 회원 목록 (유저 아이디, 5개 점수 평균) [나의 지표를 정규화 하기 위해서]
- 크루의 운동 종목과 5개 점수 평균 -> 협업 필터링
'''

user = {
    'user_id' : 14,
    'favorite_sports' : ['축구', '야구'],
    'crew_list' : [1,3,10]
}

user_list = {
    'user_list' : [
        {
            'user_id' : 1,
            'age' : 22,
            'm_type' : 3, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'type' : 0,
            'score_1' : 1400,
            'score_2' : 1500,
            'score_3' : 1000
        },
        {
            'user_id' : 2,
            'age' : 25,
            'm_type' : 2, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'type' : 0,
            'score_1' : 1700,
            'score_2' : 1800,
            'score_3' : 800
        },
        {
            'user_id' : 3,
            'age' : 27,
            'm_type' : 0, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'type' : 6,
            'score_1' : 1000,
            'score_2' : 1800,
            'score_3' : 1700
        },
        {
            'user_id' : 4,
            'age' : 21,
            'm_type' : 2,
            'type' : 0, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 900,
            'score_2' : 2000,
            'score_3' : 1800
        },
        {
            'user_id' : 5,
            'age' : 32,
            'm_type' : 0,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1500,
            'score_2' : 900,
            'score_3' : 1200
        },
        {
            'user_id' : 6,
            'age' : 44,
            'm_type' : 0,
            'type' : 6, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1800,
            'score_2' : 1200,
            'score_3' : 1400
        },
        {
            'user_id' : 7,
            'age' : 45,
            'm_type' : 4,
            'type' : 0, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1800,
            'score_2' : 1200,
            'score_3' : 800
        },
        {
            'user_id' : 8,
            'age' : 33,
            'm_type' : 0,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 800,
            'score_2' : 1200,
            'score_3' : 900
        },
        {
            'user_id' : 9,
            'age' : 26,
            'm_type' : 0,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 1500,
            'score_3' : 1200
        },
        {
            'user_id' : 10,
            'age' : 30,
            'm_type' : 0,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1400,
            'score_2' : 1500,
            'score_3' : 1000
        },
        {
            'user_id' : 11,
            'age' : 34,
            'm_type' : 0,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1400,
            'score_2' : 1500,
            'score_3' : 1000
        },
        {
            'user_id' : 12,
            'age' : 76,
            'm_type' : 3,
            'type' : 0, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 2100,
            'score_2' : 1800,
            'score_3' : 1800
        },
        {
            'user_id' : 13,
            'age' : 55,
            'm_type' : 0,
            'type' : 6, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1800,
            'score_2' : 1200,
            'score_3' : 2100
        },
        {
            'user_id' : 14,
            'age' : 43,
            'm_type' : 0,
            'type' : 7, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 1800,
            'score_3' : 1500
        },
        {
            'user_id' : 15,
            'age' : 26,
            'm_type' : 0,
            'type' : 8, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 900,
            'score_3' : 1500
        },
        {
            'user_id' : 16,
            'age' : 25,
            'm_type' : 0,
            'type' : 9, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 1200,
            'score_2' : 1500,
            'score_3' : 1500
        },
        {
            'user_id' : 17,
            'age' : 23,
            'm_type' : 0,
            'type' : 10, # body_type 10개 중 1,2,3,4 근육질, 5,6,7,8,9,10 정상
            'score_1' : 800,
            'score_2' : 800,
            'score_3' : 900
        },
        {
            'user_id' : 18,
            'age' : 37,
            'm_type' : 0,
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
            'exerciseName': '축구',
            'age': 26,
            'm_type': 3.8,
            'type': 4.6,
            'score_1' : 1700,
            'score_2' : 1400,
            'score_3' : 1600
        },
        {
            'crew_id': 2,
            'exerciseName': '러닝',
            'age': 33,
            'm_type': 2.8,
            'type': 3.6,
            'score_1' : 1800,
            'score_2' : 1800,
            'score_3' : 1000
        },
        {
            'crew_id': 3,
            'exerciseName': '야구',
            'age': 22,
            'm_type': 3.3,
            'type': 4.9,
            'score_1' : 1100,
            'score_2' : 1800,
            'score_3' : 1500
        },
        {
            'crew_id': 4,
            'exerciseName': '축구',
            'age': 28,
            'm_type': 3.8,
            'type': 5.2,
            'score_1' : 1200,
            'score_2' : 1100,
            'score_3' : 1100
        },
        {
            'crew_id': 5,
            'exerciseName': '러닝',
            'age': 37,
            'm_type': 3.98,
            'type': 5.45,
            'score_1' : 1200,
            'score_2' : 1100,
            'score_3' : 1100
        },
        {
            'crew_id': 6,
            'exerciseName': '축구',
            'age': 35,
            'm_type': 3.95,
            'type': 3.98,
            'score_1' : 1800,
            'score_2' : 1900,
            'score_3' : 1500
        },
        {
            'crew_id': 7,
            'exerciseName': '수영',
            'age': 28,
            'm_type': 3.2,
            'type': 4.78,
            'score_1' : 1800,
            'score_2' : 1700,
            'score_3' : 1400
        },
        {
            'crew_id': 8,
            'exerciseName': '러닝',
            'age': 30,
            'm_type': 3.89,
            'type': 4.3,
            'score_1' : 1100,
            'score_2' : 1300,
            'score_3' : 980
        },
        {
            'crew_id': 9,
            'exerciseName': '축구',
            'age': 31,
            'm_type': 3.78,
            'type': 4.2,
            'score_1' : 1600,
            'score_2' : 1900,
            'score_3' : 1150
        },
        {
            'crew_id': 10,
            'exerciseName': '야구',
            'age': 22,
            'm_type': 3.68,
            'type': 3.95,
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

### Java spring에 요청 이후, 데이터 조회
def get_user_data(user_id):
    response = requests.get(f"https://https://j11c106.p.ssafy.io/api/v1/users/{user_id}")
    my_data = response.json()  # 내 유저 정보
    return my_data

def get_user_list():
    response = requests.get(f"https://j11c106.p.ssafy.io/api/v1/users")
    user_data = response.json()  # 유저 전체 목록
    return user_data

def get_crew_list():
    response = requests.get(f"https://j11c106.p.ssafy.io/api/v1/crews")
    crew_data = response.json()  # 크루 전체 목록
    return crew_data


### MAIN
# Json 형식으로 받게 된다면, 이를 pandas로 처리
# user_data = get_user_list()
# crew_data = get_crew_list()

user_data = pd.DataFrame(user_list['user_list'])
crew_data = pd.DataFrame(crew_list['crew_list'])

# 데이터 정규화
scaler = MinMaxScaler() # 정규화 스케일러
user_data_scaled = scaler.fit_transform(user_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']]) # 나이, 체형, 기본 점수, 활동 점수, 식습관 점수
crew_data_scaled = scaler.transform(crew_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']])

# DataFrame생성 (Matrix)
user_df = pd.DataFrame(user_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
crew_df = pd.DataFrame(crew_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
crew_df['crew_id'] = crew_data['crew_id']
# print(crew_df)

# user = get_user_data()
user_id = user['user_id']  # user_id 입력
user_index = get_user_index_by_id(user_id, user_data)  # user_id에 해당하는 인덱스 찾기
recommended_crews = recommend_crews(user_index, user_df, crew_df)
print("[추천된 크루 목록]")
result = []
for crew in recommended_crews:
    result += [crew[0]]
    print(f'crew_id : {crew[0]}, total : {crew[1]} = {crew[2]} + {crew[3]}', end='\n')


# API GET (spring으로 보내기)
'''


'data' : result


'''