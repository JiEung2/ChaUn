# 웹처리
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager

# Uvicorn 라이브러리
import uvicorn
from typing import List
from pydantic import BaseModel
from bson import ObjectId

# DB timezone 설정 라이브러리
from datetime import datetime

# MongoDB 관련 라이브러리
import pymongo
import os
from dotenv import load_dotenv
from pymongo import MongoClient

# 데이터 처리 및 예측, 추천 라이브러리
import pandas as pd
import numpy as np
import joblib
from copy import deepcopy as dp
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder

# .env 파일의 환경 변수를 로드
load_dotenv()

# MongoDB 인증 정보 환경 변수에서 가져오기
MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")

# MongoClient 생성
try:
    # 테스트 용
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS = 5000) # EC2 주소 + 포트로 바꾸기
    # 실제 서버 상태 확인
    # client = MongoClient(f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@j11c106.p.ssafy.io:31061", serverSelectionTimeoutMS = 5000) # EC2 주소 + 포트로 바꾸기
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

class ExerciseDetail(BaseModel):
    exercise_id: int
    duration: int
    count: int

class UserExerciseRequest(BaseModel):
    exercise_detail: ExerciseDetail = None # 객체 형태
    exercise_data: List[ExerciseData]  # 7일간의 운동 정보 리스트
    extra_exercise_data: List[ExerciseData] = None

### AI 회귀 모델 처리 ###
# 모델 구조 정의 - 기존과 똑같은 구조를 불러오기
def build_model(input_shape, forecast_steps):
    model = Sequential()
    model.add(Input(shape=input_shape))  # input_shape = (timesteps, features)
    model.add(LSTM(units=16, dropout=0.3, return_sequences=True)) 
    model.add(LSTM(units=16, dropout=0.3)) 
    model.add(Dense(32)) 
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
@asynccontextmanager
async def load_model_startup(app: FastAPI):
    global model, scaler, encoder

    timesteps = 7
    features = 6 # [sex_1, sex_2, age, BMI, weight, comsumed_cal] = 6 features
    forecast_steps = 90 # 최대 90일까지의 예측을 진행
    input_shape = (timesteps, features)

    model = build_model(input_shape, forecast_steps)
    model = load_model_weights(model, "./models/modelv2.weights.h5")

    print(model)
    # Load the saved MinMaxScaler and OneHotEncoder
    scaler = joblib.load('./models/minmax_scaler_v2.pkl')
    encoder = joblib.load('./models/onehot_encoder_v2.pkl')

    yield

    print("Application shutdown.")

# 모델 수행 이후 처리 함수
def model_predict(data_test):
    global scaler

    predictions = make_predictions(model, data_test)  # 7일 입력 X -> 그 다음 1일 부터 ~ 90일 앞까지 값을 Y
    # 체중 값을 역변환 (age, BMI, calories는 0으로 두고, weight 값만 역변환)
    inverse_weight_predictions = scaler.inverse_transform(
        np.hstack([np.zeros((predictions.shape[1], 2)),  # 나이, BMI 0
                   predictions.reshape(-1, 1),           # weight 예측값 (역변환 대상)
                   np.zeros((predictions.shape[1], 1))])  # 칼로리 0
    )[:, 2]  # weight만 역변환

    return round(inverse_weight_predictions[29], 2), round(inverse_weight_predictions[89], 2)
    
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

# 데이터 전처리 함수
def preprocess_data(exercise_data):
    global encoder, scaler

    # 입력으로 받은 데이터를 어레이로 저장
    exercise_data = np.array([[data.sex, data.age, data.bmi, data.weight, data.calories] for data in exercise_data])
    # 역 연산처리
    # 성별 피처 - 인코더 적용
    sex_encoded = encoder.transform(exercise_data[:, [0]])
    # 수치형 데이터 - 스케일러 적용
    numerical_data = scaler.transform(exercise_data[:, 1:])  # remaining columns: 나이, BMI, 몸무게, 칼로리
    # 성별 + 수치형 데이터
    processed_data = np.hstack([sex_encoded, numerical_data])

    return processed_data

# APP 정의
app = FastAPI(lifespan=load_model_startup)

# 루트 라우터
@app.get("/")
def root():
    return {"message": "MongoDB와 FastAPI 연결 성공"}

### 운동 예측 기능 ###
# API :: 종합 체중 예측 => spring에서 스케쥴러를 통한 예측 후 MongoDB 저장
@app.post("/api/v1/users/{user_id}/body/prediction/fast-api")
async def predict(user_id: int, request: UserExerciseRequest):
    try:
        # 1. request를 통해 exercise_data를 받는다.
        exercise_data = request.exercise_data # exercise_data

        # 2. exercise_data를 길이를 맞춰 전처리 코드
        dummy_count = 7 - len(exercise_data)
        height_sqr = exercise_data[-1].weight / exercise_data[-1].bmi
        for _ in range(dummy_count):
            last_data = dp(exercise_data[-1])
            last_data.calories = np.random.normal(250, 15) # 평균 걸음으로도 250에서 300 칼로리를 소모한다.
            last_data.weight = last_data.weight + round(np.random.uniform(-0.1, 0.2), 2) # 하지만, 식습관으로 인해서 체중이 찌거나 유지되는 중..
            last_data.bmi = last_data.weight / height_sqr
            exercise_data.append(last_data)

        # 3. 전처리 데이터 np 배열 변환
        X_test = preprocess_data(exercise_data) # (7, 5)
        X_test = X_test.reshape(1, 7, -1)  # 한 차원 늘려서, 하나의 입력으로, 7일간의 운동 정보(5개의 feature)를 timesteps=7, features=5

        # 4. model.predict 예측한 결과를 만들어서 DB에 저장하고, user_id랑 예측 값 보내주기
        pred_30_d, pred_90_d = model_predict(X_test)

        # 5. 예측 DB 변수 정의
        new_prediction = {
            "user_id": user_id,
            "current": exercise_data[-1].weight,
            "p30": pred_30_d,
            "p90": pred_90_d,
            "created_at": datetime.utcnow()
        }

        # 6. 종합 예측 Predict_basic document에 MongoDB 저장
        predict_basic.insert_one(new_prediction)

        # 7. 재확인 코드
        new_prediction = convert_objectid(new_prediction)  # ObjectId 변환
        return new_prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error : {e}')

# API :: 추가 운동 예측 -> 요청시 
@app.post("/api/v1/users/{user_id}/body/prediction/extra/fast-api")
async def extra_predict(user_id: int, request: UserExerciseRequest):
    try:
        # 1. exercise_data들 받기
        exercise_data = request.exercise_data # List Exercise_data
        extra_exercise_data = request.extra_exercise_data # List Extra_Exercise_data
        exercise_data = exercise_data + extra_exercise_data

        # 2. exercise_data를 길이를 맞춰 전처리 코드
        dummy_count = 7 - len(exercise_data)
        height_sqr = exercise_data[-1].weight / exercise_data[-1].bmi
        for _ in range(dummy_count):
            last_data = dp(exercise_data[-1])
            last_data.calories = np.random.normal(250, 15) # 평균 걸음으로도 250에서 300 칼로리를 소모한다.
            last_data.weight = last_data.weight + round(np.random.uniform(-0.1, 0.2), 2) # 하지만, 식습관으로 인해서 체중이 찌거나 유지되는 중..
            last_data.bmi = last_data.weight / height_sqr
            exercise_data.append(last_data)

        # 3. 전처리 데이터 np 배열 변환
        X_test = preprocess_data(exercise_data) # (7, 5)
        X_test = X_test.reshape(1, 7, -1)  # 한 차원 늘려서, 1개의 데이터에 7일간의 운동 정보(5개의 feature)를 timesteps=7, features=5

        # 4. model.predict 예측한 결과를 만들어서 DB에 저장하고, user_id랑 예측 값 보내주기
        pred_30_d, pred_90_d = model_predict(X_test)

        # 5. 예측 DB 변수 정의
        new_prediction = {
            "user_id": user_id,
            "current": exercise_data[-1].weight,
            "p30": pred_30_d,
            "p90": pred_90_d,
            "exercise" : {
                "exercise_id": request.exercise_detail.exercise_id,
                "count": request.exercise_detail.count,
                "duration": request.exercise_detail.duration
            },
            "created_at": datetime.utcnow()
        }

        # 6. 종합 예측 MongoDB 저장
        predict_extra.insert_one(new_prediction)

        # 7. 재확인 코드
        new_prediction = convert_objectid(new_prediction)  # ObjectId 변환
        return new_prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error : {e}')

### 크루 추천 기능 ###
# 유저, 크루 모델 정의 부분 #
class ScoreData(BaseModel):
    m_type: float
    type: float
    age: int
    score_1: float
    score_2: float
    score_3: float

class CrewData(BaseModel):
    crew_id: int
    score: ScoreData
    crew_sports: int

class UserData(BaseModel):
    user_id: int
    score: ScoreData
    favorite_sports: List[int]
    crew_list: List[int] = None

class TotalUserData(BaseModel):
    users: List[UserData]

class TotalCrewData(BaseModel):
    crews: List[CrewData]

# 총 데이터 모델 정의
class TotalData(BaseModel):
    total_users: TotalUserData
    total_crews: TotalCrewData

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
def recommend_crews(now_user, user_df, crew_df, top_n=6):
    user_value = now_user.values  # 추천을 받을 사용자의 데이터에서 필요한 정보만 가져오기
    similarities = []

    for i in range(len(crew_df)):
        # 크루에 속해 있지 않을 때 (새로운 크루만 추천 받게)
        # user_data에 있는 crew_list = List[crew_id]에 현재 인덱스의 crew_id 있는지 확인
        now_crew = crew_df.iloc[i].values
        if now_crew['crew_id'] not in user_value['crew_list']:
            crew_sports = now_crew['crew_sports']

            # 4-1. 콘텐츠 기반 필터링 (너무 편향되지 않게)
            content_similarity = 0.8 if crew_sports in user_value['favorite_sports'] else 0.5 # 유저가 선호하는 운동에 포함될 때
            content_similarity *= 0.3

            # 4-2. 유저와 크루간 협업 필터링 (return combined_sim)
            pearson_sim = pearson_similarity(user_value, now_crew)

            # 협업 필터링과 콘텐츠 필터링의 가중치를 합산 (7:3) # 컨텐츠 필터링 = 0.24, 0.15
            combined_similarity = (0.7 * pearson_sim) + content_similarity

            similarities.append((now_crew['crew_id'], combined_similarity, pearson_sim, content_similarity))  # (crew_id, total_sim) 저장
    
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

'''
로직 정리 :: 내가 속해있는 크루 정보도 알아야 한다.
해결책으로 엔드포인트르 두 개로 나눈다? 아니면 속해 있는 크루도 포함해서 왕창 DB에 저장? -> 효율적인가? -> 리소스 많이 쓰는 것 같은데


데이터 플로우 정리 ::
우선,spring에서 요청을 보낼 때, 한번의 요청으로 모든 회원의 정보를 보고 크루 추천 리스트를 MongoDB에 저장해야한다.
그럼, 모델을 수정하는게 더 빠르지 않을까? spring에서 내가 속한 crew_id를 알고 있는 List를 보내주기만 하면
찾아서 제외해서 추천 리스트 만드는게 더 편할 것 같다.

'''

# API :: 크루 추천 (동기 처리)
@app.post("/api/v1/users/crew-recommendation/fast-api")
def crew_recommendation(request: TotalData):
    scaler = MinMaxScaler() # 정규화 스케일러

    # 1-1. request body 받아서 JSON에서 List를 DF 변환과 전처리
    user_data = pd.DataFrame(u.dict() for u in request.total_crews['total_users'])
    crew_data = pd.DataFrame(c.dict() for c in request.total_users['total_crews'])
    # 1-2. 데이터 정규화
    user_data_scaled = scaler.fit_transform(user_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']]) # 나이, 체형, 기본 점수, 활동 점수, 식습관 점수
    crew_data_scaled = scaler.transform(crew_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']])
    # 1-3. DataFrame생성 (Matrix)
    user_df = pd.DataFrame(user_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
    crew_df = pd.DataFrame(crew_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
    # 1-4. 유저 df, 크루 df -> 필요 정보 불러오기
    user_df['user_id'] = user_data['user_id']
    user_df['favorite_sports'] = user_data['favorite_sports']
    user_df['crew_list'] = user_data['crew_list']

    crew_df['crew_id'] = crew_data['crew_id']
    crew_df['crew_sports'] = crew_df['crew_sports']
    # _data = row DF, _scaled = 정규화된 DF, _df = 스케일 + 전체 col

    # 2. 완전 탐색 MongoDB Depth
    for user_idx in range(len(user_df)): # 첫 row부터 끝 row까지 확인할 것
        # 3. user_df의 user_idx번의 row의 user 데이터를 가지고 있는 객체
        now_user = user_df.iloc[user_idx]

        # 4. 크루 추천 (params = 현재 유저 정보, 전체 유저 df, 전체 크루 df)
        recommended_crews = recommend_crews(now_user['user_id'], user_df, crew_df)

        # 5. 저장할 정보 리스트로 만들기
        result = {
            'user_id' : now_user['user_id'],
            'crew_recommended' : [{'crew_id': crew[0], 'similarity': crew[1]} for crew in recommended_crews]
        }

        # 7. MongoDB 저장
        crew_recommend.insert_one(result)

    return {"message" : "Crew_Recommendation Completed!"}

# CLI 실행을 main 함수에서 실행
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)