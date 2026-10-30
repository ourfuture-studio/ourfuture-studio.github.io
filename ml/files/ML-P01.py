# -*- coding: utf-8 -*-
# %% [markdown]
# # 01. 선형회귀
# 
# 직선 y = wx + b에서 제곱오차가 작아지는 기울기 w와 절편 b를 구한다.

# %%
# 1. 실제 구현
# 핵심 계산을 작은 데이터에서 직접 구현한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
x = np.array([1., 2., 3., 4.])  # 학습에 사용할 입력값 목록이다.
y = np.array([3., 5., 7., 9.])  # 각 입력에 대응하는 정답이다.
w = ((x-x.mean()) * (y-y.mean())).sum() / ((x-x.mean())**2).sum()  # 입력과 정답의 관계에서 기울기 w를 계산한다.
b = y.mean() - w*x.mean()  # 두 평균을 지나는 직선의 절편 b를 계산한다.
direct = w*5 + b  # 구한 직선에 새 입력 5를 넣는다.
print('기울기, 절편:', w, b)
print('직접 구현: x=5 →', direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.linear_model import LinearRegression  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = LinearRegression().fit(x.reshape(-1, 1), y)  # 입력을 한 열로 바꾸고, 정답과의 관계를 학습한다.
library = model.predict([[5]])[0]  # 새 입력 5의 예측값 한 개를 꺼낸다.
print('sklearn: x=5 →', library)

# %%
# 3. 간단한 문제 · 같이 풀기
# y = 2x + 1이다. x가 5이면 y는 얼마일까?
# 
# 풀이 과정:
# 1. 식 y=2x+1에 x=5를 넣는다.
# 2. 먼저 2×5=10을 구한다.
# 3. 절편 1을 더하면 y=11이다.
product = 2 * 5  # 기울기 2와 입력 5를 곱한다.
answer = product + 1  # 절편 1을 더한다.
print('2×5 =', product, '→ 1을 더한 정답:', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# x를 5에서 6으로만 바꾸어 y를 구하자.
# 
# 힌트: 2 * 6 + 1
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
