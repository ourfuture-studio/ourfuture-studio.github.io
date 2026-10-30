# -*- coding: utf-8 -*-
# %% [markdown]
# # 02. 다중선형회귀
# 
# 설명변수 두 개를 사용한다. y = b + w₁x₁ + w₂x₂를 한 번에 계산한다.

# %%
# 1. 실제 구현
# 서로 중복되지 않은 작은 입력에서 정규방정식으로 계산한다. 일반적인 수치해법과 모든 회귀 진단을 구현하는 예제는 아니다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
X = np.array([[1.,0.], [0.,1.], [1.,1.], [2.,1.]])  # 학습 입력 표다. 안쪽 대괄호 한 묶음이 한 행이다.
y = np.array([3., 4., 6., 8.])  # 각 입력에 대응하는 정답이다.
A = np.column_stack([np.ones(len(X)), X])  # 각 행 앞에 1을 붙여 절편도 함께 계산한다.
b, w1, w2 = np.linalg.solve(A.T @ A, A.T @ y)  # A.T는 행·열 바꾸기, @는 행렬 곱이다. 계수 세 개를 구한다.
direct = b + w1*2 + w2*2  # x1=2, x2=2를 식에 넣어 예측한다.
print('절편, 계수:', b, w1, w2)
print('직접 구현: [2, 2] →', direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.linear_model import LinearRegression  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = LinearRegression().fit(X, y)  # 두 입력 열과 정답의 관계를 학습한다.
library = model.predict([[2, 2]])[0]  # 새 입력 한 행 [2, 2]의 예측값을 꺼낸다.
print('sklearn: [2, 2] →', library)

# %%
# 3. 간단한 문제 · 같이 풀기
# y = 1 + 2x₁ + 3x₂이다. [x₁, x₂] = [2, 1]이면?
# 
# 풀이 과정:
# 1. x₁=2, x₂=1을 식에 넣는다.
# 2. 두 입력의 기여는 2×2=4와 3×1=3이다.
# 3. 절편까지 더하면 1+4+3=8이다.
first = 2 * 2  # 첫 번째 입력의 기여다.
second = 3 * 1  # 두 번째 입력의 기여다.
answer = 1 + first + second  # 절편과 두 기여를 더한다.
print('1 +', first, '+', second, '=', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# [x₁, x₂]만 [1, 2]로 바꾸어 계산하자.
# 
# 힌트: 1 + 2*1 + 3*2
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
