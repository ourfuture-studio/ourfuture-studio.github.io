# -*- coding: utf-8 -*-
# %% [markdown]
# # 03. 다항회귀
# 
# x에 x² 열을 더한다. 곡선을 그리지만 계수에 대해서는 선형회귀다.

# %%
# 1. 실제 구현
# 핵심 계산을 작은 데이터에서 직접 구현한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
x = np.array([0., 1., 2., 3.])  # 학습에 사용할 입력값 목록이다.
y = np.array([1., 4., 9., 16.])  # 각 입력에 대응하는 정답이다.
A = np.column_stack([np.ones(len(x)), x, x**2])  # 1, x, x²을 열로 쌓는다. **2는 제곱이다.
b, w1, w2 = np.linalg.solve(A.T @ A, A.T @ y)  # 제곱오차를 줄이는 절편과 두 계수를 구한다.
direct = b + w1*4 + w2*4**2  # 새 입력 x=4를 다항식에 넣는다.
print('계수:', b, w1, w2)
print('직접 구현: x=4 →', direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.preprocessing import PolynomialFeatures  # 이 주제에 사용할 sklearn 도구를 불러온다.
from sklearn.linear_model import LinearRegression  # 이 주제에 사용할 sklearn 도구를 불러온다.
poly = PolynomialFeatures(degree=2, include_bias=False)  # x를 x와 x² 두 열로 늘리는 도구를 만든다.
model = LinearRegression().fit(poly.fit_transform(x.reshape(-1,1)), y)  # 늘어난 두 열로 선형회귀를 학습한다.
library = model.predict(poly.transform([[4]]))[0]  # 새 입력도 똑같이 두 열로 바꾼 뒤 예측한다.
print('sklearn: x=4 →', library)

# %%
# 3. 간단한 문제 · 같이 풀기
# y = 1 + 2x + x²이다. x=2이면?
# 
# 풀이 과정:
# 1. x=2를 넣는다.
# 2. 2x는 4, x²도 4이다.
# 3. 1+4+4=9이다.
linear = 2 * 2  # 2x 부분을 계산한다.
square = 2 ** 2  # x² 부분을 계산한다.
answer = 1 + linear + square  # 세 항을 더한다.
print('1 +', linear, '+', square, '=', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# x만 3으로 바꾸어 계산하자.
# 
# 힌트: 1 + 2*3 + 3**2
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
