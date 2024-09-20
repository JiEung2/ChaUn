from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
from typing import List
import pydantic
from pydantic import BaseModel
from bson import ObjectId

# DB timezone 설정
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

# MongoClient 작업 가져오기
from pymongo import MongoClient

# 데이터 처리 및 예측
import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, Dense, Dropout, Input
from tensorflow.keras.optimizers import Adam

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
    allow_origins=["http://localhost:3000"],  # 허용할 Origin 목록 (React 클라이언트)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 헤더 허용
)

# MongoClient 생성
try:
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS = 5000)
    # 서버 상태 확인
    server_status = client.admin.command("ping")
    db = client['mydb']
    collection = db['mycollection']
    print("MongoDB 서버에 성공적으로 연결되었습니다:", server_status)
except Exception as e:
    print("MongoDB에 연결할 수 없습니다:", e)

# 모델 정의 부분
class ExerciseData(BaseModel):
    sex: int
    age: int
    bmi: float
    weight: float
    calories: float

class UserExerciseRequest(BaseModel):
    user_id: int
    exercise_data: List[ExerciseData]  # 7일간의 운동 정보 리스트

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
    predictions = model.predict(X_test)
    return predictions

# 전체 model 돌리는 함수
def model_predict(data_test):
    timesteps = 7
    features = 5  # ['sex', 'age', 'BMI', 'weight', 'consumed_cal'] -> feature 수
    forecast_steps = 90  # 90일 예측
    input_shape = (timesteps, features)

    # 모델 생성, 가중치 불러오기
    model = build_model(input_shape, forecast_steps)
    model = load_model_weights(model, "./modelv1.weights.h5")

    # 예측 수행
    predictions = make_predictions(model, data_test)

    # 30일, 90일 기록을 return 시키기
    return round(float(predictions[0][29]), 2), round(float(predictions[0][89]), 2)

'''
dummy input
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

# 스프링에서 받은 json 데이터를 데이터프레임화 시키기 전에 해당 유저가 생성한 DB에 있는지 확인하기
@app.post("/api/v1/users/{user_id}/body/prediction")
async def predict(user_id: int, request: UserExerciseRequest):
    user_id = request.user_id # user_id
    exercise_data = request.exercise_data # exercise_data

    # 입력 데이터를 numpy 배열로 변환
    X_test = np.array([[data.sex, data.age, data.bmi, data.weight, data.calories] for data in exercise_data]) # (7, 5)
    X_test = X_test.reshape(1, 7, 5)  # 한 차원 늘려서, 하나의 입력으로, 7일간의 운동 정보(5개의 feature)를 timesteps=7, features=5

    # 현재 UTC 시간 가져오기
    utc_now = datetime.utcnow()

    # 현재 날짜로부터 7일 전까지의 기간 계산
    one_week_ago = utc_now - timedelta(days=7)

    # user_id와 지난 7일간의 운동 기록이 있는지 확인 (운동 기록이 있는지 검사)
    user = collection.find_one({
        "user_id": user_id,
        "created_at": {"$gte": one_week_ago}  # 지난 7일간의 기록만 조회
    })

    # DB에 user 정보가 없을 경우 == 예측한 결과가 없을 경우
    if not user:
        # model.predict을 통해 예측한 결과를 만들어서 DB에 저장하고, user_id랑 예측 값 보내주기
        pred_30_d, pred_90_d = model_predict(X_test)


        # MongoDB에 운동 기록을 저장할 때 UTC 시간으로 저장
        new_prediction = {
            "user_id": user_id,
            "p30": pred_30_d,
            "p90": pred_90_d,
            "created_at": utc_now  # UTC 시간으로 저장
        }

        # MongoDB에 저장
        collection.insert_one(new_prediction)
        new_prediction = convert_objectid(new_prediction)  # ObjectId 변환

        # 저장된 내용을 반환
        new_prediction["created_at"] = convert_utc_to_kst(new_prediction["created_at"])
        
        return {
            "status": "predicted",
            "data": new_prediction
        }
    
    # 조회된 user 정보가 있을 경우
    else: 
        # 조회해서 값을 채워 data 보내주기 (user_id, 예측 값 30, 90일 보내주기)
        user["created_at"] = convert_utc_to_kst(user["created_at"])
        user = convert_objectid(user)
        return {
            # ObjectId 변환
            "status": "loaded",
            "data": {
                "user" : user
            }
        }

# CLI 실행을 main 함수에서 실행
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)