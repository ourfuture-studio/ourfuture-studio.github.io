/* Peter Thiel: sourced organizational, capital and platform relationships. */
(function(){
  'use strict';
  const sec='https://www.sec.gov/Archives/edgar/data/1321655/000132165523000033/pltr-20230425.htm';
  const bio='https://foundersfund.com/team/peter-thiel/';
  const platform='https://www.palantir.com/docs/foundry/platform-overview';
  const ontology='https://www.palantir.com/docs/foundry/ontology/overview';
  const aip='https://www.palantir.com/docs/foundry/aip/overview';
  const funding='https://a16z.com/announcement/anduril/';
  const filing='https://www.sec.gov/Archives/edgar/data/1321655/000119312520230013/d904406ds1.htm';
  const partnership='https://www.anduril.com/news/anduril-and-palantir-to-accelerate-ai-capabilities-for-national-security';
  const content={article:{
    question:'AI를 실제 조직에서 쓰려면,\n모델 밖에 어떤 기반이 필요할까?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'공시·투자 발표·플랫폼 문서',
    opening:[
      '모델이 답을 만들어도 회사의 재고·설비·주문과 연결되지 않으면 실제 업무를 바꾸기 어렵다. 어떤 데이터에 접근하고, 어떤 규칙을 적용하며, 누가 결과를 실행할지도 함께 정해야 한다. 이 카드는 피터 틸의 창업·투자 역할에서 출발해, 기업과 자본이 AI를 실제 조직에 연결하는 기반을 어떻게 마련하는지 살펴본다.',
      '틸은 Palantir의 공동창업자다. 2023년 SEC 공시는 틸을 공동창업자이자 2003년부터 이사회 의장으로, 알렉스 카프를 공동창업자이자 최고경영자로 소개한다. 같은 회사에 참여한 두 사람의 역할을 읽으면, 연구 아이디어와 별도로 조직을 만들고 운영하는 일이 기술의 역사에 어떻게 들어오는지 볼 수 있다.',
      '다른 연결은 Founders Fund다. 같은 공시는 틸이 2005년부터 이 투자회사의 파트너라고 기록한다. Palantir의 2020년 상장신고서는 Founders Fund 관련 펀드들의 Palantir 지분 보유도 명시한다. 창업자의 경력과 투자회사의 이름이 겹치는 데서 그치지 않고, 펀드에서 제품 기업으로 이어지는 금융 관계를 공시에서 확인할 수 있다.',
      '자본의 경로는 다른 제품 기업으로도 이어진다. 2019년 a16z의 Anduril 투자 발표는 Founders Fund를 당시 기존 투자자 가운데 하나로 명시한다. 그 글은 Anduril이 제품 판매에 앞서 연구·개발 위험을 부담하는 사업 구조라고 설명한다. 이러한 투자자 설명에서 자본이 제품 완성 전의 개발 과정과 만나는 지점을 읽을 수 있다.',
      'Palantir의 후속 플랫폼 문서에서는 그 회사가 무엇을 연결하려 하는지 더 구체적으로 읽을 수 있다. Foundry는 데이터 운영을, Ontology는 조직의 데이터·논리·행동을, AIP는 AI와 업무의 연결을, Apollo는 소프트웨어 배포를 다룬다. 이 부분의 주체는 플랫폼을 개발한 회사와 팀이며, 틸 개인의 알고리즘이나 제품 발명으로 돌리지 않는다.',
      '이 연결들은 서로 다른 시점에 형성됐다. 2003년의 공동창업, 2005년부터 확인되는 파트너 경력, 2019년의 투자자 기록, 이후의 플랫폼 설명을 겹쳐 읽으면 자본·기업·데이터·운영이 이어지는 경로가 드러난다. 아래에서는 인물과 회사, 펀드와 플랫폼을 눌러 각 연결의 역할과 근거를 따라간다.'
    ],
    visual:{id:'thiel-capital-infrastructure',navLabel:'기업·자본·인프라',title:'사람이 만든 조직에서, AI가 일하는 기반까지',caption:'창업과 조직, 자본과 기업, 데이터에서 운영으로 보기를 바꿔 보세요. 노드를 누르면 그 대상의 역할·시점·공식 출처를 읽고, 알렉스 카프와 팔머 러키의 기존 인물 카드로 이동할 수 있습니다.'},
    takeaway:{title:'모델을 조직의 데이터·행동과 연결하는 기반',text:'기업은 제품과 운영 구조를 만들고, 투자회사는 기업에 자본으로 참여한다. 플랫폼은 조직의 데이터·논리·행동과 AI를 연결한다. 각 관계의 주체와 시점을 구분하면 한 인물의 경력에서 더 넓은 AI 산업의 구조로 탐색을 이어갈 수 있다.'},
    technical:{title:'시점·역할·공식 자료를 읽는 기준',paragraphs:[
      '인물 기록의 기준 연도 2003은 Palantir 공동창업의 출발을 가리킨다. 이 카드의 모든 플랫폼과 투자 관계가 2003년에 존재했다는 뜻은 아니다. 각 시각화의 노드·선에는 관련 자료의 시점 또는 조회 시점을 따로 표시한다.',
      '2023년 위임장 공시의 이사회 후보 소개에서 Karp와 Thiel의 공동창업자 표기, Thiel의 2003년부터 의장 경력과 2005년부터 Founders Fund 파트너 경력을 확인했다. 창업팀 전체를 두 사람으로 한정하지 않으며, 과거 공시의 직책을 자동으로 현재 직책으로 연장하지 않는다.',
      'Founders Fund의 인물 소개는 현재 공개된 역할을 확인하는 별도 자료다. 투자회사 파트너라는 역할과 특정 거래의 개인 투자·투자 결정·보유 지분은 서로 다른 주장이다. 이 카드에는 확인하지 않은 투자액·지분율·수익률·개인별 투자 결정을 추가하지 않았다.',
      '2020년 Palantir 상장신고서의 Related Party Transactions는 Founders Fund 관련 법인들의 지분 보유와 일부 관련 펀드의 운용 구조에서 틸이 맡은 역할을 기록한다. 이 시점의 관련 펀드들을 Founders Fund라는 회사 한 곳의 현재 직접 보유로 단순화하지 않는다. 화면에서는 관련 펀드의 2020년 지분 보유 기록으로 표시한다.',
      '2019년 10월 3일 a16z의 Anduril Series B 참여 발표는 Founders Fund를 기존 투자자로 명시한다. 이 날짜는 그 관계를 확인할 수 있는 발표 시점이다. Founders Fund의 최초 투자일이나 현재 보유 상태로 바꾸어 읽지 않는다.',
      'Palantir의 플랫폼 문서는 Foundry·AIP·Apollo와 Ontology의 역할을 설명한다. 이 카드는 문서에 제시된 구조를 직접 그린 관계도로 재구성한다. 실제 고객 데이터·실행 환경·권한 설정을 연결하거나 제품을 구동하는 화면은 아니다.',
      'Ontology는 Palantir 문서에서 데이터·논리·행동을 묶는 운영 계층으로 설명된다. 기존 역사 카드에서 다룬 RDF·OWL 표준과는 목적·구현·추론 범위를 따로 비교해야 한다. 같은 단어가 쓰인다는 사실만으로 OWL 추론기나 특정 신경기호 알고리즘의 구현이라고 판정하지 않는다.',
      '2024년 12월 6일 Anduril과 Palantir의 공동 발표는 현장 데이터와 기업 규모의 AI 개발·배포를 연결하려는 회사 간 협력의 근거다. 회사의 파트너십은 틸과 러키 개인의 논문 공동연구나 같은 회사 설립 관계로 표시하지 않는다.',
      '공식 회사 문서와 투자 발표는 조직·제품·관계의 확인에 사용했다. 회사가 제시한 성능·안전성·비용 절감 주장은 별도 평가 조건과 독립적인 결과가 있어야 판단할 수 있다. 관계가 존재한다는 사실과 제품의 성과는 구분해 읽는다.'
    ]}
  },keyIdeas:[
    {title:'공동창업은 기술을 지속할 조직을 만드는 일이다',text:'틸과 카프는 Palantir 공동창업이라는 관계로 연결된다. 회사를 만드는 일, 이사회를 맡는 일, 경영하는 일과 제품을 개발하는 일을 각각 읽으면 기업가의 역할과 기술팀의 작업을 구체적으로 연결할 수 있다.'},
    {title:'자본의 연결은 실제 공시와 거래 기록에서 확인한다',text:'2020년 공시의 Palantir 지분 보유와 2019년 발표의 Anduril 기존 투자자는 서로 다른 증거다. 연결을 누르면 어느 펀드·기업의 어떤 시점에 관한 기록인지 확인할 수 있다. 이렇게 읽으면 이름이 함께 등장한다는 사실과 자본이 연결된 사실을 구분할 수 있다.'},
    {title:'데이터·논리·행동을 같은 업무의 일부로 표현한다',text:'예를 들어 직접 구성한 업무 상황에서는 재고와 주문을 대상으로, 주문의 납기를 규칙으로, 담당자가 승인한 변경을 행동으로 나누어 볼 수 있다. 이 예는 Palantir 문서가 설명하는 구성요소를 읽는 방법이며, 실제 고객 사례나 실행된 제품 시연은 아니다.'},
    {title:'업무가 바뀌면 소프트웨어도 계속 전달되어야 한다',text:'조직의 데이터와 모델을 연결한 뒤에도 수정된 소프트웨어를 운영 환경에 배포하는 과정이 남는다. Apollo를 함께 표시한 이유다. 데이터에서 AI로, AI에서 업무로, 개발에서 배포로 이어지는 서로 다른 경로를 한 그림에서 따라갈 수 있다.'}
  ],videos:[],references:[
    {title:'Palantir · 2023 SEC 위임장 공시',url:sec,location:'이사회 후보 소개의 Alex Karp·Peter Thiel 공동창업자 표기와 Thiel의 2003년부터 의장·2005년부터 Founders Fund 파트너 경력. 인쇄 p.8의 Peter Thiel 소개와 앞선 Karp 소개를 확인했다.'},
    {title:'Founders Fund · Peter Thiel',url:bio,location:'공식 인물 소개의 Partner 및 Palantir 경력. 조회 2026-11-10. 개별 투자 결정이나 플랫폼 발명에 대한 근거로 확대하지 않는다.'},
    {title:'a16z · Anduril 투자 발표',url:funding,location:'Marc Andreessen, 2019-10-03. Series B 참여 발표의 기존 투자자 Founders Fund·General Catalyst 언급. 최초 투자일이나 현재 지분으로 표시하지 않는다.'},
    {title:'Palantir · 2020 S-1 상장신고서',url:filing,location:'Business 인쇄 p.121의 2003년 설립, Related Party Transactions p.194의 Founders Fund 관련 법인 지분 보유와 틸의 관련 운용 역할. 2020년 공시의 관계로 표시한다.'},
    {title:'Palantir · Platform overview',url:platform,location:'AIP·Foundry·Apollo의 역할, The Ontology 및 Decision components의 데이터·논리·행동 설명. 조회 2026-11-10의 제품 문서이며 2003년 구조로 소급하지 않는다.'},
    {title:'Palantir · Ontology overview',url:ontology,location:'조직의 대상·관계와 데이터·모델·행동을 연결하는 운영 계층의 공식 설명. RDF·OWL 표준과 동일한 구현이라고 표시하지 않는다.'},
    {title:'Palantir · AIP overview',url:aip,location:'조직의 데이터·운영과 AI의 연결, Ontology와 개발 도구 위의 업무 흐름 및 보안·감사 체계 설명. 제품 성능의 독립 검증 결과와 구분한다.'},
    {title:'Anduril·Palantir · 협력 발표',url:partnership,location:'2024-12-06 공식 발표의 회사 간 협력, 현장 데이터와 기업 규모 AI 개발·배포 연결. 인물 공동연구 관계로 바꾸지 않는다.'}
  ]};
  const profile={id:'peter-thiel',name:'Peter Thiel',nameKo:'피터 틸',aliases:['피터틸','Peter Andreas Thiel','Thiel'],tagline:'창업·투자와 데이터·운영 플랫폼으로 읽는 AI 산업',roles:['Palantir 공동창업','Founders Fund 파트너'],tags:['industry'],intro:'Palantir 공동창업과 Founders Fund의 투자 역할을 출발점으로 기업·자본·AI 운영 기반의 연결을 읽는다. 알렉스 카프와의 공동창업 관계, 펀드의 투자 기록, 회사가 개발한 플랫폼을 공식 자료의 시점과 함께 살펴본다.',works:[{id:'thiel-capital-infrastructure-2003',year:2003,dateLabel:'2003년 Palantir 공동창업에서 출발 · 후속 투자·플랫폼 자료 함께 읽기',title:'기업과 자본에서 AI 운영 기반으로',summary:'Palantir 공동창업과 Founders Fund 파트너 경력에서 출발해, 투자회사·제품 기업·데이터와 AI 플랫폼이 연결되는 경로를 공식 자료로 살펴본다.',type:'기업·투자·공식 기술자료',track:'industry',people:['Peter Thiel','Alex Karp'],sources:[{title:'Palantir · 2023 SEC 위임장 공시',url:sec},{title:'Founders Fund · 공식 인물 소개',url:bio}],caveat:'기준 연도는 공동창업의 출발이다. 후속 플랫폼의 개발 주체는 회사와 팀이며, 투자자의 개인 발명이나 현재 지분·수익으로 바꾸지 않는다.',content}]};
  window.ATLAS_THIEL_PROFILE=profile;window.ATLAS_PEOPLE_PROFILES.push(profile);
})();
