
import numpy as np
import pandas as pd
import os
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, LSTM, Dense, Dropout, Input
from tensorflow.keras.optimizers import Adam

# fastapi
# from fastapi import FastAPI


# "/" = root
# @app.get("/")

# 모델 구조 정의 - 기존과 똑같은 구조를 불러오기
def build_model(input_shape, forecast_steps):
    model = Sequential() # 모델 순차적 정의
    model.add(Input(shape=input_shape))
    # GRU 레이어를 어느정도를 쓸건가?
    model.add(LSTM(units=32, dropout=0.3, return_sequences=True)) # 모델 GRU 레이어 통과
    model.add(LSTM(units=32, dropout=0.3)) # 모델 GRU 레이어 통과
    model.add(Dense(64))
    model.add(Dense(units=forecast_steps)) # 모델 Dense 레이어 통과 이후, 1차원으로 90개 출력 데이터
    return model

# 모델에 따른 가중치 불러오기
def load_model_weights(model, weights_path):
    model.load_weights(weights_path)
    return model

# 예측 수행
def make_predictions(model, X_test):
    predictions = model.predict(X_test)
    return predictions

if __name__ == "__main__":
    # 필요한 입력 형상 정의 (이전에 학습한 데이터와 일치해야 함)
    timesteps = 7
    features = 5  # ['sex', 'age', 'BMI', 'weight', 'consumed_cal'] -> feature 수
    forecast_steps = 90  # 90일 예측
    input_shape = (timesteps, features)

    # 모델 생성
    model = build_model(input_shape, forecast_steps)

    # 가중치 파일 불러오기
    weights_path = "./models/modelv1.weights.h5"
    model = load_model_weights(model, weights_path)

    # 예측할 데이터 준비 (예시로 랜덤 데이터 사용, 실제 데이터로 교체 필요)
    # Input으로 받아야할 것 (성별, 나이, BMI, 체중, 소모 칼로리)
    
    csv_path = './dummy/outputs/test/csv/'
    # 폴더 내의 모든 파일 중에서 CSV 파일만 필터링
    csv_files = [f for f in os.listdir(csv_path) if f.endswith('.csv')]

    # CSV 파일들을 하나씩 불러오기
    dataframes = []
    for file in csv_files:
        file_path = os.path.join(csv_path, file)  # 파일의 전체 경로
        df = pd.read_csv(file_path)  # CSV 파일을 데이터프레임으로 불러오기
        dataframes.append(df)  # 각 데이터프레임을 리스트에 추가
    
    for df in dataframes:
        # X_test = np.array([
        #     [  2,        32.,        20.66,      49,       300.55997 ],
        #     [  2,        32.,        20.53,      48.7,  295.3654  ],
        #     [  2,        32.,        20.91,      49.6,     312.97836 ],
        #     [  2,        32.,        20.66,      49,   312.97836 ],
        #     [  2,        32.,        20.53,      48.7,   312.97836 ],
        #     [  2,        32.,        20.45,      48.5,   312.97836 ],
        #     [  2,        32.,        20.74,      49.2,   312.97836 ]
        # ])
        # 저런식으로 만들어야 됨.
        selected_data = df.iloc[180: 180+7][['sex', 'age', 'BMI', 'weight', 'calories']].values
        X_test = selected_data.reshape(1, timesteps, features)

        # 예측 수행
        predictions = make_predictions(model, X_test)

        # 실제 값 출력
        print("Current Real Weight:", df.loc[4:4+7, 'weight'])
        print("Real Weight for the next 30 days:", df.loc[4+29, 'weight'])
        print("Real Weight for the next 90 days:", df.loc[4+89, 'weight'])
        
        # 예측 결과 출력
        print("Predictions for the next 30 days:", predictions[0][29])
        print("Predictions for the next 90 days:", predictions[0][89])
