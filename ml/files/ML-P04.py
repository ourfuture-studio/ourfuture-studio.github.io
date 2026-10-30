# -*- coding: utf-8 -*-
# %% [markdown]
# # 04. 로지스틱 회귀
# 
# 점수 wx+b를 sigmoid에 넣어 0~1의 확률로 바꾸고, 0.5 이상이면 1로 정한다.

# %%
# 1. 실제 구현
# 배치 경사하강법으로 로지스틱 손실을 줄인다. 라이브러리와 반복 횟수·정규화가 달라 계수·확률의 정확한 일치를 요구하지 않는다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
x = np.array([0., 1., 2., 3.])  # 학습에 사용할 입력값 목록이다.
y = np.array([0., 0., 1., 1.])  # 각 입력에 대응하는 정답이다.
def sigmoid(z):  # 점수를 0~1 사이 값으로 바꾸는 함수를 만든다.
    return 1 / (1 + np.exp(-z))  # exp는 지수 함수이며, 점수가 0이면 결과는 0.5다.
w, b = 0., 0.  # 기울기와 절편을 0에서 시작한다.
for _ in range(400):  # 같은 갱신을 400번 반복한다. _는 쓰지 않는 반복 번호다.
    error = sigmoid(w*x + b) - y  # 각 표본의 예측 확률에서 실제 정답을 뺀다.
    w -= 0.2 * (error*x).mean()  # 기울기를 오차가 줄어드는 방향으로 조금 바꾼다.
    b -= 0.2 * error.mean()  # 평균 오차로 절편도 조금 바꾼다.
direct = int(sigmoid(w*2.5 + b) >= 0.5)  # x=2.5의 확률이 0.5 이상이면 1, 아니면 0이다.
print('직접 구현: x=2.5의 예측 →', direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.linear_model import LogisticRegression  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = LogisticRegression(C=1e6).fit(x.reshape(-1,1), y)  # 로지스틱 회귀를 학습한다. 큰 C는 규제를 약하게 한다.
library = int(model.predict([[2.5]])[0])  # 새 입력의 예측 범주를 정수 한 개로 꺼낸다.
print('sklearn: x=2.5의 예측 →', library)

# %%
# 3. 간단한 문제 · 같이 풀기
# sigmoid(0)은 얼마일까? 함수를 호출해 보자.
# 
# 풀이 과정:
# 1. sigmoid 식에 z=0을 넣는다.
# 2. exp(0)=1이므로 분모는 1+1=2이다.
# 3. 1/2=0.5이다.
exp_value = np.exp(0)  # exp(0)은 1이다.
denominator = 1 + exp_value  # 분모는 2다.
answer = 1 / denominator  # 1을 분모로 나눈다.
print('분모:', denominator, '→ 정답:', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 확률이 0.8일 때, 0.5 이상이면 1이라는 규칙으로 예측하자.
# 
# 힌트: int(0.8 >= 0.5)
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
