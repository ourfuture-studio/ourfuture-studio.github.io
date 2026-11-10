/* Add one dated organization/model record; preserve both existing research records. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='demis-hassabis');
  if(!person||person.works.some(w=>w.id==='hassabis-gemini-2023'))throw new Error('The existing Demis Hassabis profile and an unapplied company adapter are required.');
  const go='https://storage.googleapis.com/deepmind-media/alphago/AlphaGoNaturePaper.pdf';
  const fold='https://pmc.ncbi.nlm.nih.gov/articles/PMC8371605/';
  const gemini='https://arxiv.org/pdf/2312.11805v1';
  const merge='https://deepmind.google/blog/announcing-google-deepmind/';
  const googleMerge='https://blog.google/innovation-and-ai/technology/ai/april-ai-update/';
  const launch='https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/';
  const app='https://blog.google/products-and-platforms/products/gemini/bard-gemini-advanced-app/';
  const api='https://aistudio.google.com/docs';
  const functions='https://aistudio.google.com/docs/function-calling';
  const database='https://www.ebi.ac.uk/about/news/announcements/alphafold-database-launch/';
  const anniversary='https://deepmind.google/blog/10-years-of-alphago/';
  const roles='https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/';
  const team='https://deepmind.google/company/our-team/';
  const content={article:{
    question:'게임에서 다음 수를 고르고, 단백질의 구조를 예측하던 연구는\n어떻게 여러 종류의 정보를 다루는 Gemini로 이어졌을까?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'AlphaGo·AlphaFold·Gemini 원문과 조직·제품·도구의 공식 기록',
    opening:[
      '가능한 경우를 전부 계산하거나, 모든 답을 사람이 규칙으로 적어 주지 않고도 문제를 풀게 할 수 있을까? 허사비스와 동료들이 해 온 연구를 잇는 질문이다. 다만 바둑의 다음 수를 정하는 일, 아미노산 서열에서 입체 구조를 예측하는 일, 그림과 문장을 함께 읽는 일은 대상과 필요한 표현이 다르다. 무엇을 배우고 어떤 계산과 연결했는지를 각각 살펴보아야 연구가 이어진 경로를 읽을 수 있다.',
      'AlphaGo에서는 배운 직관과 더 읽어 보는 계산이 만났다. 정책망은 어떤 수를 고려할지 안내하고, 가치망은 국면의 유리함을 예측한다. 2016년 시스템은 이 안내를 나무 탐색과 빠른 대국 전개에 연결했다. 지금 그럴듯한 수를 바로 고르는 데서 한 걸음 더 나아가, 탐색에서 얻은 정보를 쌓으며 다음 수를 결정하려는 발상이다.',
      'AlphaFold 2에서는 단백질을 어떻게 표현할지가 중심에 놓였다. 진화적으로 관련된 서열의 정보와 잔기 쌍의 관계를 함께 갱신하고, 그 표현을 입체 구조로 연결했다. 바둑에서 수를 탐색하던 프로그램을 단백질에 그대로 적용한 것이 아니라, 생물학 문제의 구조를 신경망 안에서 다룰 표현과 계산을 설계한 것이다. 예측 구조와 신뢰도를 함께 제공하면서 과학자가 검토하고 활용할 길도 열었다.',
      '2023년 Google DeepMind의 출범은 이런 연구를 조직과 계산 기반에서 연결한 사건이다. DeepMind와 Google Research의 Brain 팀이 합쳐졌고, 공동 모델 개발과 Google 제품 조직의 협력이 강조되었다. 같은 해 공개한 Gemini 1.0은 이미지·오디오·영상·텍스트를 함께 학습하는 Transformer 계열 모형이었다. 서로 다른 형식의 정보를 관계 속에서 읽고 다양한 과제에 활용하려는 방향으로 범위를 넓혔다.',
      '연구 모형은 사용자가 만나는 제품과도 구분된다. 배운 모형에 질문과 자료를 넣는 요청, 그 결과를 보여 주는 앱, 개발자가 기능을 연결하는 API, 필요한 계산을 감당하는 기반이 함께 있어야 한다. 초기 Gemini의 Bard 적용과 AI Studio·Google Cloud 제공 계획, 이후 Gemini 앱의 출범은 이 접점이 만들어진 기록이다. AlphaFold 연구에서는 예측 구조를 공개 데이터베이스로 제공하는 별도의 활용 경로가 이어졌다.',
      '2026년 허사비스의 공식 회고는 최신 Gemini가 AlphaGo·AlphaZero에서 개척한 일부 기법을 사용한다고 설명한다. 동시에 AlphaFold를 전문 도구로 호출하는 일은 앞으로의 일반 AI를 설명하는 가능성으로 제시한다. 아래에서는 논문에 나온 방법, 실제 조직·제품 공개, 회사가 설명한 연구 계보와 미래 구상을 서로 다른 근거로 연결한다. 개인의 연구·조직 역할과 여러 팀이 만든 방법·시스템·제품의 기여도 함께 읽어 보자.'
    ],
    visual:{id:'deepmind-gemini-platform',navLabel:'연구·Gemini·제품',title:'배울 표현과 계산을 설계하고, 연구를 모델과 제품으로 연결하다',caption:'AlphaGo·AlphaFold 2·Gemini의 문제와 표현을 비교하고, 모델과 요청·도구·제품, 인물과 조직의 관계를 이어서 살펴보세요. 그림은 원문을 참고해 직접 구성한 개념도입니다. 작은 탐색·좌표·입력 조합 사례의 값은 직접 정했으며 실제 바둑·단백질 예측·Gemini 모델 실행 결과와 구분합니다.'},
    takeaway:{title:'배울 대상에 맞는 표현과 계산, 이를 시험하고 제공할 조직·기반이 함께 필요하다',text:'AlphaGo는 학습한 안내와 탐색을, AlphaFold 2는 서열·잔기 관계와 구조의 계산을, Gemini는 여러 형식의 정보를 함께 배우는 모형을 발전시켰다. 연구가 이어지는 경로를 보려면 방법의 근거와 함께 연구팀, 계산 기반, 평가, 앱·API·과학 도구의 역할을 연결해야 한다.'},
    technical:{title:'연구 방법의 계보와 조직·제품의 변화를 나누어 읽기',paragraphs:[
      '이 기록의 2023년은 Google DeepMind 조직 통합과 Gemini 1.0 공개를 가리킨다. 공식 통합 글은 DeepMind의 2010년 출발을 회고하며, 별도 회사 소개는 2014년에 Google과 합류했다고 설명한다. 기존 2016년 AlphaGo·2021년 AlphaFold 2 기록은 그대로 둔다. Gemini 발표는 2023-12-06, 여기서 읽은 기술보고서 arXiv v1의 공개일은 2023-12-19다.',
      'AlphaGo 원논문의 Fig.1·3와 본문은 정책·가치 신경망의 학습과 Monte Carlo tree search를 연결한다. 사람의 기보에서 배우는 단계, 자기 대국으로 정책을 개선하는 단계, 국면의 승패를 예측하는 단계가 서로 다른 역할을 맡는다. 아래의 작은 max–min 계산은 탐색의 역할을 살펴보도록 직접 구성한 별도 사례다. 원논문의 MCTS·신경망·19×19 바둑을 실행한 결과로 표시하지 않는다.',
      '2016년 1월 Nature 논문에 실린 Fan Hui 대국 평가와 같은 해 3월 이세돌 대국은 별도 기록이다. 2026년 회고와 연결된 다큐멘터리의 Move 37 이야기를 1월 논문과 같은 실험·같은 대국 버전으로 합치지 않는다. 여러 AlphaGo·AlphaZero 세대의 방법도 연도와 자료에 맞추어 읽는다.',
      'AlphaFold 2 원논문의 Fig.1·3과 Evoformer·Structure module 절은 다중서열정렬(MSA) 표현과 잔기 쌍 표현의 갱신, 입체 구조 계산과 반복 개선을 설명한다. 2020년 CASP14의 성취와 2021년 논문 공개를 구분한다. 예측 구조는 분자가 접히는 전체 시간 경로를 시뮬레이션한 결과와 다르며, 신뢰도 역시 실험적 확정과 같은 뜻은 아니다. 아래의 임의 좌표와 쌍거리는 이 관계를 읽기 위한 작은 기하 사례다.',
      '2021년 7월 EMBL-EBI의 공개는 DeepMind와 협력해 AlphaFold 예측 구조를 과학계에 무료로 개방한 데이터베이스의 출범을 알렸다. 이것은 AlphaFold 연구가 실제로 공유 도구로 이어진 근거다. 예측 자료가 공개되었다는 사실로 모든 단백질의 기능·상호작용·질병 원인이 검증됐다고 추정하지 않는다.',
      'Gemini 1.0 v1의 §1–2는 이미지·오디오·영상·텍스트의 공동 학습과 Transformer decoder 기반 구조를 설명한다. §3은 당시 TPU v4·v5e와 분산 학습의 기반을, §4는 학습 자료를 다룬다. §6.4.2는 SFT·RLHF와 함께 Constitutional AI에서 느슨히 영감을 받아 정책에 따른 응답 수정·후보 비교로 자료를 만드는 방법도 기술한다. 이는 원문이 명시한 방법 참고이며 Google과 Anthropic의 사업 협력을 뜻하지 않는다. 그림의 첫 보기는 공통 질문과 서로 다른 표현을 비교하는 구성이다. AlphaGo의 탐색기나 AlphaFold 2의 구조 모듈 전체가 그대로 Gemini 1.0에 들어갔다고 해석하지 않는다.',
      'Gemini 보고서 §3은 가속기를 늘리면 고장을 다루고 학습을 계속하는 시스템도 필요하다고 설명한다. 당시 TPU와 JAX·Pathways의 기록은 모형 학습을 감당한 기반을 보여 준다. 이 사례를 현재 모든 Gemini 서비스의 장치 구성이나 특정 사용자 응답이 실행된 위치로 옮기지 않는다. 자체 그림에서 장치 수를 지능 점수·처리속도로 환산하지도 않는다.',
      '2023년 제품 발표는 Bard에 Gemini Pro를 적용하고 Pixel 8 Pro에 Nano를 제공한다고 설명했으며, AI Studio·Vertex AI의 개발자 제공은 당시 12월 13일 계획으로 소개했다. 2024년 2월 글은 Bard의 이름을 Gemini로 바꾸고 앱·구독 제품을 공개한 기록이다. 현행 API 문서의 모형 이름·한도·기능을 2023년 전체 사양으로 소급하지 않는다.',
      '학습으로 준비한 모형에 이번 질문과 자료를 주는 일은 매 요청마다 그 연결값을 다시 학습하는 절차와 구분된다. 현행 함수 호출 문서는 모형이 함수 이름과 인자를 제안하고, 실제 함수 코드는 애플리케이션에서 실행한 뒤 결과를 다시 전달하는 역할을 설명한다. 이 화면은 API 요청이나 외부 도구를 실행하지 않는다. 그림의 작은 막대 수치와 질문은 직접 구성한 입력이며 실제 이미지 인식·Gemini 응답 결과가 아니다.',
      '2026-03-10 공식 회고는 당시 최신 Gemini에 AlphaGo·AlphaZero에서 개척한 일부 기법을 쓴다고 밝힌다. 이는 회사가 설명한 계보이며 구체적인 모든 모델 내부 구현이나 독립 재현 결과를 제공하는 문장은 아니다. 같은 회고에서 AlphaFold는 미래의 일반 모형이 필요할 때 사용할 수 있는 전문 도구의 예로 제시된다. 모든 공개 Gemini 요청이 이미 AlphaFold를 호출한다는 설명으로 바꾸지 않는다.',
      '개인의 역할도 원문의 기여문으로 나누어 읽는다. AlphaGo 논문은 David Silver 등 여러 연구자의 탐색·신경망·평가 개발과 프로젝트 관리·집필을 구분한다. AlphaFold 2는 John Jumper와 Demis Hassabis의 연구 리드, Jumper 등 여러 사람의 신경망 설계와 학습·자료·시스템 기여를 적는다. Gemini v1 §8은 Hassabis·Koray Kavukcuoglu를 조직 측 Program Leads로, Jeffrey Dean·Oriol Vinyals를 동등 기여의 Overall Technical Leads로 소개한다.',
      '2023년 통합 당시의 Hassabis CEO·Dean Chief Scientist 역할과 이후의 역할 변경 공지를 구분한다. 2026-11-11에 조회한 Google 공식 공지는 Hassabis의 GDM Chair·Alphabet Chief Scientist, Kavukcuoglu의 GDM SVP 역할과 Dean 등의 독립 조직을 발표한다. 공개 본문에는 발표 날짜가 노출되지 않아 임의의 전환 날짜를 정하지 않으며, 발표 문장만으로 모든 전환이 실행 완료되었다고 단정하지 않는다.'
    ]}
  },keyIdeas:[
    {title:'배운 직관이 더 읽어 볼 계산을 안내한다',text:'AlphaGo는 어떤 수를 고려할지와 국면을 어떻게 평가할지를 배워 탐색에 연결했다. 학습과 현재 문제를 풀기 위한 계산이 맡는 역할을 나누어 볼 수 있다.'},
    {title:'풀려는 문제에 맞는 표현을 만든다',text:'AlphaFold 2의 서열·잔기 관계·입체 구조와 Gemini의 여러 입력 형식은 같은 표현이 아니다. 무엇을 관계 속에서 배우게 할지에 따라 신경망의 계산과 평가도 달라진다.'},
    {title:'모형에서 제품으로 갈 때 요청·도구·제공 경로가 더해진다',text:'학습된 모형과 이번 입력, 함수 실행을 맡는 애플리케이션, 사용자 앱과 개발자 API를 구별한다. AlphaFold 데이터베이스처럼 예측을 공유하는 과학 도구도 별도의 활용 경로다.'},
    {title:'기술 계보·조직 통합·미래 구상은 근거를 나누어 연결한다',text:'원논문의 방법과 기여문, 2023년의 조직·제품 발표, 2026년 회고와 역할 변경 공지를 각각의 시점으로 읽는다. 한 사람의 경영 역할이나 같은 회사라는 사실만으로 모든 방법의 직접 상속을 추정하지 않는다.'}
  ],videos:[
    {title:'AlphaGo - The Movie | Full award-winning documentary',url:'https://www.youtube.com/watch?v=WXuK6gekU1Y',channel:'Google DeepMind',note:'2026년 공식 AlphaGo 회고가 연결한 전체 다큐멘터리. 링크와 공식 게시 채널·제목을 확인했으며, 영상 전체를 시청하거나 발언을 전사해 검토한 것은 아니다. 2016년 3월 이세돌 대국 이야기와 1월 Nature 논문의 평가를 구분해 본다.',sourceUrl:anniversary}
  ],references:[
    {title:'Silver 외 · AlphaGo (2016) 원논문',url:go,location:'Nature 529, 484–489 · Fig.1·3, 본문, Methods와 Author Contributions. 신경망 학습·MCTS·프로젝트 기여를 확인. 2016년 1월 논문과 이후 3월 대국을 구분.'},
    {title:'Jumper 외 · AlphaFold 2 (2021) 원논문',url:fold,location:'Nature 596, 583–589 · DOI 10.1038/s41586-021-03819-2. Fig.1·3, Evoformer·Structure module, Confidence prediction와 Author contributions. PMC 원문 전문으로 확인.'},
    {title:'Gemini Team, Google · Gemini 1.0 기술보고서 v1',url:gemini,location:'arXiv:2312.11805v1 · 2023-12-19. §1–4, §5.2, §6.4–6.5, §8. 여러 형식의 공동 학습·Transformer·당시 TPU 기반·개별 기여 역할.'},
    {title:'Google DeepMind · 조직 통합 발표',url:merge,location:'2023-04-20 · DeepMind 2010년 출발과 Brain 팀 통합, Google 제품 조직·계산 기반의 협력 설명.'},
    {title:'Google · Bringing together two world-class AI teams',url:googleMerge,location:'2023-04-20 · Brain·DeepMind 통합, 당시 Hassabis와 Dean의 역할, 범용·멀티모달 연구와 제품 연결에 관한 회사 발표.'},
    {title:'Google · Introducing Gemini',url:launch,location:'2023-12-06 · Introducing Gemini / Scalable and efficient / Availability. 팀 공동 개발·멀티모달 방향·당시 TPU와 Bard·Pixel 적용 및 AI Studio·Vertex 제공 계획.'},
    {title:'Google · Bard becomes Gemini',url:app,location:'2024-02-08 · Bard에서 Gemini로의 명칭 변경, Gemini Advanced와 모바일 앱 공개. 당시 제품·제공 범위의 기록.'},
    {title:'Gemini API · 공식 개발자 문서',url:api,location:'Welcome to Gemini API · API 모형과 input 요청 예시. 2026-11-11 현행 문서 조회. 예전 ai.google.dev 안내는 이 문서로 연결되며 현행 사양을 2023년으로 소급하지 않는다.'},
    {title:'Gemini API · Function calling',url:functions,location:'Function calling의 개요와 How function calling works. 모형의 함수 이름·인자 제안, 애플리케이션의 실제 실행과 결과 전달. 현행 문서 조회 2026-11-11.'},
    {title:'EMBL-EBI · AlphaFold 데이터베이스 공개',url:database,location:'2021-07-22 · DeepMind·EMBL 협력과 예측 구조의 무료·공개 제공. 논문 결과가 실제 과학 자료 공유로 이어진 경로.'},
    {title:'Google DeepMind · AlphaGo 10년 회고',url:anniversary,location:'2026-03-10 · Catalyzing breakthroughs in science / Future of intelligence. 일부 기법의 Gemini 계보에 관한 회사 설명, 미래 AlphaFold 도구 이용의 가능성, 공식 다큐멘터리 링크.'},
    {title:'Google · The next chapter of our AI momentum',url:roles,location:'공개 본문에 발표 날짜가 노출되지 않아 조회일 2026-11-11로 기록. Sundar·Demis 메시지의 역할 변경 발표. 2023년 직함과 구분하고 전환 완료나 임의의 날짜를 추정하지 않는다.'},
    {title:'Google DeepMind · Our team',url:team,location:'2014년 Google과 합류했다는 회사의 연혁 문장. 현재 페이지 조회 2026-11-11. 회사의 역사와 모델 개발의 개별 기여를 구분.'}
  ]};
  const work={id:'hassabis-gemini-2023',year:2023,dateLabel:'2023년 Google DeepMind 통합·Gemini 공개에서 출발 · 2010–2026 연구·제품 맥락',title:'Google DeepMind·Gemini: 게임과 과학의 연구에서 모델과 제품으로',summary:'AlphaGo의 학습·탐색, AlphaFold 2의 서열·구조 표현, Gemini의 멀티모달 학습이 풀려는 문제를 비교한다. Google DeepMind의 통합과 계산 기반, 모델·앱·API·과학 도구로 이어지는 경로를 공식 자료와 날짜별 기여로 연결한다.',type:'기업·연구 조직·모델·제품·공식 자료',track:'industry',people:['Demis Hassabis','Koray Kavukcuoglu','Jeffrey Dean','Oriol Vinyals'],authorNote:'2023년 조직·Gemini 프로젝트와 이후 제품을 함께 읽는 기업 기록이다. Gemini v1의 Program Leads와 Overall Technical Leads 일부를 연결하며, 전체 논문 저자 명단이나 개인의 단독 발명을 뜻하지 않는다.',sources:[{title:'Google DeepMind · 2023년 조직 통합',url:merge},{title:'Google · Gemini 공개',url:launch},{title:'Gemini Team · 2023 기술보고서 v1',url:gemini},{title:'Google DeepMind · 2026 AlphaGo 회고',url:anniversary}],caveat:'2023년은 조직 통합·Gemini 공개 기록의 기준 연도다. 원논문의 방법, 회사가 설명한 일부 기술 계보, 실제 제품 공개와 미래 도구 구상을 구분한다. 시각화의 작은 수·좌표·입력은 직접 정한 사례이며 실제 AlphaGo·AlphaFold·Gemini 실행이나 성능 측정 결과가 아니다.',content};
  person.tagline='AlphaGo·AlphaFold 연구에서 Google DeepMind·Gemini의 모델과 제품으로';
  person.intro='AlphaGo·AlphaFold 2의 기존 연구와 Google DeepMind·Gemini의 조직·모델·제품 기록을 함께 읽는다. 배운 평가와 탐색, 서열과 구조의 표현, 멀티모달 학습이 맡는 문제를 비교하고 계산 기반·앱·API·과학 도구로 이어지는 경로를 살펴본다. 허사비스의 연구·조직 역할과 여러 연구자·개발팀의 기여를 날짜별 원문에 맞추어 연결한다.';
  if(!person.tags.includes('industry'))person.tags.push('industry');
  person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
  window.ATLAS_HASSABIS_REVISION={personId:person.id,workId:work.id,visualId:'deepmind-gemini-platform',sourceVersion:'0.48'};
})();
