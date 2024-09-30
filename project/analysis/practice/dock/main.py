# 웹처리
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Uvicorn 라이브러리
import uvicorn
from typing import List
from pydantic import BaseModel
from bson import ObjectId

# DB timezone 설정 라이브러리
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

# MongoDB 관련 라이브러리
import pymongo
from pymongo import MongoClient

# 데이터 처리 및 예측, 추천 라이브러리
import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, Dense, Dropout, Input
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import MinMaxScaler

# APP 정의
app = FastAPI()

# 대한민국 시간대 설정
kst = ZoneInfo("Asia/Seoul")

# DB에서 불러온 UTC 시간을 KST로 변환
def convert_utc_to_kst(utc_time):
    return utc_time.replace(tzinfo=ZoneInfo("UTC")).astimezone(kst)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # EC2 주소 + 포트로 바꾸기
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoClient 생성
try:
    client = MongoClient("mongodb://j11c106.p.ssafy.io:31061", serverSelectionTimeoutMS = 5000) # EC2 주소 + 포트로 바꾸기
    # 서버 상태 확인
    server_status = client.admin.command("ping")
    db = client['Health']
    predict_basic = db['predict_basic']
    predict_extra = db['predict_extra']
    crew_recommend = db['crew_recommend']
    print("MongoDB 서버에 성공적으로 연결되었습니다:", server_status)
except pymongo.errors.ServerSelectionTimeoutError as e:
    print("MongoDB에 연결할 수 없습니다:", e)

### 모델 정의 부분 ###
class ExerciseData(BaseModel):
    sex: int
    age: int
    bmi: float
    weight: float
    calories: float

class UserExerciseRequest(BaseModel):
    user_id: int
    exercise_data: List[ExerciseData]  # 7일간의 운동 정보 리스트

'''
dummy time series input
{
  "user_id": 2,
  "exercise_data": [
    { "sex": 1, "age": 32, "bmi": 24.21, "weight": 75.0, "calories": 300.55997 },
    { "sex": 1, "age": 32, "bmi": 24.29, "weight": 75.23815, "calories": 295.3654 },
    { "sex": 1, "age": 32, "bmi": 23.92, "weight": 74.86, "calories": 312.97836 },
    { "sex": 1, "age": 32, "bmi": 24.10, "weight": 74.94, "calories": 312.97836 },
    { "sex": 1, "age": 32, "bmi": 24.09, "weight": 74.93, "calories": 312.97836 },
    { "sex": 1, "age": 32, "bmi": 24.14, "weight": 74.95, "calories": 312.97836 },
    { "sex": 1, "age": 32, "bmi": 24.27, "weight": 75.22, "calories": 312.97836 }
  ]
}
'''

### AI 회귀 모델 처리 ###
# 모델 구조 정의 - 기존과 똑같은 구조를 불러오기
def build_model(input_shape, forecast_steps):
    model = Sequential()
    model.add(Input(shape=input_shape))  # input_shape = (timesteps, features)
    model.add(GRU(units=64, return_sequences=False)) 
    model.add(Dropout(0.3)) 
    model.add(Dense(64, activation='relu')) 
    model.add(Dense(units=forecast_steps))  # 예측할 시점 수에 따라 output 설정
    return model

# 모델에 따른 가중치 불러오기
def load_model_weights(model, weights_path):
    model.load_weights(weights_path)
    return model

# 예측 수행
def make_predictions(model, X_test):
    try:
        predictions = model.predict(X_test)
    except Exception as e:
        raise HTTPException(status_code=500, detail = f'Model Prediciton : {e}')
    
    return predictions

# 모델 로드 함수
@app.on_event("startup")
def load_model_startup():
    global model
    timesteps = 7
    features = 5 # [sex, age, BMI, weight, comsumed_cal] = 5 features
    forecast_steps = 90 # 최대 90일까지의 예측을 진행
    input_shape = (timesteps, features)

    model = build_model(input_shape, forecast_steps)
    model = load_model_weights(model, "./modelv1.weights.h5")

# 모델 수행 이후 처리 함수
def model_predict(data_test):
    predictions = make_predictions(model, data_test) # 7일 입력 X -> 그 다음 1일 부터 ~ 90일 앞까지 값을 Y
    # 30일, 90일 기록을 return 시키기
    return round(float(predictions[0][29]), 2), round(float(predictions[0][89]), 2)

# object id convergence
def convert_objectid(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, ObjectId):
                data[key] = str(value)
            elif isinstance(value, list):
                data[key] = [convert_objectid(item) for item in value]
            elif isinstance(value, dict):
                data[key] = convert_objectid(value)
    elif isinstance(data, list):    
        data = [convert_objectid(item) for item in data]
    return data

# 루트 라우터
@app.get("/")
def root():
    return {"message": "MongoDB와 FastAPI 연결 성공"}

# API :: 종합 체중 예측 => spring에서 스케쥴러를 통한 예측 후 MongoDB 저장
@app.post("/api/v1/users/{user_id}/body/prediction")
async def predict(user_id: int, request: UserExerciseRequest):
    # 1. user_id를 URL로부터 받는다.
    user_id = request.user_id # user_id
    exercise_data = request.exercise_data # exercise_data

    '''
    exercise_data는 1 ~ 7의 길이 데이터가 들어올 예정
    7 - (현재 길이)로 길이를 정해서 더미 길이를 추가해야 함
        - 운동을 하지 않았으니까, 체중을 키우는 방식으로 
    '''

    # 입력 데이터를 numpy 배열로 변환
    X_test = np.array([[data.sex, data.age, data.bmi, data.weight, data.calories] for data in exercise_data]) # (7, 5)
    X_test = X_test.reshape(1, 7, 5)  # 한 차원 늘려서, 하나의 입력으로, 7일간의 운동 정보(5개의 feature)를 timesteps=7, features=5

    # model.predict을 통해 예측한 결과를 만들어서 DB에 저장하고, user_id랑 예측 값 보내주기
    pred_30_d, pred_90_d = model_predict(X_test)


    # MongoDB에 운동 기록을 저장할 때 UTC 시간으로 저장
    new_prediction = {
        "user_id": user_id,
        "p30": pred_30_d,
        "p90": pred_90_d,
        "created_at": convert_utc_to_kst(datetime.utcnow())  # KST 시간으로 저장
    }

    # 종합 예측 MongoDB에 저장
    predict_basic.insert_one(new_prediction)
    new_prediction = convert_objectid(new_prediction)  # ObjectId 변환

# 1-1. row_user_list / Spring 데이터 조회
def get_user_list():
    response = requests.get(f"https://j11c106.p.ssafy.io/api/v1/users")
    # response = requests.get(f"https://health_backend/api/v1/users")
    user_data = response.json()  # 유저 전체 목록
    print(user_data)
    return user_data

# 1-2. row_crew_list / Spring 데이터 조회
def get_crew_list():
    response = requests.get(f"https://j11c106.p.ssafy.io/api/v1/crews")
    crew_data = response.json()  # 크루 전체 목록
    print(crew_data)
    return crew_data

### 크루 추천에 필요한 함수들
# 3. user_id를 입력 받아서 추천 시스템 실행
def get_user_index_by_id(user_id, user_data):
    # user_id가 있는 컬럼이 있다고 가정하고 해당 인덱스를 반환
    user_index = user_data[user_data['user_id'] == user_id].index[0]
    print(f'user_index : {user_index} || user_id : {user_id}')
    return user_index

# 4.1 user / Spring 데이터 조회
def get_user_data(user_id):
    response = requests.get(f"https://j11c106.p.ssafy.io/api/v1/users/{user_id}")
    my_data = response.json()  # 내 유저 정보
    print(my_data)
    return my_data

# 4-2. 피어슨 유사도 계산 함수 - 협업 필터링
def pearson_similarity(user, crew):
    # 사용자-크루간 4개 지표 상관관계수 유사도 (나이, 기본 점수, 활동 점수, 식습관 점수)
    similarity = np.nan_to_num(np.corrcoef(user[2:], crew[2:-1])[0, 1]) # age, score_1~3

    if user[0]:
        # m_type
        body_similarity =  1 - (abs(user[0] - crew[0]) * 0.5 + abs(user[0] - crew[1] * 0.65)) # 근육질 아닌 곳에 대한 가중치 늘리기(멀리) 
    else:
        body_similarity = 1 - (abs(user[1] - crew[0]) * 0.35 + abs(user[1] - crew[1]) * 0.5) # 근육질인 곳을 줄여 가까워지기

    # 체형 유사도: 전체 유사도 3:7
    combined_similarity = (0.7 * similarity) + (0.3 * body_similarity)
    return combined_similarity

# 4. 메인 추천 함수
def recommend_crews(user_index, user_id, user_df, crew_df, crew_list, top_n=6):
    # 4-1.
    user = get_user_data(user_id)
    row_crew_data = crew_list
    user_value = user_df.iloc[user_index].values  # 추천을 받을 사용자의 데이터에서 필요한 정보만 가져오기

    similarities = []
    for i in range(len(crew_df)):
        # 크루에 속해 있지 않을 때 (새로운 크루만 추천 받게)
        if row_crew_data['crew_list'][i]['crew_id'] not in user['crew_list']:
            crew = crew_df.iloc[i].values
            crew_sports = row_crew_data['crew_list'][i]['exerciseName']

            # 콘텐츠 기반 필터링 (너무 편향되지 않게)
            content_similarity = 0.8 if crew_sports in user['favorite_sports'] else 0.5
            content_similarity *= 0.3

            # 4-2. 유저와 크루간 협업 필터링 (return combined_sim)
            pearson_sim = pearson_similarity(user_value, crew)

            # 협업 필터링과 콘텐츠 필터링의 가중치를 합산 (7:3) # 컨텐츠 필터링 = 0.24, 0.15
            combined_similarity = (0.7 * pearson_sim) + content_similarity

            similarities.append((row_crew_data['crew_list'][i]['crew_id'], combined_similarity, pearson_sim, content_similarity))  # (crew_id, total_sim) 저장
    
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

# API :: 크루 추천 (동기 처리)
@app.get("/api/v1/users/{user_id}/crew-recommendation/")
def crew_recommendation(user_id : int):
    # 1. java에서 데이터 불러오기
    row_user_data = get_user_list()
    row_crew_data = get_crew_list()

    # 2. 전처리 : JSON -> DF (각 요청별로 변환)
    user_data = pd.DataFrame(row_user_data)
    crew_data = pd.DataFrame(row_crew_data)

    # 데이터 정규화
    scaler = MinMaxScaler() # 정규화 스케일러
    user_data_scaled = scaler.fit_transform(user_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']]) # 나이, 체형, 기본 점수, 활동 점수, 식습관 점수
    crew_data_scaled = scaler.transform(crew_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']])

    # DataFrame생성 (Matrix)
    user_df = pd.DataFrame(user_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
    crew_df = pd.DataFrame(crew_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
    crew_df['crew_id'] = crew_data['crew_id']
    # print(crew_df)

    # 3. user_index 찾아서 추천 알고리즘 돌리기
    user_index = get_user_index_by_id(user_id, user_data)  # user_id에 해당하는 인덱스 찾기
    recommended_crews = recommend_crews(user_index, user_id, user_df, crew_df, row_crew_data)
    # 4. 저장할 정보 리스트로 만들기
    result = {
        'user_id' : user_id,
        'crew_recommended' : [{'crew_id': crew[0], 'similarity': crew[1]} for crew in recommended_crews]
    }

    # 5. response.data 내보내기
    try:
        response = requests.post(f'https://j11c106.p.ssafy.io/api/v1/users/{user_id}/crew-recommendation', json = result)
        response.raise_for_status()
        if response.status_code == 200:
            print("200 OK")
        else:
            print('E :', response.status_code)

    except requests.exceptions.RequestException as e:
        print("Failed :", e)

# CLI 실행을 main 함수에서 실행
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)