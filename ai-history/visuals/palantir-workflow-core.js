/* Source-bound concepts and a separately authored inventory story. No live AI or business writes. */
(function(){
  'use strict';
  const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const sources={
    ontology:{title:'Palantir · Ontology building',url:'https://www.palantir.com/docs/foundry/ontology/overview',location:'현행 문서 · semantic 요소와 kinetic 요소, 의사결정 · 확인 2026-11-10'},
    objects:{title:'Palantir · Object types',url:'https://www.palantir.com/docs/foundry/object-link-types/object-types-overview',location:'현행 문서 · 업무 대상·사건의 type과 instance, 원천 데이터 연결 · 확인 2026-11-10'},
    links:{title:'Palantir · Link types',url:'https://www.palantir.com/docs/foundry/object-link-types/link-types-overview',location:'현행 문서 · 객체 사이 관계와 양쪽에서의 탐색 · 확인 2026-11-10'},
    aip:{title:'Palantir · AIP overview',url:'https://www.palantir.com/docs/foundry/aip/overview',location:'현행 문서 · AI와 조직의 데이터·운영을 연결하는 도구 · 확인 2026-11-10'},
    logic:{title:'Palantir · AIP Logic',url:'https://www.palantir.com/docs/foundry/logic/overview',location:'현행 문서 · Ontology 입력·도구·출력·수정, 자동화와 사람 검토, 읽기 권한의 범위 · 확인 2026-11-10'},
    actions:{title:'Palantir · Action types',url:'https://www.palantir.com/docs/foundry/action-types/overview',location:'현행 문서 · 정의된 변경과 검증, 객체·속성·관계의 갱신 · 확인 2026-11-10'},
    criteria:{title:'Palantir · Action submission criteria',url:'https://www.palantir.com/docs/foundry/action-types/submission-criteria',location:'현행 문서 · 사용자·매개변수·객체·관계를 이용한 제출 조건 · 확인 2026-11-10'},
    security:{title:'Palantir · AIP security and privacy',url:'https://www.palantir.com/docs/foundry/aip/aip-security',location:'현행 문서 · 접근 제어·감사와 업무 전체의 검토 · 확인 2026-11-10'},
    partnership:{title:'Anduril·Palantir · 협력 발표',url:'https://www.anduril.com/news/anduril-and-palantir-to-accelerate-ai-capabilities-for-national-security',location:'2024-12-06 · Lattice·Menace 현장 데이터와 AIP의 정리·학습·배포 연결 방향'},
    founders:{title:'Palantir · 창업자와 경영진 공시',url:'https://www.sec.gov/Archives/edgar/data/1321655/000132165523000033/pltr-20230425.htm',location:'2023-04-25 · Proxy Statement p.8, Nominees for Director · Alex Karp·Peter Thiel의 공동창업 및 역할'}
  };
  const nodes=[
    {id:'raw-data',label:'흩어진 원천 데이터',short:'표마다 다른 업무의 조각',icon:'tables',type:'데이터 자산',input:'주문·재고 등 서로 다른 데이터',role:'연결한 데이터 자산을 업무 대상과 이어 줄 준비를 한다.',output:'객체와 연결할 데이터',sourceIds:['ontology','objects'],example:{input:'상품 표 / 창고 재고 표 / 주문 표',role:'별도 표의 상품 ID를 맞춰 읽는 장면을 직접 구성했다.',output:'상품 A · 창고 B 재고 20개 · 주문 X 수량 30개'}},
    {id:'business-objects',label:'업무 객체와 속성',short:'상품·재고·주문을 이름 붙이기',icon:'object',type:'Semantic · 의미',input:'연결할 데이터와 대상의 정의',role:'Object type은 업무 대상·사건의 형태를 정의하고, object는 그 개별 대상을 나타낸다. 속성이 대상의 상태를 담는다.',output:'무엇을 가리키는지 명확한 객체',sourceIds:['objects','ontology'],example:{input:'상품 A·재고 20개·주문 30개라는 데이터',role:'상품·창고 재고·주문 객체로 나누고 수량을 속성으로 둔다.',output:'상품 A / 창고 B 재고: 가용 20 / 주문 X: 수량 30'}},
    {id:'business-links',label:'관계로 연결하기',short:'어느 상품의 재고와 주문인가',icon:'links',type:'Semantic · 관계',input:'업무 객체들',role:'Link는 두 객체 사이의 관계를 나타낸다. 같은 관계를 양쪽에서 탐색해 관련 대상을 함께 읽는다.',output:'대상과 연결된 다른 업무 대상',sourceIds:['links'],example:{input:'상품 A / 창고 B 재고 / 주문 X',role:'재고가 어느 상품에 해당하는지, 주문이 어떤 상품을 요구하는지 잇는다.',output:'창고 B 재고 ↔ 상품 A ↔ 주문 X'}},
    {id:'business-context',label:'질문할 수 있는 업무 맥락',short:'데이터의 숫자를 업무의 뜻으로',icon:'context',type:'운영 맥락',input:'객체·속성·관계와 업무 논리',role:'같은 업무 대상을 분석과 운영 도구에서 함께 참조한다. 무엇을 읽고 무엇을 바꿀 수 있는지도 별도로 정의한다.',output:'질문·검토·행동에 사용할 공통 맥락',sourceIds:['ontology','aip'],example:{input:'상품 A의 가용 20개와 주문 X의 수요 30개',role:'단순화한 수량 비교에서 10개가 부족한 장면이다. 입고 예정·예약 수량 등은 이 사례에서 생략했다.',output:'주문 X를 처리하려면 상품 A 10개가 더 필요함'}},
    {id:'question',label:'업무 질문',short:'무엇을 결정하려는가',icon:'question',type:'사람과 업무 목표',input:'업무의 문제와 질문',role:'AIP는 조직의 데이터와 운영 위에서 AI 기반 업무 흐름을 구성하도록 소개된다.',output:'처리할 질문과 필요한 맥락',sourceIds:['aip'],example:{input:'상품 A · 주문 X · 창고 B',role:'담당자가 주문을 처리하기 위해 필요한 보충 수량을 묻는 장면이다.',output:'“주문 X를 위해 무엇을 보충해야 하나?”'}},
    {id:'allowed-context',label:'허용된 맥락·도구',short:'읽을 대상과 사용할 기능을 정하기',icon:'context',type:'연결과 읽기 범위',input:'질문과 사용자의 접근 범위',role:'LLM에 필요한 Ontology 데이터와 도구를 연결한다. 읽기 접근 제어와 이후 출력·쓰기의 보호는 같은 검사로 끝나지 않는다.',output:'조회할 수 있는 맥락과 정의된 도구',sourceIds:['logic','security'],example:{input:'접근 가능한 상품 A·창고 B 재고·주문 X',role:'이 사례에는 재고 조회와 발주 요청 생성이라는 제한된 기능만 있다고 가정한다.',output:'가용 20개·수요 30개와 정해 둔 요청 양식'}},
    {id:'ai-proposal',label:'AI의 조회·제안',short:'답변에서 검토 가능한 제안으로',icon:'model',type:'AIP와 모델의 역할',input:'업무 맥락과 연결한 기능',role:'AIP Logic은 객체·문자열을 입력받아 출력하거나 Ontology 수정을 구성하는 LLM 기반 함수를 만들 수 있게 한다.',output:'검토할 결과 또는 제안한 변경',sourceIds:['logic'],example:{input:'상품 A: 가용 20개 / 주문 X: 수요 30개',role:'부족 수량을 비교한 뒤 보충 요청을 제안하는 장면이다. 이 화면은 모델을 실행하지 않는다.',output:'상품 A 10개에 대한 발주 요청을 제안'}},
    {id:'review-action',label:'검토와 허용된 Action',short:'제안과 업무 변경 사이',icon:'action',type:'Kinetic · 변경과 통제',input:'제안한 변경과 매개변수',role:'이 사례에서는 사람이 제안을 검토한다. Action은 정의된 변경과 제출 조건·권한 검사를 통해 적용한다. 모든 AIP 흐름이 수동 검토를 요구하는 것은 아니다.',output:'조건을 충족한 업무 변경',sourceIds:['actions','criteria','logic'],example:{input:'상품 A 10개 발주 요청 제안',role:'담당자가 수량과 대상을 확인하고, 권한과 제출 조건을 충족한다고 가정한 경우를 그렸다.',output:'발주 요청 R을 등록하는 것으로 구성한 장면'}},
    {id:'recorded-state',label:'업무 상태에 반영',short:'같은 객체 세계를 다시 읽기',icon:'status',type:'기록과 피드백',input:'적용한 객체·속성·관계 변경',role:'Action으로 반영한 변경을 업무 화면에서 다시 읽는다. 요청을 등록한 기록과 실제 물품이 입고된 결과는 구분한다.',output:'다음 판단이 참조할 갱신 상태',sourceIds:['actions'],example:{input:'발주 요청 R · 수량 10개',role:'요청 객체와 상품 A의 관계를 추가하고 상태를 “요청 등록”으로 표시했다. 재고가 입고된 장면이 아니므로 가용 수량은 20개다.',output:'요청 R: 등록 · 상품 A 보충 10개 / 현재 가용 20개'}},
    {id:'karp',label:'알렉스 카프',short:'공동창업자·경영 역할',icon:'person',type:'인물',input:'Palantir 공동창업 경력',role:'카프의 창업·경영 경력을 제품의 기술 구조와 구분한다. Ontology·AIP의 개별 기능을 카프 개인의 발명으로 돌리지 않는다.',output:'Palantir의 회사·플랫폼 맥락',sourceIds:['founders']},
    {id:'thiel',label:'피터 틸',short:'공동창업 관계',icon:'person',type:'인물',input:'Palantir 공동창업 경력',role:'틸과 카프는 Palantir의 공동창업자로 연결된다. 회사 간 협력을 두 사람의 개별 기술 공동연구로 바꾸지 않는다.',output:'기존 틸 카드의 창업·자본 기록',sourceIds:['founders']},
    {id:'palantir',label:'Palantir',short:'데이터·AI·업무의 연결',icon:'company',type:'기업',input:'조직의 데이터와 운영 문제',role:'Ontology는 업무의 의미와 변경을 표현하는 운영 계층으로, AIP는 AI와 데이터·운영을 연결하는 도구로 소개된다.',output:'Ontology와 AIP를 사용하는 업무 흐름',sourceIds:['ontology','aip']},
    {id:'aip-platform',label:'AIP',short:'조직의 AI 개발·운영',icon:'model',type:'Palantir의 플랫폼',input:'업무 맥락 또는 활용할 데이터',role:'2024년 공동 발표는 AIP를 현장 데이터의 정리·라벨링과 AI 학습·배포를 잇는 역할로 설명한다.',output:'AI 개발·운영에 이어질 자료와 도구',sourceIds:['partnership','aip']},
    {id:'anduril',label:'Anduril',short:'2024년 회사 간 협력',icon:'company',type:'협력 기업',input:'현장 시스템과 데이터의 과제',role:'2024년 12월 6일 Palantir와 AI 역량을 연결하려는 협력을 발표했다. 발표만으로 모든 시스템의 통합 완료를 확인한 것은 아니다.',output:'기존 러키 카드의 Lattice·현장 연결',sourceIds:['partnership']},
    {id:'lattice-menace',label:'Lattice·Menace',short:'현장·엣지 데이터의 연결',icon:'field',type:'Anduril의 플랫폼',input:'현장에서 생기는 데이터',role:'공동 발표에서 현장 데이터의 보존·전달 기반으로 소개된다. AIP와의 연결은 발표한 협력 방향으로 표시한다.',output:'후속 AI 개발에 활용하려는 현장 데이터',sourceIds:['partnership']}
  ];
  const edges=[
    {id:'data-mapping',from:'raw-data',to:'business-objects',kind:'representation',label:'데이터를 대상에 연결',sourceIds:['objects']},
    {id:'object-links',from:'business-objects',to:'business-links',kind:'representation',label:'객체 사이 관계',sourceIds:['links']},
    {id:'operational-context',from:'business-links',to:'business-context',kind:'context',label:'업무 맥락으로 읽기',sourceIds:['ontology']},
    {id:'question-context',from:'question',to:'allowed-context',kind:'context',label:'필요한 맥락',sourceIds:['aip','logic']},
    {id:'context-proposal',from:'allowed-context',to:'ai-proposal',kind:'model',label:'데이터와 정의한 기능',sourceIds:['logic']},
    {id:'proposal-review',from:'ai-proposal',to:'review-action',kind:'review',label:'이 사례의 사람 검토',sourceIds:['logic','criteria']},
    {id:'action-update',from:'review-action',to:'recorded-state',kind:'write',label:'허용된 변경',sourceIds:['actions']},
    {id:'state-return',from:'recorded-state',to:'allowed-context',kind:'feedback',label:'갱신한 상태를 다시 읽기',sourceIds:['actions']},
    {id:'karp-founded',from:'karp',to:'palantir',kind:'cofounder',label:'공동창업',sourceIds:['founders']},
    {id:'thiel-founded',from:'thiel',to:'palantir',kind:'cofounder',label:'공동창업',sourceIds:['founders']},
    {id:'palantir-aip',from:'palantir',to:'aip-platform',kind:'platform',label:'AI 플랫폼',sourceIds:['aip']},
    {id:'company-partnership',from:'palantir',to:'anduril',kind:'announced-cooperation',label:'2024 협력 발표',sourceIds:['partnership']},
    {id:'anduril-platforms',from:'anduril',to:'lattice-menace',kind:'platform',label:'현장·엣지 플랫폼',sourceIds:['partnership']},
    {id:'announced-data-link',from:'lattice-menace',to:'aip-platform',kind:'announced-cooperation',label:'현장 데이터 → AI 개발',sourceIds:['partnership']}
  ];
  const views=[
    {id:'ontology',label:'01 데이터에서 업무 세계로',title:'표의 숫자에, 업무 대상과 관계를 붙이다',intro:'Ontology는 데이터에 업무의 의미를 붙이는 구조와, 그 세계를 바꾸는 행동을 함께 다룹니다. 먼저 같은 상품에 연결된 재고와 주문을 읽어 봅니다.',nodeIds:['raw-data','business-objects','business-links','business-context'],edgeIds:['data-mapping','object-links','operational-context'],initial:'raw-data',scope:'현행 공식 문서를 참고해 직접 그린 개념도입니다. Palantir의 Ontology를 RDF·OWL 표준이나 자동 추론 엔진과 같은 것으로 표시하지 않습니다.'},
    {id:'workflow',label:'02 AI에서 업무 행동으로',title:'맥락을 읽은 제안이, 허용된 업무 변경으로 이어지는 곳',intro:'같은 재고·주문 객체가 질문의 맥락이 되고, 제안과 검토를 거쳐 업무 기록으로 이어집니다. 읽기 접근과 쓰기 검증은 구분합니다.',nodeIds:['question','allowed-context','ai-proposal','review-action','recorded-state'],edgeIds:['question-context','context-proposal','proposal-review','action-update','state-return'],initial:'question',scope:'이 사례는 사람이 검토하는 한 경로입니다. 공식 문서는 자동 적용과 검토를 위한 보류를 모두 설명합니다. 읽기 권한이 모델 출력·작성된 수정에 자동 전파되는 것은 아니며 후속 보호도 별도로 설계해야 합니다.'},
    {id:'partnership',label:'03 창업과 기업 간 협력',title:'창업 관계와, 플랫폼을 잇는 회사 간 협력을 나누어 보다',intro:'공동창업·제품 관계는 실선, 2024년 두 회사가 발표한 협력 방향은 점선입니다. 인물의 경력과 회사의 기술·협력을 나누어 읽습니다.',nodeIds:['karp','thiel','palantir','aip-platform','anduril','lattice-menace'],edgeIds:['karp-founded','thiel-founded','palantir-aip','company-partnership','anduril-platforms','announced-data-link'],initial:'palantir',scope:'2003년 창업 기록, 현행 플랫폼 문서, 2024년 협력 발표는 서로 다른 시점의 자료입니다. 점선은 발표된 방향이며 통합 실행·구축 성과를 측정한 결과가 아닙니다.'}
  ];
  const byId=new Map(nodes.map(n=>[n.id,n])),edgeById=new Map(edges.map(e=>[e.id,e]));
  for(const n of nodes)if(!n.sourceIds.length||n.sourceIds.some(id=>!sources[id]))throw new TypeError('Each role needs evidence.');
  for(const e of edges)if(!byId.has(e.from)||!byId.has(e.to)||e.from===e.to||!e.sourceIds.length||e.sourceIds.some(id=>!sources[id]))throw new TypeError('Each connection needs endpoints and evidence.');
  for(const v of views)if(v.nodeIds.some(id=>!byId.has(id))||v.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).from,edgeById.get(id).to].every(n=>v.nodeIds.includes(n))))throw new TypeError('Views must keep visible endpoints.');
  function getView(id){const v=views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown Palantir view.');return freeze({...v,nodes:v.nodeIds.map(id=>byId.get(id)),edges:v.edgeIds.map(id=>edgeById.get(id))});}
  function select(viewId,nodeId){const v=getView(viewId),index=v.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Select a visible role.');return freeze({viewId,index,node:v.nodes[index],connections:v.edges.filter(e=>e.from===nodeId||e.to===nodeId),hasPrevious:index>0,hasNext:index<v.nodes.length-1});}
  function step(viewId,nodeId,direction){if(direction!==1&&direction!==-1)throw new RangeError('Step one role at a time.');const s=select(viewId,nodeId),v=getView(viewId);return select(viewId,v.nodeIds[Math.max(0,Math.min(v.nodeIds.length-1,s.index+direction))]);}
  function scenario(viewId,nodeId){select(viewId,nodeId);if(viewId==='partnership')return null;const registered=nodeId==='recorded-state';return freeze({product:'상품 A',warehouse:'창고 B',order:'주문 X',available:20,demand:30,shortage:10,registered,request:registered?'발주 요청 R':'발주 요청',requestStatus:registered?'요청 등록':'아직 등록하지 않음',requestQuantity:registered?10:null,stage:nodeId,scope:'설명하기 위해 직접 구성한 수량·관계·변경입니다. 실제 고객 데이터·모델 실행·거래 처리 결과가 아닙니다.'});}
  window.AtlasPalantirWorkflow=freeze({sources,nodes,edges,views,getView,select,step,scenario});
})();
