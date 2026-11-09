/* PLDI2021 DreamCoder. Authored finite program language and executed miniature learning cycle. */
(function(){
 'use strict';const paper='https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf',source=(page,title)=>({title:'Ellis 외 (2021) · '+title,url:paper+'#page='+page});
 const double=[{input:[1,3,-2],output:[2,6,-4]},{input:[0,2],output:[0,4]}],increment=[{input:[1,3,-2],output:[2,4,-1]},{input:[0,2],output:[1,3]}];
 window.AtlasEntries.register({id:'dreamcoder',record:{
  title:'DreamCoder · 문제를 풀면서, 다음에 생각할 언어도 바꾸다',subtitle:'DreamCoder: Bootstrapping Inductive Program Synthesis with Wake-Sleep Library Learning',dateLabel:'2021 · PLDI 논문 발표',
  people:['Kevin Ellis','Catherine Wong','Maxwell Nye','Mathias Sablé-Meyer','Lucas Morales','Luke Hewitt','Luc Cary','Armando Solar-Lezama','Joshua B. Tenenbaum'],
  authorNote:'Kevin Ellis 등9명의 PLDI2021 논문. Proceedings of the42nd ACM SIGPLAN International Conference on Programming Language Design and Implementation, pp.835–850. 이 카드에서는 MIT저자 공개의16쪽 출판본을 확인했다. 다른 제목을 사용하는2020 arXiv·후속판과 판본을 구분한다.',
  summary:'예시를 만족하는 프로그램을 찾고, 여러 해법의 공통 계산을 새 라이브러리로 묶었다. 그 라이브러리에서 만든 문제와 기존 해법으로 신경 탐색 안내기를 다시 학습했다.',detail:'',question:'',related:['logic-theorist','strips','nscl'],
  sources:[{title:'Ellis 외 · PLDI2021 원문',url:paper},{title:'MIT DSpace · 최종 출판 기록',url:'https://dspace.mit.edu/entities/publication/86d768ab-558f-4fb1-b92e-9288de643ccb'}],
  caveat:'기본 언어·타입·원시 연산과 과제 모음이 주어진다. 아래는 직접 만든 유한 DSL의 실제 탐색·공통 골격 묶기·작은 softmax학습이며 원문의 E-graph·Bayesian 라이브러리 학습 전체를 구현한 결과가 아니다.'
 },content:{article:{
  question:'문제의 답만 배우는 대신,\n다음 문제를 생각할 계산 조각도 만들 수 있을까?',
  opening:[
   '목록의 모든 수를 두 배로 만드는 프로그램과, 모든 수에 하나를 더하는 프로그램을 따로 찾았다고 하자. 두 해법은 항목을 꺼내 계산하고 나머지 목록을 다시 처리하는 흐름이 같다. 이 공통 구조를 map이라는 함수로 묶으면, 다음에는 순회 과정을 처음부터 다시 조립하지 않고 항목에 할 계산만 바꾸어 쓸 수 있다.',
   'DreamCoder는 이렇게 문제를 푸는 언어 자체를 경험에서 넓히려 했다. 현재 라이브러리와 신경망의 안내로 입력·출력 예시를 만족하는 프로그램을 찾는다. 찾은 해법들을 다시 살피며 반복되는 구조를 새 함수로 묶고, 그 함수도 다음 프로그램의 부품으로 사용한다. 해법이 짧아지면 같은 길이의 탐색 안에서 더 복잡한 행동을 표현할 수 있다.',
   '새 라이브러리는 배울 문제를 만드는 재료이기도 하다. 프로그램을 조립해 실행하면 어떤 입력에서 어떤 결과가 나오는지 알 수 있다. DreamCoder는 이렇게 만든 문제와 이미 풀었던 문제를 이용해 신경 탐색 안내기를 다시 학습했다. 더 나은 계산 조각과 더 나은 탐색 안내가 서로를 다음 단계로 밀어 주는 순환이다.'
  ],visual:{id:'dreamcoder-library-cycle',navLabel:'찾기·묶기·다시 배우기',title:'해법을 찾고, 공통 구조를 묶고, 그 언어로 다음 배움을 만들다',caption:'정수 목록을 다루는 작은 언어를 직접 작성했습니다. 후보를 실행하는 탐색, 공통 순회 골격을 묶는 비용 비교, 실행한 프로그램으로 만든30개 꿈의 작은 안내학습을 실제 계산합니다.',
   stages:[{id:'wake',label:'1 · 예시에서 프로그램 찾기',text:'정해진 원시 연산으로 만든 후보를 실행해 예시를 검사한다. 표현 길이와 검사 횟수의 한도를 함께 확인한다.'},{id:'abstract',label:'2 · 공통 계산에 이름 붙이기',text:'서로 다른 두 해법에서 반복된 순회 구조를 map(f)로 묶는다. 새 정의의 비용까지 치러도 표현이 줄어드는지 따진다.'},{id:'dream',label:'3 · 꿈으로 안내기 배우기',text:'새 라이브러리의 프로그램을 실행해 문제를 만들고, 어떤 연산을 먼저 찾을지 작은 softmax모델을 학습한다.'}],
   corpus:[{label:'이미 푼 과제1 · 모든 수를 두 배로',examples:double},{label:'이미 푼 과제2 · 모든 수에 하나 더',examples:increment}],
   tasks:[{id:'double',label:'처음 풀 수 있는 과제',examples:double,note:'목록의 항목을 두 배로 만드는 예시입니다. 처음 언어의 순회 골격과x+x만으로 길이 한도15안에 해법이 있습니다.'},{id:'new',label:'새 과제 · 제곱하고 하나 더',examples:[{input:[-2,0,3],output:[5,1,10]},{input:[1,-1],output:[2,2]}],note:'더 복잡한x×x+1을 각 항목에 적용하는 과제입니다. 원시 순회 표현은16노드로 기본 한도15를 넘습니다. map을 저장하면6노드로 같은 행동을 표현할 수 있습니다.'},{id:'ambiguous',label:'예시 하나의 모호함',examples:[{input:[0],output:[1]}],note:'0을1로 바꾼다는 예시 하나만 주었습니다. 항상1을 내는 함수, 하나를 더하는 함수, 제곱하고 하나를 더하는 함수가 모두 맞을 수 있습니다. 찾아낸 프로그램을 곧바로 유일한 의도로 읽지 않습니다.'}],initial:{taskId:'new'},
   originalImage:{src:'dreamcoder-2021-map-abstraction.png',title:'원논문 Figure2 · 다른 해법에서 map을 드러내다',alt:'DreamCoder2021 Figure2. 두 배와 하나 빼기 프로그램을 다른 형태로 고친 뒤 주황색의 공통 재귀 순회 구조를 map으로 묶는다.',caption:'Figure2의 도식만 발췌했다. 원문에서는 두 배 계산과 하나 빼기 계산의 재귀 해법을 여러 동치 표현으로 다시 쓰고, 주황색의 공통 구조를 찾아 map으로 묶는다. 원문의10¹⁴표기는 그 refactoring 예제에 대한 규모이며 이 카드가 그 수의 후보를 탐색한 결과가 아니다. 위의 자체 절차는 이미 같은 순회 골격을 가진 두 해법에서 계산식 자리만 묶는다.',credit:'Kevin Ellis 등9명, PLDI2021, 인쇄 p.837 / PDF p.3, Figure2 도식. 원문 코드·주황색 강조·배치를 보존하고 설명문은 밖에 붙였다. 저자 원문과 전체 서지를 함께 표시한다. 공개 서버 재배포 허용은 확인하지 못했다.',source:source(3,'Figure2 · 공통 순회 추상화')},
   source:source(3,'§2.1–2.3 · wake와 두 sleep단계'),scope:'작은 문법은x·0·1과 이항 더하기·빼기·곱하기, 고정된 재귀 목록 순회 구조를 제공한다. 스칼라 식은 최대5노드, 입력 목록은 최대6개 작은 정수로 제한한다. 공통 구조 추출·구문 비용·30꿈·28가중치 softmax는 직접 작성했다. E-graph 동치 재작성, 원문의 타입 λ계산 언어와 Bayesian 최적화,8영역 실험을 실행한 것으로 표시하지 않는다. 같은 꿈에서 계산한 학습 손실이며 별도 일반화 평가가 아니다.'
  },takeaway:{title:'해법의 재사용은, 다음 탐색의 언어를 바꾼다',text:'DreamCoder는 문제를 푼 프로그램에서 새 계산 조각을 만들고, 그 조각으로 다음 프로그램과 학습 문제를 만든다. 라이브러리는 표현을 짧게 만들고, 신경 안내기는 탐색의 순서를 돕는다. 마지막에 예시와 맞는지는 프로그램 실행으로 확인한다.'},
  technical:{title:'원문 알고리즘과 이 작은 순환의 차이',paragraphs:[
   '확인한 판본: 이 카드는2021 PLDI출판본16쪽, pp.835–850, DOI10.1145/3453483.3454080을 사용한다. MIT저자 공개 PDF의 표제와9명 공동저자, ACM서지와 MIT DSpace의 final published version기록을 대조했다.2020 arXiv의 다른 제목이나 후속 방법을2021판의 결과로 섞지 않는다.',
   '입력으로 무엇이 주어지는가: §2는 초기 원시 연산의 언어와, 그 언어로 원칙적으로 풀 수 있는 비슷한 영역의 쉬운·어려운 과제들을 요구한다. 아무 언어나 계산 원리도 없이 지식을 만드는 체계가 아니다. 같은 추상화가 여러 과제에서 쓸모 있어야 쉬운 문제의 해법을 어려운 문제에 이어 쓸 수 있다.',
   'Wake의 목표: 현재 라이브러리D와 가중치θ, 인식모델Q를 두고 각 과제x를 설명하는 프로그램ρ를 찾는다. §2.4는 P[x|ρ]P[ρ|D,θ]에 따른 근사 Bayesian탐색과 유한 beam을 설명한다. 이 카드는 예시 일치 여부를 정확 실행으로 검사하고, 구문 길이 순서 안에서 작은 안내기가 순서를 바꾸는 유한 열거를 쓴다. 원문의 posterior를 그대로 계산하지 않는다.',
   'Abstraction sleep: §2.2와 Figure2는 이미 찾은 프로그램을 동치인 여러 형태로 바꾸어 공통 부분을 찾는다. E-graph기반 표현은 직접 열거하기 어려운 refactoring들을 함께 다룬다. 여기서는 같은 고정 순회 골격의 계산식f자리만 추상화한다. 서로 다르게 쓰인 임의 프로그램들의 의미 동치를 발견하는 엔진은 아니다.',
   '구문 비용을 직접 정의하기: 자체 문법에서 원시 순회 구조는11노드+계산식의 노드 수다. map호출은1노드+계산식이고, 고차 함수 map의 새 정의는14노드로 센다. 두 배와 하나 더 계산식은 각각3노드이므로 기존28노드가 새 정의14+두 호출8=22노드가 된다. 한 해법만 있으면14에서18로 늘어나 저장하지 않는다. 이 계산은 원문의 MDL·Bayesian목적함수 수치를 대신하지 않는다.',
   '의미는 호출을 펼쳐 확인한다: map(f)의 정의는 빈 목록이면 빈 목록을 내고, 아니면 f(head(xs))를 결과 앞에 붙인 뒤 tail(xs)에 같은 순회를 반복한다. 원시 프로그램과 새 호출은 같은 계산식f를 같은 항목에 적용한다. 이 구현은 구문 트리의 비용과 전개 구조를 따로 노출하고 입력 목록의 실제 출력도 비교한다. 표현을 짧게 한 것이 데이터의 정답을 바꾸는 과정은 아니다.',
   'Dream sleep의 원문: §2.3은 라이브러리에서 샘플링한 프로그램의 실행으로 얻는 fantasies와, 이미 푼 프로그램·과제의 replays를 함께 써서 신경 인식모델을 학습한다. 인식모델은 주어진 과제에서 유망한 프로그램을 찾는 탐색을 돕고, 새 라이브러리가 만든 구문적 대칭을 깨는 역할도 한다. 단순히 랜덤 정답을 붙이는 과정이 아니다.',
   '이 화면에서 실제 학습하는 것:1노드 또는3노드 스칼라 식30개를 map으로 실행하고[-2,-1,0,1,2]의 입력·출력을 만든다. 정수값·입출력 관계에서 직접 정한7특징을 계산하고 tanh로 크기를 제한한다.28가중치의4분류 softmax가 식의 최상위 종류leaf·add·sub·mul를 예측하게 한다. 평균 교차 엔트로피의 기울기로 학습률.4에서0–400회 전체 묶음 경사 하강을 실행한다. 원문 인식망의 구조·훈련 자료를 재현한 모델이 아니다.',
   '안내와 검사: 후보의 구문 길이를 먼저 비교하고, 같은 길이에서는 작은 안내기가 낸 연산 확률의 음의 로그 합으로 순서를 정한다. 입력·출력 행동이 같은 여러 구문이 있을 수 있어 연산 표적도 유일하지 않을 수 있다. 안내기가 언제나 더 빠르다는 보장은 없으며, 화면은 같은 문법·길이·후보 한도에서 실제 첫 일치 순서를 함께 보여 준다. 안내가 틀려도 후보가 맞는지의 검사는 실행 결과로 남는다.',
   '소수 예시의 한계: [0]→[1]은 상수1, x+1, x²+1을 모두 허용한다. 현재 후보에서 맞는 식을 찾았다는 것과 모든 입력의 의도된 함수를 확정했다는 것은 다르다. 한도 안에서 못 찾은 결과도 해법의 비존재 증명이 아니다. 이 데모는 실험용 분할·별도 시험자료가 없으며 원논문의8영역 성능이나 일반화 효과를 주장하지 않는다.'
  ],formula:'Wake: 예시와 일치하는 프로그램을 찾기\nAbstraction: 기존 해법을 새 함수로 짧게 표현하기\nDream: 새 언어로 프로그램을 만들고 실행해 안내기 학습\n\n자체 구문 비용\n원시 순회 = 11 + scalar식 노드 수\nmap호출 = 1 + scalar식 노드 수\nmap정의 = 14\n두 해법: 28 → 14+8 = 22\n\n작은 안내기 p = softmax(W·features(task))\nL = mean(−log p[생성 프로그램의 연산 종류])\nW ← W − .4·∂L/∂W\n\n예시 일치 ≠ 함수의 유일성\n작은 구문 골격 묶기 ≠ 원문의 E-graph전체 구현'}
 },keyIdeas:[{title:'문제의 해법뿐 아니라 언어도 배운다',text:'여러 프로그램의 공통 계산을 새 함수로 묶어 다음 문제에서 다시 사용한다.'},{title:'짧은 표현은 더 깊은 탐색을 가능하게 한다',text:'같은 행동을 적은 함수 호출로 표현하면 같은 길이 한도에서 더 복잡한 프로그램을 찾을 수 있다. 새 정의의 비용도 함께 센다.'},{title:'프로그램 실행이 다음 학습의 자료가 된다',text:'라이브러리에서 만든 프로그램을 실행해 입력·출력 문제를 만들고 탐색 안내기를 학습한다. 후보의 정답 여부는 실행으로 검사한다.'}],videos:[],references:[
  {title:'Ellis 외 · PLDI2021 원문',url:paper,location:'16쪽, 인쇄pp.835–850. 표제·9저자·ACM서지는 PDFp.1.'},
  {title:'DreamCoder · 초기 언어와3단계 순환',url:paper+'#page=3',location:'§§2.1–2.3, PDFpp.3–4 / 인쇄pp.837–838. Wake, abstraction sleep, dream sleep와replays/fantasies.'},
  {title:'DreamCoder · Figure2 원문 추상화',url:paper+'#page=3',location:'PDFp.3 / 인쇄p.837. 두 재귀 프로그램의 refactoring과 공통map구조. 도식만 발췌, 설명문은 원문 밖에 한국어로 작성.'},
  {title:'DreamCoder · 근사Bayesian문제와 라이브러리',url:paper+'#page=4',location:'§2.4, PDFpp.4–5 / 인쇄pp.838–839. 프로그램 prior·인식모델·유한beam, 새 라이브러리의 최적화. 자체 노드 비용과 구분.'},
  {title:'MIT DSpace · 최종 출판 기록',url:'https://dspace.mit.edu/entities/publication/86d768ab-558f-4fb1-b92e-9288de643ccb',location:'Final published version, June20,2021, DOI10.1145/3453483.3454080와9저자 확인.'}
 ]}});
})();

