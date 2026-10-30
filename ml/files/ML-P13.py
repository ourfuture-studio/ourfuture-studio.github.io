# -*- coding: utf-8 -*-
# %% [markdown]
# # 13. 연관규칙 분석
# 
# 지지도=함께 산 거래/전체 거래, 신뢰도=함께 산 거래/빵 거래, 향상도=신뢰도/우유 구매율이다.

# %%
# 1. 실제 구현
# 빵→우유 규칙 한 개의 세 비율만 계산한다. 라이브러리 부분은 pandas 집계이며 빈발집합 탐색 전체를 구현하지 않는다.
baskets = [{'빵','우유'}, {'빵'}, {'우유'}, {'빵','우유'}]  # 중괄호 하나가 거래 한 건의 상품 묶음이다.
total = len(baskets)  # 전체 거래 수를 센다.
bread = sum('빵' in t for t in baskets)  # 빵이 포함된 거래 수를 센다.
milk = sum('우유' in t for t in baskets)  # 우유가 포함된 거래 수를 센다.
both = sum({'빵','우유'} <= t for t in baskets)  # 빵과 우유가 모두 포함된 거래 수를 센다.
direct = [both/total, both/bread, (both/bread)/(milk/total)]  # 각각의 분모로 지지도·신뢰도·향상도를 계산한다.
print('직접 구현: 지지도, 신뢰도, 향상도:',direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
import pandas as pd  # 표를 다루는 pandas를 pd라는 이름으로 불러온다.
df = pd.DataFrame({'빵':['빵' in t for t in baskets], '우유':['우유' in t for t in baskets]})  # 각 거래의 빵·우유 포함 여부를 표로 만든다.
support = (df['빵'] & df['우유']).mean()  # 둘 다 True인 비율, 즉 함께 산 거래 비율이다.
confidence = support/df['빵'].mean()  # 동시 구매율을 빵 구매율로 나눈다.
lift = confidence/df['우유'].mean()  # 신뢰도를 우유의 전체 구매율로 나눈다.
library = [support,confidence,lift]  # 세 계산 결과를 같은 순서로 모은다.
print('pandas:',library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 4거래 중 빵과 우유를 함께 산 거래가 2개면 지지도는?
# 
# 풀이 과정:
# 1. 지지도의 분모는 전체 거래 4건이다.
# 2. 함께 산 거래는 2건이다.
# 3. 2/4=0.5, 즉 전체의 50%다.
joint = 2  # 빵과 우유를 함께 산 거래 수다.
all_transactions = 4  # 지지도의 분모는 전체 거래 수다.
answer = joint / all_transactions  # 함께 산 거래의 비율이다.
print(joint, '/', all_transactions, '=', answer, '(50%)')

# %%
# 4. 과제 문제 · 정말 쉽게
# 빵을 산 3거래 중 우유도 산 거래가 2개면 빵→우유의 신뢰도는?
# 
# 힌트: 2/3
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
