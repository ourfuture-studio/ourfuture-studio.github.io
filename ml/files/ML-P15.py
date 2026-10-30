# -*- coding: utf-8 -*-
# %% [markdown]
# # 15. 차원축소
# 
# PCA는 데이터를 평균 중심으로 옮긴 뒤, 분산이 가장 큰 축에 투영한다.

# %%
# 1. 실제 구현
# 공분산의 최대 고유벡터를 사용하는 PCA 한 축만 구현한다. 표준화·성분 수 선택은 추가하지 않는다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
X = np.array([[1.,1.],[2.,2.],[3.,3.]])  # 학습 입력 표다. 안쪽 대괄호 한 묶음이 한 행이다.
centered = X-X.mean(axis=0)  # 열별 평균을 빼 데이터의 중심을 0으로 옮긴다.
covariance = centered.T @ centered / (len(X)-1)  # 두 특성이 함께 변하는 정도를 행렬로 구한다.
eigenvalues,eigenvectors = np.linalg.eigh(covariance)  # 각 축의 분산 크기와 축의 방향을 구한다.
axis = eigenvectors[:,np.argmax(eigenvalues)]  # 고유값이 가장 큰 열, 즉 분산이 가장 큰 축을 고른다.
direct = centered @ axis  # 각 점을 선택한 축 위의 숫자 한 개로 바꾼다.
print('직접 구현: 2차원을 1차원으로 →',np.round(direct,3))

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.decomposition import PCA  # 이 주제에 사용할 sklearn 도구를 불러온다.
library = PCA(n_components=1).fit_transform(X).ravel()  # 라이브러리로 두 열을 주성분 한 열로 줄인다.
print('sklearn:',np.round(library,3))
# 축의 방향(부호)은 반대일 수 있지만 같은 직선에 투영한 결과다.

# %%
# 3. 간단한 문제 · 같이 풀기
# 특성 2개를 주성분 1개로 줄이면 출력의 열은 몇 개일까?
# 
# 풀이 과정:
# 1. 원래 데이터에는 특성 열이 2개다.
# 2. n_components=1은 주성분 한 개를 남긴다는 뜻이다.
# 3. 변환 결과의 열 수는 1개다.
before_columns = 2  # 원래 특성의 수다.
n_components = 1  # 남길 주성분의 수다.
answer = n_components  # 변환 결과의 열 수도 1개다.
print('변환 전:', before_columns, '열 → 변환 후:', answer, '열')

# %%
# 4. 과제 문제 · 정말 쉽게
# 특성 3개를 주성분 2개로 줄이면 출력의 열은 몇 개일까?
# 
# 힌트: n_components=2이다.
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
