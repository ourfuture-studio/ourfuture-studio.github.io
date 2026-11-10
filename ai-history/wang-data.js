/* Refine Wang's existing Scale record; retain its identity and the 2025 Meta record. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='alexandr-wang');
  const work=person?.works.find(w=>w.id==='wang-scale-2016');
  if(!work)throw new Error('The existing Alexandr Wang / Scale record is required.');
  const about='https://scale.com/about';
  const history='https://scale.com/blog/ten-years-of-scale';
  const engine='https://scale.com/data-engine';
  const generative='https://scale.com/generative-ai-data-engine';
  const guide='https://scale.com/guides/data-labeling-annotation-guide';
  const quality='https://scale.com/blog/data-quality';
  const feedback='https://scale.com/blog/chatgpt-reinforcement-learning';
  const seal='https://scale.com/blog/leaderboard';
  const evaluation='https://scale.com/evaluation/model-developers';
  const labs='https://scale.com/blog/scale-labs';
  const meta='https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution';
  const trust='https://scale.com/blog/customer-trust-scale-meta-deal';
  const priorSources=work.sources.map(s=>({...s}));
  const content={article:{
    question:'AI가 무엇을 잘해야 하는지,\n사람의 판단을 어떻게 학습 자료로 만들까?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'Scale의 데이터·피드백·평가 자료와 기업 발표',
    opening:[
      '배송 예정일이 없는 주문 기록을 보고 “언제 도착하나요?”라는 질문에 답한다고 해 보자. “내일 도착합니다”는 자연스러운 문장이지만 기록에 없는 날짜를 만든 답이다. “제공된 기록에는 배송 예정일이 없어 확인이 필요합니다”를 더 나은 답으로 삼으려면, 사람이 무엇을 근거로 판단했는지 학습 자료에 남겨야 한다. 이 문의와 두 답변은 아래 시각화를 위해 직접 구성한 예시다.',
      'Scale이 Data Engine으로 설명하는 발상은 모델이 배우는 재료를 만드는 일을 하나의 반복 과정으로 다루는 것이다. 데이터를 모으고, 필요한 사례를 고르고, 주석을 붙이며, 학습과 평가에서 드러난 빈틈을 다시 자료 구축으로 연결한다. 어떤 모델 구조를 택할 것인가와 함께, 무엇을 배우게 하고 어떤 조건에서 잘한다고 판단할 것인가를 설계하는 기반이다.',
      '여기서 주석은 정답표에 기호 하나를 붙이는 일에만 머물지 않는다. 과제의 뜻과 판단 기준을 먼저 정해야 같은 자료를 일관되게 읽을 수 있다. 예시의 기준은 “제공된 기록에 없는 배송 정보를 확정하지 않는다”다. 이 기준을 적어 두면 답변이 짧은지 긴지가 아니라, 주어진 정보에 근거했는지를 보고 두 답을 비교할 수 있다.',
      '생성형 AI에서는 사람의 판단을 여러 형태로 남긴다. 사람이 질문에 적절한 답을 직접 쓰면 시범 자료가 되고, 같은 질문에 대한 여러 답을 비교하면 선호 자료가 된다. Scale의 Generative AI Data Engine은 이런 데이터 생성·선호 비교와 전문 인력·품질 관리를 연결하는 제품으로 소개된다. 어떤 답을 보여 주는가와 어떤 답을 더 낫다고 고르는가는 서로 다른 학습 신호다.',
      '자료를 많이 모았다고 필요한 판단이 모두 담기는 것도 아니다. 개별 답변은 지침을 따르는지 검토하고, 전체 자료에서는 질문의 종류와 어려운 사례가 빠지지 않았는지 살펴야 한다. 사람의 전문성과 과제 적합성도 별도의 문제다. Scale은 2026년 품질 설명에서 작업·데이터셋·기여자라는 세 수준을 나누어 이런 검토를 설명한다.',
      '모델이 그 자료를 보고 배운 뒤에는 다른 문의에서도 기준을 지키는지 확인해야 한다. 아래 그림에서는 시범과 선호를 만드는 장면, 학습과 개발 평가를 나누는 장면, 결과를 읽어 다음 자료를 계획하는 장면을 이어 본다. 알렉산더 왕의 Scale 설립과 후속 Meta 합류도 날짜와 역할을 나누어 살펴보며, 자료를 만드는 여러 작업자와 연구·개발 조직의 기여를 함께 읽는다.'
    ],
    visual:{id:'scale-data-feedback',navLabel:'데이터·사람·평가',title:'무엇을 배울지 정하고, 사람의 판단을 자료로 남기다',caption:'과제와 사람의 판단, 학습과 별도 개발 평가, 기업과 조직의 세 보기를 따라가 보세요. 같은 고객문의 사례에서 지침·시범·선호·검수·평가의 역할을 비교합니다. 문의·답변·자료 구분은 직접 구성한 설명이며 실제 Scale 고객 자료나 모델 실행 결과가 아닙니다.'},
    takeaway:{title:'모델이 배울 기준과, 배운 것을 확인할 기준도 만든다',text:'사람의 시범·선호·검토가 구체적인 자료가 되어야 모델 개발에 쓰일 수 있다. 과제 정의와 데이터 품질, 학습에서 분리한 평가를 함께 보면 AI의 능력이 모델 구조뿐 아니라 어떤 경험과 판단을 제공했는지에 달려 있음을 살펴볼 수 있다.'},
    technical:{title:'사람의 판단, 학습 자료, 평가의 위치를 구분해 읽기',paragraphs:[
      '2016년은 기존 카드의 Scale 설립 기준 연도다. About 페이지와 2026-05-14 회사 회고, 2025-06-12의 설립자 표기를 함께 확인했다. 아래 제품·품질·연구 자료에는 각각의 발표 시점 또는 조회일을 붙인다. 지금의 Data Engine·생성형 AI·평가 제품 전체가 2016년부터 같은 형태로 존재했다고 옮기지 않는다.',
      '과제 지침은 어떤 대상과 증거를 보고 어떤 판단을 남길지 정한다. Scale의 주석 가이드는 명확한 지침, 기준 작업, 작은 보정 묶음, 불일치·공통 오류 검토와 지침 갱신을 설명한다. 여러 사람이 같은 답을 골랐다는 사실만으로 그 답이 참이라고 보장되지는 않는다. 기준이 모호하거나 필요한 정보가 빠졌다면 지침과 자료 자체도 검토해야 한다.',
      '시범 자료는 입력에 대해 원하는 답을 직접 작성한 쌍이고, 선호 자료는 같은 입력의 후보 답들 사이에서 어떤 것을 더 낫다고 평가했는지를 기록한 자료다. 예시의 B 우선은 “제공된 기록에 없는 배송 정보를 만들지 않는다”는 명시적 기준에 따른 판단이다. 모든 질문에서 답을 유보하는 것이 최선이라는 규칙이나 사람 전체의 보편적 선호를 뜻하지 않는다.',
      'Scale의 2023-01-25 RLHF 해설은 사람 시범을 이용한 지도 미세조정, 답변 비교 자료를 이용한 보상모델 학습, 보상 신호를 이용한 정책의 강화학습을 나누어 설명한다. 그림은 자료가 이런 학습에 쓰이는 위치를 보여 준다. 비교 한 번으로 언어모델이 즉시 바뀌거나, 선호 데이터가 곧바로 모델 내부의 진실 판정기가 되는 것으로 표시하지 않는다. RLHF 자체를 왕이나 Scale이 단독 발명했다고 귀속하지 않는다.',
      '2026-06-29 품질 설명은 작업 수준의 주석 검토, 데이터셋 수준의 구성·분포 평가, 기여자 수준의 전문성·과제 적합성 검토를 구분한다. 회사는 자동화와 사람 검토를 결합한 구조를 소개한다. 이 카드에서는 세 수준의 역할을 다루며 회사가 제시한 수락률·성능 향상 수치를 독립적으로 재현한 결과처럼 사용하지 않는다.',
      '한 답변이 지침에 맞는 것과 전체 자료가 필요한 상황을 포괄하는 것은 다른 문제다. 표현·언어·난이도·정보가 있는 경우와 없는 경우가 한쪽으로 치우치면, 모델이 제한된 패턴에만 맞추도록 유도할 수 있다. 주석 가이드와 품질 문서의 사례 선택·중복·다양성·검토를 이런 관점에서 읽는다. 데이터 품질을 높인다는 설명만으로 모든 배포 환경의 정확도와 안전을 보장하지 않는다.',
      '직접 구성한 사례에서는 학습용 문의와 별도의 개발·진단용 보류 문의를 구분한다. 개발 평가에서 읽은 오류 유형으로 새 학습 사례를 계획하되, 그 평가 문항 자체를 학습 묶음으로 옮기지 않는다. 이 개발 평가에 반복해서 맞춰 방법을 바꾼다면 최종 독립 성능을 확인할 시험은 따로 남겨야 한다. 이는 이 사례의 설계 원칙이며 Scale의 모든 실제 작업에서 같은 분할이 보장된다고 단정하지 않는다.',
      '2024-05-29 SEAL 발표는 비공개 평가 문항, 분야 전문가, 여러 단계의 검수와 방법 설명을 평가의 근거로 제시한다. 비공개로 유지한다는 회사의 방침은 오염을 줄이려는 설계이지 모든 유출·과적합을 불가능하게 만드는 증명은 아니다. 이 카드에서 실제 순위나 성공률을 재현하지 않으며, 공개하지 않은 문항 전체의 품질을 독립적으로 검증했다고 표시하지 않는다.',
      '2026-03-09 Scale Labs 발표는 2023년에 출범한 SEAL의 작업을 모델 능력·에이전트·멀티모달·후속 학습·평가·운영 연구로 확장한다고 설명한다. 자료 구축과 평가 연구는 연결되지만 같은 활동은 아니다. 설립자 경력, 제품을 만든 팀, 데이터를 작성·검토한 사람, 평가 방법을 연구한 조직의 역할을 나누어 읽는다.',
      '2025-06-12 발표는 Meta의 투자와 상업 관계 확대, 왕의 Meta 합류와 Scale 이사회 참여, 당시 임시 CEO 선임을 각각 기록한다. 2025-06-18 후속 글은 Scale의 독립 운영과 고객 기밀에 대한 접근 경계를 설명한다. 이를 회사 전체의 인수·업무 통합이나 모든 고객 데이터의 Meta 공유로 바꾸지 않는다. 발표 당시의 직함을 현재 직함으로 추정하지 않으며 Palantir·Anduril 비교 읽기를 실제 계약·투자 관계로 만들지 않는다.'
    ]}
  },keyIdeas:[
    {title:'무엇을 배울지는 모델 밖의 과제 정의에서도 정해진다',text:'입력만 모으는 대신 어떤 증거로 어떤 출력을 원할지 정한다. 배송일이 없는 기록에 날짜를 만들지 않는다는 기준처럼, 원하는 판단을 구체화해야 자료를 작성하고 검토할 수 있다.'},
    {title:'사람의 판단을 시범·선호·채점 기준이라는 다른 자료로 남긴다',text:'직접 쓴 답은 시범이고 후보 답의 비교는 선호다. 같은 사람이 판단해도 남기는 자료의 형식과 학습에 쓰이는 위치는 다르다. 어떤 기준으로 판단했는지도 함께 있어야 해석과 검토가 가능하다.'},
    {title:'한 답의 품질과 전체 자료의 빈틈을 함께 본다',text:'개별 주석의 지침 준수, 전체 질문의 다양성과 난이도, 기여자의 과제 적합성은 다른 수준의 품질 문제다. 같은 유형의 쉬운 답을 반복해서 모으는 것으로는 빠진 상황을 채울 수 없다.'},
    {title:'평가는 학습에서 떨어진 위치에서 실패를 드러내야 한다',text:'개발 평가로 오류를 진단했다면 그 문항을 정답과 함께 재사용하기보다 어떤 상황이 빠졌는지 읽어 새 자료를 계획한다. 반복한 개발 평가와 최종 독립 시험을 구분해야 무엇이 확인됐는지 설명할 수 있다.'}
  ],videos:[],references:[
    {title:'Scale · Data Engine',url:engine,location:'Data Engine 도입부, Generation·RLHF·Evaluation. 수집·선별·주석·학습·평가의 반복과 생성형 자료의 역할. 현행 제품 설명, 조회 2026-11-10.'},
    {title:'Scale · Generative AI Data Engine',url:generative,location:'Product overview · Ops Center for Quality Control · Experts, Linguists, and Coders · Human Feedback and Preference Ranking. 전문가·자동화·품질 관리와 시범·선호 자료의 제품 설명. 조회 2026-11-10.'},
    {title:'Scale · Data Labeling: The Authoritative Guide',url:guide,location:'2026-09-28 표시본 · What is Data Labeling? · High-Quality Data Annotations · Best Practices for Achieving High-Quality Labels. 지침·기준 작업·검토·보정 묶음·불일치와 지침 갱신을 확인했다.'},
    {title:'Scale · How We Engineer World-Class Data at Scale',url:quality,location:'Applied Research Team, 2026-06-29 · Task-Level Quality · Dataset-Level Quality · Contributor-Level Quality. 세 수준의 품질 검토 구조를 사용하며 성능·수락률 수치는 전재하지 않았다.'},
    {title:'Scale · Why is ChatGPT so good?',url:feedback,location:'Clemens Viernickel, 2023-01-25 · How to implement RLHF, Steps 1–3. 사람 시범·비교 자료·보상모델·강화학습의 구분. 당시 해설의 자료 역할만 사용하며 현재 제품 기능·일반적 효과 보장으로 확대하지 않는다.'},
    {title:'Scale · SEAL expert-evaluated leaderboards 발표',url:seal,location:'2024-05-29 · 평가의 오염·보고·전문가 문제, Leaderboard Integrity·Domain Specialization·Data Quality·Methods Transparency 및 각주. 회사가 설명한 평가 설계의 근거다.'},
    {title:'Scale · Evaluation for Model Developers',url:evaluation,location:'Evaluation Challenges · Reliable and Robust Performance Management · Targeted Evaluations. 모델의 여러 성능·오류 영역을 분석하고 새 학습 자료에 연결하는 제품 설명. 조회 2026-11-10.'},
    {title:'Scale · Introducing Scale Labs',url:labs,location:'Bing Liu, 2026-03-09 · 도입부와 What We Study. SEAL의 2023년 출범과 후속 연구 범위의 확장을 구분했다.'},
    {title:'Scale · About',url:about,location:'Scale at a glance · Founded 2016 및 What we do. 회사 설립 기준 연도와 데이터·평가·응용 사업의 현행 소개. 조회 2026-11-10.'},
    {title:'Scale · Ten Years of Scale',url:history,location:'Jason Droege, 2026-05-14 · 초기 데이터 구축과 후속 사람 피드백·평가 작업에 관한 회사 회고. 회고의 범위와 개별 제품의 발표 시점은 구분한다.'},
    {title:'Scale · 2025년 Meta 투자·조직 변경 발표',url:meta,location:'2025-06-12 · Meta의 투자·상업 관계 확대, Alexandr Wang의 Meta 합류·Scale 이사회 참여, 당시 Jason Droege 임시 CEO 선임 문단.'},
    {title:'Scale · Meta 투자 이후 고객·기여자 안내',url:trust,location:'Lauren Lennon·Alex Levinson, 2025-06-18 · Scale의 독립 운영, Meta와의 업무 비통합, 고객 기밀 접근 경계, 이사회와 일상 경영의 역할 구분. 회사가 공개한 방침의 근거다.'}
  ]};
  person.tagline='사람의 판단을 AI의 학습·평가 자료로 만드는 기반';
  person.intro='Scale 설립에서 출발해 과제 지침·사람 시범·선호·품질 검토·별도 평가가 모델 개발의 어떤 자리를 맡는지 살펴본다. 후속 Meta 합류는 발표 당시의 투자·조직 변경과 나누어 읽으며, 자료를 만든 여러 작업자·전문가와 개발·연구 조직의 역할을 함께 본다.';
  Object.assign(work,{title:'Scale AI: 사람의 판단을 학습·평가 데이터로',dateLabel:'2016년 Scale 설립에서 출발 · 후속 Data Engine·사람 피드백·평가 자료',type:'기업·데이터 기반·공식 기술자료',summary:'어떤 답을 원하고 무엇을 잘한다고 판단할지 정한 뒤, 사람의 시범·선호와 품질 검토를 학습 자료로 만들고 별도 평가에서 빈틈을 살피려는 Scale의 발상을 읽는다. Meta와의 관계는 2025년 발표의 투자·이동·운영 경계로 구분한다.',caveat:'2016년은 설립 기록의 기준 연도다. 후속 제품·연구 자료의 시점과 회사 설명을 나누며, 고객문의 예시는 실제 모델 학습·평가 결과가 아니다.',content,sources:[...priorSources,{title:'Scale · Data Engine 공식 설명',url:engine},{title:'Scale · 생성형 AI Data Engine',url:generative},{title:'Scale · SEAL 평가 발표',url:seal},{title:'Scale · Meta 투자 이후 운영 경계',url:trust}]});
  window.ATLAS_WANG_REVISION={personId:person.id,workId:work.id,visualId:'scale-data-feedback',sourceVersion:'0.44'};
})();
