import numpy as np
import pandas as pd
import os
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, LSTM, Dense, Dropout, Input
from tensorflow.keras.optimizers import Adam

# 모델 구조 정의
def build_model(input_shape, forecast_steps):
    model = Sequential()
    model.add(Input(shape=input_shape))
    model.add(LSTM(units=128, dropout=0.3, return_sequences=True))
    model.add(LSTM(units=64, dropout=0.3))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(units=forecast_steps))
    return model

# 모델에 따른 가중치 불러오기
def load_model_weights(model, weights_path):
    model.load_weights(weights_path)
    return model

# 예측 수행
def make_predictions(model, X_test):
    predictions = model.predict(X_test)
    return predictions

# 정확도 계산
def calculate_accuracy(df, model, timesteps, features, forecast_steps):
    correct_predictions = 0
    total_predictions = 0

    # 7일 데이터를 가지고 30일, 90일 예측을 수행
    for i in range(len(df) - timesteps - forecast_steps):
        X_test = df.iloc[i:i + timesteps][['sex', 'age', 'BMI', 'weight', 'calories']].values
        X_test = X_test.reshape(1, timesteps, features)

        # 예측 수행
        predictions = make_predictions(model, X_test)

        # 실제 값과 비교하여 정확도 계산 (예를 들어 1kg 이내로 차이 나는 경우를 정확한 예측으로 간주)
        real_weight_30 = df.loc[i + timesteps + 29, 'weight']
        real_weight_90 = df.loc[i + timesteps + 89, 'weight']

        predicted_30 = predictions[0][29]
        predicted_90 = predictions[0][89]

        # 1kg 이내의 오차는 정확한 예측으로 간주
        if abs(real_weight_30 - predicted_30) <= 1:
            correct_predictions += 1
        if abs(real_weight_90 - predicted_90) <= 1:
            correct_predictions += 1

        total_predictions += 2  # 30일, 90일 예측 각각 1개씩

    # 정확도 계산
    accuracy = (correct_predictions / total_predictions) * 100
    return accuracy

if __name__ == "__main__":
    timesteps = 7
    features = 5  # ['sex', 'age', 'BMI', 'weight', 'calories']
    forecast_steps = 90
    input_shape = (timesteps, features)

    # 모델 생성
    model = build_model(input_shape, forecast_steps)

    # 가중치 파일 불러오기
    weights_path = "./models/modelv2.weights.h5"
    model = load_model_weights(model, weights_path)

    # 예측할 CSV 파일 경로 설정
    csv_path = './dummy/outputs/test/csv/'
    csv_files = [f for f in os.listdir(csv_path) if f.endswith('.csv')]

    # 전체 정확도 계산
    total_accuracy = 0
    num_samples = 0

    for file in csv_files:
        file_path = os.path.join(csv_path, file)
        df = pd.read_csv(file_path)

        # 한 파일에 대해 정확도 계산
        accuracy = calculate_accuracy(df, model, timesteps, features, forecast_steps)
        total_accuracy += accuracy
        num_samples += 1

        print(f"Accuracy for file {file}: {accuracy:.2f}%")

    # 전체 파일에 대한 평균 정확도 계산
    avg_accuracy = total_accuracy / num_samples
    print(f"Average accuracy across all samples: {avg_accuracy:.2f}%")