/* C-IL2P1999: a trainable neural representation of a propositional consequence operator. */
(function(){
 'use strict';
 const paper='https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf';
 const source=(page,title)=>({title:'Garcez·Zaverucha (1999) · '+title,url:paper+'#page='+page});
 const clause=(id,head,positive=[],negative=[])=>({id,head,positive,negative});
 const atoms=['Submitted','Verified','Blocked','Eligible','Offer'];
 const rules=[clause('verify','Verified',['Submitted']),clause('eligible','Eligible',['Verified'],['Blocked']),clause('offer','Offer',['Eligible'])];
 window.AtlasEntries.register({
  id:'cilp',record:{
   title:'C-IL²P · 규칙을 계산하는 신경망도, 사례로 배울 수 있을까?',subtitle:'The Connectionist Inductive Learning and Logic Programming System',
   dateLabel:'1999 · 논문 출판',people:['Artur d’Avila Garcez','Gerson Zaverucha'],
   authorNote:'Artur S. d’Avila Garcez와 Gerson Zaverucha. Applied Intelligence11(1), pp.59–77, 1999. 확인한 대학 공개본은1999년1월13일자 원고이며 저장소 표지1쪽을 포함해32쪽이다. 최종 출판본과 페이지를 구분해 원고 쪽수로 위치를 표시한다.',
   summary:'명제 논리 프로그램의 한 단계 귀결을 미분 가능한 신경망으로 표현하고, 출력을 다음 입력으로 되돌려 추론하게 했다. 같은 망을 사례로 수정하고 다시 규칙으로 읽는 순환을 지향했다.',
   detail:'',question:'',related:['kbann','prolog','ltn'],
   sources:[{title:'Garcez·Zaverucha1999 · 저자 대학 공개본',url:paper},{title:'City Research Online · 출판 기록',url:'https://openaccess.city.ac.uk/id/eprint/301/'}],
   caveat:'한 단계 T_P의 신경 표현과 반복 계산의 수렴 조건을 구분한다. 아래 제출·자격 사례와 가중치 변경은 직접 작성했으며, 원논문의 학습 실험이나 규칙 추출 알고리즘 재현 결과가 아니다.'
  },content:{article:{
   question:'규칙으로 결론을 계산하는 신경망을 만들면,\n추론과 배움을 같은 구조 안에서 이어 갈 수 있을까?',
   opening:[
    '“제출했다면 확인한다. 확인했고 차단되지 않았으면 자격이 있다. 자격이 있으면 제안한다.” 이 지식에는 결론 사이의 순서가 있다. 제출했다는 사실만 처음 주면 확인, 자격, 제안이 한 번에 모두 나오지 않는다. 지금 알고 있는 사실에 규칙을 한 번 적용하고, 얻은 결론을 다시 입력해 다음 결론을 계산할 수 있다.',
    'Garcez와 Zaverucha는 이 한 단계의 규칙 계산을 신경망이 표현하게 했다. 각 규칙의 조건 묶음을 은닉 유닛으로, 결론을 출력 유닛으로 옮긴다. 참은 양의 활성도, 거짓은 음의 활성도로 표현하고, 조건 수와 같은 결론을 가진 규칙 수에 맞춰 가중치와 문턱을 계산한다. 신경 계산의 결과가 어떤 논리 연산을 나타내는지부터 연결하는 발상이다.',
    '출력을 같은 이름의 입력에 되돌리면 규칙을 거듭 적용할 수 있다. 활성도 함수가 미분 가능하므로 같은 신경망의 지식을 사례로 수정할 길도 열린다. 연구가 제시한 전체 그림은 지식에서 시작해 추론하고, 사례로 배우고, 배운 내용을 전문가가 읽을 규칙으로 돌려보는 순환이다. 다만 이 논문의 신경 표현 정리와 수렴 조건, 규칙 추출을 향한 목표는 각각 구분해 읽어야 한다.'
   ],
   visual:{
    id:'cilp-program-network',navLabel:'규칙을 계산하는 신경망',title:'규칙의 한 단계 계산과, 출력을 되돌리는 반복을 연결하다',
    caption:'직접 만든 제출·자격 프로그램으로 원논문의 번역 수식을 실행합니다. 이진 해석을 반복하는 기록과 연속 활성도를 그대로 되돌리는 기록을 따로 보여 줍니다.',
    stages:[{id:'translate',label:'1 · 규칙을 한 번 계산',text:'지금의 해석에서 성립하는 규칙을 한 번 적용하는 연산 T_P를, 미분 가능한 bipolar 신경 계산으로 표현한다.'},{id:'recall',label:'2 · 출력을 다음 입력으로',text:'각 단계의 결론을 다음 입력으로 되돌린다. 끝내 같은 해석이 되는 경우와 부정 순환으로 이진 해석이 되풀이되는 경우를 비교한다.'},{id:'readback',label:'3 · 바뀐 판단 다시 읽기',text:'직접 정한 연결 변경 뒤4입력을 전수 검사한다. 이 판정표 읽기를 원논문의 학습 실행이나 규칙 추출 알고리즘으로 부르지 않는다.'}],
    legend:'기호: Submitted=제출됨 · Verified=확인됨 · Blocked=차단됨 · Eligible=자격 있음 · Offer=제안함. 화살표 오른쪽이 현재 단계의 조건, 왼쪽이 새 결론입니다.',
    cases:[
     {id:'chain',label:'제출에서 제안까지',program:{atoms,clauses:[clause('submitted','Submitted'),...rules]},explanation:'Submitted는 사실 규칙입니다. 공집합에서 시작하면 제출→확인→자격→제안이 단계별로 이어집니다. Blocked를 결론으로 만드는 규칙은 없습니다. 이 명제 프로그램의 현재 해석에 없는 원자를 거짓으로 평가하는 계산이며, 현실에 차단 기록이 없다는 사실만으로 안전을 증명하는 절차가 아닙니다.'},
     {id:'blocked',label:'차단 사실을 함께 두면',program:{atoms,clauses:[clause('submitted','Submitted'),clause('blocked','Blocked'),...rules]},explanation:'이번에는 Blocked도 사실 규칙으로 넣습니다. 확인까지 진행돼도 not Blocked 조건이 충족되지 않아 자격·제안이 나오지 않습니다. 부정 조건은 이 단계 해석에 Blocked가 없을 때 만족하는 프로그램의 부정입니다.'},
     {id:'cycle',label:'부정 자기순환의 반례',program:{atoms:['P'],clauses:[clause('cycle','P',[],['P'])]},explanation:'P ← not P는 이진 해석에서 ∅→{P}→∅를 반복합니다. 모든 일반 논리 프로그램이 한 안정 해석에 수렴한다는 주장은 성립하지 않습니다. 연속 활성도를0에서 시작하면0에 머무를 수 있지만, 그 값은 참·거짓의 판정 구간에 들지 않습니다. 이진 반복과 연속 동역학을 동일한 것으로 단정하지 않습니다.'}
    ],initial:{caseId:'chain',amin:.7,beta:1},
    originalImage:{src:'cilp-1999-recurrent-network.png',title:'원논문 Figure3 · 같은 원자의 출력을 입력에 되돌리다',alt:'CILP1999 공개 원고 Figure3의 신경망. 아래 입력B에서 규칙 유닛을 거쳐 위 출력B로 연결되고, 점선 Wr이 출력B를 입력B에 되돌린다.',caption:'원문의 예제 프로그램을 번역한 신경망 도식만 발췌했다. W와−W는 규칙의 양·음 조건에서 온 연결이고, W_r은 출력B를 다음 입력B로 되돌리는 연결이다. 원문은 이 되돌림의 가중치를1로 둔다. 그림의 A–F·T와 위의 제출·자격 프로그램은 다른 사례다. 모든 출력에 대한 반복 구조는 이어지는 원문 Figure4에서 설명한다.',credit:'Artur S. d’Avila Garcez·Gerson Zaverucha, 1999 공개 원고 p.13 / 저장소 PDF p.14, Figure3 도식 발췌. 원문 수식과 배치를 보존하고 표제 설명은 밖에 붙였다. City Research Online의 원문·저자·서지·링크를 함께 표시한다.',source:source(14,'원고p.13 Figure3 · 신경망과 되돌림 연결')},
    source:source(8,'원고pp.7–12 · Translation Algorithm·Theorem3'),
    scope:'이 보기는 최대6원자·8규칙의 유한 명제 프로그램을 다룬다. T_P는 한 단계의 동기 귀결 연산이며, 선택한 해석의 참·거짓을 기준으로 not을 평가한다. 연속 반복은 실제 출력을 재입력하며 ±1로 다시 바꾸지 않는다. A_min·가중치의 충분조건과 반복 수렴의 프로그램 조건은 별개다. 실제 사례 학습·원문 DNA 실험·규칙 추출 알고리즘은 실행하지 않는다.'
   },
   takeaway:{title:'신경망이 무엇을 추론하는지, 논리 연산과 연결해 묻다',text:'C-IL²P는 신경망의 한 번 계산을 명제 프로그램의 T_P와 연결했다. 같은 원자의 출력을 되돌리면 추론 단계를 반복할 수 있고, 미분 가능한 계산은 사례로 지식을 바꾸는 통로가 된다. 학습 뒤 어떤 규칙으로 설명할 수 있는지, 반복이 수렴하는지는 따로 검토해야 한다.'},
   technical:{title:'한 단계 표현 정리, 수렴 조건, 규칙 추출의 경계',paragraphs:[
    '확인한 판본: 대학 공개본은 저장소 표지 뒤1999년1월13일자 원고가 이어진다. 원고31쪽에 저장소 표지1쪽이 더해 PDF32쪽이다. 저장소는 unspecified version이며 최종 출판본과 다를 수 있다고 명시한다. 이 카드의 원문 위치는 PDF쪽수와 원고쪽수를 함께 적는다. 최종 서지는 Applied Intelligence11(1):59–77, 1999, DOI10.1023/A:1008328630915다.',
    '명제 general program: 원문 Definition1은 A←L₁,…,L_k 꼴의 규칙을 정의하고, 몸체에 원자와 not 원자를 허용한다. 이 카드의 원자 이름은 문장 전체를 나타내는 기호이며, 변수에 대한 단일화나 임의의 일차 논리 문장을 실행하지 않는다. not Blocked는 현재 입력 해석에서 Blocked가 거짓일 때 만족한다. 고전 논리의 명시적 부정이나 미관찰 정보 전체에 대한 일반적 판단과 구분한다.',
    '무엇을 한 번 계산하는가: T_P(I)는 현재 해석I에서 몸체가 만족하는 규칙들의 머리를 모은 다음 해석이다. 같은 단계 안에서 방금 얻은 결론을 즉시 다른 규칙에 연쇄 적용하지 않는다. Submitted 사실→Verified→Eligible→Offer의 자체 사례는 공집합에서 네 번의 동기 갱신으로 제안까지 도달하고, 그다음 같은 해석이 된다. 이 한 단계 연산과 그 반복이 서로 다른 화면에 기록된다.',
    '왜 bipolar인가: 원고pp.6–9는 참을[A_min,1], 거짓을[−1,−A_min]로 표현하고 그 사이를 판정 범위에서 뺀다. h(z)=2/(1+exp(−βz))−1이며 같은 식은 tanh(βz/2)로 계산할 수 있다. 부정 조건은 음의 연결로 옮긴다. 조건을 만족하지 않는 입력이 은닉 유닛에 음의 기여를 하게 하며, 가중치와 문턱의 크기를 함께 정해 논리 계산의 경계를 확보한다.',
    '번역의 충분조건: M은 규칙 몸체의 최대 조건 수와 같은 머리를 가진 규칙의 최대 개수 중 큰 값이다. 원문 수식(15)–(16)은 A_min>(M−1)/(M+1), W≥(2/β)·ln((1+A_min)/(1−A_min))/(M(A_min−1)+A_min+1)를 제시한다. 은닉 문턱은(1+A_min)(k−1)W/2, 출력 문턱은(1+A_min)(1−μ)W/2다. 이 카드는 그 식으로 W의 하한을 계산하고, 소수 첫째 자리 올림에0.5를 더한 자체 값을 사용한다. β=1, 기본A_min=.7이며 화면의 수치는 실제 선택값으로 다시 계산한다.',
    'Theorem3의 범위: 원고p.10은 각 명제 general program에 대해, 번역 알고리즘으로 얻은 한 은닉층 신경망이 T_P를 계산한다고 보인다. 의미는 참·거짓을 나타내는 활성도 구간 아래의 대응이다. 출력 실수가0또는1과 정확히 같다는 정리가 아니다. 판정 구간 밖인0에서 시작한 입력에 같은 한 단계의 이진 의미 보존을 곧바로 가정하지 않는다.',
    '되돌림과 수렴: 원고pp.13–16은 같은 원자의 출력을 입력으로 잇는 가중치1의 재귀 연결로 T_P를 반복한다. Theorem7과 Corollary8은 acceptable general program에 대한 고정점과 안정모형의 조건을 제시한다. 임의의 부정 순환 프로그램 전체가 언제나 안정된 논리 해석을 만든다는 주장이 아니다. 이 화면은 이진 해석의 반복과 실수 활성도의 반복을 별도로 계산한다. 부정 자기순환의 이진 진동이 모든 연속 초기값에서 같은 진동을 강제한다고 서술하지 않는다.',
    '학습이 들어갈 자리: 원고pp.15–16은 기존 프로그램을 배경 지식으로 두고 역전파로 수정할 수 있음을 설명한다. 새 입력·출력과 은닉 유닛,0가중치 연결을 추가하고 작은 무작위 값으로 흔들어 새로운 개념을 배울 경로를 연다. 되돌림 연결 자체의 가중치는 고정해 외부 반복을 담당한다. 이 카드는 실제 훈련을 실행하지 않고, 한 자격 유닛의 연결과 문턱을 직접 바꾸는 민감도 비교만 실행한다.',
    '다시 규칙으로 읽기: 원고pp.3·16은 학습된 망에서 수정 프로그램을 추출하는 단계를 전체 C-IL²P 순환에 포함하지만, 추출 단계는 이 논문의 범위 밖이라고 명시한다. 이 보기의4입력 열거는 직접 정한 판정표 검사다. 출력 부호0을 경계로 고른 결과와 일치하는 작은 조건식을 적으며, 판정 유보 구간도 함께 표시한다. 이를 원문 추출 알고리즘이나 임의의 학습 신경망에 대한 논리 동치 보장으로 부르지 않는다.',
    '원문의 적용과 이 사례의 차이: 원고§4는 프로모터·스플라이스 접합부의 DNA 분류를 다룬다. 그 데이터, 학습 설정, 비교 결과는 자체 제출·자격 사례와 별개다. 이 화면의 계산이 보여 주는 것은 번역 수식과 유한 반복, 직접 정한 가중치 변경 뒤의 판정 차이다. 원논문의 분류 성능이나 훈련 뒤 지식 추출을 재현한 결과가 아니다.'
   ],formula:'T_P(I) = { A | 규칙 A ← L₁,…,L_k 의 몸체가 I에서 성립 }\n\n참: 활성도 ≥ A_min\n거짓: 활성도 ≤ −A_min\n사이 구간: 판정 유보\n\nh(z) = 2/(1+exp(−βz))−1\nA_min > (M−1)/(M+1)\nW ≥ (2/β)·ln((1+A_min)/(1−A_min))\n    / [M(A_min−1)+A_min+1]\n\n출력을 다음 입력으로: 되돌림 가중치 W_r=1\n한 단계 T_P의 표현 ≠ 모든 프로그램의 반복 수렴\n직접 바꾼 가중치 비교 ≠ 실제 학습·원문 규칙 추출 실행'}
  },
  keyIdeas:[{title:'한 단계의 논리 계산을 신경망으로 표현한다',text:'규칙의 몸체는 은닉 유닛, 결론은 출력 유닛에 대응시킨다. 충분한 활성도 간격과 가중치 크기로 T_P와의 연결을 정한다.'},{title:'결론을 다시 입력해 추론을 반복한다',text:'되돌림 가중치1로 같은 원자의 출력과 입력을 잇는다. 수렴은 프로그램의 조건을 따져야 하며 부정 순환은 따로 검토한다.'},{title:'배운 내용을 다시 읽는 순환을 지향한다',text:'미분 가능한 신경 계산을 사례로 수정하고 규칙으로 설명할 길을 연결한다. 원문의 추출 목표와 이 카드에서 실행한 유한 판정표 검사를 구분한다.'}],videos:[],
  references:[
   {title:'Garcez·Zaverucha1999 · 저자 대학 공개본',url:paper,location:'PDF32쪽=저장소 표지1쪽+원고31쪽. 원고 표제·저자·1999년1월13일은 PDFp.2. 최종 출판본과 다를 수 있는 unspecified version.'},
   {title:'CILP · 전체 순환과 추출 범위',url:paper+'#page=4',location:'원고p.3 / PDFp.4. 지식→신경망→사례→설명 순환과 추출 단계 범위 밖 명시. Figure1은 원고p.4 / PDFp.5.'},
   {title:'CILP · 논리 규칙과 bipolar 번역',url:paper+'#page=6',location:'원고pp.5–9 / PDFpp.6–10. Definition1, 규칙과 연결, 활성도 구간, Translation Algorithm.'},
   {title:'CILP · Theorem3와 가중치 충분조건',url:paper+'#page=11',location:'원고pp.10–12 / PDFpp.11–13. 한 단계 T_P 표현과 수식(15)–(16).'},
   {title:'CILP · Figure3와 되돌림',url:paper+'#page=14',location:'원고p.13 / PDFp.14. Figure3의 도식만 원문 픽셀로 발췌. 가중치 W_r=1의 설명과 Figure4는 이어지는 원고p.14 / PDFp.15.'},
   {title:'CILP · 수렴과 학습·추출의 경계',url:paper+'#page=15',location:'원고pp.14–16 / PDFpp.15–17. acceptable program, Theorem7·Corollary8, 고정 되돌림 연결과 역전파, Remark2 추출 범위 밖.'},
   {title:'City Research Online · 출판·이용 기록',url:'https://openaccess.city.ac.uk/id/eprint/301/',location:'Applied Intelligence11(1):59–77, 1999. DOI10.1023/A:1008328630915. 저장소는 저자·표제·서지·링크와 원문 보존을 조건으로 연구·학습·비영리 이용을 안내한다.'}
  ]}
 });
})();

