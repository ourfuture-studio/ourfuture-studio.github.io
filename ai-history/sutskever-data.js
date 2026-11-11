/* Existing person, one additional dated company/research record. */
(function(){
 'use strict';
 const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="ilya-sutskever");
 if(!person||person.works.some(w=>w.id==="sutskever-ssi-2024"))throw new Error('Existing profile and unapplied adapter required.');
 const work={
  "id": "sutskever-ssi-2024",
  "year": 2024,
  "dateLabel": "2024년 SSI 출발을 기준으로 · 2012–2026 공개 연구·조직·계산 기반",
  "title": "SSI: 배운 표현을 키우는 연구에서 능력·안전·계산 기반으로",
  "summary": "기존 AlexNet·Seq2Seq·GPT 연구 기록을 보존하며 SSI의 2024년 출발과 2026년 NVIDIA 협력 발표를 잇는다. 공개 논문의 방법, 능력·안전에 관한 연구 목표, 회사 역할·계산 자원의 발표와 미공개 부분을 나누어 읽는다.",
  "type": "기업·연구 조직·모델·제공 경로·공식 자료",
  "track": "industry",
  "people": [
    "Ilya Sutskever",
    "Daniel Levy",
    "Jensen Huang"
  ],
  "authorNote": "논문과 회사 자료의 여러 기여·역할을 날짜별로 연결한 기록이다. 전체 저자 목록이나 개인의 단독 발명·모든 시점의 동일한 소속을 뜻하지 않는다.",
  "sources": [
    {
      "title": "Krizhevsky·Sutskever·Hinton · AlexNet (2012)",
      "url": "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
      "location": "§1·3, Fig.2. 이미지의 국소 구조를 이용한 CNN·표현 학습과 GPU 계산. 개인 단독 발명이나 SSI 구조로 해석하지 않음."
    },
    {
      "title": "Sutskever·Vinyals·Le · Seq2Seq (2014)",
      "url": "https://proceedings.neurips.cc/paper_files/paper/2014/file/5a18e133cbf9f257297f410bb7eca942-Paper.pdf",
      "location": "pp.2–4, Fig.1, 식(1)·(2). 입력 문장의 상태 표현, 조건부 출력 확률과 탐색. 실제 도판을 보고 자체 도식을 구성."
    },
    {
      "title": "Safe Superintelligence Inc. · 목표와 연구 방향",
      "url": "https://ssi.inc/",
      "location": "조회 2026-11-11 · 능력과 안전을 함께 다루겠다는 회사의 목표. 공개되지 않은 모델 구조·학습법을 이 문장에서 도출하지 않음."
    },
    {
      "title": "NVIDIA 배포자료 · SSI와의 장기 협력",
      "url": "https://www.globenewswire.com/news-release/2026/07/27/3333561/0/en/ilya-sutskever-s-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership.html",
      "location": "2026-07-27 · Source: NVIDIA. 투자·Vera Rubin 접근·계산 규모 확대에 관한 회사 발표. SSI 사이트의 7월26일 안내와 날짜가 다르며 확대 완료·모델 성능 실측으로 바꾸지 않음."
    }
  ],
  "caveat": "기준 연도 이후의 후속 공개는 날짜를 붙여 구분한다. 회사의 목표·발표와 검증된 연구 결과, 직접 정한 작은 산술과 실제 모형·API·현장 실행을 서로 다른 근거로 읽는다.",
  "content": {
    "article": {
      "question": "이미지와 문장의 규칙을 배우던 신경망 연구는\n어떻게 능력과 안전을 함께 묻는 SSI로 이어졌을까?",
      "opening": [
        "사람은 사진에서 물체를 알아보고, 문장에서 뜻을 이어 읽고, 몇 가지 예시만으로 새로운 일을 알아차린다. 수츠케버가 참여한 연구들은 이런 능력을 사람이 일일이 작성한 규칙 대신 데이터에서 배운 내부 표현으로 다루려 했다. 다만 이미지를 구별하는 CNN, 문장을 다른 문장으로 바꾸는 LSTM, 문맥을 이어 쓰는 언어 모형은 서로 다른 구조와 문제 설정을 갖는다.",
        "AlexNet에서는 대량의 이미지 경험이 시각적 특징을 바꾸게 했다. Seq2Seq에서는 길이가 다른 문장을 신경망의 상태로 읽고, 그 상태와 앞선 출력을 바탕으로 다음 단어를 만들게 했다. 중요한 변화는 답을 미리 나열하는 대신 과제를 수행하는 데 필요한 표현과 계산을 학습하게 했다는 데 있다. 이 성과들은 Krizhevsky·Hinton, Vinyals·Le와 여러 연구팀의 공동 기여로 읽어야 한다.",
        "GPT-3는 이미 학습한 모형에 지시와 몇 개의 예시를 문맥으로 주고 여러 언어 과제를 수행하게 했다. 이때 문맥의 정보는 달라지지만 평가마다 연결값을 다시 갱신하지 않는다. 문장을 잘 이어 쓴다는 것과 새 조건에서도 정확히 판단하거나 사람의 의도에 맞게 행동한다는 것은 서로 다른 질문이다. 원논문도 과제별 실패와 자료 오염·일반화의 한계를 다룬다.",
        "SSI는 2024년에 출발한 연구 조직으로, 능력과 안전을 함께 발전시키겠다는 목표를 밝힌다. 이 방향은 무엇을 할 수 있는 기계를 만들 것인지와 그 기계가 어떤 행동을 하도록 할 것인지를 함께 묻는다. 그러나 회사의 목표를 발표했다는 사실은 안전한 초지능을 구현·검증했다는 뜻이 아니다. 확인한 공식 자료에 공개되지 않은 SSI의 모델 구조와 학습법은 그대로 미공개로 남겨 둔다.",
        "연구의 크기를 바꾸는 데는 계산 기반과 조직도 필요하다. 2026년 NVIDIA 배포자료는 SSI에 대한 투자와 Vera Rubin 접근을 포함한 장기 협력을 발표했다. 이는 연구 자원을 확대할 경로에 관한 회사의 설명이다. 계산 규모 확대 계획을 모델의 성능·지능·안전이 같은 비율로 높아졌다는 실측값으로 바꿀 수는 없다.",
        "아래 그림은 공개 논문에서 읽을 수 있는 표현 학습과 조건부 예측, SSI의 공개 목표와 비공개 범위, 연구자·회사·계산 기반을 세 보기로 나눈다. 기존 AlexNet·Seq2Seq·GPT 카드는 그대로 이어 읽을 수 있다. 직접 정한 작은 확률과 관측 범위 사례는 생각을 비교하는 계산이며 SSI 내부 알고리즘이나 실제 AI의 평가 결과가 아니다."
      ],
      "evidenceLabel": "공식 자료와 원논문 더 읽기",
      "referencesLabel": "연구·회사·제품 원문의 확인 위치",
      "visual": {
        "id": "ssi-research-platform",
        "navLabel": "연구·조직·현장",
        "title": "SSI: 배운 표현을 키우는 연구에서 능력·안전·계산 기반으로",
        "caption": "원논문과 공식 자료를 참고해 직접 그린 역할·관계 그림입니다. 각 항목을 눌러 핵심 아이디어와 근거를 읽고, 직접 구성한 작은 사례에서 가정을 바꾸어 보세요."
      },
      "takeaway": {
        "title": "표현을 학습해 문제를 풀게 한다",
        "text": "이미지의 특징, 문장의 상태, 과제의 문맥은 서로 다른 표현이다. 사람의 규칙 목록을 그대로 옮기는 대신 자료와 학습 목표로 필요한 계산을 형성하려 했다. 높은 언어 과제 점수와 사람 의도에 맞는 행동을 같은 지표로 합치지 않는다. 평가 조건과 근거를 구체적으로 읽어야 한다."
      },
      "technical": {
        "title": "원논문의 방법과 이후 조직·제공 조건을 나누어 읽기",
        "paragraphs": [
          "AlexNet이 다룬 질문은 사진의 어느 픽셀을 어떤 특징으로 읽어야 물체를 구분할 수 있는가였다. 국소 영역의 무늬를 읽는 필터를 위치마다 공유하고, 여러 층을 거치며 분류에 필요한 표현을 학습했다. 시각적 구조라는 가정과 정답으로부터의 학습을 결합했기에, 사진마다 사람이 새로운 인식 규칙을 작성할 필요를 줄이려 했다.",
          "AlexNet의 §3.2는 두 GPU가 서로 다른 부분을 계산하고 특정 층에서 정보를 교환하는 구조를 설명한다. 더 큰 모형을 학습하는 일은 층을 더 그리는 것만으로 끝나지 않았다. 메모리와 계산을 나누는 구현이 있어야 더 많은 특징을 학습시킬 수 있었다. 수츠케버·Krizhevsky·Hinton의 공동 논문은 표현과 계산 기반이 함께 설계된 사례다.",
          "Seq2Seq는 길이가 다른 문장을 어떻게 하나의 학습 문제로 다룰지 물었다. 입력 LSTM은 단어를 읽으며 상태를 바꾸고, 출력 LSTM은 그 상태에서 다른 문장을 생성한다. 문장 사이를 잇는 것은 미리 정한 단어 대응표가 아니라 번역에 필요한 정보를 담도록 학습한 고정 차원 벡터다.",
          "Seq2Seq Fig.1과 식(1)·(2)에서 출력 문장의 확률은 입력과 앞선 출력에 조건화된 다음 단어 확률의 곱으로 구성된다. 종료 기호가 출력 길이를 정한다. 논문은 입력 순서를 거꾸로 하여 멀리 떨어진 의존관계의 학습 부담을 줄였고, 생성에서는 여러 부분 후보를 유지하는 beam search로 높은 확률의 문장을 찾았다.",
          "두 단어 경로 사례는 국소 선택과 전체 경로 비교의 차이를 직접 계산한다. 첫 단어의 확률은 고양이 0.6·강아지 0.4이지만, 다음 단어의 조건부 확률까지 곱하면 강아지·잔다의 0.38이 가장 높다. 처음 고른 후보만 남기면 이후에 드러나는 좋은 경로를 버릴 수 있다는 탐색의 문제를 보여 준다.",
          "GPT-3의 질문은 하나의 사전학습 모형을 과제마다 다시 학습시키는 대신, 지금 원하는 과제를 문맥으로 알려 줄 수 있는가였다. 지시와 입력·출력 예시를 같은 텍스트 안에 놓으면 모형은 그 패턴을 참고해 다음 출력을 생성한다. Fig.1.1·2.1은 예시를 주는 방식과 연결값을 갱신하는 미세조정을 구분한다.",
          "이 관점에서는 과제 규칙을 담는 장소가 달라진다. 사전학습의 경험은 가중치에 축적되고 이번 과제의 조건은 입력 문맥에 놓인다. 가중치를 고정해도 문맥이 바뀌면 출력은 바뀔 수 있다. GPT-3의 과제별 평가와 오염·실패 분석은 이 능력이 어느 조건까지 이어지는지 확인하는 절차였다.",
          "2023년 Superalignment 글은 강한 능력과 바람직한 행동 사이의 또 다른 문제를 제기했다. 사람이 답을 직접 판정하기 어려운 수준의 과제를 모형이 풀게 되면, 시범과 선호만으로 감독하는 데 한계가 생길 수 있다. 당시 Leike·Sutskever는 확장 가능한 감독, 내부 검증과 의도적으로 어려운 시험을 연구 계획으로 제시했다.",
          "SSI는 2024년 출발한 조직으로 능력과 안전을 함께 발전시키겠다는 목표를 공개했다. 2025-07-03 공지는 수츠케버의 CEO와 Daniel Levy의 President 역할을 알린다. 공개 목표는 어떤 연구 문제를 조직의 중심에 놓았는지 보여 주지만, 확인한 자료에는 SSI의 정확한 모델·훈련법·안전 기준·독립 평가가 공개되어 있지 않다. 과거 OpenAI 계획을 현재 SSI의 방법으로 옮겨 적을 근거도 없다.",
          "2026년 NVIDIA 배포자료는 투자와 Vera Rubin 접근을 포함한 장기 협력을 설명했다. SSI 안내 날짜는 7월26일, 연결된 회사 배포자료는 7월27일로 남긴다. 대규모 연구에 필요한 장치와 자원 접근에 관한 발표이며, 계산 규모 확대가 완료됐거나 모델 성능·안전이 같은 비율로 높아졌다는 실측 보고는 아니다.",
          "근거의 빈칸 사례는 직접 만든 여섯 조건 중 관측했다고 가정한 범위를 센다. 두 칸과 여섯 칸의 차이는 확인한 조건 수다. 성능 평가에서도 어떤 과제·입력·상황을 시험했는지가 있어야 그 숫자를 해석할 수 있다. 조건을 모두 채웠다는 사실만으로 열거하지 않은 상황까지 보장되지는 않는다.",
          "이 그림의 확률과 관측 범위는 직접 정한 작은 산술이며 신경망 추론이나 SSI의 안전 평가를 실행하지 않는다. 논문 공동 기여, 회사의 날짜별 역할, 협력 발표와 다른 조직을 비교하는 읽기 링크를 구분한다. 원논문의 표현 학습 아이디어는 기존 연구 카드로, 새 회사 자료는 후속 날짜의 기록으로 이어진다."
        ]
      }
    },
    "keyIdeas": [
      {
        "title": "표현을 학습해 문제를 풀게 한다",
        "text": "이미지의 특징, 문장의 상태, 과제의 문맥은 서로 다른 표현이다. 사람의 규칙 목록을 그대로 옮기는 대신 자료와 학습 목표로 필요한 계산을 형성하려 했다."
      },
      {
        "title": "다음 예측과 행동의 적절함은 나누어 확인한다",
        "text": "높은 언어 과제 점수와 사람 의도에 맞는 행동을 같은 지표로 합치지 않는다. 평가 조건과 근거를 구체적으로 읽어야 한다."
      },
      {
        "title": "회사의 목표와 공개된 방법은 다르다",
        "text": "SSI의 안전·능력 공동 발전 목표는 확인할 수 있지만 비공개 학습법이나 달성 성능을 그 목표에서 추정하지 않는다."
      },
      {
        "title": "계산 자원과 조직은 연구를 가능하게 하는 조건이다",
        "text": "회사 협력 발표와 장치 접근 계획을 연구 성과·개인 공동발명·안전의 실측값으로 바꾸지 않는다."
      }
    ],
    "references": [
      {
        "title": "Krizhevsky·Sutskever·Hinton · AlexNet (2012)",
        "url": "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
        "location": "§1·3, Fig.2. 이미지의 국소 구조를 이용한 CNN·표현 학습과 GPU 계산. 개인 단독 발명이나 SSI 구조로 해석하지 않음."
      },
      {
        "title": "Sutskever·Vinyals·Le · Seq2Seq (2014)",
        "url": "https://proceedings.neurips.cc/paper_files/paper/2014/file/5a18e133cbf9f257297f410bb7eca942-Paper.pdf",
        "location": "pp.2–4, Fig.1, 식(1)·(2). 입력 문장의 상태 표현, 조건부 출력 확률과 탐색. 실제 도판을 보고 자체 도식을 구성."
      },
      {
        "title": "Brown 외 · GPT-3 (2020) v4",
        "url": "https://arxiv.org/pdf/2005.14165v4",
        "location": "§1–2, Fig.1.1·2.1, §4–5와 Author Contributions. 문맥의 예시와 가중치 갱신을 구분하고 오염·일반화 한계를 확인."
      },
      {
        "title": "OpenAI · Introducing OpenAI",
        "url": "https://openai.com/index/introducing-openai/",
        "location": "2015-12-11 · OpenAI 절과 당시 연구 디렉터 역할. 2015년 조직 기록이며 현재 직함으로 사용하지 않음."
      },
      {
        "title": "OpenAI · Introducing Superalignment",
        "url": "https://openai.com/index/introducing-superalignment/",
        "location": "2023-07-05 · Our approach·The new team. 확장 가능한 감독, 검증·스트레스 테스트를 당시 연구 계획으로 설명. SSI 방법의 공개나 완료 성과가 아님."
      },
      {
        "title": "Safe Superintelligence Inc. · 목표와 연구 방향",
        "url": "https://ssi.inc/",
        "location": "조회 2026-11-11 · 능력과 안전을 함께 다루겠다는 회사의 목표. 공개되지 않은 모델 구조·학습법을 이 문장에서 도출하지 않음."
      },
      {
        "title": "SSI · 날짜별 공식 공지",
        "url": "https://ssi.inc/updates",
        "location": "2024-09-04 투자 발표, 2025-07-03 역할 공지, 2026-07-26 NVIDIA 협력 안내. 원문의 날짜와 계획·실행의 범위를 구분."
      },
      {
        "title": "NVIDIA 배포자료 · SSI와의 장기 협력",
        "url": "https://www.globenewswire.com/news-release/2026/07/27/3333561/0/en/ilya-sutskever-s-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership.html",
        "location": "2026-07-27 · Source: NVIDIA. 투자·Vera Rubin 접근·계산 규모 확대에 관한 회사 발표. SSI 사이트의 7월26일 안내와 날짜가 다르며 확대 완료·모델 성능 실측으로 바꾸지 않음."
      }
    ],
    "videos": []
  }
};
 person.tagline="표현 학습·언어 모형의 공동 연구에서 SSI의 목표와 계산 기반으로";
 person.intro="기존 AlexNet·Seq2Seq·GPT 연구 기록을 보존하며 SSI의 2024년 출발과 2026년 NVIDIA 협력 발표를 잇는다. 공개 논문의 방법, 능력·안전에 관한 연구 목표, 회사 역할·계산 자원의 발표와 미공개 부분을 나누어 읽는다.";
 if(!person.tags.includes('industry'))person.tags.push('industry');
 person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
 window.ATLAS_SUTSKEVER_REVISION={personId:person.id,workId:work.id,visualId:"ssi-research-platform",sourceVersion:'0.49'};
})();
