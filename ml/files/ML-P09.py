# -*- coding: utf-8 -*-
# %% [markdown]
# # 09. 부스팅
# 
# 현재 예측의 잔차를 다음 작은 모델이 학습하고, 그 예측을 조금 더한다.

# %%
# 1. 실제 구현
# 제곱오차를 사용하는 Gradient Boosting의 깊이 1 잔차 나무 두 개를 직접 학습한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
x = np.array([1.,2.,3.,4.])  # 학습에 사용할 입력값 목록이다.
y = np.array([1.,1.,3.,3.])  # 각 입력에 대응하는 정답이다.
prediction = np.full(len(y),y.mean())  # 모든 표본의 첫 예측을 정답 평균으로 놓는다.
for _ in range(2):  # 잔차를 보완하는 작은 나무를 두 번 만든다.
    residual = y-prediction  # 실제값에서 현재 예측을 빼 남은 오차를 구한다.
    best = None  # 이번 단계에서 가장 좋은 보완값을 저장할 자리다.
    for t in (x[:-1]+x[1:])/2:  # 입력값 사이의 중간점을 경계 후보로 확인한다.
        left = x<=t  # 후보 경계의 왼쪽 표본을 표시한다.
        correction = np.where(left,residual[left].mean(),residual[~left].mean())  # 각 묶음의 평균 잔차를 그 묶음의 보완값으로 쓴다.
        error = ((residual-correction)**2).sum()  # 보완값이 잔차를 얼마나 못 맞췄는지 제곱해 더한다.
        if best is None or error<best[0]: best = (error,correction)  # 오차가 가장 작은 분할의 보완값을 기억한다.
    prediction += 0.5*best[1]  # 현재 예측에 보완값의 절반만 더한다.
direct = prediction  # 두 번 보완한 최종 예측을 저장한다.
print('직접 구현: 잔차를 두 번 보완 →',direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.ensemble import GradientBoostingRegressor  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = GradientBoostingRegressor(n_estimators=2,learning_rate=0.5,max_depth=1,random_state=42)  # 학습률 0.5, 깊이 1의 나무 두 개를 만든다.
library = model.fit(x.reshape(-1,1),y).predict(x.reshape(-1,1))  # 같은 입력에서 학습 후 예측값을 계산한다.
print('sklearn:',library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 실제값이 5, 현재 예측이 3이면 잔차는 얼마일까?
# 
# 풀이 과정:
# 1. 실제값은 5, 현재 예측은 3이다.
# 2. 잔차는 실제값−예측값이다.
# 3. 5−3=2만큼 예측이 부족하다.
actual = 5  # 실제 정답이다.
predicted = 3  # 현재 모델의 예측이다.
answer = actual - predicted  # 아직 남은 오차를 구한다.
print(actual, '-', predicted, '=', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 현재 예측 3에 잔차 2의 절반만 더하면 얼마일까?
# 
# 힌트: 3 + 0.5*2
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
