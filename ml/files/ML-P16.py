# -*- coding: utf-8 -*-
# %% [markdown]
# # 16. 이상탐지
# 
# IQR=Q3−Q1이다. Q1−1.5×IQR보다 작거나 Q3+1.5×IQR보다 큰 값을 표시한다.

# %%
# 1. 실제 구현
# IQR 경계 한 가지에 한정한다. 비교 라이브러리는 numpy이며, 범위 밖 표시가 실제 오류의 확정은 아니다.
import math  # 내림·올림 계산 도구를 불러온다.
normal = [1.,2.,3.,4.]  # 기준 범위를 계산할 작은 데이터다.
# numpy 기본값과 같은 선형 보간 사분위수
def percentile(values,q):  # 정렬 위치 사이를 보간해 분위수를 계산한다.
    values = sorted(values)  # 작은 값부터 정렬한다.
    position = (len(values)-1)*q  # 구하려는 분위수가 정렬 배열의 어디쯤인지 찾는다.
    lo,hi = math.floor(position),math.ceil(position)  # 그 위치의 바로 아래와 위 정수 번호를 구한다.
    return values[lo]+(values[hi]-values[lo])*(position-lo)  # 두 값 사이를 위치 비율만큼 이어 계산한다.
q1,q3 = percentile(normal,0.25),percentile(normal,0.75)  # 25% 위치와 75% 위치의 값을 구한다.
iqr = q3-q1  # 가운데 50% 구간의 폭을 구한다.
lower,upper = q1-1.5*iqr,q3+1.5*iqr  # 아래와 위 경계를 각각 1.5 IQR만큼 넓힌다.
direct = 10<lower or 10>upper  # 10이 아래 경계보다 작거나 위 경계보다 큰지 확인한다.
print('직접 구현: 경계',lower,upper,'/ 10은 범위 밖?',direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
q1_np,q3_np = np.quantile(normal,[0.25,0.75],method='linear')  # numpy로 같은 선형 보간 사분위수를 구한다.
iqr_np = q3_np-q1_np  # 라이브러리 사분위수로 IQR을 구한다.
library = 10<q1_np-1.5*iqr_np or 10>q3_np+1.5*iqr_np  # 동일한 경계 규칙으로 10을 확인한다.
print('numpy: 10은 범위 밖?',bool(library))

# %%
# 3. 간단한 문제 · 같이 풀기
# Q1=2, Q3=4이면 IQR은?
# 
# 풀이 과정:
# 1. Q1=2와 Q3=4를 확인한다.
# 2. IQR은 Q3−Q1이다.
# 3. 4−2=2이다.
example_q1, example_q3 = 2, 4  # 문제에서 주어진 사분위수다.
answer = example_q3 - example_q1  # 가운데 50% 구간의 폭이다.
print(example_q3, '-', example_q1, '=', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 범위가 -1~7이면 값 10은 범위 밖일까? True/False로 적자.
# 
# 힌트: 10 > 7
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
