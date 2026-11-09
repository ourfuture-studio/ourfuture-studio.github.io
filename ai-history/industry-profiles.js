/* Selected company, product and infrastructure records, checked 2026-11-06.
 * These are not a bibliography of AI inventions or a list of current offices.
 * Company announcements establish announced events and roles; they do not
 * independently establish product performance, public benefit or field results.
 */
window.ATLAS_INDUSTRY_PROFILES = [
  {
    id: 'jensen-huang', name: 'Jensen Huang', nameKo: '젠슨 황 · 黃仁勳',
    tagline: '그래픽스 기업에서 GPU 계산 플랫폼으로',
    roles: ['계산 인프라', '기업·제품'], tags: ['foundations'],
    intro: 'NVIDIA 공동설립과 GPU 계산 플랫폼의 산업적 전개를 읽는 인물이다. 회사의 개발팀·연구자·사용자 생태계의 기여를 개인의 알고리즘 발명과 구분한다. 대표 기업·플랫폼 기록을 선정했다.',
    works: [
      {
        id: 'huang-nvidia-1993', year: 1993, dateLabel: '1993 · NVIDIA 공동설립',
        title: '3D 그래픽스를 위한 NVIDIA 설립',
        summary: 'Jensen Huang, Chris Malachowsky, Curtis Priem이 NVIDIA를 공동설립했다. 출발점은 게임과 멀티미디어용 3D 그래픽스였으며, 이후의 AI 계산 기반과는 연도를 나누어 읽는다.',
        type: '기업 설립', track: 'foundations',
        people: ['Jensen Huang', 'Chris Malachowsky', 'Curtis Priem'],
        sources: [{ title: 'NVIDIA 공식 연혁 · 1993', url: 'https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/' }],
        caveat: '회사 설립은 신경망이나 GPU 계산 알고리즘의 단독 발명을 뜻하지 않는다.',
        content: {
          keyIdeas: [
            { title: '공동설립', text: '공식 연혁은 세 공동설립자를 함께 기록한다. 설립자의 경영 역할과 제품을 설계한 팀의 기술적 역할을 나누어 본다.' },
            { title: '분야의 이동', text: '1993년의 그래픽스 시장과 이후의 범용 GPU 계산·AI 시장을 한 시점의 목표로 합치지 않는다.' }
          ],
          example: { title: '교육 예제 · 한 프로젝트의 여러 역할', text: '가상의 이미지 분류 프로젝트에서 모델 논문, 이미지 데이터, GPU, 학습 소프트웨어를 서로 다른 카드로 놓아 본다. GPU 공급사의 역할이 모델의 발명과 같지 않음을 확인하는 예제다.' },
          story: { title: '회사가 기록한 출발점', text: 'NVIDIA의 공식 연혁은 공동설립 당시의 방향을 게임과 멀티미디어를 위한 3D 그래픽스로 설명한다. 이는 회사의 회고 기록이며 개인적 동기를 추정한 일화가 아니다.', kind: '공식 회고', source: { title: 'NVIDIA History · 1993', url: 'https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/' } },
          videos: [],
          references: [{ title: 'NVIDIA History', url: 'https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/', location: '1993 · 3D Graphics' }]
        }
      },
      {
        id: 'huang-cuda-2006', year: 2006, dateLabel: '2006 · CUDA 공개',
        title: 'GPU를 그래픽스 밖의 계산에 연결하다',
        summary: 'NVIDIA는 CUDA를 공개해 그래픽스 API와 별개로 GPU의 병렬 계산을 활용하는 기반을 제시했다. 이 항목은 Huang이 이끈 회사의 플랫폼 기록이며 CUDA 개발을 개인 한 명에게 귀속하지 않는다.',
        type: '플랫폼 발표', track: 'foundations',
        people: ['NVIDIA CUDA 개발팀'],
        sources: [
          { title: 'NVIDIA 공식 연혁 · 2006 CUDA', url: 'https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/' },
          { title: 'CUDA Programming Guide · Introduction', url: 'https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html' }
        ],
        caveat: '2006은 CUDA 공개 기록이다. 모든 작업이 GPU에서 빨라지는 것은 아니며 여기서는 성능을 직접 측정하지 않았다.',
        content: {
          keyIdeas: [
            { title: '계산 플랫폼', text: 'CUDA는 GPU를 일반 계산에 사용하는 프로그래밍 기반이다. 특정 신경망 모델과 하드웨어를 구동하는 플랫폼은 서로 다른 층이다.' },
            { title: '병렬로 나눌 수 있는 일', text: '많은 데이터에 같은 종류의 계산을 적용할 때 GPU의 처리 방식을 활용할 수 있다. 실제 이득에는 메모리 접근과 데이터 이동도 영향을 준다.' }
          ],
          theory: { text: '벡터 덧셈처럼 각 위치의 결과를 독립적으로 구할 수 있는 계산은 병렬 처리의 작은 예가 된다. 이것은 GPU의 모든 동작을 설명하는 모형이나 성능 보장은 아니다.', formula: 'Cᵢ = Aᵢ + Bᵢ' },
          example: { title: '교육 예제 · 배열의 여러 위치를 계산하기', text: '두 배열의 같은 위치끼리 더하는 일을 종이에 나누어 본다. 실제 CUDA 프로그램이나 벤치마크를 실행한 결과는 아니다.', steps: ['각 위치의 덧셈이 다른 위치에 의존하는지 확인한다.', '계산을 여러 묶음으로 나눈다.', '실제 성능을 비교할 때는 데이터 전송과 계산 시간을 따로 측정한다.'] },
          videos: [],
          references: [{ title: 'CUDA Programming Guide', url: 'https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html', location: '1.1.1 The Graphics Processing Unit · 1.1.2 The Benefits of Using GPUs' }]
        }
      },
      {
        id: 'huang-gtc-2025', year: 2025, dateLabel: '2025 · GTC 기조연설',
        title: '칩과 데이터센터를 함께 설명하는 산업 발표',
        summary: 'GTC 2025에서 Huang은 GPU, 연결망, 저장장치 등 AI 계산 기반에 관한 NVIDIA의 제품과 계획을 설명했다. 이는 기업의 기술·사업 발표이며 전망을 실현된 성과와 구분해 읽는다.',
        type: '조직·제품 기록', track: 'foundations',
        people: ['Jensen Huang', 'NVIDIA 개발·제품팀'],
        sources: [{ title: 'NVIDIA GTC 2025 공식 정리·기조연설 다시보기', url: 'https://blogs.nvidia.com/blog/nvidia-keynote-at-gtc-2025-ai-news-live-updates/' }],
        caveat: '제품 발표의 처리량·시장 전망은 그 조건과 회사의 주장에 해당한다. 여기서는 수치를 재인용하거나 독립 검증 결과로 취급하지 않는다.',
        content: {
          keyIdeas: [
            { title: '칩 밖의 기반', text: '큰 모델을 운영하려면 계산 장치뿐 아니라 장치 사이의 연결과 데이터 공급도 필요하다. 발표는 이런 구성요소를 함께 다룬다.' },
            { title: '발표와 검증', text: '현재 공급되는 제품, 출시 계획, 미래 전망을 구분하고 실제 비교에는 입력·전력·처리량 등의 조건을 확인한다.' }
          ],
          example: { title: '교육 예제 · 계산 기반의 병목 찾기', text: '가상의 학습 작업에서 계산·파일 읽기·장치 간 이동 시간을 따로 적어 본다. 가장 느린 구간을 확인하기 전에는 GPU 교체만으로 전체 시간이 얼마나 줄지 단정할 수 없다.' },
          videos: [{ title: 'GTC March 2025 Keynote with NVIDIA CEO Jensen Huang', url: 'https://www.youtube.com/watch?v=_waPvOwL9Z8', channel: 'NVIDIA', note: 'NVIDIA 공식 블로그가 연결한 기조연설. 기업의 제품 발표·전망과 검증된 실험 결과를 구분해 시청한다.', sourceUrl: 'https://blogs.nvidia.com/blog/nvidia-keynote-at-gtc-2025-ai-news-live-updates/' }],
          references: [{ title: 'GTC 2025 – Announcements and Live Updates', url: 'https://blogs.nvidia.com/blog/nvidia-keynote-at-gtc-2025-ai-news-live-updates/', location: 'Wrap-Up: Key Points From the GTC Keynote · Watch the replay' }]
        }
      }
    ]
  },
  {
    id: 'elon-musk', name: 'Elon Musk', nameKo: '일론 머스크',
    tagline: 'AI 조직의 설립·지원과 제품 사업의 변화',
    roles: ['기업·제품', '계산 인프라'], tags: ['foundations'],
    intro: 'OpenAI 설립 공개 당시 공동의장·후원자로 참여한 이력과 이후 AI 사업의 조직·제품 기록을 읽는다. 연구팀의 모델 개발과 기업가의 자금·조직 역할을 구분하며, 당시 직함을 현재 직함으로 옮기지 않는다.',
    works: [
      {
        id: 'musk-openai-2015', year: 2015, dateLabel: '2015 · OpenAI 설립 공개',
        title: 'OpenAI의 설립 공개와 공동의장 역할',
        summary: '2015년 공개 글은 Sam Altman과 Elon Musk를 공동의장으로, Ilya Sutskever를 연구 책임자로, Greg Brockman을 CTO로 구분했다. 조직·후원 역할과 연구 개발 책임을 함께 확인할 수 있는 기록이다.',
        type: '기업 설립', track: 'foundations',
        people: ['Sam Altman', 'Elon Musk', 'Ilya Sutskever', 'Greg Brockman', 'OpenAI 초기 연구팀'],
        sources: [
          { title: 'Introducing OpenAI · 2015-12-11', url: 'https://openai.com/index/introducing-openai/' },
          { title: 'OpenAI Supporters · 2018년 이사회 퇴임 공지', url: 'https://openai.com/index/openai-supporters/' }
        ],
        caveat: '설립 당시 역할을 보여 주는 기록이다. OpenAI는 2018년 Musk의 이사회 퇴임을 공지했으며, 이 항목으로 현재 운영 역할을 추정하지 않는다.',
        content: {
          keyIdeas: [
            { title: '연구 조직의 여러 역할', text: '공동의장·후원자·연구 책임자·연구원은 같은 역할이 아니다. 설립 공개 글은 이들을 나누어 소개한다.' },
            { title: '역할에도 날짜가 있다', text: '2015년의 직함과 2018년의 이사회 변경을 함께 읽으면 오래된 소개를 현재 상태로 오해하는 일을 줄일 수 있다.' }
          ],
          example: { title: '교육 예제 · 기여를 여러 줄로 기록하기', text: '한 AI 프로젝트에서 조직 운영, 자금·계산 지원, 모델 설계, 실험 수행을 별도 줄에 적어 본다. 설립 참여만으로 이후 모든 모델의 발명자가 되는 것은 아니다.' },
          videos: [],
          references: [
            { title: 'Introducing OpenAI', url: 'https://openai.com/index/introducing-openai/', location: 'OpenAI 절 · 초기 연구팀과 공동의장·후원자 소개' },
            { title: 'OpenAI Supporters', url: 'https://openai.com/index/openai-supporters/', location: '2018-02-20 · Musk의 이사회 퇴임 문단' }
          ]
        }
      },
      {
        id: 'musk-grok-2023', year: 2023, dateLabel: '2023 · Grok 초기 베타 공개',
        title: 'xAI 연구팀의 Grok 제품 공개',
        summary: 'xAI 팀은 2023년 Grok과 기반 모델 Grok-1을 소개하며 초기 베타 상태임을 밝혔다. 제품이 제공하는 기능, 기반 모델, 회사의 평가 주장을 나누어 살펴볼 기록이다.',
        type: '조직·제품 기록', track: 'foundations',
        people: ['xAI 연구·개발팀'],
        sources: [
          { title: 'Announcing Grok · 2023-11-03', url: 'https://x.ai/news/grok' },
          { title: '회사 공식 연혁 · 2023', url: 'https://x.ai/company' }
        ],
        caveat: 'Grok은 팀이 개발한 제품·모델이다. Musk의 개인 연구 논문으로 분류하지 않으며 회사가 제시한 비교 점수를 독립 검증으로 읽지 않는다.',
        content: {
          keyIdeas: [
            { title: '제품과 모델', text: '서비스 이름과 그 안에서 사용하는 모델 이름을 구분한다. 초기 공개 글은 Grok 서비스와 Grok-1 모델의 개발 과정을 함께 설명한다.' },
            { title: '초기 베타', text: '출시 사실이 정확성이나 신뢰성의 보편적 보장은 아니다. 공개 당시의 상태와 평가 조건을 함께 읽는다.' }
          ],
          example: { title: '교육 예제 · 서비스의 답을 확인하기', text: '가상의 질의응답 서비스가 최신 사실을 답했다고 가정하고, 답의 원문 출처·자료 시각·모델 버전을 각각 확인해 본다. 특정 Grok 응답을 실험한 결과는 아니다.' },
          videos: [],
          references: [
            { title: 'Announcing Grok', url: 'https://x.ai/news/grok', location: '초기 베타 설명 · The journey to Grok-1 · 평가 설정' },
            { title: '회사 공식 연혁', url: 'https://x.ai/company', location: '2023 · Company announcement와 Announcing Grok' }
          ]
        }
      },
      {
        id: 'musk-xai-spacex-2026', year: 2026, dateLabel: '2026 · 기업 인수 발표',
        title: 'xAI의 SpaceX 편입 발표',
        summary: '2026년 2월 공식 공지는 SpaceX가 xAI를 인수했다고 밝혔다. AI 산업의 회사 경계와 조직 관계도 시간이 지나며 달라진다는 것을 보여 주는 기업 기록이다.',
        type: '조직·제품 기록', track: 'foundations',
        people: ['SpaceX', 'xAI'],
        sources: [{ title: 'xAI Joins SpaceX · 2026-02-02', url: 'https://x.ai/news/xai-joins-spacex' }],
        caveat: '인수 발표는 특정 계산 시설이나 미래 서비스가 이미 구현되었다는 근거가 아니다. 회사의 소유 관계와 연구 성능을 구분한다.',
        content: {
          keyIdeas: [
            { title: '기업 관계의 변화', text: '같은 서비스라도 운영 조직과 소유 구조가 바뀔 수 있다. 기업 연표에서는 이 변화의 날짜를 남긴다.' },
            { title: '기술 성과와 별도 기록', text: '인수나 자금 조달은 조직 사건이다. 새로운 모델의 성능은 별도 기술 자료와 평가로 확인해야 한다.' }
          ],
          example: { title: '교육 예제 · 기업과 연구의 두 연표', text: '가상의 회사 인수 날짜와 모델 논문의 출판 날짜를 서로 다른 줄에 놓아 본다. 두 날짜가 가깝다는 이유만으로 인수가 성능 향상의 원인이었다고 결론 내리지 않는다.' },
          videos: [],
          references: [{ title: 'xAI Joins SpaceX', url: 'https://x.ai/news/xai-joins-spacex', location: '2026-02-02 · 인수 공지 본문' }]
        }
      }
    ]
  },
  {
    id: 'alex-karp', name: 'Alex Karp', nameKo: '알렉스 카프',
    tagline: '조직의 데이터와 업무를 연결하는 소프트웨어 사업',
    roles: ['기업·제품'], tags: ['foundations'],
    intro: 'Palantir 공동설립과 기업용 데이터·AI 플랫폼의 사업 전개를 읽는 인물이다. 회사 제품과 연구 이론의 단독 발명을 구분하며, 대표 조직·제품 기록을 선정했다.',
    works: [
      {
        id: 'karp-palantir-2003', year: 2003, dateLabel: '2003 · Palantir 설립',
        title: 'Palantir의 공동설립과 조직 소프트웨어',
        summary: 'Palantir는 2003년에 설립되었으며 공식 경영진 소개는 Karp를 공동설립자로 기록한다. 여러 조직의 데이터와 업무를 연결하는 소프트웨어 회사의 출발을 다루는 항목이다.',
        type: '기업 설립', track: 'foundations',
        people: ['Alex Karp', 'Palantir 공동설립팀'],
        sources: [
          { title: 'Palantir 공식 경영진 소개', url: 'https://investors.palantir.com/management.html' },
          { title: 'Palantir 2026년 1분기 Form 10-Q', url: 'https://www.sec.gov/Archives/edgar/data/1321655/000132165526000028/pltr-20260331.htm' }
        ],
        caveat: '공동설립자의 기업 활동을 나타낸다. 회사 제품이나 온톨로지·AI 이론을 Karp 개인이 단독 발명했다고 해석하지 않는다.',
        content: {
          keyIdeas: [
            { title: '공동설립과 개발', text: '법인 설립, 경영, 제품 설계와 고객 적용은 구분되는 활동이다. 이 항목은 회사의 설립과 Karp의 참여 기록이다.' },
            { title: '데이터와 업무', text: '회사의 공시 자료는 데이터·의사결정·운영을 연결하는 플랫폼 사업을 설명한다. 이런 회사 설명은 별도 사용성·효과 검증과 구분한다.' }
          ],
          example: { title: '교육 예제 · 여러 기록의 같은 대상을 찾기', text: '가상의 공장에서 재고표·발주표·설비표의 식별자를 연결해 본다. 표를 연결할 수 있다는 사실과 데이터가 정확하거나 모든 판단을 자동화할 수 있다는 주장은 다르다.' },
          videos: [],
          references: [
            { title: 'Executive Management', url: 'https://investors.palantir.com/management.html', location: 'Alexander Karp · 공동설립자 소개' },
            { title: 'Form 10-Q · 2026-03-31', url: 'https://www.sec.gov/Archives/edgar/data/1321655/000132165526000028/pltr-20260331.htm', location: 'Note 1 Organization · Overview' }
          ]
        }
      },
      {
        id: 'karp-aip-2023', year: 2023, dateLabel: '2023 · AIP 전개·첫 AIPCon',
        title: '기업 데이터와 LLM을 잇는 AIP',
        summary: 'Palantir는 2023년 AIP를 전개하고 첫 AIPCon의 제품·고객 사례 발표 계획을 공지했다. 사전 공지는 Karp의 개회사와 Shyam Sankar의 기술 시연을 서로 다른 예정 역할로 기록한다.',
        type: '플랫폼 발표', track: 'foundations',
        people: ['Palantir AIP 개발팀', 'Alex Karp', 'Shyam Sankar'],
        sources: [
          { title: 'Palantir 발행 · 첫 AIPCon 공식 공지', url: 'https://www.prnewswire.com/news-releases/palantir-announces-live-stream-of-its-first-aipcon-with-ai-demos--announcements-from-25-customers-301835283.html' },
          { title: 'Palantir Form 10-Q · AIP 전개 연대와 플랫폼 설명', url: 'https://www.sec.gov/Archives/edgar/data/1321655/000132165526000028/pltr-20260331.htm' }
        ],
        caveat: '제품 시연과 회사가 보고한 고객 사례는 독립적인 효과 검증이 아니다. Palantir의 Ontology라는 이름을 OWL 추론기의 실행과 동일시하지 않는다.',
        content: {
          keyIdeas: [
            { title: '모델과 운영 시스템', text: 'AIP는 기존 플랫폼과 LLM 등의 AI를 연결하는 제품으로 소개되었다. 언어모델 그 자체와 기업 데이터·업무 연결 계층을 구분한다.' },
            { title: '제안과 실행 권한', text: '답변 생성, 데이터 조회, 실제 업무 변경은 서로 다른 동작이다. 기업용 활용에서는 각 동작의 권한과 기록을 함께 확인한다.' }
          ],
          example: { title: '교육 예제 · 재고 질문에서 승인까지', text: '가상의 재고 질문을 해석한 뒤 조회 결과를 보여 주고, 발주 변경은 별도 승인 단계로 남겨 본다. 이는 개념 설명 예제이며 실제 AIP를 실행한 결과가 아니다.', steps: ['질문의 대상을 식별한다.', '권한이 있는 데이터에서 답을 구한다.', '제안과 실제 변경을 구분해 기록한다.'] },
          videos: [],
          references: [
            { title: 'First AIPCon · Palantir 발행 공지', url: 'https://www.prnewswire.com/news-releases/palantir-announces-live-stream-of-its-first-aipcon-with-ai-demos--announcements-from-25-customers-301835283.html', location: '2023-05-26 · 행사 일정·Karp와 Sankar의 발표 역할' },
            { title: 'Form 10-Q · 2026-03-31', url: 'https://www.sec.gov/Archives/edgar/data/1321655/000132165526000028/pltr-20260331.htm', location: 'Overview · In 2023, we began deploying… · Ontology 설명' }
          ]
        }
      }
    ]
  },
  {
    id: 'palmer-luckey', name: 'Palmer Luckey', nameKo: '팔머 럭키',
    tagline: '가상현실 제품과 방산 기술 기업의 설립 기록',
    roles: ['기업·제품'], tags: ['foundations'],
    intro: 'Oculus와 Anduril의 설립·제품 사업에 참여한 기업가다. 가상현실 하드웨어와 이후의 방산 기술 기업을 구분해 읽으며, AI 알고리즘의 단독 발명자나 현재 CEO로 임의 분류하지 않는다.',
    works: [
      {
        id: 'luckey-oculus-2012', year: 2012, dateLabel: '2012 · Oculus 출발',
        title: 'Oculus와 가상현실 헤드셋 사업',
        summary: 'Luckey는 2022년 회고에서 2012년 Oculus의 출발과 초기 소개 글을 공개했다. 시야각·지연·무게·가격 등 여러 제품 조건을 함께 다루었던 가상현실 하드웨어 사업의 기록이다.',
        type: '기업 설립', track: 'foundations',
        people: ['Palmer Luckey', 'Oculus 초기 개발팀'],
        sources: [{ title: 'Luckey 본인의 회고 · 10 Years of Oculus', url: 'https://palmerluckey.com/10-years-of-oculus/' }],
        caveat: '2022년의 개인 회고가 2012년을 설명하는 자료다. 가상현실의 최초 발명이나 AI 이론의 개발 기록으로 소개하지 않는다.',
        content: {
          keyIdeas: [
            { title: '제품의 여러 조건', text: '헤드셋은 화면뿐 아니라 추적 지연·무게·착용감·가격 같은 조건을 함께 고려하는 제품이다.' },
            { title: '기술 분야를 나누어 읽기', text: '가상현실 하드웨어 사업의 출발과 이후 기업에서 다룬 AI·자율 시스템은 서로 다른 기록이다.' }
          ],
          example: { title: '교육 예제 · 좋은 헤드셋의 조건', text: '가상의 헤드셋을 비교할 때 화면 크기만 보지 않고 지연·무게·착용 시간·가격을 별도 칸에 적어 본다. 특정 Oculus 제품의 성능 평가가 아니다.' },
          story: { title: '초기 소개 글을 다시 공개한 회고', text: 'Luckey는 2022년 글에 2012년 4월의 초기 Oculus 소개문을 다시 실었다. 그는 제품의 여러 제약을 함께 다루는 목표를 설명하며 다른 사람들과의 개발도 언급한다.', kind: '공식 회고', source: { title: '10 Years of Oculus · Palmer Luckey', url: 'https://palmerluckey.com/10-years-of-oculus/' } },
          videos: [],
          references: [{ title: '10 Years of Oculus', url: 'https://palmerluckey.com/10-years-of-oculus/', location: '2022-04-15 · 2012년 출발과 초기 About 글 재수록' }]
        }
      },
      {
        id: 'luckey-anduril-2017', year: 2017, dateLabel: '2017 · Anduril 공동설립',
        title: '방산 기술 기업 Anduril의 출발',
        summary: 'Anduril은 2017년에 설립되었으며 Luckey는 설립 참여자로 소개된다. 이 항목은 방산 기술 기업의 조직·제품 사업을 다루며 구체적인 공격 시스템의 설계나 운용을 설명하지 않는다.',
        type: '기업 설립', track: 'foundations',
        people: ['Palmer Luckey', 'Anduril 공동설립팀'],
        sources: [
          { title: 'Anduril 공식 회고 · Anduril in 2023', url: 'https://www.anduril.com/news/anduril-in-2023-a-year-in-review' },
          { title: '미 공군 공식 행사 자료 · Palmer Luckey 약력', url: 'https://ww3.safaq.hq.af.mil/Portals/63/Palmer_Luckey%20_Anduril%20Industries.pdf?ver=2019-03-20-141126-673' }
        ],
        caveat: '공동설립 사실은 제품의 국방 성능이나 사회적 효과의 검증이 아니다. Luckey의 설립자 역할을 CEO 직함과 혼동하지 않는다.',
        content: {
          keyIdeas: [
            { title: '설립자의 산업적 역할', text: '기업의 설립과 제품 조직 구성은 모델의 이론·알고리즘을 제안하는 연구와 구분되는 기여다.' },
            { title: '제품 주장과 독립 평가', text: '회사 소개와 실제 환경에서의 평가 결과는 다른 자료다. 제품의 성능이나 효과는 적용 조건과 독립적인 검토가 필요하다.' }
          ],
          example: { title: '교육 예제 · 기업 기록과 기술 근거 나누기', text: '가상의 산업 제품 소개에서 회사 설립 연도, 제품 발표, 시험 조건, 실제 사용 결과를 각각 분류해 본다. 설립 발표 하나로 나머지 사실까지 확인된 것으로 읽지 않는다.' },
          videos: [],
          references: [
            { title: 'Anduril in 2023: A Year in Review', url: 'https://www.anduril.com/news/anduril-in-2023-a-year-in-review', location: '공식 회고의 2017 설립 설명' },
            { title: '2019 Air Force Contracting Summit · Palmer Luckey', url: 'https://ww3.safaq.hq.af.mil/Portals/63/Palmer_Luckey%20_Anduril%20Industries.pdf?ver=2019-03-20-141126-673', location: '행사 약력 · Oculus 2012와 Anduril 2017' }
          ]
        }
      }
    ]
  },
  {
    id: 'alexandr-wang', name: 'Alexandr Wang', nameKo: '알렉산더 왕',
    tagline: '학습 데이터 산업과 AI 조직의 역할 변화',
    roles: ['데이터 구축', '기업·제품'], tags: ['foundations'],
    intro: 'Scale 설립과 데이터 구축 사업, 이후 Meta 합류가 공개된 이력을 읽는 인물이다. 데이터를 만드는 여러 작업자의 기여와 기업가의 역할을 나누며, 오래된 Scale CEO 소개를 현재 직함으로 사용하지 않는다.',
    works: [
      {
        id: 'wang-scale-2016', year: 2016, dateLabel: '2016 · Scale 설립',
        title: '학습 데이터를 다루는 Scale의 출발',
        summary: 'Scale은 2016년 설립된 회사이며 공식 자료는 Wang을 설립자로 기록한다. 회사의 초기 작업과 이후 데이터·평가 사업은 모델 외에도 학습 자료와 품질 관리의 기반이 필요함을 살펴볼 사례다.',
        type: '기업 설립', track: 'foundations',
        people: ['Alexandr Wang', 'Scale 초기 팀'],
        sources: [
          { title: 'Scale 공식 소개 · Founded 2016', url: 'https://scale.com/about' },
          { title: 'Scale 공식 10주년 회고', url: 'https://scale.com/blog/ten-years-of-scale' },
          { title: 'Scale 공식 발표 · Wang을 설립자로 명시', url: 'https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution' }
        ],
        caveat: '오늘의 제품 목록 전체가 2016년부터 존재했다는 뜻은 아니다. 데이터를 구축한 작업자·도메인 전문가의 기여를 설립자 한 사람에게 귀속하지 않는다.',
        content: {
          keyIdeas: [
            { title: '학습 자료도 기반이다', text: '데이터에는 수집·주석·검수 같은 작업이 따른다. 모델 구조와 데이터 구축을 서로 다른 활동으로 기록한다.' },
            { title: '품질과 평가', text: '자료의 양뿐 아니라 일관성·예외 사례·평가 방법도 확인해야 한다. 회사의 자사 서비스 설명과 독립적인 성능 검증은 구분한다.' }
          ],
          example: { title: '교육 예제 · 같은 그림을 다르게 표시한다면', text: '가상의 이미지 열 장에 두 사람이 각각 범주를 붙인 뒤 의견이 다른 사례를 찾아 본다. 주석 기준을 먼저 정해야 함을 보여 주는 예제이며 Scale의 실제 자료나 작업 결과가 아니다.', steps: ['범주의 뜻을 적는다.', '각자 독립적으로 표시한다.', '불일치 사례와 기준을 검토한다.'] },
          videos: [],
          references: [
            { title: 'About Scale', url: 'https://scale.com/about', location: 'Scale at a glance · Founded 2016 · What we do' },
            { title: 'Ten Years of Scale', url: 'https://scale.com/blog/ten-years-of-scale', location: '2026-05-14 · 초기 데이터 작업에 관한 회사 회고' },
            { title: 'Scale AI Announces Next Phase', url: 'https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution', location: '2025-06-12 · Scale’s founder, Alexandr Wang' }
          ]
        }
      },
      {
        id: 'wang-meta-2025', year: 2025, dateLabel: '2025 · Meta 합류·Scale 경영진 변경 발표',
        title: 'Wang의 Meta 합류와 Scale의 역할 변경',
        summary: 'Scale은 2025년 6월 Wang의 Meta 합류와 Jason Droege의 임시 CEO 선임을 발표했다. 해당 공지는 Wang이 Scale 이사회에는 계속 참여한다고 구분해 기록했다.',
        type: '조직·제품 기록', track: 'foundations',
        people: ['Alexandr Wang', 'Jason Droege', 'Scale 이사회'],
        sources: [{ title: 'Scale AI Announces Next Phase · 2025-06-12', url: 'https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution' }],
        caveat: '2025년 발표 당시의 조직 변경이다. 이 자료만으로 2026년의 Meta 세부 직함이나 Scale의 현재 CEO를 추정하지 않는다.',
        content: {
          keyIdeas: [
            { title: '개인과 회사의 다른 경로', text: '설립자가 다른 회사로 이동해도 원래 회사의 사업·팀·경영진은 별도로 이어질 수 있다.' },
            { title: '직함과 날짜', text: '설립자·CEO·이사회 구성원은 다른 역할이다. 이 기록은 Meta 합류, Scale CEO 교체, 이사회 참여를 나누어 읽게 한다.' }
          ],
          example: { title: '교육 예제 · 연도가 붙은 역할표', text: '2016년 설립 기록과 2025년 조직 변경을 두 줄로 놓고, 각 줄에서 확인되는 역할만 적어 본다. 옛 약력의 CEO 표기를 현재 프로필에 복사하지 않는 연습이다.' },
          videos: [],
          references: [{ title: 'Scale AI Announces Next Phase of Company’s Evolution', url: 'https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution', location: '2025-06-12 · Wang의 Meta 합류·Scale 이사회 참여·임시 CEO 선임 문단' }]
        }
      }
    ]
  }
];
