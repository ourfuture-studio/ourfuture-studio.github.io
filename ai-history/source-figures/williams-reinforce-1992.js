/* Original equation, not an invented architecture figure. */
window.AtlasPaperArchitecture.register([{workId:'williams-reinforce-1992',key:'original-williams-reinforce-1992',paper:{
 title:'1992 원문 갱신식 · 보상 차이와 선택의 흔적을 연결값 변화로',image:'assets/papers/williams-reinforce-1992-original.png',width:1300,height:170,
 alt:'윌리엄스 REINFORCE 논문 4절의 번호 없는 일반 갱신식 원문. 델타 w ij는 학습률 알파 ij, 보상 r에서 기준 b ij를 뺀 값, 특성 적격도 e ij를 곱한 값으로 적혀 있다.',
 caption:'받은 보상과 기준의 차이에, 방금 나온 출력을 더 쉽게 만들 연결의 방향을 곱한다. 원문에서 eᵢⱼ는 그 출력의 로그 확률을 연결값으로 미분한 값이다. 실제 행동 뒤 받은 하나의 평가를, 행동을 고르는 확률분포의 변화로 연결하려는 규칙이다.',
 source:'Ronald J. Williams · Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning · 1992',url:'https://people.cs.umass.edu/~barto/courses/cs687/williams92simple.pdf#page=5',
 credit:'§4의 번호 없는 일반 갱신식 · UMass 강의에 보관된 저자 형식 PDF 5쪽. 원래 수식을 [170,482,430,516]pt 영역에서 360dpi로 렌더했다. 논문 서지는 Machine Learning 8, pp.229–256 (1992)이며, 이 재배포본의 PDF 쪽수와 학술지 쪽수를 같은 번호로 취급하지 않는다.',
 distinction:'이 이미지는 원문 수식이며 회로도나 실험 결과가 아니다. 원문은 기준값의 조건부 독립성과 학습률 등의 조건 아래 평균 갱신 방향을 분석한다. 아래 두 행동·보상 값은 베르누이-로지스틱 특수형을 직접 정한 사례로 옮긴 것으로, 원논문의 실험이나 DeepSeek-R1 학습을 재현한 결과가 아니다.',label:'원문 수식 · §4 · 일반 갱신식(번호 없음)'
}}]);
