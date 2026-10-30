# -*- coding: utf-8 -*-
# %% [markdown]
# # 10. 군집화
# 
# K-means는 가까운 중심에 점을 배정하고, 배정된 점들의 평균으로 중심을 바꾼다.

# %%
# 1. 실제 구현
# 군집화 중 K-means의 배정과 중심 갱신만 다룬다. 이 작은 예제는 빈 군집이 생기지 않는 입력으로 한정한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
X = np.array([[1.],[2.],[8.],[9.]])  # 학습 입력 표다. 안쪽 대괄호 한 묶음이 한 행이다.
centers = np.array([[1.],[9.]])  # 두 군집의 중심을 1과 9에서 시작한다.
for _ in range(3):  # 배정과 중심 갱신을 세 번 반복한다.
    distance = ((X[:,None,:]-centers[None,:,:])**2).sum(axis=2)  # 각 점과 각 중심 사이의 제곱거리를 계산한다.
    labels = distance.argmin(axis=1)  # 점마다 가장 가까운 중심의 번호를 고른다.
    centers = np.array([X[labels==k].mean(axis=0) for k in range(2)])  # 같은 군집의 점들을 평균 내 새 중심으로 바꾼다.
direct = centers.ravel()  # 중심 배열을 출력하기 쉬운 한 줄로 편다.
print('직접 구현의 중심:',direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.cluster import KMeans  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = KMeans(n_clusters=2,init=np.array([[1.],[9.]]),n_init=1,random_state=42).fit(X)  # 같은 초기 중심으로 두 군집을 학습한다.
library = model.cluster_centers_.ravel()  # 학습한 중심값을 한 줄 배열로 꺼낸다.
print('sklearn의 중심:',library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 한 군집에 들어간 점이 [1, 2]이면 새 중심은?
# 
# 풀이 과정:
# 1. 같은 군집의 점 1과 2를 더하면 3이다.
# 2. 표본 수는 2개다.
# 3. 평균인 3/2=1.5가 새 중심이다.
total = 1 + 2  # 군집 안의 값을 더한다.
count = 2  # 군집 안의 점 두 개다.
answer = total / count  # 평균이 새 중심이다.
print(total, '/', count, '=', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 점이 [8, 10]이면 새 중심은 얼마일까?
# 
# 힌트: (8+10)/2
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
