# 💪🏻 캐릭터와 함께 성장하며 운동하는 서비스 [캐운]
![main](assets/main.png)

## Index
#### &emsp; [➤ 프로젝트 소개](##-프로젝트-소개)<br>
#### &emsp; [➤ 개발 환경](##-개발-환경)<br>
#### &emsp; [➤ 기능 소개](##-기능-소개)<br>
#### &emsp; [➤ 산출물](##-산출물)<br>
#### &emsp; [➤ 팀 소개](##-팀-소개)<br>

## 프로젝트 소개
**운동 기록 기반 사용자 체형 예측 서비스입니다.**
- 운동 카테고리별 운동 기록하며 예상 소모 칼로리를 계산해줍니다.
- 사용자 정보를 맞춤으로 운동을 추천해줍니다.
- 기간별 체형 정보 기록을 그래프를 통해 보여주며 체계적 체중 관리를 도와줍니다.
- 통계 기반 시계열 체형 정보 데이터를 이용해 미래 체형을 예측해줍니다.
- 콘텐츠 기반, 협업 기반 필터링을 결합한 하이브리드 기법으로 크루를 추천해줍니다.
- 크루원들과 함께 운동을 기록하며 다른 크루와 배틀할 수 있습니다.

### 프로젝트 기간
**2024.08.26 ~ 2024.10.11 (총 7주)**

## 개발 환경
- BE: SpringBoot 3.3.3, Java 17
- FE: React, SCSS, Three.js, Zustand, TanStack Query
- AI: Python 3.9, Uvicorn 0.30.6, FastAPI 0.114, TensorFlow 2.17
- DB: MySQL 8.0.39, MongoDB 7.0.12
- Infra: Ubuntu 20.04, Docker, Portainer, caddy-docker-proxy

## 기능 소개
### 홈
- **홈 화면**: **디지털 트윈 캐릭터**와 상호작용하며 퀘스트, 캘린더, 이번 주 운동 그래프, 크루 메뉴로 이동할 수 있습니다.
- **캘린더**: 매일 **출석**을 기록할 수 있고, 캘린더를 통해 운동기록을 볼 수 있습니다.
- **퀘스트**: **오늘의 퀘스트**와 **월간 퀘스트**를 통해 동기부여를 일으키며 운동할 수 있습니다.

|홈 화면|캘린더|퀘스트|
|:---:|:---:|:---:|
|![Home](assets/screenshot/home_1.jpg)|![Calendar](assets/screenshot/home_2.jpg)|![Quest](assets/screenshot/home_3.jpg)|

### 크루 화면
- **크루 메인 페이지**: 크루와 관련된 모든 기능을 할 수 있습니다.
- **크루 생성**: 크루장이 되어 크루를 직접 **생성**할 수 있습니다.
- **크루 추천**: **하이브리드 추천 시스템**(CBF+CF)으로 사용자에게 9개의 크루를 추천합니다.

|크루 메인|크루 생성|크루 추천|
|:---:|:---:|:---:|
|![crew_1](assets/screenshot/crew_1.jpg)|![crew_2](assets/screenshot/crew_2.jpg)|![crew_3](assets/screenshot/crew_3.jpg)|

### 크루 배틀

- **크루 배틀**: 같은 운동 종목의 크루에게 배틀을 신청하거나 동의하여 **크루 간 배틀**을 진행할 수 있습니다. 크루 퀘스트 및 크루 활동, 운동 시간을 활용해 **점수**를 부여합니다.
- **크루 랭킹**: **운동 종목**에 따른 **실시간 크루 랭킹**을 확인할 수 있습니다.

|크루 배틀|크루 랭킹|크루 랭킹|
|:---:|:---:|:---:|
|![battle_1](assets/screenshot/battle_1.jpg)|![battle_2](assets/screenshot/battle_2.jpg)|![battle_3](assets/screenshot/battle_3.jpg)|

### 프로필
- 프로필에서 자신이 입력한 체형을 바탕으로 **본인만의 캐릭터**를 볼 수 있습니다.
- 상대방의 프로필에서 상대 방의 **캐릭터**와 **체형 기록 추이**, **운동시간**을 볼 수 있습니다.
- 아이템을 구매하고, 장착하며 캐릭터를 **커스텀**할 수 있습니다.

|마이 프로필|상대 프로필|캐릭터 커스텀|
|:---:|:---:|:---:|
|![profile_1](assets/screenshot/profile_1.jpg)|![profile_2](assets/screenshot/profile_2.jpg)|![profile_3](assets/screenshot/profile_3.jpg)|

### 체형 기록
- **체형 입력**: 2주 단위 체형 입력에 대한 **알림**이 가며 체형 입력을 통해 본인의 체형을 **갱신**할 수 있습니다.
- **체형 기록**: 입력된 체형을 바탕으로 **월별 체형 기록**을 볼 수 있습니다.
- **체형 기록 상세**: 그래프를 클릭하여 **월별 체형 기록 수치**를 **가시적**으로 볼 수 있습니다.

|체형 입력|체형 기록|체형 기록 상세|
|:---:|:---:|:---:|
|![body_1](assets/screenshot/body_1.jpg)|![body_2](assets/screenshot/body_2.jpg)|![body_3](assets/screenshot/body_3.jpg)|

### 체형 예측
- **체형 예측**: 이번 주 운동 기록을 바탕으로 해당 **운동 강도를 유지했을 때** 1, 3개월 후의 체형 예측 값을 볼 수 있습니다.
- **체형 추가 예측**: **특정 운동을 추가로 더 했을 때** 1, 3개월 후의 체형 예측 값을 볼 수 있습니다.

|체형 예측|체형 추가 예측|체형 추가 예측|
|:---:|:---:|:---:|
|![predict_1](assets/screenshot/predict_1.jpg)|![predict_2](assets/screenshot/predict_2.jpg)|![predict_3](assets/screenshot/predict_3.jpg)|

### 운동
- 시작, 종료 버튼을 통해 운동을 **시작**하고 **마칠** 수 있습니다.
- 운동을 선택하여 운동을 한 뒤 해당 운동 기록을 통해 **소모된 칼로리**를 볼 수 있습니다.
- 운동을 시작하면 **캐릭터가 같이 움직이며** 운동하고있는 듯한 **애니메이션**을 볼 수 있습니다.

|운동 기록|운동 선택|운동 중|
|:---:|:---:|:---:|
|![exercise_1](assets/screenshot/exercise_1.jpg)|![exercise_2](assets/screenshot/exercise_2.jpg)|![exercise_3](assets/screenshot/exercise_3.jpg)|

### 기타
- **스냅샷**: 스냅샷을 통해 현재의 캐릭터를 기록할 수 있고, 과거의 스냅샷과 비교하며 캐릭터를 통해 **체형의 변화**를 느낄 수 있습니다.
- **운동 추천**: 사용자가 선호하고, 자주하는 운동을 바탕으로 운동을 **추천**받을 수 있습니다.
- **알림**: 알림을 통해 퀘스트, 배틀, 체형 입력 등의 알림을 받을 수 있습니다. 

|스냅샷|운동 추천|알림|
|:---:|:---:|:---:|
|![etc_1](assets/screenshot/etc_1.jpg)|![etc_2](assets/screenshot/etc_2.jpg)|![etc_3](assets/screenshot/etc_3.jpg)|

## 산출물
### **[Notion](https://www.notion.so/C106-df98233bbeb44e91a5bf566d7960783b)**

### ERD
![ERD](assets/erd.png)

### Architecture 구조도
![Architecture](assets/architecture.png)

## 팀 소개
<table>
<thead>
<tr>
<th style="text-align: center;"><strong>박지응</strong></th>
<th style="text-align: center;"><strong>송준혁</strong></th>
<th style="text-align: center;"><strong>박민철</strong></th>
<th style="text-align: center;"><strong>김민영</strong></th>
<th style="text-align: center;"><strong>인호현</strong></th>
<th style="text-align: center;"><strong>김민주</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><a href="https://github.com/JiEung2"><img src="https://avatars.githubusercontent.com/u/127590064?v=4" height="150" width="150" style="max-width: 100%;"> <br> @JiEung2</a></td>
<td align="center"><a href="https://github.com/TheNoFace"><img src="https://avatars.githubusercontent.com/u/3072090?v=4" height="150" width="150" style="max-width: 100%;"> <br> @TheNoFace</a></td>
<td align="center"><a href="https://github.com/daringpark"><img src="https://avatars.githubusercontent.com/u/108521994?v=4" height="150" width="150" style="max-width: 100%;"> <br> @daringpark</a></td>
<td align="center"><a href="https://github.com/minyeong981"><img src="https://avatars.githubusercontent.com/u/156265474?v=4" height="150" width="150" style="max-width: 100%;"> <br> @minyeong981</a></td>
<td align="center"><a href="https://github.com/inhohyun"><img src="https://avatars.githubusercontent.com/u/96523102?v=4" height="150" width="150" style="max-width: 100%;"> <br> @inhohyun</a></td>
<td align="center"><a href="https://github.com/MINJOO-KIM"><img src="https://avatars.githubusercontent.com/u/64532143?v=4" height="150" width="150" style="max-width: 100%;"> <br> @MINJOO-KIM</a></td>
</tr>
<tr>
<td align="center"><b>팀장 | BE</td>
<td align="center"><b>INFRA | BE</td>
<td align="center"><b>DATA | AI</td>
<td align="center"><b>FE | 3D</td>
<td align="center"><b>FE | QA</td>
<td align="center"><b>FE | DESIGN</td>
</tr>
</tbody>
</table>




