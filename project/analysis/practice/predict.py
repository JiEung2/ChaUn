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
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS = 5000) # EC2 주소 + 포트로 바꾸기
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
    # 2. exercise_data를 길이를 맞춰 전처리 코드




    # 3. 전처리 데이터 np 배열 변환
    X_test = np.array([[data.sex, data.age, data.bmi, data.weight, data.calories] for data in exercise_data]) # (7, 5)
    X_test = X_test.reshape(1, 7, 5)  # 한 차원 늘려서, 하나의 입력으로, 7일간의 운동 정보(5개의 feature)를 timesteps=7, features=5

    # 4. model.predict 예측한 결과를 만들어서 DB에 저장하고, user_id랑 예측 값 보내주기
    pred_30_d, pred_90_d = model_predict(X_test)

    # 5. 예측 DB 변수 정의
    new_prediction = {
        "user_id": user_id,
        "p30": pred_30_d,
        "p90": pred_90_d,
        "created_at": convert_utc_to_kst(datetime.utcnow())  # KST 시간으로 저장
        # MongoDB상에는 KST로 안나오고 UTC로 나오는데? -> 따로 설정이 있나?
    }

    # 6. 종합 예측 MongoDB 저장
    predict_basic.insert_one(new_prediction)
    new_prediction = convert_objectid(new_prediction)  # ObjectId 변환

    # 7. 재확인 :: return시에는 kst 잘 나옴
    return new_prediction

# CLI 실행을 main 함수에서 실행
if __name__ == "__main__":
    uvicorn.run("predict:app", host="0.0.0.0", port=8000, reload=True)