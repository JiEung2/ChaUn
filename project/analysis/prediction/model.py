# 패키지 불러오기
import os
import numpy as np
import pandas as pd
import tensorflow
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import Input, GRU, LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

# csv를 불러와
csv_dir = './dummy/outputs/csv'
df_list = []

for csv_file in os.listdir(csv_dir):
    if csv_file.endswith('.csv'):
        df = pd.read_csv(os.path.join(csv_dir, csv_file))
        df_list.append(df)

# 사용자별로 데이터를 나누어 처리
all_X, all_y = [], []
# print('DF_LIST_LENGTH', len(df_list))

# 주요 features 설정
features = ['age', 'sex', 'BMI', 'weight', 'consumed_cal'] # 체중, 체중 연산 변경치 (기초 대사 + 활동 대사 > 섭취 칼로리 = 체중 증가)

# 타임스텝 설정, 앞선 타임스텝을 가지고, 90일까지의 예측을 진행할 예정...
timesteps = 7
forecast_steps = 90

# 시계열 데이터를 timesteps로 자르고, 다중 스텝 예측을 위해 여러 값을 y로 설정
def create_multi_step_sequences(data, time_steps, forecast_steps):
    X, y = [], []

    # 필요한 피처만 선택
    data = data[features].copy()  # features 리스트에 있는 피처만 사용

    for i in range(len(data) - time_steps - forecast_steps):
        X.append(data.iloc[i:i + time_steps].values)
        y.append(data.iloc[i + time_steps:i + forecast_steps + time_steps, 3].values)  # DataFrame에서의 col index = 3
    return np.array(X), np.array(y)

# 사용자별 데이터 전처리 및 시계열 분할
for df in df_list:
    # 시계열 데이터를 자르고, 각각의 데이터를 리스트에 저장
    X, y = create_multi_step_sequences(df, timesteps, forecast_steps)
    all_X.append(X)
    all_y.append(y)

# X의 shape: (샘플 수, timesteps, features), y의 shape: (샘플 수, forecast_steps)
print("X shape:", X.shape)  # 예: (883, 7, 5)
print("y shape:", y.shape)  # 예: (883, 7)

# 모든 사용자 데이터를 합치기
X_combined = np.concatenate(all_X, axis=0).astype(np.float32)
y_combined = np.concatenate(all_y, axis=0).astype(np.float32)

# 모델 순차 정의
model = Sequential() # 모델 순차적 정의
model.add(Input(shape=(X_combined.shape[1], X_combined.shape[2])))
# GRU 레이어를 어느정도를 쓸건가?
model.add(GRU(units=64, return_sequences=False)) # 모델 GRU 레이어 통과
model.add(Dropout(0.3)) # 편향 방지 : 드랍 아웃 결정
model.add(Dense(64, activation = 'relu')) # Fully-Connected DL
model.add(Dense(units=forecast_steps)) # 모델 Dense 레이어 통과 이후, 1차원으로 90개 출력 데이터

# 모델 컴파일 - 회귀 모델에 적합한 MSE 선택, mae, mse 같이 확인
opt = Adam(learning_rate=0.0001)

model.compile(optimizer = opt, loss='mse', metrics=['mae', 'mse'])

# model Summary
model.summary()

# checkpoint = restore best model
checkpoint = ModelCheckpoint("./models/modelv1.weights.h5", monitor='val_loss', save_best_only=True, verbose=1, save_weights_only=True)

# EarlyStopping 콜백 설정: 5번 연속 성능이 개선되지 않으면 학습 중지
early_stopping = EarlyStopping(monitor='val_loss', min_delta=0.01, patience=10, restore_best_weights=True)

# 모델 학습 | train : val = 8 : 2 (user 12000; 9600 : 2400)
hist = model.fit(X_combined, y_combined, epochs=500, batch_size=32, validation_split=0.2, callbacks=[early_stopping, checkpoint])

# 학습 결과 출력
print("모델 학습 완료!")

# val_loss와 train_loss 시각화
fig, ax = plt.subplots(2, 1, figsize=(10, 8))  # 그래프의 크기를 지정할 수 있습니다.

# 첫 번째 그래프: train_loss와 val_loss
ax[0].plot(hist.history['loss'], label='train_loss', color='blue')
ax[0].plot(hist.history['val_loss'], label='val_loss', color='orange')
ax[0].set_ylabel('Loss')
ax[0].set_title('Train and Validation Loss')
ax[0].legend()

# 두 번째 그래프: train_mse와 val_mse
ax[1].plot(hist.history['mse'], label='train_mse', color='green')
ax[1].plot(hist.history['val_mse'], label='val_mse', color='red')
ax[1].set_ylabel('MSE')
ax[1].set_title('Train and Validation MSE')
ax[1].set_xlabel('Epochs')
ax[1].legend()

plt.tight_layout()
plt.show()

# plt, png 저장
png_file = os.path.join('./models/', f'model_ver.png')
plt.savefig(png_file)