# -*- coding: utf-8 -*-
# %% [markdown]
# # 11. 내용 기반 필터링
# 
# 내용을 특성 벡터로 표현하고, 코사인 유사도가 큰 항목부터 추천한다.

# %%
# 1. 실제 구현
# 텍스트 전처리는 생략하고, 이미 만들어진 주제 벡터의 유사도와 읽은 항목 제외만 구현한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
names = ['회귀 입문','회귀 응용','SQL 입문']  # 추천할 세 강의의 이름이다.
# 두 특성: [회귀 주제, SQL 주제]
items = np.array([[1.,0.],[1.,0.],[0.,1.]])  # 각 강의의 주제를 0과 1 두 숫자로 표시한다.
profile = np.array([1.,0.])  # 사용자는 회귀 주제에 관심이 있다.
direct = (items @ profile) / (np.linalg.norm(items,axis=1)*np.linalg.norm(profile))  # 벡터 내적을 두 길이의 곱으로 나눠 코사인 유사도를 구한다.
print('직접 구현의 유사도:',direct)
unseen = np.array([1,2])  # 이미 읽은 0번을 빼고 1번과 2번만 후보로 남긴다.
print('추천:',names[unseen[direct[unseen].argmax()]])

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.metrics.pairwise import cosine_similarity  # 이 주제에 사용할 sklearn 도구를 불러온다.
library = cosine_similarity([profile],items).ravel()  # 라이브러리로 사용자와 세 강의의 유사도를 계산한다.
print('sklearn의 유사도:',library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 프로필 [1, 0]에 더 가까운 것은 A=[1, 0]과 B=[0, 1] 중 어느 쪽일까?
# 
# 풀이 과정:
# 1. 프로필 [1, 0]과 A=[1, 0]은 같은 방향이다.
# 2. B=[0, 1]과는 직각이므로 유사도가 0이다.
# 3. A의 유사도 1이 더 크므로 A를 고른다.
score_a = 1*1 + 0*0  # 두 벡터 길이가 1이므로 내적이 코사인 유사도다.
score_b = 1*0 + 0*1  # B와의 유사도는 0이다.
answer = 'A' if score_a > score_b else 'B'  # 더 비슷한 항목을 고른다.
print('A:', score_a, '/ B:', score_b, '→ 정답:', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 프로필만 [0, 1]로 바꾸면 A와 B 중 어느 쪽이 가까울까?
# 
# 힌트: 프로필과 같은 방향을 고른다.
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
