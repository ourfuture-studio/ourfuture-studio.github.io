/* AAAI1990 KBANN: approximate prior knowledge becomes a trainable starting point. */
(function(){
 'use strict';
 const paper='https://cdn.aaai.org/AAAI/1990/AAAI90-129.pdf';
 const source=(page,title)=>({title:'Towell·Shavlik·Noordewier (1990) · '+title,url:paper+'#page='+page});
 const examples=Array.from({length:32},(_,n)=>{const x=Array.from({length:5},(_,i)=>(n>>(4-i))&1);return{id:'사례 '+String(n+1).padStart(2,'0'),inputs:x,target:Number((x[0]&&(x[1]||x[4]))||(x[2]&&!x[3]))};});
 window.AtlasEntries.register({
  id:'kbann',
  record:{
   title:'KBANN · 알고 있는 규칙에서 시작하고, 경험으로 고치다',
   subtitle:'Refinement of Approximate Domain Theories by Knowledge-Based Neural Networks',
   dateLabel:'1990 · AAAI 논문 발표',
   people:['Geoffrey G. Towell','Jude W. Shavlik','Michiel O. Noordewier'],
   authorNote:'Geoffrey G. Towell, Jude W. Shavlik, Michiel O. Noordewier의 AAAI1990 논문, pp.861–866. Noordewier는 생물학 문헌에서 프로모터 인식의 배경 규칙을 정리한 공동저자다. 1994년 Towell·Shavlik의 같은 계열 후속 논문과 구분한다.',
   summary:'전문가가 적은 불완전한 규칙을 신경망의 구조와 초기 가중치로 옮기고, 사례에서 얻은 오차로 그 규칙의 경계와 연결을 수정하게 했다.',
   detail:'',question:'',related:['expert-systems','backprop','cilp'],
   sources:[{title:'AAAI1990 · KBANN 원논문',url:paper},{title:'위스콘신대 저자 연구실 · 1990 출판 기록',url:'https://pages.cs.wisc.edu/~shavlik/abstracts/towell.aaai90.abstract.html'}],
   caveat:'아래 추천 규칙·32개 정답·가중치·학습 설정은 직접 작성했다. 원논문의 유전자 프로모터 실험을 재현하거나 분류 성능을 검증한 결과가 아니다.'
  },
  content:{
   article:{
    question:'전문가가 알고 있는 규칙을,\n경험을 통해 고치는 지능의 출발점으로 쓸 수 있을까?',
    opening:[
     '규칙으로만 판단하는 시스템은 사람이 미처 적지 못한 조건을 놓칠 수 있다. 반대로 신경망이 모든 관계를 처음부터 사례로만 배워야 한다면, 전문가가 이미 알고 있는 판단의 구조를 버리게 된다. KBANN은 “규칙을 지킬 것인가, 데이터에서 배울 것인가” 사이에서 지식을 학습의 출발점으로 쓰는 길을 제시했다.',
     'Towell, Shavlik, Noordewier는 대략 맞지만 불완전하거나 틀릴 수 있는 영역 지식을 신경망으로 옮겼다. 관찰 사실은 입력, 중간 결론은 은닉 유닛, 최종 결론은 출력이 된다. 어떤 조건이 어떤 판단을 뒷받침하는지는 연결과 초기 가중치가 된다. 사례를 만나기 전부터 신경망에 판단의 뼈대를 주는 것이다.',
     '그 뼈대는 고정된 법전이 아니다. 기존 규칙의 연결을 수정하고, 처음 규칙에 없던 특징이 판단에 영향을 줄 길도 열어 둔다. 사례의 정답과 출력의 차이를 역전파하면, 전문가가 적어 둔 기준을 어디에서 보완해야 하는지 가중치가 달라진다. 아래에서는 규칙에 빠진 보완 근거 E가, 학습 뒤 실제 출력에 영향을 주는 과정을 계산한다.'
    ],
    visual:{
     id:'kbann-knowledge-network',navLabel:'규칙에서 학습으로',title:'규칙의 구조를 연결로 옮기고, 빠진 조건을 사례에서 배우다',
     caption:'직접 작성한 판단 규칙 하나를 끝까지 따라갑니다. 규칙의 발동, 연속 활성도의 초기 신경망, 같은32사례에서 실제 계산한 가중치 수정을 나란히 살펴봅니다.',
     stages:[
      {id:'prior',label:'1 · 알고 있는 규칙',text:'어떤 조건이 함께 필요하고, 어떤 경로가 대안인지 살펴본다. 처음 지식에는 보완 근거 E가 들어 있지 않다.'},
      {id:'network',label:'2 · 배우기 시작할 신경망',text:'AND·OR 구조를 유닛과 가중치로 옮긴다. 규칙에 없던 연결은0에서 출발하며, 열어 두면 사례에 맞춰 수정할 수 있다.'},
      {id:'revise',label:'3 · 사례로 지식 고치기',text:'보완 근거 E를 인정하는 직접 정한32사례에서, 손실과 기울기를 실제 계산해 가중치를 수정한다.'}
     ],
     features:[{id:'topic',symbol:'A',label:'관련 주제가 있다'},{id:'openData',symbol:'B',label:'공개 근거가 있다'},{id:'alternative',symbol:'C',label:'대안 경로가 있다'},{id:'missingCheck',symbol:'D',label:'필수 확인이 빠졌다'},{id:'evidence',symbol:'E',label:'보완 근거가 있다'}],
     rules:[{id:'route1',label:'경로1 · 두 조건을 함께',formula:'A AND B → 경로1'},{id:'route2',label:'경로2 · 방해 조건 없이',formula:'C AND NOT D → 경로2'},{id:'decision',label:'둘 중 한 경로면 추천',formula:'경로1 OR 경로2 → 추천'}],
     presets:[{id:'missed',label:'규칙이 놓친 보완 근거',inputs:[1,0,0,0,1]},{id:'known',label:'처음 규칙으로도 충분',inputs:[1,1,0,0,0]},{id:'alternative',label:'대안 경로',inputs:[0,0,1,0,0]},{id:'blocked',label:'필수 확인이 빠진 경우',inputs:[0,0,1,1,0]},{id:'control',label:'E만으로는 부족',inputs:[0,0,0,0,1]}],
     examples,
     parameterLabels:['A → 경로1','B → 경로1','C → 경로1','D → 경로1','E → 경로1','A → 경로2','B → 경로2','C → 경로2','D → 경로2','E → 경로2','경로1 편향','경로2 편향','경로1 → 출력','경로2 → 출력','출력 편향'],
     initial:{inputs:[1,0,0,0,1],strength:6,extraLinks:true,steps:0,learningRate:0.5,focusParameter:4},
     originalImage:{src:'kbann-1990-rule-network.png',title:'원논문 Figure 1 · 지식베이스를 신경망으로 옮기기',alt:'KBANN1990 Figure1. 왼쪽 규칙 A와 B와 C, 가운데 의존 그래프, 오른쪽 추가 입력 K와 얇은 추가 연결이 있는 신경망.',caption:'(a) A·B·C에 대한 규칙, (b) 규칙이 만드는 의존 구조, (c) 그 구조에서 시작한 신경망을 원문 그대로 발췌했다. 여러 대안이 있는 B의 규칙은 각각의 조건 묶음을 별도 유닛으로 옮긴다. 굵은 연결은 규칙에서 왔고, K와 얇은 연결은 지식을 보완할 길을 연다. 위의 A–E 추천 사례는 이 원문 규칙을 복제한 실험이 아니다.',credit:'Geoffrey G. Towell, Jude W. Shavlik, Michiel O. Noordewier, AAAI1990, 인쇄 p.863 / PDF p.3, Figure1. 원문 세 패널과 표제를 보존했다. 공개 재사용 라이선스는 확인하지 못했다.',source:source(3,'Figure1 · Translation of a Knowledge Base into an ANN')},
     source:source(2,'Table1·Table2 · 규칙 번역과 추가 연결'),
     scope:'A–E는 모두 값이 명시된 이진 특징이다. NOT D는 D=0이며 정보가 없다는 뜻이 아니다. 초기 규칙은 조건이 충족될 때 추천을 발동시키는 절차로 적용한다. 발동하지 않았다고 반대 결론을 증명하지 않는다.32정답은 (A AND (B OR E)) OR (C AND NOT D)로 직접 정했다. 같은32사례로 학습하고 손실을 표시하므로 새 사례에 대한 일반화 평가가 아니다.'
    },
    takeaway:{title:'지식은 학습을 대신하는 규칙집에서, 학습을 시작하는 구조가 되었다',text:'KBANN은 전문가가 적은 조건의 의존 관계를 신경망의 구조와 초기값으로 사용했다. 판단의 뼈대를 먼저 주고, 사례의 오차로 그 경계와 연결을 고친다. 이때 학습 뒤의 신경망이 원래 규칙의 논리적 의미를 그대로 보존한다고 가정하지 않는다.'},
    technical:{title:'원문의 번역 절차와 이 계산의 범위',paragraphs:[
     '원논문의 대상: 초록과 Knowledge-Based Neural Networks 절은 계층적으로 연결된 비재귀 명제 규칙을 다룬다. 논문에서는 변수 없는 규칙이라고도 설명한다. 임의의 일차 논리나 재귀 프로그램 전체를 이 신경망이 실행한다는 주장이 아니다. Table1은 최종 결론·지지 사실·중간 결론·의존 관계를 출력·입력·은닉 유닛·가중 연결에 대응시킨다.',
     'AND와 OR를 옮기는 이유: 여러 조건이 동시에 필요한 규칙에는 양의 연결을, 금지 조건에는 음의 연결을 준다. 같은 결론을 지지하는 여러 규칙의 조건을 한 유닛에 모두 섞으면 서로 다른 규칙의 일부 조건만으로 켜질 수 있다. 원문은 각각의 조건 묶음을 별도 유닛으로 만든 뒤 OR로 잇는다. 그림의 구조는 신경망에 판단의 중간 단계를 남긴다.',
     '원문의 수치와 부호: 인쇄 p.862는 필수 조건n개의 가중치를+w, 금지 조건을−w로 두고 문턱 θ=nw−φ를 정한다. 각주2의 실험값은 w=3.0, φ=2.3이다. 이 카드의 σ(Σwx+b) 표기는 가산 편향b를 쓰므로 b=−θ다. 원문의 문턱을 같은 부호의 가산 편향으로 옮기지 않는다.',
     '이 보기에서 직접 정한 초기값: 기본W=6, φ=W/2=3이다. h₁=σ(6A+6B−9), h₂=σ(6C−6D−3), y=σ(6h₁+6h₂−3)로 계산한다. σ(z)=1/(1+exp(−z))이며 실제 화면은 선택한W로 식을 갱신한다. 값0.5를 분류 경계로 잡으면 기본W=6에서32이진 입력의 초기 규칙 발동과 일치하지만, 작은W에서도 같은 분류를 보장하지 않는다. 어떤W에서도 연속 활성도 자체를 논리적 진리값이나 보정된 확률로 취급하지 않는다.',
     '규칙에 없던 연결: Table2는 사용하지 않은 특징도 입력으로 추가하고, 최대 깊이에 따른 인접 그룹 사이의 빠진 연결을0으로 추가한 뒤 모든 가중치·문턱을 작은 무작위 값으로 흔든다. 각주3의 범위는 ε=0.01이다. 이 카드는 두 은닉 유닛의 한 층만 사용하고, 추가 입력 연결을 정확히0에서 시작하며 무작위 흔들기를 하지 않는다. 추가 연결을 닫으면 기존 연결·편향만 학습한다. 원문의 전체 번역 절차를 재현하는 프로그램은 아니다.',
     '실제로 실행하는 수정: 모든32입력을 고정하고, 직접 정한 정답 t=(A∧(B∨E))∨(C∧¬D)를 사용한다. 평균 이진 교차 엔트로피 L=mean(log(1+exp(z))−tz)를 출력 로짓z에서 계산한다. 각 가중치의 기울기를 역전파하고 p←p−η∂L/∂p로 전체 묶음 경사 하강을 실행한다. 화면의 수정 횟수는0–400, η는0.25·0.5·1 중 선택한다. 원문의 학습률·모멘텀·생물학 자료를 그대로 재현한 설정이 아니다.',
     '추가 연결을 닫는 비교: E의 두 입력 연결을 포함한 추가 경로가0에 고정되면, 나머지 네 입력이 같은 두 사례를 E값으로 구분할 수 없다. 이는 이 구조에서 계산으로 확인할 수 있는 제한이다. 경로를 열고 손실이 줄었다는 사실만으로 실제 데이터에서 KBANN이 다른 방법보다 우수하다고 결론 내리지 않는다.',
     '규칙의 의미: 화면의 화살표는 조건이 충족될 때 결론을 발동시키는 명시적 규칙이다. 수학적 물질 함의 P→Q가 참인 모든 해석이나 P↔Q의 동치 정의를 학습 정답으로 삼은 것이 아니다. 두 조건 묶음이 발동하지 않은 상태는 논리적 ¬추천 증명이 아니며, 부정 특징D=0도 미관찰 사실에 대한 기본 부정과 구분한다.',
     '원논문의 실험과 이야기: 프로모터 인식은 유전자 서열에서 전사 시작에 관련된 패턴을 분류하는 문제였다. 원문은 생물학자인 Noordewier가 문헌에서 정리한 규칙을 배경 지식으로 사용했다고 설명한다.106서열, leave-one-out과 반복 학습의 결과는 인쇄 pp.863–865에서 확인할 수 있다. 이 카드의 추천 사례·32정답·손실 그래프와 서로 다른 자료다.',
     '1990년과1994년 구분: 여기의 원논문은 세 저자의 Refinement of Approximate Domain Theories by Knowledge-Based Neural Networks, AAAI1990, pp.861–866이다. Knowledge-Based Artificial Neural Networks라는 제목의 Towell·Shavlik 논문은 Artificial Intelligence70, 1994, pp.119–165에 실렸다. 후속 논문의 내용이나 규칙 추출 방법을1990년의 구현 사실로 소급하지 않는다.'
    ],formula:'원문: 문턱 θ = n·w − φ\n이 카드의 표기: 가산 편향 b = −θ\n\n초기 규칙: (A∧B) ∨ (C∧¬D) 일 때 추천 발동\n직접 정한 정답: (A∧(B∨E)) ∨ (C∧¬D)\n\n평균 손실 L = mean(softplus(z) − t·z)\n출력 오차 ∂L/∂z = (σ(z)−t)/32\n허용된 매개변수만 p ← p − η·∂L/∂p\n\n규칙 미발동 ≠ 반대 결론의 증명\n신경 활성도 ≠ 논리적 진리값 ≠ 검증된 확률'}
   },
   keyIdeas:[{title:'규칙이 배움의 출발 구조를 준다',text:'입력 사실과 중간 결론, 최종 판단을 신경망의 층과 연결로 옮긴다. 전문가의 지식이 초기값과 의존 관계로 남는다.'},{title:'불완전한 지식을 사례로 고친다',text:'규칙이 틀리거나 빠진 조건을 가진 경우에도, 정답과 출력의 차이로 가중치가 달라지게 한다.'},{title:'없던 조건이 영향을 줄 길을 연다',text:'쓰지 않은 입력과 추가 연결은 기존 규칙 밖의 특징을 배울 통로가 된다. 그 통로를 닫았을 때의 제한을 같은 사례에서 비교한다.'}],
   videos:[],
   references:[
    {title:'Towell·Shavlik·Noordewier · AAAI1990 원논문',url:paper,location:'인쇄 pp.861–866 / PDF6쪽. 표제·세 저자·비재귀 명제 규칙과 불완전 지식의 목적은 PDF p.1.'},
    {title:'AAAI1990 · 규칙의 번역과 초기 연결',url:paper+'#page=2',location:'인쇄 p.862 / PDF p.2, Table1·Table2, 가중치와 문턱, 별도 AND 유닛, 각주2(w=3.0, φ=2.3). 추가 연결의 설명과 각주3(ε=0.01)은 인쇄 p.863 / PDF p.3까지 이어진다.'},
    {title:'AAAI1990 · 원문 Figure1',url:paper+'#page=3',location:'인쇄 p.863 / PDF p.3. (a) 지식베이스, (b) 의존 그래프, (c) 추가 입력K와 연결을 포함한 ANN. Figure1 표제와 세 패널 전체 발췌.'},
    {title:'AAAI1990 · 프로모터 지식과 실제 실험',url:paper+'#page=3',location:'인쇄 pp.863–865 / PDF pp.3–5. 문헌에서 얻은 배경 규칙,106서열, leave-one-out·반복 신경망 결과. 이 카드의 자체32사례와 구분.'},
    {title:'저자 연구실 · 1990 출판 기록',url:'https://pages.cs.wisc.edu/~shavlik/abstracts/towell.aaai90.abstract.html',location:'세 저자, AAAI1990, pp.861–866과 제목 대조.'},
    {title:'저자 연구실 · 1994 후속 논문',url:'https://pages.cs.wisc.edu/~shavlik/abstracts/towell.aij94.abstract.html',location:'Towell·Shavlik, Knowledge-Based Artificial Neural Networks, Artificial Intelligence70:119–165, 1994. 서지와 초록 확인 범위이며1994본문을 열람한 근거로 사용하지 않는다.'}
   ]
  }
 });
})();
