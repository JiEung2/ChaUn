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
import json
import numpy as np
import joblib
from copy import deepcopy as dp
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input, BatchNormalization
from sklearn.metrics.pairwise import cosine_similarity
from keras.models import load_model

# .env 파일의 환경 변수를 로드
load_dotenv()

# MongoDB 인증 정보 환경 변수에서 가져오기
MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")

# MongoClient 생성
try:
    # 테스트 용
    # client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS = 5000) # EC2 주소 + 포트로 바꾸기
    # 실제 서버 상태 확인
    client = MongoClient(f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@j11c106.p.ssafy.io:31061", serverSelectionTimeoutMS = 5000) # EC2 주소 + 포트로 바꾸기
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

    def average_calories(self) -> float:
        if not self.exercise_data:
            return 0.0
        total_calories = sum(data.calories for data in self.exercise_data)
        return total_calories / len(self.exercise_data)

### AI 회귀 모델 처리 ###
# 모델 구조 정의 - 기존과 똑같은 구조를 불러오기
# v7
def build_model(input_shape, forecast_steps):
    model = Sequential()
    model.add(Input(shape=input_shape))
    model.add(LSTM(units=32, dropout=0.5, return_sequences=True))
    model.add(LSTM(units=32, dropout=0.5))
    model.add(Dense(32, activation='tanh'))
    model.add(BatchNormalization())
    model.add(Dense(units=forecast_steps, activation='sigmoid'))  # 90일 예측
    return model

# model v2
# def build_model(input_shape, forecast_steps):
#     model = Sequential()
#     model.add(Input(shape=input_shape))  # input_shape = (timesteps, features)
#     model.add(LSTM(units=16, dropout=0.3, return_sequences=True)) 
#     model.add(LSTM(units=16, dropout=0.3)) 
#     model.add(Dense(32)) 
#     model.add(Dense(units=forecast_steps))  # 예측할 시점 수에 따라 output 설정
#     return model

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
    model = load_model_weights(model, "./models/modelv6.weights.h5")
    model.summary()

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

    ### Ver 2
    exercise_data = np.array([[data.sex, data.age, data.bmi, data.weight, data.calories] for data in exercise_data])
    # 역 연산처리
    # 성별 피처 - 인코더 적용
    sex_encoded = encoder.transform(pd.DataFrame(exercise_data[:, [0]], columns=['sex']))
    # 수치형 데이터 - 스케일러 적용
    numerical_data = scaler.transform(pd.DataFrame(exercise_data[:, 1:], columns=['age', 'BMI', 'weight', 'calories']))  # remaining columns: 나이, BMI, 몸무게, 칼로리
    # 성별 + 수치형 데이터
    processed_data = np.hstack([sex_encoded, numerical_data])

    return processed_data


    ### Ver 7 이후 (Encoder 적용)
    # df = [exercise.dict() for exercise in exercise_data]
    # df = pd.DataFrame(df)
    # df['sex'] = df['sex'].astype(int)

    # # 성별 인코딩
    # df_sex_encoded = encoder.transform(df[['sex']]).toarray()
    # print(df_sex_encoded)
    # df_encoded = pd.DataFrame(df_sex_encoded, columns=encoder.get_feature_names_out(['sex']))
    
    # # 수치형 피처 스케일링
    # df[['age', 'BMI', 'weight', 'calories']] = scaler.transform(df[['age', 'BMI', 'weight', 'calories']])

# 보정 함수
def make_confirmed_weight(days_30, days_90, data, p30, p90):
    last_weight = data[-1].weight
    cal_average = UserExerciseRequest(exercise_data=data).average_calories()

    # 기본적인 보정 가중치 정의
    if days_30 > 10 or days_90 > 15:  # 오차율이 크다면 큰 보정
        print('오차 큼')
        weight_adjustment_factor_30 = 0.1
        weight_adjustment_factor_90 = 0.15
    elif days_30 > 5 or days_90 > 10:  # 중간 정도의 오차율 보정
        print('오차 보통')
        weight_adjustment_factor_30 = 0.35
        weight_adjustment_factor_90 = 0.4
    else:  # 오차가 작을 경우 보정률을 낮춤
        print('오차 작음')
        weight_adjustment_factor_30 = 0.7
        weight_adjustment_factor_90 = 0.75

    # 칼로리 소모량에 따라 추가 가중치 적용
    if cal_average >= 500:
        print("운동량이 많음 - 체중 감소 가중치 적용")
        pred_30_adjustment = np.random.uniform(-2, -1)  # 체중 감소 가중치
        pred_90_adjustment = np.random.uniform(-3, -2)
    elif cal_average >= 350:
        print("운동량이 보통")
        pred_30_adjustment = np.random.uniform(-1, 0)  # 체중 증가 가중치
        pred_90_adjustment = np.random.uniform(-2, -1)
    else:
        print("운동량이 적음 - 체중 증가 가중치 적용")
        pred_30_adjustment = np.random.uniform(0, 1)  # 체중 증가 가중치
        pred_90_adjustment = np.random.uniform(1, 2.5)

    # 예측 값 보정
    pred_30_corrected = last_weight * (1-weight_adjustment_factor_30) + (p30 * weight_adjustment_factor_30) + pred_30_adjustment
    pred_90_corrected = pred_30_corrected * (1-weight_adjustment_factor_90) + (p90 * weight_adjustment_factor_90) + pred_90_adjustment

    # 현재 체중을 고려하여 최종 보정된 예측 값을 계산
    pred_30_final = round((last_weight + pred_30_corrected) / 2, 2)
    pred_90_final = round((pred_30_final + pred_90_corrected) / 2, 2)

    return pred_30_final, pred_90_final

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

        for exercise_obj in exercise_data:
            exercise_obj.calories += np.random.normal(250,15)
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

        # 4-1. weight와 p30, p90과 차이가 많이 날 때, 예측 값 보정
        last_weight = exercise_data[-1].weight
        # p30_diff = abs(last_weight - pred_30_d)
        # p90_diff = abs(last_weight - pred_90_d)
        # if p30_diff >= 4 or p90_diff >= 6:
        #     cal_average = UserExerciseRequest(exercise_data=exercise_data).average_calories()
        #     if cal_average >= 500:
        #         if pred_30_d - last_weight > 0: # 예측이 더 클 경우
        #             cal_weight = last_weight + np.random.normal(-2, -1)
        #         else:
        #             cal_weight = last_weight + np.random.normal(0, 1)
        #     else: # 운동량이 많지 않으면, 몸무게가 찌는게 더 당연하다.
        #         if pred_30_d - last_weight > 0: # 예측이 더 클 경우
        #             cal_weight = last_weight + np.random.normal(2, 3)
        #         else:
        #             cal_weight = last_weight + np.random.normal(0, 1)
        #     pred_30_d = round((last_weight + cal_weight + pred_30_d) / 3, 2)
        #     pred_90_d = round((cal_weight + pred_30_d + pred_90_d) / 3 + np.random.normal(-1, 1), 2)
        p30_diff = abs(last_weight - pred_30_d)
        p90_diff = abs(last_weight - pred_90_d)
        pred_30_d, pred_90_d = make_confirmed_weight(p30_diff, p90_diff, exercise_data, pred_30_d, pred_90_d)


        # 5. 예측 DB 변수 정의
        new_prediction = {
            "user_id": user_id,
            "current": round(exercise_data[-1].weight, 2),
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

        # 4-1. weight와 p30, p90과 차이가 많이 날 때, 예측 값 보정
        last_weight = exercise_data[-1].weight
        ### 정량적 오차
        # p30_diff = abs(last_weight - pred_30_d)
        # p90_diff = abs(last_weight - pred_90_d)
        # if p30_diff >= 4 or p90_diff >= 6:
        #     print(1)
        #     print(p30_diff, p90_diff)
        #     cal_average = UserExerciseRequest(exercise_data=exercise_data).average_calories()
        #     if cal_average >= 500:
        #         if pred_30_d - last_weight > 0: # 예측이 더 클 경우
        #             cal_weight = last_weight + np.random.uniform(-2, -1)
        #         else:
        #             cal_weight = last_weight + np.random.uniform(0, 1)
        #     else: # 운동량이 많지 않으면, 몸무게가 찌는게 더 당연하다.
        #         if pred_30_d - last_weight > 0: # 예측이 더 클 경우
        #             cal_weight = last_weight + np.random.uniform(1, 2)
        #         else:
        #             cal_weight = last_weight + np.random.uniform(-1.5, 0)
        #     pred_30_d = round((last_weight + cal_weight + pred_30_d) / 3, 2)
        #     pred_90_d = round((((cal_weight + pred_30_d + pred_90_d) / 3) + np.random.uniform(-2, -1)), 2)
        p30_diff = abs(last_weight - pred_30_d)
        p90_diff = abs(last_weight - pred_90_d)
        pred_30_d, pred_90_d = make_confirmed_weight(p30_diff, p90_diff, exercise_data, pred_30_d, pred_90_d)


        # 5. 예측 DB 변수 정의
        new_prediction = {
            "user_id": user_id,
            "current": round(exercise_data[-1].weight, 2),
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
        raise HTTPException(status_code=500, detail=f'Error : {e}, "extra_data" : "is_not_found"')


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
    crew_list: List[int] = []

class TotalUserData(BaseModel):
    users: List[UserData]

class TotalCrewData(BaseModel):
    crews: List[CrewData]

# 총 데이터 모델 정의
class TotalData(BaseModel):
    total_users: TotalUserData
    total_crews: TotalCrewData

# 1-1. col별 스케일러 적용하기
def min_max_scaler(data):
    min_val = data.min()
    max_val = data.max()
    return (data - min_val) / (max_val - min_val)

# 전체 스포츠 목록에 대한 이진 벡터 생성
def create_sport_matrix(users, total_sports=30):
    sport_matrix = np.zeros((len(users), total_sports))
    for idx, user in enumerate(users):
        for sport in user['favorite_sports']:
            sport_matrix[idx, sport - 1] = 1  # 스포츠 ID는 1부터 시작한다고 가정
    return sport_matrix

# 4-2. 피어슨 유사도 계산 함수 - 협업 필터링
def pearson_similarity(user, crew):
    # 사용자-크루간 4개 지표 상관관계수 유사도 (나이, 기본 점수, 활동 점수, 식습관 점수)
    user = np.array([user.m_type, user.type, user.age, user.score_1, user.score_2, user.score_3])
    crew = np.array([crew.m_type, crew.type, crew.age, crew.score_1, crew.score_2, crew.score_3])
    similarity = np.nan_to_num(np.corrcoef(user[2:], crew[2:])[0, 1]) # age, score_1~3
    similarity = similarity ** 2

    if user[0]:
        # m_type
        body_similarity =  1 - abs(abs(user[0] - crew[0]) * 0.4 + abs(user[0] - crew[1]) * 0.6) # 근육질 아닌 곳에 대한 가중치 늘리기(멀리) 
    else:
        body_similarity = 1 - abs(abs(user[1] - crew[0]) * 0.35 + abs(user[1] - crew[1]) * 0.65) # 근육질인 곳을 줄여 가까워지기

    # 체형 유사도: 전체 유사도 3:7
    combined_similarity = (0.7 * similarity) + (0.3 * body_similarity)
    return combined_similarity

# 4. 메인 추천 함수
def recommend_crews(now_user, crew_df, top_n=6):
    global user_df
    similarities = []

    # 전체 유저의 스포츠 선호도를 벡터로 변환 (한 번에 처리)
    user_sport_matrix = create_sport_matrix(user_df.to_dict('records'))
    now_user_vec = create_sport_matrix([now_user.to_dict()])[0]  # 현재 사용자 벡터

    # 2-2. Cosine Similarity를 모든 사용자와 한 번에 계산
    cosine_similarities = cosine_similarity([now_user_vec], user_sport_matrix)[0]

    for i in range(len(crew_df)):
        # 크루에 속해 있지 않을 때 (새로운 크루만 추천 받게)
        # user_data에 있는 crew_list = List[crew_id]에 현재 인덱스의 crew_id 있는지 확인
        now_crew = crew_df.loc[i]

        if now_crew['crew_id'] not in now_user['crew_list']:
            crew_members = user_df[user_df['crew_list'].apply(lambda crew_list: now_crew['crew_id'] in crew_list)]
            crew_member_indices = crew_members.index.tolist()
            
            # 해당 크루에 속한 사용자들의 코사인 유사도 평균 계산
            if crew_member_indices:
                content_similarity = np.mean(cosine_similarities[crew_member_indices])
                content_similarity *= 0.3  # 가중치 0.3 적용
            else:
                content_similarity = 0

            # 4-2. 유저와 크루간 협업 필터링 (return combined_sim)
            pearson_sim = pearson_similarity(now_user, now_crew)

            # 협업 필터링과 콘텐츠 필터링의 가중치를 합산 (7:3) # 컨텐츠 필터링 = 0.24, 0.15
            combined_similarity = (0.7 * pearson_sim) + content_similarity

            similarities.append((now_crew['crew_id'], combined_similarity, pearson_sim, content_similarity))  # (crew_id, total_sim) 저장
    
    # 유사도 내림차순으로 정렬 후 상위 top_n 크루 선택
    similarities.sort(key=lambda x: x[1], reverse=True)
    # 유사도가 0.2 이상인 항목만 필터링 (= 적당히 유사해야 한다.)
    filtered_similarities = [item for item in similarities[:20] if item[1] >= 0.2]
    # print('필터 된 목록 :', len(filtered_similarities))

    # 유사도 0.2 이상 상위 20개가 9개가 될 경우
    if len(filtered_similarities) >= 9:
        top_crews = filtered_similarities[:top_n]  # 상위 6개는 가져가자
        # 유사도 상위 20개 중 3개 랜덤으로 선택
        additional_crew_numbers = np.random.choice(range(top_n, len(filtered_similarities)), 3, replace=False)
        for idx in additional_crew_numbers:
            top_crews += [filtered_similarities[idx]]
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

    # 1-1. request body 받아서 JSON에서 List를 DF 변환과 전처리
    user_data = pd.DataFrame([
        {
            'user_id': u.user_id,
            'm_type': u.score.m_type,
            'type': u.score.type,
            'age': u.score.age,
            'score_1': u.score.score_1,
            'score_2': u.score.score_2,
            'score_3': u.score.score_3,
            'favorite_sports': u.favorite_sports,
            'crew_list': u.crew_list
        } for u in request.total_users.users
    ])
    crew_data = pd.DataFrame([
        {
            'crew_id': c.crew_id,
            'm_type': c.score.m_type,
            'type': c.score.type,
            'age': c.score.age,
            'score_1': c.score.score_1,
            'score_2': c.score.score_2,
            'score_3': c.score.score_3,
            'crew_sports': c.crew_sports
        } for c in request.total_crews.crews
    ])

    # 1-2. 데이터 정규화
    user_data_scaled = (user_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']]).apply(min_max_scaler) # 나이, 체형, 기본 점수, 활동 점수, 식습관 점수
    crew_data_scaled = (crew_data[['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3']]).apply(min_max_scaler)
    # 1-3. DataFrame생성 (Matrix)
    user_df = pd.DataFrame(user_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
    crew_df = pd.DataFrame(crew_data_scaled, columns=['m_type', 'type', 'age', 'score_1', 'score_2', 'score_3'])
    # 1-4. 유저 df, 크루 df -> 필요 정보 불러오기
    user_df['user_id'] = user_data['user_id']
    user_df['favorite_sports'] = user_data['favorite_sports']
    user_df['crew_list'] = user_data['crew_list']

    crew_df['crew_id'] = crew_data['crew_id']
    crew_df['crew_sports'] = crew_data['crew_sports']
    # _data = row DF, _scaled = 정규화된 DF, _df = 스케일 + 전체 col

    # 2. 완전 탐색 MongoDB Depth
    for user_idx in range(len(user_df)): # 첫 row부터 끝 row까지 확인할 것
        # 3. user_df의 user_idx번의 row의 user 데이터를 가지고 있는 객체
        now_user = user_df.loc[user_idx]

        # 4. 크루 추천 (params = 현재 유저 정보, 전체 유저 df, 전체 크루 df)
        recommended_crews = recommend_crews(now_user, crew_df)

        # 5. 저장할 정보 리스트로 만들기
        result = {
            'user_id' : int(now_user['user_id']),
            'crew_recommended' : [{'crew_id': int(crew[0]), 'similarity': round(crew[1], 3)} for crew in recommended_crews]
        }
        
        print(result)
        # 6. MongoDB 저장
        # crew_recommend.insert_one(result)

    return {"message" : "Crew_Recommendation Completed!"}

# CLI 실행을 main 함수에서 실행
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)