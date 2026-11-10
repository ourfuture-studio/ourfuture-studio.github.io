/* Refine Grok's existing 2023 record; retain Musk's other dated records. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='elon-musk');
  const work=person?.works.find(w=>w.id==='musk-grok-2023');
  if(!work)throw new Error('The existing Elon Musk / Grok record is required.');
  const grok='https://x.ai/news/grok';
  const modelCard='https://x.ai/news/grok/model-card';
  const nvidia='https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus/';
  const grok3='https://x.ai/news/grok-3';
  const grok4='https://x.ai/news/grok-4';
  const generate='https://docs.x.ai/developers/model-capabilities/text/generate-text';
  const models='https://docs.x.ai/developers/models';
  const webSearch='https://docs.x.ai/developers/tools/web-search';
  const xSearch='https://docs.x.ai/developers/tools/x-search';
  const streaming='https://docs.x.ai/developers/model-capabilities/text/streaming';
  const company='https://x.ai/company';
  const roles='https://ir.tesla.com/_flysystem/s3/sec/000110465926053166/tm2611837d1_10ka-gen.pdf';
  const priorSources=work.sources.map(s=>({...s}));
  const content={article:{
    question:'거대한 GPU 집합이,\n어떻게 배운 모형과 대화 서비스로 이어질까?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'xAI 모델·서비스 자료와 NVIDIA·기업 역할의 공식 기록',
    opening:[
      '사람의 질문에 답할 AI를 만들려면 모든 질문과 정답을 사람이 하나씩 적어 넣어야 할까? Grok의 출발점은 많은 문맥에서 다음 토큰을 예측하도록 신경망의 연결값을 배우고, 그 표현을 새로운 질문에도 사용하는 언어모형이다. 계산 기반을 크게 만드는 이유도 여기에 있다. 더 많은 자료와 큰 모형을 다루고, 학습 방법을 반복해서 시험할 계산을 감당하려는 것이다.',
      '2023년 Grok-1 모델 카드는 자기회귀 Transformer를 다음 토큰 예측으로 사전학습하고, 사람과 초기 Grok-0 모형의 피드백으로 미세조정했다고 설명한다. 문장을 이어 쓰는 규칙을 사람이 전부 만드는 대신, 자료에서 예측에 유용한 표현과 연결값을 얻고 피드백으로 응답 행동을 다듬으려는 발상이다. Grok은 이 모형을 질문응답·검색·작성·코딩에 쓰는 서비스의 이름이기도 하다.',
      '이 발상은 계산을 요구한다. 많은 입력을 모형에 통과시키고, 예측의 오차와 연결값의 관계를 계산하며, 값을 바꾸는 일을 거듭해야 한다. GPU가 여러 대라면 맡은 계산의 결과를 서로 전달해야 할 때도 생긴다. 칩을 많이 모으는 일과, 그 칩들이 자료를 받아 중단을 견디며 하나의 학습을 이어 가도록 만드는 일은 함께 풀어야 할 문제다.',
      'Colossus는 이 계산을 실제 시스템으로 묶은 사례다. NVIDIA는 2024년 10월 발표에서 당시 10만 Hopper GPU를 Spectrum-X Ethernet 연결망으로 묶어 Grok 계열을 학습한다고 설명했다. 여기서 GPU는 수치 계산을 맡고, 연결망은 여러 장치가 필요한 결과를 교환하는 기반을 맡는다. xAI의 연구·개발 조직과 NVIDIA의 칩·통신 기반이 만나는 지점이다.',
      '배운 연결값이 준비되면 다른 단계가 시작된다. 서비스는 선택한 모형에 사용자의 질문과 대화 문맥을 넣고 응답을 만든다. 필요하면 웹이나 X의 검색 도구로 새 정보를 가져온다. 질문 한 번에 답하는 추론, 답을 조금씩 화면으로 보내는 전달, 연결값을 바꾸는 학습을 나누어 보면 큰 GPU 시설이 사용자 경험까지 이어지는 경로를 읽을 수 있다.',
      '아래 그림에서는 계산·통신 기반에서 학습과 모형으로, 다시 질문·도구·응답으로 흐름을 따라간다. 일론 머스크의 기업 경영·조직 역할, 모형과 시스템을 만든 xAI 팀, NVIDIA와 젠슨 황의 기업 연결을 각각 살펴본다. 조직과 인프라를 연결한 사람을 모형의 모든 방법을 혼자 발명한 연구자로 바꾸지 않고, 각 기록의 날짜와 역할로 연결한다.'
    ],
    visual:{id:'grok-compute-service',navLabel:'GPU·모형·서비스',title:'계산을 묶어 배우고, 배운 모형을 서비스로 잇다',caption:'인프라와 학습, 질문과 도구, 기업과 인물의 세 보기를 이어서 살펴보세요. 흐름은 공식 자료를 참고해 직접 구성한 개념도입니다. 실제 Colossus 배치도·Grok 내부 학습 코드·모델 실행이나 API 호출 결과를 재현한 그림과 구분합니다.'},
    takeaway:{title:'계산 기반, 배우는 모형, 사용자에게 답하는 서비스가 서로 이어진다',text:'GPU와 연결망은 학습을 감당하는 기반이고, 학습은 모형의 연결값을 바꾸며, 서비스는 준비된 모형과 문맥·도구를 사용해 응답을 만든다. xAI와 NVIDIA의 관계도 이 역할의 연결로 읽어야 한다. GPU 수만으로 어떤 답이 정확한지 정해지지는 않는다.'},
    technical:{title:'학습에 쓴 계산과, 답변에 쓰는 계산을 구분해 읽기',paragraphs:[
      '기존 기록의 2023년은 Grok 초기 베타 공개를 가리킨다. 회사 연혁의 2023-07-12 조직 공개, 2023-11-03 Grok 발표, 2024-10-28 NVIDIA의 Colossus 발표, 2025-02-19 Grok 3와 2025-07-09 Grok 4 발표를 별도 시점으로 읽는다. 현행 API 문서는 2026-11-10에 확인한 서비스 설명이며 이후 기능 전체가 초기 Grok에 있었다고 소급하지 않는다.',
      'Grok-1 모델 카드는 자기회귀 Transformer·다음 토큰 예측 사전학습·후속 피드백 미세조정을 명시한다. 다음 토큰은 글을 나누어 처리하는 단위이며 언제나 띄어쓰기 단어 하나와 같지는 않다. 이 자료로 이후 모든 Grok 세대의 구조·자료·학습법이 같다고 추정하지 않는다. 원자료가 공개하지 않은 층 수나 분산 배치도도 만들어 넣지 않는다.',
      '2024년 NVIDIA 발표의 수치는 당시 10만 Hopper GPU이며, 20만 GPU는 그 발표에서 확장 중인 규모다. 2025년 Grok 4 발표는 당시 20만 GPU의 Colossus에서 강화학습을 수행했다고 설명한다. 두 수치는 시점이 다른 회사 발표이고 현재 가동 대수·동시 이용률·어떤 사용자의 답변이 실행된 장치 수를 확인한 계측 결과가 아니다.',
      'Spectrum-X는 GPU 자체가 아니라 장치 사이 자료 교환을 위한 Ethernet 기반 연결망이다. NVIDIA 발표는 RDMA 연결망과 Spectrum 스위치·BlueField SuperNIC을 함께 설명한다. 아래 그림의 선은 계산·통신·자료가 맡는 역할을 연결한다. 실제 시설의 케이블 구성, 모든 병렬화 방법, 통신 순서와 각 장치의 정확한 배치를 복제한 도면은 아니다.',
      '2023년 xAI의 Engineering at xAI는 학습·추론 소프트웨어와 분산 시스템의 신뢰성을 함께 다룬다. 규모가 커지면 장치 고장과 중단을 찾아 처리해야 유용한 계산을 이어 갈 수 있다. 아래의 자료 준비·학습·모형 전달은 이 차이를 보이도록 묶은 개념적 흐름이며, 공개되지 않은 Grok 운영 절차나 실제 복구 시험 결과로 표시하지 않는다.',
      '사전학습에서 다음 토큰을 예측하는 일과, 후속 피드백으로 행동을 다듬는 일은 같은 학습 신호가 아니다. Grok 3·4 발표는 후속 강화학습과 답변 시 더 계산하는 방식을 설명한다. 검증 가능한 문제·자료와 학습 목표가 함께 필요하며 GPU를 늘렸다는 사실만으로 추론 능력의 원인이나 모든 과제의 향상을 입증하지 않는다. 회사의 비교 점수나 계산 효율 배수는 이 그림에서 재현한 실험 결과로 싣지 않는다.',
      'Generate Text 문서는 요청에 모형과 입력 문맥을 지정하고 응답을 받는 인터페이스를 보여 준다. 이전 응답 ID로 대화를 이어 가는 기능은 앞선 입력과 응답을 다음 요청의 문맥으로 활용하는 설명이다. 이것을 매 질문마다 모형의 연결값을 다시 학습하는 절차로 해석하지 않는다. 아래의 학습과 서비스 경계는 이런 역할을 설명하며 공개되지 않은 실제 서비스 장비 배치까지 단정하지 않는다.',
      '학습 자료에서 얻은 연결값과 지금 검색한 정보도 구분해야 한다. Grok-1 모델 카드는 모형 단독으로 웹을 검색하지 못하며 도구·데이터베이스가 서비스에 결합된다고 설명한다. 현행 Models·Web Search·X Search 문서도 검색 도구를 켜서 새 정보를 가져오는 경로를 나눈다. 검색 결과가 문맥에 추가되었다고 그 내용이 자동으로 참이 되거나 바로 영구 학습되는 것은 아니다.',
      '답변 때 더 계산하는 추론과 사용자에게 결과를 전달하는 방식도 별개다. Grok 3 발표의 test-time compute는 답을 만들 때의 계산을 다루고, Streaming 문서는 생성되는 내용을 이벤트로 나누어 보내는 방식을 설명한다. 화면에 글자가 차례로 나타난다는 사실만으로 학습 중이라고 판단하거나 보이지 않는 내부 사고가 그대로 노출되었다고 단정하지 않는다.',
      'Tesla의 2025 회계연도 10-K/A는 2026-04-30 기준 인물 소개에서 머스크가 2023년 3월부터 2025년 3월 합병까지 X.AI Corp.의 CEO·이사였고, 이후 Holdings에서 경영 역할을 맡았다고 기록한다. 이 카드의 머스크–xAI 연결은 이런 기업 역할의 기록이다. NVIDIA–Colossus 연결은 2024년 공급·구축 발표에 근거하며 젠슨 황의 NVIDIA 카드로 이어진다. 개인 간 지도·공동 논문·공동 모델 발명 관계를 뜻하지 않는다.',
      '이 상세 화면은 2024·2025년의 학습 인프라 사례를 중심으로 읽는다. 2026년 SpaceX 편입은 기존 별도 기록에 남긴다. 현행 사이트의 SpaceX Super Intelligence 표기와 바뀔 수 있는 서비스 문서는 조회 시점의 모습이다. Grok 3·4를 현재의 최신 모형으로 표시하거나 과거 Colossus의 숫자를 현재 시설 상태로 사용하지 않는다.'
    ]}
  },keyIdeas:[
    {title:'모든 답을 적는 대신, 자료에서 다음 표현을 배운다',text:'Grok-1은 다음 토큰 예측으로 신경망의 연결값을 배우고 피드백으로 응답을 다듬는 발상을 택했다. 이 학습을 크게 시험하려면 많은 계산과 그것을 지속할 시스템이 필요하다.'},
    {title:'GPU의 계산을 연결망·자료·운영으로 묶는다',text:'계산 장치가 많아져도 필요한 결과를 주고받거나 자료를 공급하지 못하면 하나의 학습을 이어 가기 어렵다. Colossus와 Spectrum-X는 GPU 수와 함께 시스템의 연결을 보아야 하는 사례다.'},
    {title:'학습된 연결값과 지금 주어진 문맥은 다르다',text:'학습은 연결값을 바꾸고, 서비스는 준비된 모형에 질문과 문맥을 넣는다. 검색 도구가 새 정보를 가져오거나 대화가 이어진다는 사실만으로 매번 영구 학습한다고 해석하지 않는다.'},
    {title:'인물과 기업은 기여한 역할을 따라 연결한다',text:'머스크의 경영·조직, xAI 팀의 모형·시스템 개발, NVIDIA의 GPU·연결망 기반을 나누어 읽는다. 젠슨 황의 CUDA 카드로 이동하면 큰 계산을 실행하는 기반을 더 자세히 볼 수 있다.'}
  ],videos:[],references:[
    {title:'xAI · Announcing Grok',url:grok,location:'2023-11-03 · The journey to Grok-1 · Engineering at xAI · Research at xAI. 초기 제품·기반 모형, 학습·추론 시스템과 신뢰성. 조회 2026-11-10.'},
    {title:'xAI · Grok-1 Model Card',url:modelCard,location:'2023-11-03 · Model details · Intended uses · Limitations. 자기회귀 Transformer·다음 토큰 예측·피드백 미세조정, 모형과 검색 도구의 경계. 조회 2026-11-10.'},
    {title:'NVIDIA · Spectrum-X와 xAI Colossus',url:nvidia,location:'2024-10-28 · 도입부와 RDMA·Spectrum 스위치·BlueField 설명. 당시 10만 Hopper GPU, xAI·NVIDIA 구축과 당시 20만 확장 계획을 구분한 회사 발표.'},
    {title:'xAI · Grok 3 Beta',url:grok3,location:'2025-02-19 · Next-Generation Intelligence · Thinking Harder: Test-time Compute and Reasoning · Grok Agents. Colossus 학습·강화학습·답변 시 계산·도구에 관한 회사 설명.'},
    {title:'xAI · Grok 4',url:grok4,location:'2025-07-09 · Scaling Up Reinforcement Learning · Native Tool Use · 도입부의 API 제공. 당시 20만 GPU Colossus와 강화학습의 연결을 설명한 회사 발표.'},
    {title:'공식 API 문서 · Generate Text',url:generate,location:'Creating a new model response · Chaining the conversation. 모형·입력 지정과 응답, 이전 응답 ID로 문맥 이어 가기. 현행 문서 조회 2026-11-10.'},
    {title:'공식 API 문서 · Models',url:models,location:'Additional Information Regarding Models. 검색 도구 없이는 실시간 사건에 접근하지 않는다는 설명. 현행 모형 목록을 2023·2025년 사양으로 소급하지 않는다. 조회 2026-11-10.'},
    {title:'공식 API 문서 · Web Search',url:webSearch,location:'도입부 · Basic Usage. 웹 검색 도구를 별도로 제공해 페이지 정보를 가져오는 요청의 구조. 조회 2026-11-10.'},
    {title:'공식 API 문서 · X Search',url:xSearch,location:'도입부 · Basic Usage · How X Search Works. 키워드·의미 검색과 X의 게시물 등 외부 정보를 가져오는 역할. 조회 2026-11-10.'},
    {title:'공식 API 문서 · Streaming',url:streaming,location:'도입부 · Server-Sent Events와 stream 설정. 생성 내용을 나누어 전달하는 방식. 학습·연결값 변경과 구분한다. 조회 2026-11-10.'},
    {title:'Tesla · 2025 회계연도 Form 10-K/A',url:roles,location:'Item 10 · Background and Qualifications · printed p.1/PDF p.5, Elon Musk 소개. 2026-04-30 기준으로 2023–25 X.AI Corp. CEO·이사와 이후 Holdings 역할을 구분한 공식 공시.'},
    {title:'공식 회사 연혁',url:company,location:'2023 Company announcement·Announcing Grok; 2024·2025 후속 공개 기록. 개별 발표의 시점을 확인했다. 현재 회사·제품 표기를 과거의 직함과 혼동하지 않는다. 조회 2026-11-10.'}
  ]};
  person.tagline='xAI·Grok의 모델 개발과 대규모 GPU 인프라를 잇는 기업 역할';
  person.intro='xAI·Grok을 중심으로 GPU와 연결망이 학습을 감당하고, 배운 모형이 대화·검색·API 서비스로 이어지는 과정을 살펴본다. 머스크의 기업 경영·조직 역할, xAI 팀의 모형·시스템 개발, NVIDIA의 계산·통신 기반을 날짜와 역할로 나누어 읽는다.';
  Object.assign(work,{title:'xAI·Grok: 대규모 GPU 학습에서 대화 서비스로',dateLabel:'2023년 Grok 공개에서 출발 · 2024·2025년 Colossus 학습 사례 · 현행 API 문서',type:'기업·모델·계산 인프라·공식 자료',summary:'다음 토큰 예측과 피드백으로 모형을 배우고, GPU·연결망·분산 시스템으로 그 계산을 감당하려는 발상을 살펴본다. 학습된 모형이 질문·검색 도구·응답 서비스로 이어지는 경로와 NVIDIA·젠슨 황의 기업 연결을 함께 읽는다.',caveat:'2023년은 초기 Grok 공개 기록이다. 후속 학습 인프라와 서비스는 날짜별 공식 발표·문서로 구분하며, 흐름도는 직접 구성한 개념도다. 실제 Grok 학습·API 호출·성능 측정 결과와 구분한다.',content,sources:[...priorSources,{title:'xAI · Grok-1 Model Card',url:modelCard},{title:'NVIDIA · 2024년 Colossus·Spectrum-X 발표',url:nvidia},{title:'xAI · Grok 4의 강화학습 사례',url:grok4},{title:'공식 API 문서 · Generate Text',url:generate}]} );
  window.ATLAS_MUSK_REVISION={personId:person.id,workId:work.id,visualId:'grok-compute-service',sourceVersion:'0.46'};
})();
