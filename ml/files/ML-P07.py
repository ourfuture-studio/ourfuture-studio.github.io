# -*- coding: utf-8 -*-
# %% [markdown]
# # 07. 랜덤포레스트
# 
# 표본을 중복 추출하고 특성을 무작위로 골라 여러 작은 나무를 만든 뒤 다수결한다.

# %%
# 1. 실제 구현
# 깊이 1의 나무 5개로 부트스트랩·특성 무작위성·투표를 직접 구현한다. sklearn은 나무별 확률을 평균하므로 직접 구현의 단순 다수결과 예측이 다를 수 있다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
X = np.array([[1.,0.],[2.,1.],[3.,0.],[4.,1.],[5.,0.],[6.,1.]])  # 학습 입력 표다. 안쪽 대괄호 한 묶음이 한 행이다.
y = np.array([0,0,0,1,1,1])  # 각 입력에 대응하는 정답이다.
rng = np.random.default_rng(42)  # 난수를 고정해 다시 실행해도 같은 표본을 뽑는다.
query = np.array([5.,0.])  # 이 새 입력을 다섯 나무가 각각 분류한다.
votes = []  # 나무별 예측 범주를 담을 빈 목록이다.
for _ in range(5):  # 작은 나무를 5개 만든다.
    rows = rng.choice(len(y),len(y),replace=True)  # 같은 표본이 여러 번 뽑힐 수 있게 중복 추출한다.
    feature = int(rng.integers(2))  # 이번 나무의 분할에 사용할 열 한 개를 무작위로 고른다.
    x, labels = X[rows,feature], y[rows]  # 뽑힌 표본의 입력 열과 정답만 꺼낸다.
    values = np.unique(x)  # 같은 입력값을 하나로 합치고 정렬한다.
    thresholds = (values[:-1]+values[1:])/2  # 서로 다른 입력값 사이를 경계 후보로 만든다.
    best = (float('inf'), int(labels.mean()>=0.5))  # 분할 후보가 없으면 표본 전체의 다수 범주를 쓴다.
    for t in thresholds:  # 각 경계 후보를 하나씩 확인한다.
        left = x<=t  # 현재 경계의 왼쪽에 있는 표본을 표시한다.
        p, q = labels[left].mean(), labels[~left].mean()  # 왼쪽과 오른쪽에서 각각 범주 1의 비율을 구한다.
        cost = left.mean()*2*p*(1-p) + (~left).mean()*2*q*(1-q)  # 표본 수로 가중한 두 묶음의 지니 불순도를 구한다.
        vote = int((p if query[feature]<=t else q)>=0.5)  # 새 입력이 들어갈 묶음의 다수 범주를 구한다.
        if cost<best[0]: best = (cost,vote)  # 지금까지보다 불순도가 작으면 이 분할을 기억한다.
    votes.append(best[1])  # 이 나무가 낸 표 한 개를 목록에 추가한다.
direct = int(sum(votes)>len(votes)/2)  # 1을 고른 나무가 절반보다 많으면 1로 정한다.
print('직접 만든 작은 나무들의 표:',votes,'다수결:',direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.ensemble import RandomForestClassifier  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = RandomForestClassifier(n_estimators=5,max_depth=1,max_features=1,random_state=42)  # 나무 5개, 깊이 1, 특성 후보 1개의 숲을 만든다.
model.fit(X,y)  # 입력과 정답으로 숲을 학습한다.
print('sklearn 예측:',int(model.predict([query])[0]))

# %%
# 3. 간단한 문제 · 같이 풀기
# 작은 나무 3개의 예측이 [0, 0, 1]이면 다수결 결과는?
# 
# 풀이 과정:
# 1. 나무 세 개의 표 [0, 0, 1]을 센다.
# 2. 0은 2표, 1은 1표다.
# 3. 다수결 결과는 0이다.
example_votes = [0, 0, 1]  # 세 나무의 예측이다.
zeros = example_votes.count(0)  # 0을 고른 나무 수다.
ones = example_votes.count(1)  # 1을 고른 나무 수다.
answer = 1 if ones > zeros else 0  # 더 많은 표를 받은 범주다.
print('0:', zeros, '표 / 1:', ones, '표 → 정답:', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 표만 [0, 1, 1]로 바꾸고 다수결하자.
# 
# 힌트: 0이 1표, 1이 2표다.
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
