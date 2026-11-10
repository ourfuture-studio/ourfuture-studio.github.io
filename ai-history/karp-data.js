/* Deepen Alex Karp's existing Palantir record; preserve the 2023 AIPCon record. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='alex-karp');
  const work=person?.works.find(w=>w.id==='karp-palantir-2003');
  if(!work)throw new Error('The existing Alex Karp / Palantir record is required.');
  const ontology='https://www.palantir.com/docs/foundry/ontology/overview';
  const objects='https://www.palantir.com/docs/foundry/object-link-types/object-types-overview';
  const links='https://www.palantir.com/docs/foundry/object-link-types/link-types-overview';
  const actions='https://www.palantir.com/docs/foundry/action-types/overview';
  const criteria='https://www.palantir.com/docs/foundry/action-types/submission-criteria';
  const aip='https://www.palantir.com/docs/foundry/aip/overview';
  const logic='https://www.palantir.com/docs/foundry/logic/overview';
  const privacy='https://www.palantir.com/docs/foundry/aip/aip-security';
  const management='https://investors.palantir.com/management.html';
  const proxy='https://www.sec.gov/Archives/edgar/data/1321655/000132165523000033/pltr-20230425.htm';
  const filing='https://www.sec.gov/Archives/edgar/data/1321655/000132165526000028/pltr-20260331.htm';
  const partnership='https://www.anduril.com/news/anduril-and-palantir-to-accelerate-ai-capabilities-for-national-security';
  const priorSources=work.sources.map(s=>({...s}));
  const content={article:{
    question:'AI가 답을 만드는 데서,\n실제 업무를 바꾸는 데까지 가려면?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'Ontology·AIP 기술 문서와 기업 관계 자료',
    opening:[
      '재고표에는 상품 A가 20개 있다고 적혀 있고, 주문표에는 같은 상품 30개가 필요하다고 적혀 있다. AI가 “10개가 부족하다”고 답해도 발주가 저절로 생기는 것은 아니다. 두 표가 같은 상품을 가리키는지, 어느 창고의 재고인지, 누가 어떤 조건으로 발주 요청을 만들 수 있는지까지 연결해야 답이 업무의 변화로 이어진다. 이 숫자와 상황은 아래 시각화를 위해 직접 구성한 예시다.',
      'Palantir가 Ontology로 표현하려는 것은 조직이 일하는 세계다. 데이터를 파일과 열 이름으로만 두는 대신 상품·창고·주문 같은 대상으로 나타내고, 대상의 속성과 관계를 정의한다. 공식 문서는 이미 연결된 데이터·모델 등의 디지털 자산을 현실의 설비·제품·주문과 연결하는 운영 계층으로 설명한다. 사람과 프로그램이 같은 업무 대상을 기준으로 상황을 읽게 하는 발상이다.',
      '이 세계에는 “무엇이 있는가”뿐 아니라 “무엇을 바꿀 수 있는가”도 들어간다. 객체·속성·관계가 현재 상황을 표현한다면 Action과 함수는 업무의 규칙과 변경을 표현한다. 발주 요청을 만든다는 행동을 입력값, 객체 변화, 제출 조건으로 정의하면 화면이 달라도 같은 업무 규칙을 사용하도록 구성할 수 있다. 데이터를 설명하는 지도에 행동할 수 있는 접점을 함께 두는 것이다.',
      'AIP는 이렇게 정의한 업무 세계와 AI를 연결하는 플랫폼이다. AIP Logic 문서는 객체나 문장을 입력받고, LLM을 활용해 결과를 반환하거나 Ontology의 변경을 만들 수 있다고 설명한다. 질문에 필요한 데이터를 조회하고 관련 대상을 따라가며 허용한 도구를 쓰는 경로를 구성하면, AI는 문장 밖의 재고·주문·업무 규칙을 참고할 수 있다.',
      '예시에서는 AI가 부족분 10개와 발주 요청을 제안하고 담당자가 근거와 수량을 검토한다. 허용된 Action으로 요청을 등록하면 새로운 요청 객체와 상태가 업무 화면에 반영된다. 물건이 입고된 것은 아니므로 재고는 20개로 남는다. 무엇을 제안했는지와 실제로 어떤 업무 상태를 바꾸었는지를 같은 대상과 관계 위에서 확인하는 것이다.',
      '알렉스 카프는 이런 플랫폼을 개발한 Palantir의 공동창업자로 연결된다. 피터 틸의 공동창업 관계를 따라가면 회사를 만든 조직의 경로를, Anduril 협력을 따라가면 현장에서 만들어지는 데이터와 AI 개발 기반이 만나는 경로를 살펴볼 수 있다. 먼저 아래 그림에서 같은 주문과 재고가 어떻게 업무의 맥락이 되고, AI의 제안과 행동의 접점이 되는지 따라가 보자.'
    ],
    visual:{id:'palantir-ontology-aip',navLabel:'데이터·AI·업무',title:'데이터에 업무의 의미를 붙이고, AI의 제안을 행동으로 잇기',caption:'데이터에서 업무 세계로, AI에서 업무 행동으로, 기업과 협력의 세 보기를 따라가 보세요. 같은 재고·주문 예시에서 객체·관계와 발주 요청의 변화를 비교할 수 있습니다. 재고 수량과 업무 흐름은 이 설명을 위해 직접 구성했으며 실제 Palantir 고객 사례나 제품 실행 결과가 아닙니다.'},
    takeaway:{title:'AI가 참조할 업무 세계와, 변경을 허용하는 접점을 함께 만든다',text:'Ontology는 데이터에 업무 대상·관계·행동을 연결하고, AIP는 그 위에서 AI를 활용한 흐름을 구성한다. 질문에 답하는 일과 업무 상태를 바꾸는 일을 구분해 연결하면, 어느 데이터와 규칙으로 판단했고 누가 어떤 변경을 허용했는지 살펴볼 수 있다.'},
    technical:{title:'업무의 표현, AI의 제안, 허용된 변경을 나누어 읽기',paragraphs:[
      'Object type은 현실의 대상이나 사건을 나타내는 형식이고, Object는 그 형식의 개별 대상이다. 예시의 상품 A는 객체이며, 상품의 이름과 재고의 가용 수량은 각 대상의 속성으로 읽는다. 서로 다른 원천의 식별자를 같은 대상으로 연결하려면 매핑과 데이터 품질 관리가 필요하다. 객체를 만들었다는 사실만으로 원천의 오류·누락·오래된 값이 사라지지는 않는다.',
      'Link type은 객체 형식 사이의 관계를 정의하며, Link는 개별 객체의 연결을 나타낸다. 예시에서는 주문이 어떤 상품을 요구하고 그 상품의 재고가 어느 창고에 있는지를 이어 놓았다. 이런 업무 관계가 있어야 “이 주문을 이 창고에서 처리할 수 있는가”라는 질문을 관련 대상들을 따라가며 읽을 수 있다.',
      'Action type은 한 번에 수행할 객체·속성·관계의 변경과 관련 동작을 정의한다. 공식 Action types 문서는 이를 사용자가 정한 논리에 따른 트랜잭션으로 설명하며, 매개변수·규칙·알림 같은 부수 동작을 함께 다룬다. 외부 시스템의 변경은 해당 연결과 설정이 있어야 이루어진다. Ontology의 요청 등록을 곧바로 실제 발주·배송 완료와 같게 표시하지 않는다.',
      'Submission criteria는 행동을 제출할 수 있는 조건이다. 사용자·입력값·객체 상태·관계를 조합해 허용 여부를 판단하도록 구성할 수 있다. Action 형식의 정의를 편집하는 권한과 실제 행동을 제출할 수 있는 조건은 다른 문제다. 예시의 담당자 검토는 우리가 선택한 업무 절차이며 모든 AIP 기능에 같은 승인 단계가 있다는 뜻은 아니다.',
      'AIP는 특정 LLM 하나의 이름이 아니라 AI를 조직의 데이터와 운영에 연결하는 플랫폼이다. AIP Logic의 설명처럼 업무 객체나 문장을 입력하고, 조회 등 허용한 도구와 업무 논리를 구성해 출력·변경으로 이어갈 수 있다. 아래 그림은 이런 역할의 연결을 재구성한 자체 도식이며, 모델 내부의 추론 과정이나 Palantir의 전체 구현을 복원한 그림은 아니다.',
      '읽기 권한과 쓰기·출력의 보호는 따로 확인해야 한다. AIP Logic 문서의 Read-time enforcement only 설명은 행·열 접근 제어가 모델이 읽는 범위를 제한하지만 생성된 출력이나 작성된 Ontology 변경까지 자동으로 이어지지는 않는다고 밝힌다. 후속 보호에는 Marking 또는 Classification-based Access Control 같은 별도 설정이 필요하다. 허용한 문맥을 읽는다는 사실만으로 모든 출력과 변경이 안전하다고 보장하지 않는다.',
      '발주 요청을 기록하는 예시에서는 부족분 10개를 참조해 요청 객체와 관련 연결·상태를 표현한다. 상품 A의 가용 재고 20개는 입고가 일어나기 전까지 유지한다. 이는 상태가 바뀌는 위치를 보여 주는 직접 구성한 설명이며, AI 모델의 계산·실제 주문 제출·고객 시스템 연동·효과 측정은 실행하지 않는다. 실제 도입을 평가하려면 잘못된 조회·제안·변경과 검토·권한 설정을 함께 확인해야 한다.',
      '2003년은 기존 카드의 Palantir 설립 기준 연도다. 2026년 1분기 공시의 Note 1은 2003-05-06 법인 설립을, Overview는 2023년 AIP 전개 시작을 기록한다. 카프와 틸의 공동창업 역할은 경영진 소개와 2023년 위임장 공시로 확인한다. 지금의 제품 문서 전체를 2003년 구조로 옮기거나 플랫폼을 카프 개인의 알고리즘 발명으로 돌리지 않는다.',
      '2024-12-06 Anduril·Palantir 발표는 Lattice·Menace가 다루는 현장 데이터와 AIP의 데이터 정리·AI 개발·배포 기반을 연결하려는 회사 간 협력을 설명한다. 아래 기업 보기는 이 발표의 역할 분담을 따른다. 재고 예시를 실제 협력 사례로 연결하지 않으며, 발표에 담긴 목표를 독립적으로 검증된 성능 개선으로 표시하지 않는다.',
      'Palantir의 Ontology는 여기서 확인한 제품 문서의 운영 계층을 가리킨다. RDF·OWL 표준, 지식 그래프 일반, 특정 신경기호 학습 알고리즘과는 표현 형식·실행 기능·추론 범위를 따로 비교해야 한다. 이름이 같다는 이유로 OWL 추론기가 AIP의 판단을 증명한다고 해석하지 않는다.'
    ]}
  },keyIdeas:[
    {title:'데이터를 사람들이 일하는 대상과 관계로 표현한다',text:'원천표를 나열하는 대신 상품·창고·주문을 같은 업무 세계의 객체로 잇는다. 질문을 처리하는 프로그램과 검토하는 사람이 같은 대상을 가리킬 수 있어야, 조회 결과가 어느 주문과 행동에 관한 것인지 확인할 수 있다.'},
    {title:'상황을 표현하는 것과 바꾸는 행동을 함께 정의한다',text:'속성과 관계는 현재 상태를, Action과 함수는 허용한 변경과 업무 논리를 표현한다. 발주 요청이라는 업무 단위를 정의하면 단순히 표의 값 하나를 고치는 일에서 입력·조건·객체 변화가 연결된 행동으로 관점을 옮길 수 있다.'},
    {title:'AI에는 업무 문맥과 도구를, 실행에는 조건을 연결한다',text:'LLM의 문장 생성만으로 업무가 연결되지는 않는다. 필요한 객체를 조회할 문맥·도구, 결과를 검토할 과정, 변경을 허용할 권한·조건을 구성해야 한다. 읽기와 쓰기·출력의 보호를 같은 것으로 취급하지 않는 것도 이 연결의 일부다.'},
    {title:'기업 관계를 따라 데이터가 만들어지고 쓰이는 경로를 본다',text:'틸·카프의 공동창업과 Palantir·Anduril의 회사 간 협력을 나누어 본다. 기존 기업·인프라 탭에서 틸의 기업·자본 관계도와 러키의 Lattice 상세를 이어 보면, 현장 정보에서 조직의 AI 개발·업무 기반까지 탐색을 확장할 수 있다.'}
  ],videos:[],references:[
    {title:'Palantir · Ontology overview',url:ontology,location:'Ontology building · Object and link types · Action types and functions. 디지털 자산을 현실 대상에 연결하는 운영 계층과 객체·속성·관계, 행동·함수·동적 보안의 구분. 조회 2026-11-10.'},
    {title:'Palantir · Object types overview',url:objects,location:'Object types 도입부. 형식·개별 객체·객체 집합과 실제 데이터의 연결. 조회 2026-11-10.'},
    {title:'Palantir · Link types overview',url:links,location:'Link types 도입부의 Employee·Employer 예시와 Directionality. 객체 형식 사이의 관계와 개별 연결. 조회 2026-11-10.'},
    {title:'Palantir · Action types overview',url:actions,location:'Action types 도입부와 직원 배정 예시·마지막 단락. 트랜잭션, 매개변수·규칙·부수 동작, 앱에 반영되는 객체·속성·관계의 변경. 조회 2026-11-10.'},
    {title:'Palantir · Submission criteria',url:criteria,location:'도입부. 사용자·매개변수·객체·관계 조건에 따른 행동 제출 여부와 Action 형식 편집 권한의 구분. 조회 2026-11-10.'},
    {title:'Palantir · AIP overview',url:aip,location:'AIP overview · Seamless integration · Security and governance. Ontology와 개발 도구 위에 AI 업무 흐름을 구성하는 플랫폼 설명. 제품 성과의 독립 평가와 구분한다. 조회 2026-11-10.'},
    {title:'Palantir · AIP Logic overview',url:logic,location:'AIP Logic 본문과 Read-time enforcement only. 객체·문장 입력, 결과·Ontology 변경, 자동 적용 또는 사람 검토, 읽기 제어가 출력·변경으로 자동 전파되지 않는 범위. 조회 2026-11-10.'},
    {title:'Palantir · AIP security and privacy',url:privacy,location:'도입부와 AIP의 보안·개인정보 질문. 목적·데이터·접근 경계·사람 검토를 포함한 전체 업무 흐름 평가의 필요와 회사의 통제 체계 설명. 조회 2026-11-10.'},
    {title:'Palantir · Executive Management',url:management,location:'Alexander Karp 소개. 공동창업자, 2005년부터 CEO·2003년부터 이사회 참여의 공개 경력. 조회 2026-11-10.'},
    {title:'Palantir · 2023 SEC 위임장 공시',url:proxy,location:'Nominees for Director · 인쇄 p.8. Alexander Karp·Peter Thiel 공동창업자 소개와 이사회 역할. 창업팀을 두 사람만으로 한정하지 않는다.'},
    {title:'Palantir · 2026년 1분기 Form 10-Q',url:filing,location:'Note 1 Organization의 2003-05-06 법인 설립, Overview의 2023년 AIP 전개 시작과 현행 플랫폼·Ontology 설명.'},
    {title:'Anduril·Palantir · 2024년 협력 발표',url:partnership,location:'2024-12-06. Lattice·Menace의 현장 데이터와 AIP의 데이터 정리·AI 개발·배포 역량을 연결하려는 회사 간 발표. 인물 공동연구나 제품의 독립 검증 결과와 구분한다.'}
  ]};
  person.tagline='데이터·AI를 조직의 판단과 행동에 연결하는 기업';
  person.intro='Palantir 공동창업에서 출발해, Ontology가 데이터에 업무의 대상·관계·행동을 붙이고 AIP가 AI를 그 업무 세계와 연결하는 발상을 살펴본다. 기존 2023년 AIPCon 기록과 시점을 나누며 피터 틸의 공동창업, Anduril과의 회사 간 협력으로 탐색을 이어간다.';
  Object.assign(work,{title:'Palantir Ontology와 AIP: 데이터에서 실제 업무로',dateLabel:'2003년 Palantir 설립에서 출발 · 2023년 AIP 전개 · 후속 공식 기술 문서',type:'기업·플랫폼·공식 기술자료',summary:'데이터를 업무의 객체·속성·관계와 행동으로 표현하고, AIP가 필요한 문맥·도구와 AI를 연결해 제안·검토·허용된 변경으로 이어가려는 구조를 공식 자료로 살펴본다. 틸과의 공동창업, Anduril 협력도 기존 기업·인프라 탭에서 이어진다.',caveat:'2003년은 설립 기록의 기준 연도다. 후속 Ontology·AIP 자료의 시점을 나누고, 회사의 구조 설명·직접 구성한 재고 예시·실제 제품 성과를 구분한다.',content,sources:[...priorSources,{title:'Palantir · Ontology 공식 문서',url:ontology},{title:'Palantir · AIP Logic 공식 문서',url:logic},{title:'Anduril·Palantir · 2024년 협력 발표',url:partnership}]});
  window.ATLAS_KARP_REVISION={personId:person.id,workId:work.id,visualId:'palantir-ontology-aip',sourceVersion:'0.43'};
})();
