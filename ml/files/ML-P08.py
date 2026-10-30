# -*- coding: utf-8 -*-
# %% [markdown]
# # 08. 서포트 벡터 머신
# 
# 분류 점수 wx+b의 부호로 예측한다. y(wx+b)가 1보다 작으면 hinge 손실이 생긴다.

# %%
# 1. 실제 구현
# 선형 SVM 목적함수 0.5*w² + 10*평균 hinge 손실을 경사 갱신한다. sklearn의 합 손실 계수는 10/4=2.5로 맞춘다. 커널과 정밀 최적화는 생략한다.
import numpy as np  # 숫자 배열과 계산에 쓸 numpy를 np라는 이름으로 불러온다.
x = np.array([-2.,-1.,1.,2.])  # 학습에 사용할 입력값 목록이다.
y = np.array([-1.,-1.,1.,1.])  # 각 입력에 대응하는 정답이다.
w, b = 0., 0.  # 직선의 기울기와 절편을 0에서 시작한다.
for _ in range(1000):  # 손실을 줄이는 갱신을 1000번 반복한다.
    active = y*(w*x+b)<1  # 정답×분류 점수가 1보다 작아 손실이 생기는 표본이다.
    dw = w - 10*(y[active]*x[active]).sum()/len(y)  # 기울기 규제와 손실 표본의 영향을 합친 변화량이다.
    db = -10*y[active].sum()/len(y)  # 손실 표본에서 절편의 변화량을 구한다.
    w -= 0.01*dw  # 구한 변화량의 0.01배만큼 기울기를 바꾼다.
    b -= 0.01*db  # 절편도 조금씩 바꾼다.
direct = np.where(w*np.array([-1.5,1.5])+b >= 0,1,-1)  # 점수가 0 이상이면 1, 음수이면 -1로 분류한다.
print('직접 구현: [-1.5, 1.5] →',direct)

# %%
# 2. 라이브러리로 구현
# 같은 작은 입력으로 핵심 계산을 확인한다.
from sklearn.svm import SVC  # 이 주제에 사용할 sklearn 도구를 불러온다.
model = SVC(kernel='linear',C=2.5).fit(x.reshape(-1,1),y)  # 직선 경계를 학습한다. C는 손실에 주는 가중치다.
library = model.predict([[-1.5],[1.5]])  # 새 입력 두 개의 범주를 예측한다.
print('sklearn:',library)

# %%
# 3. 간단한 문제 · 같이 풀기
# 정답 y=1이고 점수가 0.5다. hinge 손실 max(0, 1-y*점수)는?
# 
# 풀이 과정:
# 1. 정답 1과 점수 0.5를 곱해 0.5를 구한다.
# 2. 1에서 0.5를 빼면 0.5다.
# 3. 0과 비교해 큰 값인 0.5가 손실이다.
margin = 1 * 0.5  # 정답과 점수를 곱한다.
remaining = 1 - margin  # 목표 마진 1까지 부족한 양이다.
answer = max(0, remaining)  # 손실은 음수가 되지 않는다.
print('1 -', margin, '=', remaining, '→ 손실:', answer)

# %%
# 4. 과제 문제 · 정말 쉽게
# 정답 y=-1이고 점수가 -2일 때 손실을 구하자.
# 
# 힌트: max(0, 1-(-1)*(-2))
homework = None  # 아주 쉬운 과제: 이 한 줄만 바꾸세요.
print('과제:',homework)
