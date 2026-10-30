# -*- coding: utf-8 -*-
# %% [markdown]
# # 05. K-최근접 이웃
# 
# 새 점에서 가까운 K개를 고르고, 그 이웃들의 다수결로 범주를 정한다.

# %%
# 1. 실제 구현
# 핵심 계산을 작은 데이터에서 직접 구현한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
X = np.array([[1.], [2.], [4.], [5.]])  # 학습 입력 표다. 안쪽 대괄호 한 묶음이 한 행이다.
y = np.array([0, 0, 1, 1])  # 각 입력에 대응하는 정답이다.
query, k = np.array([3.8]), 3  # 새 입력은 3.8이고, 가까운 이웃 3개를 본다.
distance = np.sqrt(((X-query)**2).sum(axis=1))  # 입력 차이를 제곱해 더한 뒤 제곱근을 취해 거리를 구한다.
neighbors = np.argsort(distance)[:k]  # 거리가 작은 순서로 정렬하고 앞의 K개 위치를 고른다.
direct = int(np.bincount(y[neighbors]).argmax())  # bincount로 범주별 표 수를 세고 가장 많은 범주를 고른다.
print('가까운 이웃의 범주:', y[neighbors])
print('직접 구현:', direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.neighbors import KNeighborsClassifier  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = KNeighborsClassifier(n_neighbors=k).fit(X,y)  # 이웃 수를 정하고 학습 표본을 저장한다.
library = int(model.predict([query])[0])  # 새 입력 한 개의 범주를 예측한다.
print('sklearn:', library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 이웃 3개의 범주가 [0, 1, 1]이면 어느 범주일까?
# 
# 풀이 과정:
# 1. 이웃 범주 [0, 1, 1]에서 표를 센다.
# 2. 0은 1표, 1은 2표다.
# 3. 더 많은 1을 고른다.
example_votes = [0, 1, 1]  # 가장 가까운 이웃 세 개의 범주다.
zeros = example_votes.count(0)  # 0이 나온 횟수를 센다.
ones = example_votes.count(1)  # 1이 나온 횟수를 센다.
answer = 1 if ones > zeros else 0  # 표가 더 많은 범주를 고른다.
print('0:', zeros, '표 / 1:', ones, '표 → 정답:', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 이웃만 [0, 0, 1]로 바꾸면 어느 범주일까?
# 
# 힌트: 가장 많이 나온 범주를 고른다.
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
