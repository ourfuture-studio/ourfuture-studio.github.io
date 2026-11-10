/* Deepen the existing Anduril record; retain its identity and the Oculus record. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='palmer-luckey');
  const work=person?.works.find(w=>w.id==='luckey-anduril-2017');
  if(!work)throw new Error('The existing Palmer Luckey / Anduril record is required.');
  const overview='https://www.anduril.com/news/anduril-s-lattice-a-trusted-dual-use-commercial-and-military-platform-for-public-safety-security';
  const sdk='https://developer.anduril.com/guides/concepts/overview';
  const entities='https://developer.anduril.com/guides/entities/overview';
  const tasks='https://developer.anduril.com/guides/tasks/overview';
  const autonomy='https://blog.anduril.com/anduril-unveils-lattice-for-mission-autonomy-8e0c5fa0e94b';
  const partnership='https://www.anduril.com/news/anduril-and-palantir-to-accelerate-ai-capabilities-for-national-security';
  const aip='https://www.palantir.com/docs/foundry/aip/overview';
  const priorSources=work.sources.map(s=>({...s}));
  const content={article:{
    question:'AI가 본 것을,\n현장의 다른 시스템도 함께 쓰려면?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'Lattice 문서와 회사 간 협력 발표',
    opening:[
      '카메라에 보인 장면, 다른 센서가 보낸 관측, 장비가 보고한 상태가 서로 다른 화면에 흩어져 있다면 운영자는 그것들이 같은 상황을 가리키는지 다시 맞춰야 한다. AI가 무언가를 찾아내는 일과, 그 결과를 다른 장비·사람이 함께 쓰는 일 사이에는 정보의 형식과 연결을 맞추는 문제가 남는다.',
      'Anduril은 Lattice를 이 연결을 맡는 소프트웨어 기반으로 설명한다. 2023년 공식 소개는 여러 센서·네트워크·시스템의 정보를 하나의 통합 계층으로 모으고, AI·기계학습과 센서 처리를 통해 운영자가 확인할 정보를 정리한다고 밝힌다. 개별 센서의 출력이 공통 상황 화면과 다른 시스템의 입력으로 이어지도록 만드는 발상이다.',
      '이 구조에서 AI는 데이터를 해석하는 역할을 맡고, 통합 소프트웨어는 그 해석과 상태를 여러 시스템이 주고받게 한다. SDK 문서는 응용 프로그램, 외부 장비와의 통합, 데이터를 보강하는 서비스를 나눈다. 서로 다른 역할을 연결해야 AI의 인식 결과가 화면에 머무르지 않고 현장의 다음 작업에 쓰일 수 있다.',
      '운영자와 장비 사이의 연결도 한 방향으로 끝나지 않는다. 공식 Tasks 문서는 작업을 전달하고 진행 상태를 갱신하는 구조를 설명한다. Mission Autonomy의 2023년 발표는 사람의 감독 아래 여러 로봇 시스템을 운용하는 방향을 제시했다. 목표와 작업을 다루는 사람, 작업을 수행하는 시스템, 돌아오는 상태를 함께 읽어야 한다.',
      'Palantir와의 연결은 2024년 12월의 회사 간 협력 발표에서 더 넓어진다. 발표는 Lattice·Menace가 다루는 현장 데이터와 Palantir AIP의 데이터 관리·AI 개발·배포 역량을 연결하려는 방향을 설명한다. 현장에서 자료가 만들어지는 곳과 모델을 개발·배포하는 기반 사이의 연결을 따라갈 수 있다.',
      '러키는 Anduril의 공동설립자로 이 카드에 연결된다. 기존 2017년 기록에서 출발하되 Lattice의 후속 자료는 각각의 시점으로 읽는다. 아래 시각화에서는 정보가 들어오고, 공유되고, 작업과 상태가 오가는 각 단계의 역할을 선택해 살펴본다.'
    ],
    visual:{id:'lattice-field-operations',navLabel:'AI와 현장 시스템',title:'센서의 관측에서, 함께 쓰는 상황과 작업으로',caption:'센서에서 상황으로, 사람과 현장 시스템, Palantir와 협력의 세 보기를 따라가 보세요. 단계별로 들어오는 정보와 맡는 역할, 다음에 전달하는 내용을 비교합니다. 시설 점검 예시는 이 설명을 위해 직접 구성한 상황입니다.'},
    takeaway:{title:'인식 결과가 공유되고, 작업의 상태가 다시 돌아오는 연결',text:'현장 AI에는 장면을 해석하는 모형과 함께 관측·대상·작업·상태를 다른 시스템에 전하는 기반이 필요하다. Lattice의 공식 설명을 통해 AI의 해석, 시스템 통합, 사람의 감독, 현장 피드백이 만나는 위치를 살펴볼 수 있다.'},
    technical:{title:'공식 구조와 직접 구성한 예시를 구분해 읽기',paragraphs:[
      '기존 기록의 2017년은 Anduril 설립의 출발점이다. Lattice 소개는 2023-07-31, Mission Autonomy의 원발표는 2023-05-03, Palantir와의 협력 발표는 2024-12-06 자료를 사용한다. SDK 문서는 2026-11-10에 확인한 내용이며 현재 문서 전체를 2017년의 제품 구조로 옮기지 않는다.',
      '2023년 Lattice 소개는 다양한 센서·네트워크·시스템을 공통 통합 계층으로 연결하고 AI·기계학습·센서 처리로 정보를 정리하는 구조를 설명한다. 화면은 이 관계를 다시 그린 자체 도식이다. Anduril이 공개하지 않은 센서 융합 알고리즘이나 모델 구조를 복원한 것으로 표시하지 않는다.',
      'SDK의 Building with Lattice는 단방향 또는 양방향으로 데이터를 넣고 가져오는 통합을 설명한다. 응용 프로그램은 사용자와 만나는 화면과 작업 흐름을, 통합은 외부 장비·소프트웨어와의 데이터 전달을, 데이터 서비스는 데이터의 보강과 처리를 맡는 것으로 나눈다.',
      'Entities 문서는 공통 상황 화면에 쓰는 상호운용 데이터 구조를 설명한다. 여러 구성요소를 조합하며 시점에 따라 일부 정보가 없을 수도 있다. 공통 형식에 들어왔다는 사실만으로 관측이 완전하거나 AI의 해석이 참이라고 보장되는 것은 아니다.',
      'Tasks 문서의 작업 전달과 상태 갱신은 장비와 소프트웨어가 협력하기 위한 인터페이스의 역할을 보여 준다. Mission Autonomy가 설명하는 사람의 감독을 모든 기능의 매 단계에 동일한 수동 승인 버튼이 있다는 뜻으로 바꾸지 않는다. 화면의 단계 선택은 역할을 읽기 위한 조작이며 실제 장비에 명령을 보내지 않는다.',
      '직접 구성한 시설 점검 예시에는 관측·상황 공유·점검 작업·상태 보고를 사용한다. 실제 고객 사례, 실제 탐지 결과, 실행된 Lattice 서비스나 성능 측정값이 아니다. 예시를 선택해도 AI 모델을 학습하거나 실시간 센서 데이터를 처리하지 않는다.',
      '2024년 Palantir 협력 발표는 현장 데이터의 수집·보존과 이를 활용한 AI 개발·배포를 연결하려는 회사 간 방향의 근거다. 발표의 AI 역량 확대 목표를 모든 현장에서 이미 완성된 자동 학습·갱신 순환이나 검증된 성능 향상으로 표시하지 않는다.',
      '인물 이동은 기존 기업·인프라 목록을 사용한다. 러키의 공동설립, 카프·틸의 Palantir 역할, Anduril·Palantir의 회사 간 협력을 각각 구분한다. 이 연결에서 새로운 인물 공동연구·공동발명 관계를 만들지 않는다.'
    ]}
  },keyIdeas:[
    {title:'서로 다른 관측을 같은 상황의 일부로 읽게 한다',text:'운영자가 센서마다 별도의 화면을 오가며 내용을 맞추는 대신, 관련 관측과 장비 상태를 공통 표현으로 연결한다. AI의 해석은 이 공통 상황을 만드는 데 참여하는 처리이며, 데이터 전달과 대상 표현을 맡는 소프트웨어가 함께 필요하다.'},
    {title:'무엇을 아는가와 무엇을 할 것인가를 나누어 연결한다',text:'관측이나 장비 상태를 표현하는 데이터와 작업의 전달·진행 상태는 다른 역할이다. SDK 문서의 Entities와 Tasks를 함께 보면, 상황을 보여 주는 정보와 현장 시스템이 주고받는 작업을 구분해 읽을 수 있다.'},
    {title:'작업을 전달한 뒤의 상태가 다음 판단의 입력이 된다',text:'작업을 받은 시스템의 진행 상태가 다시 공유되면 운영자는 처음 지시한 내용과 현재 상태를 비교할 수 있다. 이 되돌아오는 연결을 표시하면 AI의 출력 한 번으로 끝나는 그림에서 현장 운영의 흐름으로 시야를 넓힐 수 있다.'},
    {title:'현장 통합과 AI 개발 기반이 회사 간 협력으로 이어진다',text:'Anduril의 현장 플랫폼과 Palantir AIP의 역할을 같은 단계로 합치지 않고 이어서 본다. 기존 기업·인프라 탭에서 카프와 틸의 기록으로 이동하면 플랫폼을 개발하는 회사와 그 회사의 창업·투자 경로까지 탐색할 수 있다.'}
  ],videos:[],references:[
    {title:'Anduril · Lattice의 공통 통합 계층 설명',url:overview,location:'2023-07-31. 센서·네트워크·시스템 통합, AI/ML·센서 처리, 공통 상황 화면과 다른 센서·장비에 대한 작업 전달을 설명한 공식 글. 회사가 설명하는 구조의 근거로 사용했다.'},
    {title:'Anduril · Lattice for Mission Autonomy 원발표',url:autonomy,location:'원 Anduril 공식 블로그 2023-05-03. 사람의 감독 아래 여러 로봇 시스템을 다루는 방향을 확인했다. 재게시물의 날짜와 구분한다.'},
    {title:'Lattice SDK · Building with Lattice',url:sdk,location:'Data flow와 Use cases. 통합의 단방향·양방향 데이터 흐름, 응용·통합·데이터 서비스의 역할. 조회 2026-11-10.'},
    {title:'Lattice SDK · Entities overview',url:entities,location:'도입부 Entity model. 공통 상황 화면의 상호운용 데이터 구조, 구성요소의 조합과 부분 상태. 조회 2026-11-10.'},
    {title:'Lattice SDK · Tasks overview',url:tasks,location:'도입부와 Task status·Task lifecycle. 작업의 전달·진행 상태·결과 갱신의 역할. 조회 2026-11-10.'},
    {title:'Anduril·Palantir · AI 협력 발표',url:partnership,location:'2024-12-06. Lattice·Menace의 현장 데이터와 Palantir AIP의 데이터 관리·AI 학습·배포 역량을 연결하려는 회사 간 협력. 실제 제품 성능의 독립 검증 결과와 구분한다.'},
    {title:'Palantir · AIP overview',url:aip,location:'AI를 조직의 데이터·운영과 연결하는 플랫폼의 현행 공식 설명. 조회 2026-11-10.'},
    {title:'Pepperdine University · Palmer Luckey 행사 소개',url:'https://www.pepperdine.edu/newsroom/articles/anduril-and-oculus-vr-founder-palmer-luckey-to-discuss-defense-technology-at-presidents-speaker-series.htm',location:'2024-09-10 대학 공식 행사 소개. Anduril의 설립자 역할과 2017년 회사 설립을 확인하는 보조 근거.'},
    ...priorSources.map(s=>({...s,location:'기존 Anduril 설립·러키 역할 기록의 출처를 보존했다. 후속 Lattice 구조의 근거는 위 공식 기술 자료를 따로 따른다.'}))
  ]};
  person.tagline='가상현실에서, AI와 현장 시스템을 잇는 기업으로';
  person.intro='Oculus의 가상현실 제품과 Anduril의 설립·Lattice 플랫폼을 연도와 역할로 나누어 읽는다. 기존 Anduril 기록에서는 AI의 인식, 공통 상황 공유, 사람과 현장 시스템의 작업·상태 교환, Palantir와의 회사 간 협력을 자세히 살펴본다.';
  Object.assign(work,{title:'Anduril과 Lattice: AI를 현장 시스템에 연결하다',dateLabel:'2017년 Anduril 설립에서 출발 · 2023년 Lattice 설명 · 2024년 Palantir 협력',type:'기업·플랫폼·공식 기술자료',summary:'여러 센서의 정보를 공통 상황으로 연결하고, 운영자와 현장 시스템이 작업·상태를 주고받게 하는 Lattice의 구조를 공식 자료로 읽는다. Palantir와의 협력은 현장 데이터에서 AI 개발·배포 기반으로 이어지는 회사 간 관계로 살펴본다.',caveat:'2017년은 기존 설립 기록의 기준 연도다. 후속 플랫폼 자료의 시점을 나누며, 회사가 설명한 구조와 직접 구성한 시설 점검 예시를 구분한다.',content,sources:[...priorSources,{title:'Anduril · Lattice 공식 설명',url:overview},{title:'Anduril·Palantir · 2024년 협력 발표',url:partnership}]});
  window.ATLAS_LUCKEY_REVISION={personId:person.id,workId:work.id,visualId:'lattice-field-operations',sourceVersion:'0.42'};
})();
