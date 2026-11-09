/* STRIPS1971: authored finite planning domain; original means-ends search kept distinct. */
(function(){
  'use strict';
  const paper='https://www.ijcai.org/proceedings/1971/0063.pdf';
  const proceedings='https://ijcai.org/proceedings/1971/63';
  const at=(page,title)=>({title:'Fikes & Nilsson (1971) · '+title,url:paper+'#page='+page});
  const action=(id,label,preconditions,add,remove)=>({id,label,preconditions,add,delete:remove});
  const actions=[
    action('pick-key','작업실에서 열쇠 줍기',['at-a','key-at-a'],['has-key'],['key-at-a']),
    action('move-a-b','작업실 A → 복도 B',['at-a'],['at-b'],['at-a']),
    action('move-b-a','복도 B → 작업실 A',['at-b'],['at-a'],['at-b']),
    action('open-door','열쇠로 자료실 문 열기',['at-b','has-key','door-locked'],['door-open'],['door-locked']),
    action('pick-box-b','복도에서 상자 들기',['at-b','box-b','hand-empty'],['holding-box'],['box-b','hand-empty']),
    action('drop-box-b','복도에 상자 놓기',['at-b','holding-box'],['box-b','hand-empty'],['holding-box']),
    action('move-b-c','문을 지나 복도 B → 자료실 C',['at-b','door-open'],['at-c'],['at-b']),
    action('move-c-b','문을 지나 자료실 C → 복도 B',['at-c','door-open'],['at-b'],['at-c']),
    action('drop-box-c','자료실에 상자 놓기',['at-c','holding-box'],['box-c','hand-empty'],['holding-box']),
    action('pick-box-c','자료실에서 상자 들기',['at-c','box-c','hand-empty'],['holding-box'],['box-c','hand-empty']),
    action('move-a-c','우회 통로로 작업실 A → 자료실 C',['at-a','side-open'],['at-c'],['at-a']),
    action('move-c-a','우회 통로로 자료실 C → 작업실 A',['at-c','side-open'],['at-a'],['at-c'])
  ];
  window.AtlasEntries.register({
    id:'strips',
    record:{
      title:'STRIPS · 목표를 이루려면, 먼저 무엇을 해야 할까?',
      subtitle:'STRIPS · 상태·목표·행동의 조건과 효과 · 스트립스',
      dateLabel:'1971 · IJCAI 논문 발표',people:['Richard Fikes','Nils J. Nilsson'],
      authorNote:'Richard E. Fikes와 Nils J. Nilsson의 1971년 IJCAI 논문. 같은 해 Artificial Intelligence 학술지 판본과 쪽수를 구분한다.',
      summary:'현재 세계와 목표를 기호로 표현하고, 행동의 조건과 효과를 이용해 목표를 만족시키는 행동 순서를 찾도록 했다.',
      detail:'',question:'',related:['resolution','advice-taker','prolog','dreamcoder'],
      sources:[{title:'Fikes & Nilsson · STRIPS · IJCAI1971 원문',url:paper},{title:'IJCAI · 논문 출판 기록',url:proceedings}],
      caveat:'직접 작성한 열쇠·문·상자 모형의 상태 전이와 유한 탐색을 다룬다. 원문의 means–ends 전략과 이 보기의 너비 우선 탐색, 모형의 계획과 실제 로봇 실행을 구분한다.'
    },
    content:{
      article:{
        question:'상자를 자료실로 옮기려면,\n지금 무엇을 하고 그전에 무엇을 해야 할까?',
        opening:[
          '로봇은 작업실 A에 있고 상자는 복도 B에 있다. 자료실 C로 가는 문은 잠겨 있고, 열쇠는 작업실에 있다. “상자를 자료실에 놓아라”는 목표만 적어서는 어느 행동부터 해야 할지 알 수 없다. 문을 통과하려면 문이 열려 있어야 하고, 문을 열려면 그곳에 도착해 열쇠를 가지고 있어야 한다.',
          'Fikes와 Nilsson은 현재 세계를 사실과 관계로 표현하고, 행동마다 필요한 조건과 그 행동이 바꾸는 사실을 명시했다. 계획은 이 세계 모형을 목표가 성립하는 모형으로 바꾸는 행동들의 순서다. 기계가 목표와 현재 상태의 차이를 읽고, 그 차이를 줄일 행동과 먼저 해결할 하위 목표를 찾게 하려 했다.',
          '원문의 STRIPS는 한 세계 모형 안의 조건을 확인하는 정리증명과, 여러 세계 모형을 거치며 계획을 찾는 탐색을 연결한다. 아래에서는 직접 만든 세 방의 모형으로 행동 전후를 확인하고, 열쇠·문의 상태·우회 통로를 바꾸었을 때 가능한 계획이 어떻게 달라지는지 살핀다.'
        ],
        visual:{
          id:'strips-planning',navLabel:'목표에서 계획으로',title:'현재 세계를 바꿔, 목표가 성립하는 세계로',
          caption:'원논문의 세계 모형·연산자·목표 표현을 참고해 구성했습니다. 방·열쇠·상자 자료는 직접 작성했으며, 아래의 탐색은 이 유한 모형에 대한 너비 우선 탐색입니다.',
          stages:[
            {id:'world',label:'목표와 현재를 나누다',text:'현재 어떤 사실이 성립하고 무엇이 목표인지 나눈다. 목표를 만들 수 있는 행동에서 필요한 조건을 읽는다.'},
            {id:'operator',label:'행동 전후를 비교하다',text:'행동의 전제 조건을 확인하고, 사라지는 사실·새로 생기는 사실·그대로 남는 사실을 비교한다.'},
            {id:'plan',label:'행동의 순서를 찾다',text:'적용 가능한 행동으로 모형을 바꾸며 계획을 찾는다. 찾은 계획을 한 단계씩 미리 보고, 다른 초기 조건과 비교한다.'}
          ],
          facts:[
            {id:'at-a',formula:'At(robot,A)',label:'로봇은 작업실 A에 있다'},
            {id:'at-b',formula:'At(robot,B)',label:'로봇은 복도 B에 있다'},
            {id:'at-c',formula:'At(robot,C)',label:'로봇은 자료실 C에 있다'},
            {id:'key-at-a',formula:'At(key,A)',label:'열쇠는 작업실 A에 있다'},
            {id:'has-key',formula:'Has(robot,key)',label:'로봇이 열쇠를 가지고 있다'},
            {id:'door-locked',formula:'Locked(door)',label:'자료실 문이 잠겨 있다'},
            {id:'door-open',formula:'Open(door)',label:'자료실 문이 열려 있다'},
            {id:'side-open',formula:'Open(side)',label:'작업실과 자료실의 우회 통로가 열려 있다'},
            {id:'box-b',formula:'At(box,B)',label:'상자는 복도 B에 있다'},
            {id:'box-c',formula:'At(box,C)',label:'상자는 자료실 C에 있다'},
            {id:'holding-box',formula:'Holding(robot,box)',label:'로봇이 상자를 들고 있다'},
            {id:'hand-empty',formula:'HandEmpty(robot)',label:'로봇의 상자 운반 자리가 비어 있다'}
          ],
          baseInitial:['at-a','box-b','hand-empty'],
          controls:[
            {id:'keyAvailable',label:'작업실에 열쇠가 있다',initial:true,on:['key-at-a'],off:[]},
            {id:'doorOpen',label:'자료실 문이 처음부터 열려 있다',initial:false,on:['door-open'],off:['door-locked']},
            {id:'sidePassage',label:'작업실↔자료실 우회 통로가 열려 있다',initial:false,on:['side-open'],off:[]}
          ],
          actions,goal:['box-c'],goalText:'상자가 자료실 C에 놓여 있다',defaultAction:'open-door',
          limits:{maxDepth:8,maxStates:512},depthChoices:[4,6,8,12],
          map:{rooms:[{id:'a',name:'작업실 A',at:'at-a'},{id:'b',name:'복도 B',at:'at-b'},{id:'c',name:'자료실 C',at:'at-c'}],box:{b:'box-b',c:'box-c'},holding:'holding-box',keyAt:'key-at-a',hasKey:'has-key',doorOpen:'door-open',sideOpen:'side-open'},
          originalImage:{src:'strips-1971-search-tree.png',title:'원문 Figure 1 · 세계 모형과 남은 목표가 함께 있는 탐색 나무',
            alt:'STRIPS1971 Figure1의 탐색 나무. 각 노드에는 세계 모형 M과 목표 목록이 표시되고, 연산자를 적용한 가지가 이어진다.',
            caption:'원문 노드는 세계 모형 M뿐 아니라 남은 목표 목록도 함께 둔다. 목표와의 차이를 줄이는 연산자를 고르고 그 전제 조건을 하위 목표로 만든다. 아래에서 사용하는 상태만의 너비 우선 탐색 나무와 동일한 알고리즘으로 읽지 않는다.',
            credit:'Fikes & Nilsson, IJCAI1971, 인쇄 p.611 / PDF p.4, Figure1. 원문 그림과 캡션을 함께 보존한 발췌.',source:at(4,'Figure1 · A typical STRIPS search tree')},
          evidence:[
            {title:'행동의 표현 · 조건과 바뀌는 사실',formula:'적용 가능: Pre(action) ⊆ S\n\n다음 모형: S′ = (S ∖ Delete(action)) ∪ Add(action)',caption:'§II.A와 §III.B의 연산자 표현을 이 카드의 유한한 사실 집합에 대응했다. 원문은 더 일반적인 일차 논리 식과 정리증명, 도출식의 의존성도 다룬다.',source:at(2,'§II.A Problem Space · §III.B Operator Descriptions')},
            {title:'목표에서 먼저 해야 할 일을 읽다',formula:'목표: At(box,C)\n  ← 자료실에 상자 놓기\n필요: At(robot,C) ∧ Holding(robot,box)',caption:'직접 만든 행동 목록에서 목표 사실을 추가하는 행동과 그 전제 조건을 읽은 것이다. 원문의 means–ends 원리와 연결하지만, 원래 STRIPS의 목표 목록 탐색을 실행한 기록은 아니다.',source:at(3,'§II.B Search Strategy')}
          ],
          source:at(1,'초록·서론 · 세계 모형 사이에서 행동 순서 찾기'),
          scope:'직접 정한 명제 사실과 행동에서 전제 조건·추가·삭제를 계산한다. 계획 탐색은 단위 비용 행동의 너비 우선 탐색이며, 원문의 정리증명기나 means–ends 탐색, 실제 로봇의 관찰·행동 실행을 수행하지 않는다.'
        },
        takeaway:{title:'계획은 행동 이름의 목록이 아니라, 조건이 이어지는 세계 모형의 경로다',text:'나중에 할 행동의 조건이 앞선 행동으로 만들어져야 한다. 어떤 사실을 지우고 더하는지 명시하면 행동 뒤의 모형을 확인할 수 있다. 같은 목표라도 열쇠·문·통로의 상태가 달라지면 다른 경로가 필요하다.'},
        technical:{title:'원논문의 계획과 이 보기의 계산을 더 읽기',paragraphs:[
          '세계 모형과 목표: §II.A는 초기 세계 모형, 사용 가능한 연산자와 그 효과, 목표 식으로 문제 공간을 정의한다. 원문의 세계 모형은 일차 술어 논리 식들의 모음이다. 목표는 그 모형에서 성립하는지 증명할 식이다. 이 카드에서는 세 방과 상자에 대해 명시한 유한 명제 사실로 한정했다.',
          '정리증명과 계획 탐색의 역할: 서론은 한 모형 안에서 행동의 적용 가능성과 목표 성립을 확인하는 정리증명, 여러 모형 사이를 이동하는 탐색을 구분한다. 원문은 resolution 정리증명기를 사용한다. 이 보기의 전제 조건 확인은 원자 사실이 집합에 포함되는지 검사하며, 일반 논리식의 증명을 대신 구현한 것으로 설명하지 않는다.',
          '원문의 means–ends 분석: §II.B는 현재 모형에서 목표를 증명하려다 남은 차이를 읽고, 그 차이를 줄일 수 있는 연산자를 고른다. 그 연산자의 전제 조건을 새로운 하위 목표로 삼아 먼저 해결한다. 원문 Figure1은 세계 모형과 목표 목록을 함께 둔 노드들을 보여 준다. 이 방법을 단순한 상태 전체의 너비 우선 나열과 구분한다.',
          '추가·삭제와 남겨 둘 사실: 행동의 효과는 더할 식과 지울 식으로 표현한다. 이 카드의 기본 사실 모형은 삭제 집합을 뺀 뒤 추가 집합을 합친다. 열쇠를 줍는 동안 로봇의 위치나 상자의 위치는 계속 남는다. 원문 §III.B는 도출해 둔 식의 근거가 삭제될 때 그 도출식도 유지할 수 없는 의존성 문제를 함께 다룬다.',
          '행동 모형과 실제 행동: 원문 서론의 각주는 계획 중 연산자를 세계 모형에 적용하는 일과, 실제 로봇의 action routine 실행을 구분한다. 화면에서 문이 열리는 것은 명시한 기호 효과가 적용된 결과다. 실제 문 상태를 관찰하거나 모터를 제어한 결과가 아니다.',
          '실행 조건을 연결하는 사례: 기본 모형에서는 열쇠를 줍고, 복도로 이동하고, 문을 열고, 상자를 들고, 자료실로 이동해, 상자를 내려놓는 여섯 행동이 한 가능한 계획이다. 계획기는 행동들의 순서를 고정해 외운 것이 아니라 현재 사실과 같은 행동 목록에서 경로를 찾는다. 같은 길이의 다른 계획이 있을 수 있다.',
          '달라진 조건과 다른 계획: 문이 처음부터 열려 있으면 열쇠와 문 열기가 필요 없어 네 행동의 계획이 있다. 열쇠가 없고 문이 잠겨 있어도 우회 통로가 열려 있으면 복도에서 상자를 든 뒤 작업실을 거쳐 자료실로 가는 다섯 행동의 경로가 있다. 열쇠와 우회 통로가 모두 없고 문이 잠겨 있으면 이 행동 목록의 도달 가능한 상태들에서는 목표를 만들지 못한다.',
          '이 보기의 탐색 보장: 너비 우선 탐색(Breadth-First Search, BFS)은 같은 비용으로 세는 행동의 수가 적은 층부터 살핀다. 목표를 처음 발견한 경로를 돌려준다. 방문한 사실 집합은 다시 펼치지 않는다. 이는 정해진 양의 전제 조건·유한 사실·결정적 효과의 모형에 대한 결과다. 원래 STRIPS의 탐색 전략이나 실제 소요 시간의 최적성을 보인 결과가 아니다.',
          '찾지 못함과 범위 제한: 도달 가능한 상태를 모두 살핀 뒤의 실패와, 정한 깊이·상태 수 제한에서 멈춘 경우를 나눈다. 제한으로 멈췄다면 그 바깥에 계획이 없다고 결론 내리지 않는다. 아무 행동을 하지 않아도 목표가 이미 성립하면 빈 계획이 정당한 답이다.',
          '기록과 부정의 범위: 이 보기에서는 정해진 명제 사실 집합을 현재 모형의 완전한 상태로 사용한다. 필요한 사실이 집합에 없으면 해당 연산자를 적용하지 않는다. 현실에서 그 사실이 거짓이라는 관찰로 일반화하지 않는다. 모형 작성자가 빠뜨린 조건·행동 효과와 실제 세계의 예외는 별도의 관찰과 검증 대상이다.',
          '판본과 쪽수: 현재 연표는 IJCAI1971 발표를 기준으로 한다. 공식 웹 서지는608–619쪽으로 표시하지만 내려받은 원문 PDF는13쪽이며 인쇄608–620쪽까지 이어진다. 같은 해 Artificial Intelligence 학술지 판본은189–208쪽으로, 이 카드의 그림 쪽수를 학술지 판본에 그대로 적용하지 않는다.'
        ],formula:'현재 S = {At(robot,A), At(box,B), At(key,A), Locked(door), HandEmpty(robot)}\n\n행동: 열쇠 줍기\nPre = {At(robot,A), At(key,A)}\nDelete = {At(key,A)}\nAdd = {Has(robot,key)}\n\n다음 S′ = {At(robot,A), At(box,B), Locked(door), HandEmpty(robot), Has(robot,key)}\n\n현재 모형의 조건 확인 → 적용 가능한 행동 → 바뀐 모형\n→ 목표가 성립하는지 확인 → 필요한 다음 행동 탐색'},
      },
      keyIdeas:[{title:'목표를 만족하는 세계 모형을 찾는다',text:'현재 사실과 목표를 구분하고, 행동이 현재 모형을 어떻게 바꾸는지 이용해 행동의 순서를 찾는다.'},{title:'행동의 조건이 하위 목표가 된다',text:'목표를 만들 행동을 골라도 그 전제 조건이 바로 성립하지 않을 수 있다. 먼저 무엇을 만들어야 하는지가 계획 문제의 일부가 된다.'},{title:'바뀌는 것과 유지되는 것을 명시한다',text:'새로 생기거나 사라지는 사실을 관리하며 후속 행동의 조건을 다시 확인한다. 계획의 경로를 각 상태와 행동 효과로 검사할 수 있다.'}],
      videos:[],references:[
        {title:'STRIPS: A New Approach to the Application of Theorem Proving to Problem Solving',url:paper,location:'PDF13쪽, 인쇄608–620. 초록·서론은PDFp.1/인쇄608. 원문과 공식 웹 서지의 끝쪽수 표시 차이를 기록했다.'},
        {title:'STRIPS · 문제 공간과 연산자',url:paper+'#page=2',location:'§II.A,PDFp.2/인쇄609. 세계 모형·연산자·목표와 전제 조건·추가·삭제 효과.'},
        {title:'STRIPS · means–ends 탐색',url:paper+'#page=3',location:'§II.B,PDFpp.2–3/인쇄609–610. 차이를 줄일 연산자와 그 전제를 하위 목표로 구성. Figure1은PDFp.4/인쇄611.'},
        {title:'STRIPS · 원문 Figure1과 Figure2',url:paper+'#page=4',location:'인쇄611/PDFp.4. 이 카드에는 Figure1의 원문 그림·캡션만 보존했다.'},
        {title:'STRIPS · 세계 모형과 변경의 구현',url:paper+'#page=5',location:'§III.B,PDFpp.5–6/인쇄612–613. 추가·삭제와 도출식 의존성, 원문의 push 예시.'},
        {title:'STRIPS · 로봇 과제의 모형과 연산자',url:paper+'#page=9',location:'Table1,PDFpp.9–10/인쇄616–617. 원문의 로봇 과제·연산자와 자체 열쇠 사례를 구분한다.'},
        {title:'IJCAI · STRIPS 발표 서지',url:proceedings,location:'저자·1971년 학회·논문 제목 확인. 웹 표시608–619와 실제PDF608–620 차이.'},
        {title:'Artificial Intelligence · 같은 해 학술지 판본',url:'https://doi.org/10.1016/0004-3702(71)90010-5',location:'Artificial Intelligence2(3–4),189–208,1971. IJCAI 판본과 별도 서지이며 본문의 그림 위치는 IJCAI원문 기준.'}
      ]
    }
  });
})();
