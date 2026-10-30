# -*- coding: utf-8 -*-
# %% [markdown]
# # 12. 협업 필터링
# 
# 기록이 비슷한 다른 사용자의 평점을 유사도로 가중 평균해 빈 평점을 예상한다.

# %%
# 1. 실제 구현
# 공통 평가 항목이 고정된 두 이웃의 코사인 유사도와 평점 가중 평균만 구현한다. 결측 탐색·이웃 선택·신규 사용자는 생략한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
# 공통으로 평가한 강의 두 개의 평점이다.
me = np.array([5.,1.])  # 내가 공통 강의 두 개에 준 평점이다.
neighbors = np.array([[5.,1.],[1.,5.]])  # 다른 사용자 두 명이 같은 강의에 준 평점이다.
new_item_ratings = np.array([4.,2.])  # 나는 아직 평가하지 않은 강의의 이웃 평점이다.
similarity = (neighbors @ me)/(np.linalg.norm(neighbors,axis=1)*np.linalg.norm(me))  # 공통 평점 벡터의 방향으로 사용자 유사도를 구한다.
direct = (similarity*new_item_ratings).sum()/similarity.sum()  # 평점×유사도를 더한 뒤 유사도 합으로 나눈다.
print('직접 구현의 예상 평점:',round(direct,2))

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.metrics.pairwise import cosine_similarity  # 이 주제에 사용할 sklearn 도구를 불러온다.
weights = cosine_similarity([me],neighbors).ravel()  # 라이브러리로 구한 두 사용자 유사도를 가중치로 쓴다.
library = np.average(new_item_ratings,weights=weights)  # numpy의 가중 평균으로 같은 평점을 예상한다.
print('sklearn 유사도 + numpy 가중 평균:',round(library,2))

# %%
# 3. 간단한 문제 · 같이 풀기
# 유사도가 같은 이웃 둘의 평점이 4, 2면 예상 평점은?
# 
# 풀이 과정:
# 1. 유사도가 같으므로 두 평점을 같은 비중으로 쓴다.
# 2. 4+2=6을 구한다.
# 3. 이웃 두 명으로 나누면 평균 3이다.
total = 4 + 2  # 같은 비중으로 두 평점을 더한다.
answer = total / 2  # 이웃 두 명의 평균을 구한다.
print(total, '/ 2 =', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 이웃 평점만 5, 3으로 바꾸고 평균을 구하자.
# 
# 힌트: (5+3)/2
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
