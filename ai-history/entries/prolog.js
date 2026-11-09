/* Historical 1972 event, with separately dated primary retrospective and 1974 technical source. */
(function(){
  'use strict';
  const paper='https://www.doc.ic.ac.uk/~rak/papers/IFIP%2074.pdf',birth='https://softwarepreservation.computerhistory.org/prolog/#ColmerauerAndRoussel1996';
  const at=(page,title)=>({title:'Kowalski (1974) · '+title,url:paper+'#page='+page});
  const atom=(predicate,...args)=>({predicate,args}),fact=(id,a,b,optional)=>({id,optional,clause:{id,head:atom('direct',a,b),body:[]}});
  const rules=[
    {label:'직접 연결을 도달 관계로 읽기',explanation:'어떤 X에서 Y로 바로 연결되면, X에서 Y로 도달할 수 있다. direct 관계를 확인하는 한 질문으로 바꾼다.',clause:{id:'base',head:atom('reach','X','Y'),body:[atom('direct','X','Y')]}},
    {label:'중간 지점을 거쳐 도달하기',explanation:'X에서 바로 갈 수 있는 Z를 찾고, 같은 Z에서 Y까지 도달할 수 있는지 다시 질문한다. 앞 질문에서 정해진 Z는 뒤 질문에도 함께 적용된다.',clause:{id:'recursive',head:atom('reach','X','Y'),body:[atom('direct','X','Z'),atom('reach','Z','Y')]}}
  ];
  window.AtlasEntries.register({id:'prolog',record:{
    title:'Prolog · 지식을 적으면, 질문이 실행될 수 있을까?',subtitle:'Logic Programming · 관계·변수·질의 · 논리 프로그래밍',dateLabel:'1972 · 초기 Prolog',
    people:['Alain Colmerauer','Philippe Roussel','Robert Kowalski'],
    authorNote:'1972년 마르세유 팀의 초기 Prolog와 에든버러의 논리 프로그래밍 연구를 함께 다룬다. Colmerauer·Roussel의 회고와 Kowalski의 1974년 논문은 서로 다른 저작이며, 세 인물을 한 논문의 공동저자로 묶지 않는다.',
    summary:'사실과 관계의 규칙을 프로그램으로 적고, 질문의 변수를 채우는 계산을 절의 일치·하위 질문·되돌아가기로 실행하려 했다.',detail:'',question:'',related:['resolution','strips','expert-systems','deepproblog'],
    sources:[{title:'Kowalski · Predicate Logic as Programming Language · 1974 원문',url:paper},{title:'Colmerauer & Roussel · 초고·출판본 보존 기록',url:birth},{title:'Computer History Museum · Prolog 보존 자료',url:'https://softwarepreservation.computerhistory.org/prolog/'}],
    caveat:'직접 작성한 도시 관계를 함수 기호 없는 양의 definite clause로 실행한다. 현대의 표기와 제한된 인터프리터를 사용하며, 초기 Prolog 전체·자연어 이해·일반 부정·cut을 구현한 것으로 설명하지 않는다.'
  },content:{article:{
    question:'“서울에서 어디까지 갈 수 있지?”\n답을 미리 적지 않고, 관계에서 찾게 할 수 있을까?',
    opening:[
      '서울에서 부산으로, 부산에서 광주로 이어진다는 사실을 안다고 하자. “서울에서 광주까지 갈 수 있나?”에 답하려면 직접 연결만 찾아서는 부족하다. 중간 지점을 찾고, 그 지점에서 목적지에 닿을 수 있는지 같은 질문을 다시 해야 한다. “어디까지 갈 수 있나?”라면 목적지의 빈칸을 채우는 답도 여러 개다.',
      'Prolog의 아이디어는 관계의 의미를 적은 규칙을 실행 가능한 프로그램으로 읽는 것이다. “Y에 도달하려면 Z로 바로 간 뒤 Z에서 Y에 도달하면 된다”는 한 규칙이 지식의 표현이면서, 큰 질문을 두 작은 질문으로 바꾸는 계산의 지시가 된다. 절의 머리와 질문을 일치시키며 변수에 대상을 연결하고, 남은 조건을 계속 실행한다.',
      '이 발상은 프로그래밍 언어를 먼저 만들겠다는 계획에서만 나온 것이 아니었다. Colmerauer와 Roussel의 회고는 프랑스어로 컴퓨터와 소통하고 텍스트에서 추론하려던 마르세유 프로젝트를 출발점으로 설명한다. 자연어 분석과 자동 정리증명을 한 언어에서 다루려던 시도가 초기 Prolog로 이어졌다. Kowalski의 1974년 논문은 논리의 함의를 절차 선언으로, 증명의 단계를 계산으로 읽는 관점을 구체화한다.'
    ],
    visual:{id:'prolog-relations',navLabel:'지식에서 실행되는 질문으로',title:'관계를 적고, 질문의 빈칸을 채우다',caption:'Kowalski의 논리 프로그램·절차 호출·여러 답의 계산을 참고해 구성했습니다. 도시와 연결 자료는 직접 작성했으며 실제 교통 정보가 아닙니다.',
      stages:[{id:'facts',label:'관계로 지식을 적다',text:'직접 연결된 사실을 적고, 목적지가 빈칸인 질문을 던진다.'},{id:'rules',label:'질문을 나누는 규칙',text:'규칙의 결론과 질문을 일치시키고, 결론 대신 해결할 조건을 읽는다.'},{id:'search',label:'답과 다른 가능성 찾기',text:'절을 실행한 질문 나무와 변수의 값을 살핀다. 다른 절로 돌아가 답을 더 찾고, 순환과 탐색 순서가 미치는 영향을 비교한다.'}],
      cities:[{id:'seoul',label:'서울'},{id:'busan',label:'부산'},{id:'daejeon',label:'대전'},{id:'gwangju',label:'광주'}],
      facts:[fact('s-b','seoul','busan'),fact('s-d','seoul','daejeon'),fact('b-g','busan','gwangju'),fact('d-g','daejeon','gwangju'),fact('g-s','gwangju','seoul','cycle')],rules,
      queries:[{id:'destinations',label:'서울에서 어디까지? · reach(seoul, Who)',query:[atom('reach','seoul','Who')]},{id:'origins',label:'어디에서 광주까지? · reach(From, gwangju)',query:[atom('reach','From','gwangju')]},{id:'return',label:'광주에서 부산까지? · reach(gwangju, busan)',query:[atom('reach','gwangju','busan')]}],limits:{maxDepth:12,maxSteps:1200,maxAnswers:16},
      originalImage:{src:'prolog-1974-member-computations.png',title:'원문 Fig.2 · 같은 질문에서 두 답과 실패 경로가 생기다',alt:'Kowalski1974 Fig.2의 도식 발췌. Member 변수 x에 a와 b가 각각 답으로 연결되는 두 종료 경로와, 빈 목록에서 끝나는 실패 경로를 표시한다.',caption:'원문은 목록 [a,b]의 원소 x를 찾는다. 한 경로에서는 x=a, 다른 경로에서는 x=b를 얻고, 빈 목록에 도달한 경로는 답 없이 끝난다. □는 남은 질문이 없는 성공이다. 아래 도시 보기의 질문 나무도 답 하나를 찾는 경로와 다른 가능성을 구분해 읽는다.',credit:'Robert Kowalski, Predicate Logic as Programming Language (1974), 인쇄 p.571 / PDF p.3, Fig.2의 도식만 발췌. 긴 원문 캡션은 포함하지 않고 뜻을 한국어로 설명했다.',source:at(3,'Fig.2 · 여러 답과 실패 경로')},
      evidence:[{title:'규칙의 두 가지 읽기',formula:'논리적 읽기\n  reach(X,Y) ← direct(X,Z) ∧ reach(Z,Y)\n\n실행의 읽기\n  reach(seoul,Who)를 풀려면\n  direct(seoul,Z), reach(Z,Who)를 차례로 푼다.',caption:'§6–7의 Horn 절과 절차 호출 관점에 대응한 자체 예시다. 원문 화살표 표기와 구별해, 화면의 코드에는 널리 쓰이는 head :- body 표기를 사용했다.',source:at(2,'§6 Horn Clauses · §7 Procedure Invocation')},{title:'일치시킨 값은 남은 질문에도 전달된다',formula:'direct(seoul,Z) ↔ direct(seoul,busan)\n  Z = busan\n\n남은 질문\n  reach(busan,Who)',caption:'머리와 선택한 질문을 일치시킨 치환을 남은 질문에도 적용한다. 같은 규칙을 다시 사용할 때는 변수 이름이 우연히 같아도 이전 호출의 변수와 구분한다.',source:at(2,'§7의 치환과 절차 지역 변수')},{title:'답의 관계와 찾는 순서는 같은 개념이 아니다',formula:'직접 규칙 먼저 / 재귀 규칙 먼저\n  같은 양의 관계 규칙\n  다른 실행 순서\n\n순환 + 재귀 먼저\n  깊이 제한에서 멈출 수 있다.',caption:'원문의 §9는 여러 절이 가능한 비결정성을, §11은 조건들의 실행 순서와 효율을 논한다. 이 화면은 절 순서와 깊이 우선 탐색을 직접 정한 실행이다. 유한한 논리적 답 집합이 있어도 이 실행이 제한 안에서 모든 답을 내는 것은 아니다.',source:at(3,'§9 Non-Determinism · §11은 PDFpp.4–5')}],
      source:at(1,'함의를 절차로, 증명을 계산으로 읽는 제안'),scope:'양의 관계와 상수·변수만 사용한, 함수 기호 없는 definite clause 인터프리터다. 가장 왼쪽 질문·위에서부터 절·깊이 우선 되돌아가기를 사용한다. 부정, cut, 산술, 입출력, 문장 분석, 메타 프로그래밍은 포함하지 않는다. 순환을 제거하는 tabling은 하지 않으며 깊이·절 시도·답 개수 제한을 표시한다.'
    },
    takeaway:{title:'지식을 적는 방식이, 질문을 푸는 계산이 된다',text:'한 규칙이 관계의 뜻과 질문을 나누는 방법을 함께 담는다. 변수는 아직 모르는 대상을 표현하고, 되돌아가기는 같은 질문을 만족하는 다른 값을 찾는다. 무엇이 답인지와 어떤 순서로 답을 찾을지는 구분해야 한다.'},
    technical:{title:'논리 프로그램과 이 실행을 더 읽기',paragraphs:[
      '지능을 어떤 계산으로 보았나: 해결할 문제의 관계를 논리 문장으로 적고, 개별 문제를 질문으로 제시한다. Kowalski는 함의를 절차 선언으로 읽고, 머리의 관계 이름과 본문의 호출들을 연결한다. 기계가 지식의 조건을 따라 질문을 분해하고, 아직 모르는 항의 값을 돌려주도록 하는 접근이다.',
      '사실·규칙·질문: direct(seoul,busan)은 조건 없이 성립하는 사실이다. reach(X,Y) :- direct(X,Y)는 direct가 성립할 때 reach가 성립한다는 규칙이다. reach(seoul,Who)는 Who가 어떤 값이면 성립하는지 묻는다. 이 보기에서 상수는 소문자, 변수는 대문자로 시작한다. 1972년 최초 문법을 그대로 복원한 표기는 아니다.',
      '규칙은 두 방향으로 읽는다: 논리적으로 본문이 성립하면 머리가 성립한다. 실행할 때는 질문과 머리를 맞춘 뒤 본문을 새 하위 질문으로 삼는다. 사실은 본문이 없는 절이며, 사실과 일치한 질문은 해결되어 목록에서 빠진다. 남은 질문 목록이 비면 한 도출이 성공한다.',
      'Unification과 변수 공유: 두 항이 같은 대상이 되도록 변수에 값을 연결한다. direct(seoul,Z)와 direct(seoul,busan)의 일치는 Z=busan을 만든다. 이 값은 같은 호출의 나머지 질문 reach(Z,Who)에 전달된다. 규칙의 변수를 호출할 때마다 새로 구분하므로, 재귀 호출의 X와 바깥 호출의 X를 같은 변수로 묶지 않는다. 이 보기에는 함수 기호가 없어 구조적 항의 occurs check 사례는 없다.',
      '입력과 출력은 질문에서 정해진다: 같은 reach 관계에 출발지를 주면 목적지를 찾고, 목적지를 주면 출발지를 찾을 수 있다. 별도 역방향 관계를 외워 두어야만 가능한 것은 아니다. 다만 이 성질을 모든 Prolog 프로그램의 실행 효율이나 모든 모드의 종료 보장으로 일반화하지 않는다. 원문 §10–11도 입출력 위치와 실행 순서의 관계를 구체적인 예로 논한다.',
      '여러 답과 되돌아가기: 한 절이 일치해도 뒤 조건에서 실패할 수 있다. 이때 이전 선택으로 돌아가 다른 절을 시도한다. 답을 하나 찾은 뒤에도 같은 방식으로 다른 답을 찾는다. 화면은 서로 다른 변수 값만 답 목록에 모으고, 같은 값이 다른 도출로 나온 경우는 실행 기록에 따로 표시한다. 일반 Prolog 최상위가 중복 답을 모두 제거한다고 주장하는 기능은 아니다.',
      '논리 의미와 실행 전략: 이 화면은 가장 왼쪽 질문부터, 절을 위에서 아래로, 깊이 우선으로 실행한다. 직접 규칙을 먼저 쓰면 바로 연결된 곳의 답을 먼저 얻는다. 재귀 규칙을 먼저 쓰면 더 긴 관계를 먼저 따라간다. 광주에서 서울로 돌아오는 연결을 켠 뒤 재귀를 먼저 시도하면 같은 경로를 반복하며, 뒤의 대안에 도달하기 전에 제한에 걸릴 수 있다.',
      '유한 실패와 멈춤: 모든 실행 대안을 실제로 마쳤는데 답이 없는 경우와, 깊이·시도 횟수·답 개수 제한에서 멈춘 경우를 나눈다. 제한 밖에 다른 답이 없는지는 이 실행으로 알 수 없다. 답을 못 찾았다는 사실을 현실의 관계가 거짓이라는 관찰과도 구분한다. 이 보기는 양의 질문만 실행하며, 실패를 논리적 부정으로 바꾸는 연산을 넣지 않았다.',
      '1972년의 프로젝트와 1974년의 논문: Colmerauer와 Roussel의 회고 본문 §2.2는 1972년 가을 Roussel이 Algol-W로 초기 Prolog를 구현하고, Colmerauer·Pasero·Kanoui 등이 프랑스어 소통 프로그램을 만들었다고 기록한다. Kowalski와의 교류, 문법 분석, 정리증명, 구현의 선택이 함께 등장한다. 이 카드의 세 인물은 그 형성의 서로 다른 역할을 대표하며 한 논문의 세 공동저자가 아니다.',
      '흥미로운 출발점: 회고의 1972년 시스템 예시는 프랑스어 문장에서 “자크는 사람인가?”, “자크는 어디에 있는가?” 같은 질문에 답하는 장면을 제시한다. 단순히 단어를 찾아 돌려주는 것이 아니라 문장의 관계를 표현해 추론하려는 목적이었다. 아래 도시 예시는 이 자연어 분석기를 실행하지 않으며, 관계 질의와 변수의 답만 따로 드러낸 것이다.',
      '초기 Prolog와 이 보기의 경계: 회고는 초기 언어의 지연 평가·형식적 부등 관계, 뒤의 cut·프로그램 변경·메타 호출 등 다양한 기능을 기술한다. 이 카드의 인터프리터는 그 전체를 복원하지 않는다. 상수와 변수, 양의 definite clause, 순서가 있는 하위 질문과 되돌아가기만 명시한 범위에서 계산한다.',
      '판본 확인: 내려받은 The birth of Prolog는 표지에 November1992라고 적힌 26쪽 초고다. 1996년 HOPL-II의 331–367쪽 출판본과 쪽수가 다르다. 초고 첫 쪽 초록의 1971·1972 표기는 본문의 1972년 초기/1973년 후속 판본 서술과 맞지 않아 연표 근거로 사용하지 않았다. 현재 연표의 1972년은 본문 §2.2와 공식 보존 기록으로 확인한다.'
    ],formula:'질문\n  reach(seoul,Who)\n\n재귀 규칙을 선택\n  reach(X,Y) :- direct(X,Z), reach(Z,Y)\n  X=seoul, Y=Who\n\n새 질문\n  direct(seoul,Z), reach(Z,Who)\n\n첫 사실과 일치\n  direct(seoul,busan) → Z=busan\n\n남은 질문\n  reach(busan,Who)\n\n직접 규칙과 사실로 해결\n  direct(busan,Who) ↔ direct(busan,gwangju)\n  Who=gwangju\n\n되돌아가 다른 절·사실의 답도 찾는다.'}
  },keyIdeas:[{title:'관계가 프로그램이 된다',text:'규칙은 관계가 성립하는 조건을 적고, 그 관계를 묻는 질문을 해결할 하위 질문으로도 읽힌다.'},{title:'변수가 모르는 대상을 표현한다',text:'한 관계에서 출발지나 목적지의 빈칸을 채울 수 있다. 일치시킨 값은 남은 조건에 함께 전달된다.'},{title:'다른 가능성으로 돌아간다',text:'실패하거나 답을 찾은 뒤 다른 절을 시도한다. 답의 의미와 탐색 순서·종료 조건을 구분한다.'}],videos:[],references:[
    {title:'Kowalski · Predicate Logic as Programming Language (1974)',url:paper,location:'Information Processing74, IFIP Congress, pp.569–574. 저자 공식 원문6쪽. PDFp.1 초록·서론.'},
    {title:'Horn 절과 절차 호출',url:paper+'#page=2',location:'인쇄570/PDFp.2, §6–8. 사실·절차·목표, 치환과 지역 변수, 계산의 성공과 실패.'},
    {title:'여러 계산과 입출력',url:paper+'#page=3',location:'인쇄571/PDFp.3, Fig.2·§9–10. 원소를 찾는 여러 답, 비결정성, 변수의 입출력 역할.'},
    {title:'질문의 순서와 계산 효율',url:paper+'#page=4',location:'인쇄572–573/PDFpp.4–5, §11. 조건의 실행 순서와 프로그램의 관계 의미 구분.'},
    {title:'The birth of Prolog · 1992 초고·1996 출판본 보존 기록',url:birth,location:'보존 기록이 연결한1992저자초고PDF26쪽을 확인했다. PDFpp.5–7 §2.2는1972년 초기구현·프랑스어 소통, pp.7–8 §2.3은1973년 후속언어. 초록의 연도 불일치는 본문으로 검토했다.'},
    {title:'초기 구현과 뒤의 언어 설계',url:birth,location:'초고PDFpp.16–18, §4.3·§5.1–5.2. backtracking 구현·절 순서·이후 primitives. 1996출판본 쪽수로 읽지 않는다.'},
    {title:'Computer History Museum · Prolog 원자료·출판 기록',url:'https://softwarepreservation.computerhistory.org/prolog/',location:'Preliminary Prolog (fall1972), Final Prolog (1973), 회고의1996 HOPL-II pp.331–367 서지와 저자초고 링크.'},
    {title:'The birth of Prolog · 1996 출판 서지',url:'https://doi.org/10.1145/234286.1057820',location:'HOPL-II 출판본 DOI. 본문과 그림의 확인은 접근한1992저자초고와1974논문을 기준으로 했다.'}
  ]}});
})();
