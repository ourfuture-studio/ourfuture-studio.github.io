# -*- coding: utf-8 -*-
# %% [markdown]
# # 06. 의사결정나무
# 
# 후보 경계마다 나눈 뒤의 지니 불순도를 계산하고, 가장 작은 경계를 선택한다.

# %%
# 1. 실제 구현
# 분할 한 번인 깊이 1의 결정나무만 직접 구현한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
x = np.array([1., 2., 3., 4.])  # 학습에 사용할 입력값 목록이다.
y = np.array([0, 0, 1, 1])  # 각 입력에 대응하는 정답이다.
def gini(labels):  # 한 묶음의 범주가 얼마나 섞였는지 계산한다.
    p = labels.mean()  # 그 묶음에서 범주 1의 비율을 구한다.
    return 1 - p**2 - (1-p)**2  # 1에서 두 범주 비율의 제곱을 각각 뺀다.
def split_cost(t):  # 후보 경계 t로 나눈 두 묶음의 불순도를 계산한다.
    left = x <= t  # 경계 이하인 표본이면 True가 된다.
    return left.mean()*gini(y[left]) + (~left).mean()*gini(y[~left])  # 각 묶음의 불순도에 그 묶음의 표본 비율을 곱해 더한다.
thresholds = (x[:-1]+x[1:])/2  # 이웃한 입력값 사이의 중간점을 경계 후보로 만든다.
threshold = min(thresholds, key=split_cost)  # 분할 후 불순도가 가장 작은 후보를 고른다.
direct = int(y[x>threshold].mean() >= 0.5)  # 3.5가 속한 오른쪽 묶음의 다수 범주를 고른다.
print('선택한 경계:', threshold, '분할 후 지니:', split_cost(threshold))
print('직접 구현: x=3.5 →', direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.tree import DecisionTreeClassifier  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = DecisionTreeClassifier(max_depth=1,random_state=42).fit(x.reshape(-1,1),y)  # 분할 한 번만 허용하는 나무를 학습한다.
library = int(model.predict([[3.5]])[0])  # 새 입력 3.5의 범주를 꺼낸다.
print('sklearn 경계:', model.tree_.threshold[0], '예측:', library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 범주가 [0, 0]인 묶음의 지니 불순도는 얼마일까?
# 
# 풀이 과정:
# 1. 범주 [0, 0]에서 범주 1의 비율은 0/2=0이다.
# 2. 범주 0의 비율은 1−0=1이다.
# 3. 지니는 1−0²−1²=0이다.
p_one = 0 / 2  # 두 표본 중 범주 1은 없다.
p_zero = 1 - p_one  # 나머지는 모두 범주 0이다.
answer = 1 - p_one**2 - p_zero**2  # 지니 공식에 넣는다.
print('1 -', p_one**2, '-', p_zero**2, '=', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 범주가 [0, 1]인 묶음의 지니 불순도를 구하자.
# 
# 힌트: gini(np.array([0, 1]))
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
