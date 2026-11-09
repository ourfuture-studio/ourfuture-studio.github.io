/* LTN2022 accepted manuscript: differentiable fuzzy satisfaction, not a classical proof score. */
(function(){
 'use strict';const paper='https://openaccess.city.ac.uk/id/eprint/27580/1/2012.13635.pdf',source=(page,title)=>({title:'Badreddine 외 (2022) · '+title,url:paper+'#page='+page});
 window.AtlasEntries.register({id:'ltn',record:{
  title:'LTN · 알고 있는 관계를, 배움이 따라갈 조건으로 쓰다',subtitle:'Logic Tensor Networks',dateLabel:'2021 온라인 공개 ·2022 학술지 권호',people:['Samy Badreddine','Artur d’Avila Garcez','Luciano Serafini','Michael Spranger'],
  authorNote:'Samy Badreddine, Artur d’Avila Garcez, Luciano Serafini, Michael Spranger의 논문. Artificial Intelligence303, article103649, 2022. 대학 저장소의 accepted manuscript61쪽(표지 포함)을 확인했다. DOI의2021과 온라인2021년12월 공개,2022년2월 권호를 구분하며 사건연도2022를 유지한다.',
  summary:'대상과 개념을 벡터·신경 계산에 연결하고, 개념 사이의 관계를 미분 가능한 퍼지 논리식으로 표현했다. 사례와 관계의 문장을 함께 더 만족시키도록 학습한다.',detail:'',question:'',related:['cilp','knowledge-representation','deepproblog'],
  sources:[{title:'Badreddine 외2022 · 저자 대학 공개본',url:paper},{title:'Logic Tensor Networks · 공식 코드',url:'https://github.com/logictensornetworks/logictensornetworks'}],
  caveat:'[0,1]값은 선택한 퍼지 의미론의 만족도다. 확률·고전 논리 진리값·증명 성공과 구분한다. 아래6개체·특징·레이블·술어·학습 설정은 직접 작성했다.'
 },content:{article:{
  question:'정답 사례만 외우는 대신,\n“이 개념이면 저 개념도 성립한다”는 관계를 배움에 넣을 수 있을까?',
  opening:[
   '“원이라면 도형이다.” 개별 그림의 정답을 모두 붙이지 않아도 알고 있는 개념의 관계다. 원이라는 판단은 높게 하면서 도형이라는 판단을 낮게 하는 모델이라면 이 관계와 어긋난다. LTN은 이런 관계의 문장을 학습이 함께 만족해야 할 조건으로 표현하려 했다.',
   '먼저 기호가 무엇을 가리키는지 계산으로 연결한다. 대상은 특징 벡터가 되고, Circle이나 Shape라는 술어는 그 특징에서 값을 계산하는 함수가 된다. 이 연결이 grounding이다. 논리식의 연결사와 양화사도 실수값을 계산하는 연산으로 정하면, 대상의 특징에서 문장의 만족도까지 하나의 계산 그래프가 이어진다.',
   '그 그래프를 거슬러 기울기를 구하면, 어떤 매개변수를 바꾸어야 알고 있는 사실과 관계를 더 만족하는지 계산할 수 있다. 다만 여기의 만족도는 고전 논리에서 증명을 찾았다는 뜻도, 실제 사건의 보정된 확률도 아니다. 어떤 연산과 대상 범위, 고정한 지식 아래에서 높아진 값인지 함께 살펴야 한다.'
  ],visual:{id:'ltn-satisfaction-learning',navLabel:'관계를 학습의 조건으로',title:'대상에서 개념으로, 관계의 만족도에서 학습으로',caption:'직접 만든6개체의 특징과 원형 정도를 사용합니다. 술어의 계산, 원→도형의 퍼지 함의, 전체 집계, 매개변수의 실제 기울기 수정을 차례로 연결합니다.',
   stages:[{id:'ground',label:'1 · 기호를 계산에 연결',text:'개체는 특징값을, 술어는 그 대상에 대해 계산한 값을 가진다. Circle은 고정하고 Shape의w·b를 학습한다.'},{id:'constraint',label:'2 · 관계의 만족도 계산',text:'원→도형의 함의를 개체마다 계산하고, 전체 조건과 알려진 두 레이블을 집계한다. 연산을 선택한 의미를 확인한다.'},{id:'learn',label:'3 · 만족도를 높이도록 수정',text:'전체 만족도에서w·b까지 실제 기울기를 계산한다. 보편 규칙을 사용하거나 빼고 같은 시작점에서 비교한다.'}],
   objects:[{id:'A',label:'개체 A',feature:-1,circle:.95,shapeLabel:true},{id:'B',label:'개체 B',feature:-.6,circle:.85,shapeLabel:null},{id:'C',label:'개체 C',feature:-.2,circle:.7,shapeLabel:null},{id:'D',label:'개체 D',feature:.2,circle:.3,shapeLabel:null},{id:'E',label:'개체 E',feature:.6,circle:.15,shapeLabel:null},{id:'F',label:'개체 F',feature:1,circle:.05,shapeLabel:false}],initial:{selected:'B',parameters:[-.4,-1.2],p:2,epsilon:.001,includeRule:true},
   originalImage:{src:'ltn-2022-grounding-graph.png',title:'원논문 Figure1 · 기호의 결합을 tensor계산으로 옮기다',alt:'LTN Figure1의 grounding그래프. 변수x와y의 값이 함수f를 거쳐 결합되고 술어p의값으로 계산된다. x와y축은 자유변수에 따른 tensor차원을 나타낸다.',caption:'Example3의 함수f와 술어p가 만드는 계산 도식만 발췌했다. 변수x·y에 주어진 값들의 조합이 함수와 술어를 거쳐 tensor로 계산된다. 원문은 자유변수의 차원과 특징 차원을 구분해 설명한다. 위의6개체 원→도형 사례는 이 예제의 값과 함수를 재현한 것이 아니다.',credit:'Samy Badreddine 등4명, Logic Tensor Networks, accepted manuscript p.7 / 저장소 PDF p.8, Figure1 도식. 원문 수식·축·배치를 보존하고 설명은 밖에 붙였다. City Research Online의 CC-BY-NC-ND4.0 표시와 최종 출판본 차이를 구분한다.',source:source(8,'Figure1 · Example3 grounding그래프')},
   source:source(12,'§2.4 · Product와Stable Product의 연산'),scope:'각 대상의 특징과 Circle값을 고정하고 Shape(x)=sigmoid(w·feature+b)의두 매개변수만 학습한다. A양성·F음성 레이블과 선택한 보편 규칙을 p-mean error로 집계한다. 직접 작성한6개체의 같은 지식베이스에서 만족도와 손실을 표시하며 일반화 평가가 아니다. 기호식 파서·일반 일차 논리 정리증명기나 원문의 전체 TensorFlow실험을 구현한 결과로 표시하지 않는다.'
  },takeaway:{title:'논리식이, 신경 계산을 바꿀 기울기의 출발점이 된다',text:'LTN은 기호의 의미를 벡터와 함수에 연결하고, 관계의 문장을 미분 가능한 만족도로 계산한다. 그 만족도에서 매개변수로 기울기를 되돌려 사례와 개념 관계를 함께 학습한다. 값이 높아졌다는 사실은 선택한 의미론·지식·대상 범위 안에서 해석한다.'},
  technical:{title:'Real Logic의 연산과 이 사례의 검증 범위',paragraphs:[
   '판본과 연도: 대학 저장소는 Artificial Intelligence303:103649, 2022, DOI10.1016/j.artint.2021.103649의 accepted version을 제공한다. 저장소 기록은2021년11월26일 수락,12월2일 온라인 출판,2022년2월1일 권호 출판을 구분한다. 확인한 PDF61쪽은 저장소 표지1쪽+원고60쪽이다. 이 카드의 위치는 원고쪽수와 PDF쪽수를 함께 쓴다.2016년 두 저자의 초기 LTN논문과2022년 네 저자의 체계를 구분한다.',
   'Grounding은 의미를 계산에 잇는다: §2와§3.1은 상수·변수·함수·술어를 실수 벡터·tensor와 그 사이의 함수에 연결한다. 일부 grounding은 고정할 수 있고 일부는 학습할 매개변수로 정의한다. 이 보기의 개체A–F는1차원 특징을 가지고, Circle값은 표로 고정한다. Shape만sigmoid(w·x+b)로 계산한다. 실제 이미지에서 원형을 측정한 결과나 원논문의 학습 자료가 아니다.',
   '퍼지 연결사는 선택한 의미론이다: §2.4의 Product Real Logic은 부정1−a, conjunction ab, disjunction a+b−ab, Reichenbach함의1−a+ab를 사용한다. 이는 a,b가0또는1일 때 고전 논리의 해당 진리표와 일치하지만 중간값의 해석과 학습 기울기는 별도로 정한 의미론이다. 함의가.9라는 숫자를 그 관계가 실제로 참일 확률90%로 읽지 않는다.',
   '전제를 낮추는 우회로: I(a,b)=1−a+ab에서 ∂I/∂a=b−1, ∂I/∂b=a다. 결론b가 낮더라도 전제a를 줄이면 함의값이 커질 수 있다. 따라서 의미 있는 사실 grounding이나 데이터 조건도 함께 필요하다. 이 카드에서는 Circle을 고정하고 Shape만 학습해 그 우회로를 열지 않는다. 별도a·b슬라이더는 이 현상을 실제 수치와 기울기로 보여 주며 선택 개체의 값을 바꾸지 않는다.',
   '양화와 집계: 원문수식(12)은 A_pME(values)=1−mean((1−values)^p)^(1/p)를 보편 양화의 부드러운 최소값 근사로 사용한다. p=1은평균이고 p를 높이면 낮은 만족도에 더 비중을 둔다. 이 보기에서는6개 함의의 집계에p=1·2·8을 선택하고, 알려진 개별 문장들과 전체 규칙의 최종 SatAgg에는p=2를 사용한다. 유한6개체에서 높은 값이 모든 가능한 대상에 대한 고전적 전칭 증명이 되는 것은 아니다.',
   'Stable Product를 선택하면: 원문수식(13)–(20)은 π₀(a)=(1−ε)a+ε, π₁(a)=(1−ε)a로 경계의 기울기 문제를 완화한다. 이 보기의 기본ε=.001은 직접 정한 값이다. 함의에는 I(π₀(a),π₁(b)), 보편 집계와 최종 집계에는 π₁투영 후의p-mean error를 쓴다. ε=0으로 바꾸면 기본 연산으로 돌아간다. 투영된 연산은 경계값과 일부 대수 성질을 바꾸며, 원문도 안정화된 conjunction이 엄밀한T-norm의identity를 만족하지 않음을 명시한다.',
   '함께 학습하는 지식: 이 사례의 문장은 Shape(A), ¬Shape(F), 선택 시∀x(Circle(x)→Shape(x))다. 마지막 규칙을 빼면 두 레이블만 같은 시작점에서 학습한다. B–E의 Shape정답은 따로 주지 않았다. 규칙이 이들의 값을 움직일 수 있다는 점을 살피지만, 이렇게 움직인 값이 별도 정답과 일치한다고 검증한 실험은 아니다.',
   '실제로 계산하는 갱신: 원문§3.2는 SatAgg를 최대화하는 매개변수를 찾는 학습을 정의한다. 여기서는 L=1−SatAgg를 최소화하고, sigmoid·함의·집계의연쇄 미분으로 ∂L/∂w와∂L/∂b를 직접 계산한다. 학습률.5의 전체 묶음 경사 하강을0–200회 실행한다. 손실을 줄이는 계산과 통계적 일반화, 고전적 증명은 다른 검증 대상이다. 오차가 정확히0인 비안정화 집계의 미분은 이 구현에서0으로 정의하며 기본 안정화 설정에서는 경계로부터 떨어져 계산한다.',
   '무엇을 검증하는가: 이 데모는 연결사의 경계 진리표, 집계값·매개변수 기울기를 독립 수식과 유한차분으로 비교하고, 실제 갱신이 같은 지식베이스의 손실을 바꾸는지 확인한다. 원논문의 TensorFlow모델이나 분류·회귀·관계 학습의 전체 성능을 재현한 결과가 아니다. 이 카드의 신경 함수는 두 매개변수의sigmoid술어이며 일반적인 심층 신경망 전체를 학습하지 않는다.'
  ],formula:'Circle(x)의 값 a는 고정\nShape(x)의 값 b = σ(w·feature+bias)\n\n기본 함의 I(a,b) = 1−a+ab\n∂I/∂a = b−1 · ∂I/∂b = a\n\n∀ 집계 = 1−mean((1−I)^p)^(1/p)\n전체 SatAgg: 레이블 문장과 선택한 규칙을p=2로 집계\nL = 1−SatAgg\n[w,bias] ← [w,bias] − .5·∇L\n\n안정화 선택 시 함의와집계에π₀·π₁투영 적용\n만족도 ≠ 보정된 확률 ≠ 고전 논리의 증명 성공'}
 },keyIdeas:[{title:'기호의 의미를 계산 그래프에 연결한다',text:'대상은 특징 벡터, 술어는 그 특징을 입력으로 받는 함수가 된다. 고정한 의미와 학습할 의미를 나누어 정한다.'},{title:'알고 있는 관계를 학습의 조건으로 쓴다',text:'원→도형 같은 관계를 개별 대상의 퍼지 값으로 계산하고 집계해 레이블 지식과 함께 학습한다.'},{title:'만족도에서 기울기를 되돌린다',text:'연결사·양화사의 연속 계산을 거슬러 매개변수를 수정한다. 선택한 의미론과 대상 범위가 결과의 해석을 정한다.'}],videos:[],references:[
  {title:'Badreddine 등4명 · LTN2022 accepted manuscript',url:paper,location:'PDF61쪽. 저장소 표지와원고60쪽. Artificial Intelligence303:103649. 최종출판본과 다를 수 있는 accepted version.'},
  {title:'LTN · Grounding과Figure1',url:paper+'#page=8',location:'원고p.7 / PDFp.8, Example3·Figure1. 변수별tensor차원과 함수·술어의 연속 계산. 도식만 발췌.'},
  {title:'LTN · Product와Stable Product 연산',url:paper+'#page=12',location:'원고pp.11–12 / PDFpp.12–13, §2.4수식(7)–(20). Reichenbach함의, p-meanerror, 안정화 투영과 대수 성질의 차이.'},
  {title:'LTN · 지식과만족도 학습',url:paper+'#page=14',location:'원고pp.13–16 / PDFpp.14–17, §§3.1–3.3. 고정·매개변수 grounding, closed formulas, SatAgg정의와최대화.'},
  {title:'City Research Online · 판본과날짜·이용조건',url:'https://openaccess.city.ac.uk/id/eprint/27580/',location:'2021온라인·2022권호, 네저자, accepted version및CC-BY-NC-ND4.0표시.'},
  {title:'Logic Tensor Networks · 공식 구현',url:'https://github.com/logictensornetworks/logictensornetworks',location:'연구팀의 원체계 구현 경로. 이 카드의 자체JavaScript예제와별개이며 저장소를 실행해 원문 실험을 재현했다고 주장하지 않는다.'}
 ]}});
})();
