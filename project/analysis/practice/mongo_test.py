from fastapi import FastAPI, Request, HTTPException
import uvicorn
from typing import List
import pydantic
from pydantic import BaseModel
from bson import ObjectId


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

    return float(predictions[0][29]), float(predictions[0][89])

# 루트 라우터
@app.get("/")
def root():
    return {"This is Root" : "Hello, root"}

'''

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


# 스프링에서 받은 json 데이터를 데이터프레임화 시키기 전에 해당 유저가 생성한 DB에 있는지 확인하기
@app.post("/predict")
async def predict(request: UserExerciseRequest):
    # dt_json = await request.json()

    user_id = request.user_id
    exercise_data = request.exercise_data

    # 입력 데이터를 numpy 배열로 변환
    X_test = np.array([[data.sex, data.age, data.bmi, data.weight, data.calories] for data in exercise_data])
    X_test = X_test.reshape(1, 7, 5)  # 7일간의 운동 정보가 있으므로 timesteps=7, features=5

    # id 혹은 토큰으로 조회 예정
    user = collection.find_one({"user_id": user_id})

    # DB에 user 정보가 없을 경우 == 예측한 결과가 없을 경우
    if not user:
        # model.predict을 통해 예측한 결과를 만들어서 DB에 저장하고, user_id랑 예측 값 보내주기
        pred_30_d, pred_90_d = model_predict(X_test)

        # 예측 값을 포함한 데이터를 MongoDB에 저장
        new_prediction = {
            "user_id": user_id,
            "prediction_30_days": pred_30_d,
            "prediction_90_days": pred_90_d
        }

        # MongoDB에 저장
        collection.insert_one(new_prediction)
        new_prediction = convert_objectid(new_prediction)  # ObjectId 변환

        # 저장된 내용을 반환
        return {
            "status": "predicted",
            "data": new_prediction
        }
    
    # 조회된 user 정보가 있을 경우
    else: 
        # 조회해서 값을 채워 data 보내주기 (user_id, 예측 값 30, 90일 보내주기,)
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
    uvicorn.run(app, host="0.0.0.0", port=8000)