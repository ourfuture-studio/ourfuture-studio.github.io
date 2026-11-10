/* Add one company/product record to the existing researcher; preserve three studies. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='dario-amodei');
  if(!person||person.works.some(w=>w.id==='amodei-anthropic-2021'))throw new Error('The existing Dario Amodei profile and an unapplied company adapter are required.');
  const paper='https://arxiv.org/pdf/2212.08073v1';
  const research='https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback';
  const founding='https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems';
  const launch='https://www.anthropic.com/news/introducing-claude';
  const constitution2023='https://www.anthropic.com/news/claudes-constitution';
  const constitution2026='https://www.anthropic.com/news/claude-new-constitution';
  const constitution='https://www.anthropic.com/constitution';
  const teaching='https://www.anthropic.com/research/teaching-claude-why';
  const leadership='https://www.anthropic.com/company/leadership';
  const aws='https://www.anthropic.com/news/anthropic-amazon-trainium';
  const google='https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services';
  const amazon2026='https://www.anthropic.com/news/anthropic-amazon-compute';
  const api='https://platform.claude.com/docs/en/api/overview';
  const content={article:{
    question:'말을 잘 이어 쓰는 AI가,\n어떤 답이 바람직한지도 배우게 하려면?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'Constitutional AI 원논문·Claude 원칙 문서·기업과 인프라의 공식 기록',
    opening:[
      '언어모형이 글을 이어 쓸 수 있다는 것과, 사용자에게 어떤 답을 해야 할지 판단하는 것은 같은 문제가 아니다. 원하는 문장을 잘 만들어도 거짓을 단정하거나 사람을 모욕하거나 해로운 요구를 그대로 도울 수 있다. 모든 상황의 정답을 사람이 하나씩 평가하는 대신, 판단할 원칙을 말로 적어 주고 AI가 그 원칙으로 자신의 답을 검토하게 할 수 없을까? Constitutional AI는 이 질문에서 출발한다.',
      '핵심은 원칙을 화면에 보여 주는 데서 끝내지 않는 것이다. 먼저 모형이 만든 답에서 무엇이 원칙과 어긋나는지 비평하고, 그 이유에 맞게 답을 고친다. 이렇게 얻은 수정 답변을 학습 자료로 삼아 연결값을 바꾼다. 매번 같은 지적을 덧붙여야 하는 모형보다, 새로운 질문에서도 그 방향으로 답하는 모형을 만들려는 발상이다.',
      '두 번째 경로에서는 원칙을 답변의 비교 기준으로 사용한다. 같은 질문의 두 답 중 어느 쪽이 원칙에 더 맞는지 AI가 판단하고, 그 비교 자료로 선호 모형을 배운다. 이 모형의 평가를 보상 신호로 사용해 답변 모형을 다시 학습한다. 2022년 연구는 무해성 판단을 AI 피드백으로 바꾸면서도 유용성에는 사람의 선호 자료를 사용했다. 사람이 정한 목표와 모형이 만든 판단이 함께 들어가는 구조다.',
      'Anthropic은 이 연구를 Claude라는 대화형 제품으로 이어 갔다. 2023년 Claude 공개는 채팅과 API를 통해 글쓰기·요약·질의응답·코딩 등에 접근하는 접점을 소개했다. 이어 공개한 원칙 설명은 Claude를 Constitutional AI로 학습했다고 밝히면서, 실제 제품에 쓴 원칙은 원논문의 목록에서 갱신되었다고 구분했다. 연구 아이디어가 제품으로 이어졌지만, 논문의 한 실험이 제품 전체의 설계도인 것은 아니다.',
      '원칙의 내용과 이를 배우게 하는 방법도 바뀌어 왔다. 2026년 새 헌법 소개는 개별 규칙만 나열하기보다 어떤 행동을 원하는 이유와 어려운 선택의 맥락을 설명하는 쪽으로 무게를 옮겼다. 새 상황에서도 넓은 원칙을 적용하게 하려는 방향이다. 뒤이은 연구 공개는 바람직한 행동의 시범뿐 아니라 그 이유를 담은 자료와 다양한 환경을 함께 다루는 학습을 설명한다.',
      '아래에서는 원칙이 비평·수정과 비교 자료를 거쳐 학습으로 들어가는 경로, Claude 제품과 원칙 문서의 변화, 이를 만드는 사람과 계산 기반의 관계를 이어 본다. 다리오 아모데이의 연구·경영, 다니엘라 아모데이의 공동설립·조직 역할, 여러 연구자의 방법·실험·문서 기여와 AWS·Google Cloud·NVIDIA의 기반을 각각의 근거와 날짜로 연결한다.'
    ],
    visual:{id:'constitution-claude-platform',navLabel:'원칙·학습·Claude',title:'판단의 기준을 말로 적고, 그 기준으로 배우게 하다',caption:'원논문의 두 학습 경로와 Claude의 원칙 문서·제품, 인물과 기업의 관계를 선택해 살펴보세요. 흐름은 공식 자료를 참고해 직접 구성한 개념도입니다. 아래의 짧은 비평·수정 사례는 직접 작성한 문장으로, 실제 Claude 생성이나 학습 결과와 구분합니다.'},
    takeaway:{title:'원칙을 답변의 장식이 아니라, 학습할 자료와 평가의 기준으로 사용한다',text:'Constitutional AI는 원칙에 비추어 답을 고치고 비교하는 일을 학습 신호로 연결했다. Claude로 이어지는 과정에서는 원칙의 내용과 학습 자료도 변해 왔다. 어떤 기준을 누가 정했는지, 모형이 무엇을 배웠는지, 실제로 어떻게 평가했는지를 함께 읽어야 한다.'},
    technical:{title:'원논문의 학습 경로와 이후 제품의 변화를 나누어 읽기',paragraphs:[
      '이 기록의 2021년은 Anthropic의 초기 조직·연구 계획 공개를 가리킨다. 당시 5월 28일 자금 조달 발표는 다리오를 CEO, 다니엘라를 President로 소개했고, 현행 공식 Leadership은 두 사람을 공동설립자로 명시한다. 2022년 연구, 2023년 Claude 제품과 원칙 공개, 2026년 문서는 별도 시점이다. 기존 GPT-2·GPT-3·Constitutional AI 연구 기록은 각각 그대로 남긴다.',
      '2022년 원논문 Fig.1과 §1.2는 지도학습 단계와 강화학습 단계를 나눈다. §3의 비평·수정 경로는 도움이 되는 답을 하도록 학습된 초기 모형에서 응답을 만들고, 선택한 원칙에 맞추어 문제를 짚고 수정한다. §3.2는 수정 답변과 유용성 자료로 사전학습 모형을 미세조정한 구체적 실험을 설명한다. 말로 답을 고치는 단계와 연결값을 바꾸는 지도학습 단계를 같은 일로 그리지 않는다.',
      '§4.1의 비교 경로에서는 모형이 만든 두 답을 피드백 모형에 보여 주고, 원칙에 더 맞는 답의 비교 표지를 만든다. 그 자료는 선호 모형을 학습하는 데 사용되며, 선호 모형이 제공하는 보상은 답변 정책의 강화학습으로 이어진다. 응답을 만드는 모형, 비교하는 피드백 모형, 선호를 점수화하는 모형의 역할을 구별한다. 원칙 문장 하나가 그 자체로 수치 보상이나 완성된 정책은 아니다.',
      '원논문이 사람의 피드백을 모두 없앤 것은 아니다. §1.2·§4.1은 무해성에는 AI 비교 표지를, 유용성에는 사람의 선호 표지를 사용한 혼합 선호 모형을 명시한다. 사람은 원칙과 일부 시범·자료·평가에도 관여한다. 그림의 두 경로가 자기학습만으로 인간의 판단과 독립된 가치 체계를 확정했다는 뜻은 아니다.',
      '2023년 Claude 원칙 소개는 비평·수정과 비교 때 원칙 하나를 뽑아 사용한다고 설명한다. 모든 원칙을 매번 한꺼번에 적용하는 명시적 논리 추론기로 읽지 않는다. 이 연구는 자연어로 적은 원칙을 신경망 학습의 감독 신호로 활용한 사례다. 앞서 다룬 OWL이나 Resolution의 형식적 증명·논리적 보장과 같은 방법으로 분류하지 않는다.',
      '2023년 3월 14일 제품 소개는 Claude를 채팅과 API에서 제공하는 보조자로 설명했다. 5월 9일 원칙 공개는 당시 Claude의 원칙이 2022년 논문의 목록에서 갱신되었다고 밝혔다. 현행 Claude API 문서의 Messages는 모형과 대화 입력으로 응답을 요청하는 접점이다. 새 요청에 문맥을 넣는 것, 원칙을 이용해 훈련 자료를 만드는 것, 연결값을 실제로 학습하는 것을 구별한다.',
      '새 헌법 소개 페이지의 Published는 2026-01-22다. 2023년 글의 갱신 안내에는 Jan 21, 2026이라고 쓰여 있어 날짜 표기가 하루 다르다. 이 화면의 새 문서 발표 시점은 새 소개 페이지의 Published를 따른다. 새 소개는 헌법을 여러 학습 단계와 합성 자료·대화·응답·순위 만들기에 사용한다고 설명하며, 원칙을 따르길 바라는 의도와 실제 출력이 항상 그 의도에 맞는지는 구별한다.',
      '2026년 5월 Teaching Claude why는 원칙에 맞는 문서, 높은 품질의 대화 자료, 다양한 환경의 학습을 함께 설명한다. 평가와 비슷한 행동만 훈련하는 방식의 일반화 한계를 검토하고, 이유를 설명하는 자료의 역할을 비교한 연구 공개다. 이 자료의 제한된 실험·평가를 모든 실제 사용 상황의 안전성으로 일반화하지 않으며, 자체 그림에 회사의 성공률이나 성능 향상 수치를 만들어 넣지 않는다.',
      '원논문 §7은 자레드 캐플런이 윤타오 바이·아만다 아스켈·사우라브 카다바트와 논의하며 주요 아이디어를 개발했고, 바이가 방법을 발전시키며 대부분의 실험을 수행했다고 밝힌다. RL 인프라 개발의 공동 리드는 샘 맥캔들리시와 다리오다. 2026년 헌법의 기여문은 아스켈을 주 저자로 명시하고 캐플런 등 다른 사람과 Claude 모형의 기여도 나눈다. 다리오 개인에게 모든 아이디어·실험·문서 작성을 돌리지 않는다.',
      'AWS와의 2024년 11월 발표는 당시 Amazon의 소수 지분 투자, 주 클라우드·학습 파트너 관계, Trainium·Neuron의 공동 기술 작업과 Bedrock에서의 Claude 제공을 구분한다. 2025년 10월 Google Cloud 발표는 TPU 확장 계획과 함께 Google TPU·Amazon Trainium·NVIDIA GPU의 세 플랫폼 활용을 명시했다. 여기서 NVIDIA·젠슨 황 카드는 GPU 계산 기반을 더 읽는 연결이며, 이 자료만으로 개인 간 공동 논문이나 직접 모델 발명을 주장하지 않는다.',
      '2026년 4월 Amazon 협력 발표는 기존 학습·서비스 이용과 앞으로 확보할 용량·투자·제품 계획을 함께 담고 있다. 계약·계획을 모두 완료된 시설로 바꾸어 표시하지 않는다. 계산 장비와 유통 경로가 많아지는 것 역시 원칙 학습의 효과를 독립적으로 증명하지 않는다. 아래 관계도는 공식 발표의 역할 연결이며 실제 장비 배치·비공개 학습 절차·특정 사용자 응답의 실행 위치를 재현한 도면이 아니다.'
    ]}
  },keyIdeas:[
    {title:'정답을 모두 매기는 대신, 판단의 원칙을 드러낸다',text:'어떤 답을 더 바람직하다고 볼지 자연어 원칙으로 적는다. 무엇이 옳은지를 AI가 스스로 확정한 것이 아니라, 사람이 선택한 기준을 더 명시적으로 다루려는 발상이다.'},
    {title:'비평과 수정을, 새로운 질문에 답할 학습으로 잇는다',text:'원칙으로 문제를 짚고 답을 고친 뒤 그 자료로 연결값을 학습한다. 답변의 두 후보를 비교하는 AI 피드백은 선호 모형과 강화학습의 신호로도 이어진다.'},
    {title:'행동의 목록에서, 이유와 맥락을 배우는 방향으로',text:'2026년 문서는 원칙을 원하는 이유와 어려운 선택의 맥락을 더 설명한다. 새로운 상황에도 기준을 적용하게 하려는 방향이며, 실제 일반화는 별도 평가가 필요하다.'},
    {title:'연구·문서·제품·계산 기반의 기여를 연결한다',text:'다리오의 연구·조직 역할, 공동연구자의 방법과 실험, 원칙 문서의 작성, 클라우드와 칩 기반의 역할을 나누어 읽는다. 회사의 규모와 모형의 바람직한 행동을 같은 지표로 합치지 않는다.'}
  ],videos:[],references:[
    {title:'Bai 외 · Constitutional AI (2022) 첫 원고',url:paper,location:'arXiv:2212.08073v1 · 2022-12-15. PDF p.2 Fig.1; §1.2·§3.1–3.2·§4.1·§7. 두 학습 경로, 사람 유용성/AI 무해성 피드백과 역할별 기여.'},
    {title:'Anthropic · Constitutional AI 공식 연구 소개',url:research,location:'2022-12-15 · Abstract. 비평·수정 지도학습과 AI 비교·선호 모형·강화학습의 연구 질문과 경로.'},
    {title:'Anthropic · 2021년 초기 조직과 연구 계획',url:founding,location:'2021-05-28 · 도입부. Dario CEO·Daniela President와 해석·조종 가능한 대형 AI 연구에 관한 당시 발표.'},
    {title:'Anthropic · Introducing Claude',url:launch,location:'2023-03-14 · 도입부. 채팅·API 접근과 대화·텍스트 작업을 위한 제품 공개. 사용 후기·회사 성능 주장은 독립 검증과 구분.'},
    {title:'Anthropic · Claude’s constitution (2023)',url:constitution2023,location:'2023-05-09 · What is Constitutional AI? / What’s in the Constitution? / Are these principles prioritized? 원논문과 제품 원칙의 차이, 학습 때 원칙 사용. 2026 갱신 안내도 확인.'},
    {title:'Anthropic · Claude’s new constitution',url:constitution2026,location:'Published 2026-01-22 · What is Claude’s Constitution? / Our new approach. 원칙의 이유·맥락과 여러 학습 단계·합성 자료로의 연결.'},
    {title:'Anthropic · Claude’s Constitution 전문',url:constitution,location:'2026년 공개 문서 · 도입부와 Acknowledgements. 원칙 문서의 역할과 Amanda Askell·Joe Carlsmith·Chris Olah·Jared Kaplan 등의 기여를 확인. 전문 전체의 모든 규범 주장을 검토한 것은 아니다. 조회 2026-11-11.'},
    {title:'Anthropic · Teaching Claude why',url:teaching,location:'2026-05-08 · 도입·Why does agentic misalignment happen?·Improving the quality…·Generalization and persistence through RL. 시범·이유·자료와 환경의 다양성, 평가 밖 일반화의 경계를 다룬 연구 공개.'},
    {title:'Anthropic · Leadership',url:leadership,location:'CEO and President / Co-Founders. Dario·Daniela 공동설립과 연구·경영의 역할, Jared Kaplan 등의 역할. 현행 소개 조회 2026-11-11.'},
    {title:'Anthropic · AWS와 Trainium 협력',url:aws,location:'2024-11-22 · 도입·Collaboration on AWS Trainium hardware and software·Claude as core infrastructure. 당시 투자·기술 협력·Bedrock 제공의 역할을 구분.'},
    {title:'Anthropic · Google Cloud TPU 활용 확대',url:google,location:'2025-10-23 · 도입과 세 칩 플랫폼 문단. 확장 계획과 Google TPU·Amazon Trainium·NVIDIA GPU 활용, 당시 AWS 관계를 분리.'},
    {title:'Anthropic · Amazon과 계산 기반 협력 확대',url:amazon2026,location:'2026-04-20 · Infrastructure at scale / Claude Platform on AWS / Continued investment. 당시 이용 현황과 앞으로의 용량·투자·제품 계획을 구분.'},
    {title:'Claude Platform Docs · API overview',url:api,location:'도입·Available APIs·Claude API versus cloud platforms. Messages의 대화 응답 접점과 클라우드 제공 경로. 현행 문서 조회 2026-11-11; 2023년의 API 전체 사양으로 소급하지 않는다.'}
  ]};
  const work={id:'amodei-anthropic-2021',year:2021,dateLabel:'2021년 Anthropic 조직에서 출발 · 2022 CAI · 2023 Claude · 2026 원칙과 학습',title:'Anthropic·Claude: 원칙을 배우는 AI에서 제품과 기반으로',summary:'어떤 답이 바람직한지 말로 적은 원칙을 비평·수정과 비교 자료로 바꾸어 학습하려는 발상을 읽는다. Constitutional AI에서 Claude 제품과 2026년 원칙 문서로 이어지는 변화, 연구자·조직·클라우드의 기여를 함께 연결한다.',type:'기업·제품·학습 방법·공식 자료',track:'industry',people:['Dario Amodei','Daniela Amodei','Anthropic 연구·개발팀'],authorNote:'2021년 조직·경영과 이후 팀의 제품·연구를 함께 읽는 기업 기록이다. 이 표시는 논문 전체 저자 명단이나 개인의 단독 발명을 뜻하지 않는다.',sources:[{title:'Anthropic · 2021년 조직과 연구 계획',url:founding},{title:'Constitutional AI · 첫 원고',url:paper},{title:'Introducing Claude · 2023',url:launch},{title:'Claude’s new constitution · 2026',url:constitution2026}],caveat:'2021년은 회사 기록의 기준 연도이며 후속 연구·제품·문서의 시점은 따로 표시한다. 원칙 문서의 의도와 실제 행동, 회사 발표와 독립 평가를 구분한다. 시각화의 짧은 문장은 직접 작성한 사례이며 실제 Claude 생성·학습 결과가 아니다.',content};
  person.tagline='Constitutional AI의 원칙 학습에서 Anthropic·Claude 제품과 기반으로';
  person.intro='GPT-2·GPT-3·Constitutional AI의 기존 연구와 Anthropic·Claude의 조직·제품 기록을 함께 읽는다. 사람이 선택한 원칙이 비평·수정·AI 피드백과 학습 자료로 이어지는 발상, 이후 원칙 문서의 변화와 계산·서비스 기반을 연결한다. 다리오의 연구·경영과 공동연구자·문서 작성자·개발팀의 기여를 나누어 살펴본다.';
  if(!person.tags.includes('industry'))person.tags.push('industry');
  person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
  window.ATLAS_AMODEI_REVISION={personId:person.id,workId:work.id,visualId:'constitution-claude-platform',sourceVersion:'0.47'};
})();
