
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, Dense, Dropout, Input
from tensorflow.keras.optimizers import Adam

# 외부 모델 모튤로 불러오기

# fastapi
from fastapi import FastAPI


# "/" = root
# @app.get("/")


# 저장된 모델의 가중치를 불러와서 예측하는 방법


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
    # X_test는 예측할 데이터를 의미하며, 실제 데이터를 여기에 넣어야 함
    X_test = np.array([
        [  1.,        32.,        24.21,      75.,       300.55997 ],
        [  1.,        32.,        24.29,      75.23815,  295.3654  ],
        [  1.,        32.,        23.92,       74.86,     312.97836 ],
        [  1.,        32.,        24.10,       74.94,   312.97836 ],
        [  1.,        32.,        24.09,       74.93,   312.97836 ],
        [  1.,        32.,        24.14,       74.95,   312.97836 ],
        [  1.,        32.,        24.27,       75.22,   312.97836 ]
    ])
    X_test = X_test.reshape(1, timesteps, features)

    # 예측 수행
    predictions = make_predictions(model, X_test)

    # 예측 결과 출력
    print("Predictions for the next 30 days:", predictions[0][29])
    print("Predictions for the next 90 days:", predictions[0][89])
