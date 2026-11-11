/* Dated, source-bound roles and independently computed authored cases. */
(function(){
 'use strict';
 const data={
  "sources": {
    "alexnet": {
      "title": "Krizhevsky·Sutskever·Hinton · AlexNet (2012)",
      "url": "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
      "location": "§1·3, Fig.2. 이미지의 국소 구조를 이용한 CNN·표현 학습과 GPU 계산. 개인 단독 발명이나 SSI 구조로 해석하지 않음."
    },
    "seq2seq": {
      "title": "Sutskever·Vinyals·Le · Seq2Seq (2014)",
      "url": "https://proceedings.neurips.cc/paper_files/paper/2014/file/5a18e133cbf9f257297f410bb7eca942-Paper.pdf",
      "location": "pp.2–4, Fig.1, 식(1)·(2). 입력 문장의 상태 표현, 조건부 출력 확률과 탐색. 실제 도판을 보고 자체 도식을 구성."
    },
    "gpt3": {
      "title": "Brown 외 · GPT-3 (2020) v4",
      "url": "https://arxiv.org/pdf/2005.14165v4",
      "location": "§1–2, Fig.1.1·2.1, §4–5와 Author Contributions. 문맥의 예시와 가중치 갱신을 구분하고 오염·일반화 한계를 확인."
    },
    "openai": {
      "title": "OpenAI · Introducing OpenAI",
      "url": "https://openai.com/index/introducing-openai/",
      "location": "2015-12-11 · OpenAI 절과 당시 연구 디렉터 역할. 2015년 조직 기록이며 현재 직함으로 사용하지 않음."
    },
    "superalignment": {
      "title": "OpenAI · Introducing Superalignment",
      "url": "https://openai.com/index/introducing-superalignment/",
      "location": "2023-07-05 · Our approach·The new team. 확장 가능한 감독, 검증·스트레스 테스트를 당시 연구 계획으로 설명. SSI 방법의 공개나 완료 성과가 아님."
    },
    "ssi": {
      "title": "Safe Superintelligence Inc. · 목표와 연구 방향",
      "url": "https://ssi.inc/",
      "location": "조회 2026-11-11 · 능력과 안전을 함께 다루겠다는 회사의 목표. 공개되지 않은 모델 구조·학습법을 이 문장에서 도출하지 않음."
    },
    "updates": {
      "title": "SSI · 날짜별 공식 공지",
      "url": "https://ssi.inc/updates",
      "location": "2024-09-04 투자 발표, 2025-07-03 역할 공지, 2026-07-26 NVIDIA 협력 안내. 원문의 날짜와 계획·실행의 범위를 구분."
    },
    "partnership": {
      "title": "NVIDIA 배포자료 · SSI와의 장기 협력",
      "url": "https://www.globenewswire.com/news-release/2026/07/27/3333561/0/en/ilya-sutskever-s-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership.html",
      "location": "2026-07-27 · Source: NVIDIA. 투자·Vera Rubin 접근·계산 규모 확대에 관한 회사 발표. SSI 사이트의 7월26일 안내와 날짜가 다르며 확대 완료·모델 성능 실측으로 바꾸지 않음."
    }
  },
  "views": [
    {
      "id": "research",
      "label": "01 배운 표현과 다음 예측",
      "title": "이미지를 읽고, 문장을 표현하고, 문맥으로 과제를 지정하다",
      "intro": "AlexNet·Seq2Seq·GPT-3의 질문을 세 쌍으로 비교합니다. 선은 각 연구 안의 관계이며, 앞 연구의 모든 구조가 다음 연구에 그대로 들어갔다는 계보 도면이 아닙니다.",
      "nodes": [
        {
          "id": "image",
          "label": "이미지의 규칙을 배우다",
          "short": "AlexNet · 2012",
          "input": "많은 표지가 붙은 이미지",
          "role": "시각의 국소 구조를 가정한 CNN이 특징과 분류를 함께 학습했다. 사람이 모든 특징을 먼저 목록으로 적는 접근과 달랐다.",
          "output": "분류에 필요한 내부 표현",
          "sourceIds": [
            "alexnet"
          ],
          "icon": "image"
        },
        {
          "id": "representation",
          "label": "데이터가 표현을 바꾸다",
          "short": "가중치에 축적되는 경험",
          "input": "입력과 정답·손실",
          "role": "오류가 줄어들도록 신경망의 연결값을 조정한다. 배운 표현은 과제·구조·자료에 의존하며 사람의 모든 개념과 동일하다고 볼 수 없다.",
          "output": "학습된 모형",
          "sourceIds": [
            "alexnet",
            "gpt3"
          ],
          "icon": "model"
        },
        {
          "id": "read-sequence",
          "label": "문장을 상태로 읽다",
          "short": "Seq2Seq · 입력 LSTM",
          "input": "길이가 다른 단어열",
          "role": "Seq2Seq는 입력을 순서대로 읽어 고정 차원의 상태를 만들고 다른 LSTM의 출력 문장에 조건으로 준다. Fig.1의 입력·출력 연결을 자체 도식으로 나누었다.",
          "output": "입력에 조건화된 상태",
          "sourceIds": [
            "seq2seq"
          ],
          "icon": "document"
        },
        {
          "id": "generate",
          "label": "앞선 출력으로 다음을 정하다",
          "short": "Seq2Seq · 출력 LSTM",
          "input": "입력 상태와 앞서 만든 단어",
          "role": "각 단계의 조건부 확률을 이어 출력 문장의 확률을 구성했다. 한 번에 문장 전체를 고정한 규칙으로 치환하는 방식은 아니다.",
          "output": "출력 단어열·종료 기호",
          "sourceIds": [
            "seq2seq"
          ],
          "icon": "tokens"
        },
        {
          "id": "context",
          "label": "예시를 문맥으로 주다",
          "short": "GPT-3 · 가중치 갱신 없음",
          "input": "지시와 몇 개의 예시가 든 텍스트",
          "role": "사전학습한 언어 모형에 과제 예시를 입력으로 주고 이어질 내용을 예측하게 했다. 평가 시 새 예시를 주는 일은 매번 가중치를 다시 학습시키는 일과 구분된다.",
          "output": "이번 문맥에 따른 출력",
          "sourceIds": [
            "gpt3"
          ],
          "icon": "document"
        },
        {
          "id": "research-limits",
          "label": "다른 조건에서 확인하다",
          "short": "평가 범위와 실패",
          "input": "과제별 시험·오염 점검",
          "role": "논문의 결과는 특정 자료·평가 조건에 관한 것이다. 그럴듯한 문장, 높은 과제 점수, 사람 의도를 따르는 행동은 같은 평가가 아니다.",
          "output": "조건과 한계가 붙은 근거",
          "sourceIds": [
            "gpt3",
            "superalignment"
          ],
          "icon": "chart"
        }
      ],
      "edges": [
        {
          "id": "image-representation",
          "from": "image",
          "to": "representation",
          "label": "특징·분류 학습",
          "sourceIds": [
            "alexnet"
          ],
          "kind": "method"
        },
        {
          "id": "read-sequence-generate",
          "from": "read-sequence",
          "to": "generate",
          "label": "입력에 조건화",
          "sourceIds": [
            "seq2seq"
          ],
          "kind": "method"
        },
        {
          "id": "context-research-limits",
          "from": "context",
          "to": "research-limits",
          "label": "과제별 평가",
          "sourceIds": [
            "gpt3"
          ],
          "kind": "method"
        }
      ],
      "positions": {
        "image": [
          220,
          105
        ],
        "representation": [
          700,
          105
        ],
        "read-sequence": [
          220,
          285
        ],
        "generate": [
          700,
          285
        ],
        "context": [
          220,
          465
        ],
        "research-limits": [
          700,
          465
        ]
      },
      "height": 570,
      "initial": "representation",
      "scope": "AlexNet Fig.2·Seq2Seq Fig.1·GPT-3 Fig.1.1을 참고해 직접 그린 역할 개념도입니다. 각 원논문의 전체 구조를 재현하지 않습니다.",
      "bands": [
        {
          "y": 30,
          "label": "2012 · ALEXNET · 이미지의 특징"
        },
        {
          "y": 210,
          "label": "2014 · SEQ2SEQ · 문장의 상태"
        },
        {
          "y": 390,
          "label": "2020 · GPT-3 · 과제의 문맥"
        }
      ]
    },
    {
      "id": "ssi",
      "label": "02 SSI의 목표와 공개 범위",
      "title": "능력, 의도에 맞는 행동, 이를 확인할 근거를 분리하다",
      "intro": "회사의 공개 목표와 과거 연구 계획을 비교합니다. 점선은 목표·계획·미공개 경계이며 SSI의 공개되지 않은 학습 파이프라인을 뜻하지 않습니다.",
      "nodes": [
        {
          "id": "mission",
          "label": "안전한 초지능을 목표로",
          "short": "SSI · 공개된 지향",
          "input": "회사 소개와 연구 목표",
          "role": "SSI는 능력과 안전을 함께 발전시키겠다고 설명한다. 이 문장은 지향을 밝힌 회사의 주장이고 초지능이나 안전을 달성했다는 검증 보고가 아니다.",
          "output": "연구 방향에 관한 공개 설명",
          "sourceIds": [
            "ssi"
          ],
          "icon": "document"
        },
        {
          "id": "capability",
          "label": "능력을 키우는 문제",
          "short": "무엇을 해낼 수 있나",
          "input": "과제와 학습·계산의 선택",
          "role": "수츠케버의 기존 논문은 이미지·문장·문맥이라는 서로 다른 표현으로 문제를 풀려 했다. SSI가 같은 구조·같은 손실을 쓴다는 근거는 공개 설명만으로 알 수 없다.",
          "output": "검증할 능력의 범위",
          "sourceIds": [
            "ssi",
            "gpt3"
          ],
          "icon": "model"
        },
        {
          "id": "alignment",
          "label": "의도와 행동을 맞추는 문제",
          "short": "잘하는 것과 원하는 것",
          "input": "목표·감독·새 조건의 행동",
          "role": "2023년 Superalignment 글은 인간이 직접 판단하기 어려운 문제의 감독과 검증을 연구 과제로 제시했다. 이 과거 계획을 SSI 내부의 현재 학습 절차로 옮기지 않는다.",
          "output": "감독·검증에 대한 별도 질문",
          "sourceIds": [
            "superalignment",
            "ssi"
          ],
          "icon": "check"
        },
        {
          "id": "compute",
          "label": "연구를 감당할 계산 기반",
          "short": "NVIDIA 협력 · 2026",
          "input": "투자와 장치 접근에 관한 발표",
          "role": "NVIDIA 배포자료는 Vera Rubin 접근과 계산 규모 확대를 설명한다. 장치 접근·투자 발표는 학습 실행 완료나 모델의 지능·안전 성능 측정과 구분된다.",
          "output": "연구 자원의 확장 계획",
          "sourceIds": [
            "partnership",
            "updates"
          ],
          "icon": "chip"
        },
        {
          "id": "evidence",
          "label": "공개 근거를 나누어 읽다",
          "short": "논문·회사 발표·미공개",
          "input": "각 자료의 날짜와 확인 범위",
          "role": "기존 논문의 공개 방법, SSI가 밝힌 목표, 2026년 협력 발표를 다른 종류의 근거로 읽는다. 정보가 없는 평가 조건을 성공으로 채우지 않는다.",
          "output": "알 수 있는 것과 남은 질문",
          "sourceIds": [
            "gpt3",
            "ssi",
            "partnership"
          ],
          "icon": "chart"
        },
        {
          "id": "undisclosed",
          "label": "SSI 내부 방법은 미공개",
          "short": "구체 구조를 추정하지 않기",
          "input": "현재 확인한 공식 자료",
          "role": "여기서 확인한 공식 문서는 SSI의 구체적인 신경망 구조·자료·훈련법·독립 평가 결과를 공개하지 않는다. 이 칸을 GPT나 다른 회사의 구조로 채워 넣지 않는다.",
          "output": "새 공식 자료가 있어야 갱신할 부분",
          "sourceIds": [
            "ssi",
            "updates",
            "partnership"
          ],
          "icon": "question"
        }
      ],
      "edges": [
        {
          "id": "mission-capability",
          "from": "mission",
          "to": "capability",
          "label": "능력 목표",
          "sourceIds": [
            "ssi"
          ],
          "kind": "goal"
        },
        {
          "id": "mission-alignment",
          "from": "mission",
          "to": "alignment",
          "label": "안전 목표",
          "sourceIds": [
            "ssi"
          ],
          "kind": "goal"
        },
        {
          "id": "compute-capability",
          "from": "compute",
          "to": "capability",
          "label": "자원 접근 발표",
          "sourceIds": [
            "partnership"
          ],
          "kind": "announced"
        },
        {
          "id": "capability-evidence",
          "from": "capability",
          "to": "evidence",
          "label": "무엇을 시험했나",
          "sourceIds": [
            "gpt3"
          ],
          "kind": "question"
        },
        {
          "id": "alignment-evidence",
          "from": "alignment",
          "to": "evidence",
          "label": "어떤 행동을 확인했나",
          "sourceIds": [
            "superalignment"
          ],
          "kind": "question"
        },
        {
          "id": "evidence-undisclosed",
          "from": "evidence",
          "to": "undisclosed",
          "label": "근거의 빈칸",
          "sourceIds": [
            "ssi"
          ],
          "kind": "unknown"
        }
      ],
      "positions": {
        "mission": [
          140,
          210
        ],
        "capability": [
          470,
          100
        ],
        "alignment": [
          470,
          350
        ],
        "compute": [
          800,
          100
        ],
        "evidence": [
          800,
          350
        ],
        "undisclosed": [
          140,
          450
        ]
      },
      "height": 540,
      "initial": "capability",
      "scope": "SSI 내부 구조·학습법·검증 성과는 확인한 공식 자료에 공개되어 있지 않습니다. 회사의 목표·장기 협력 발표를 완료된 성능으로 표시하지 않습니다."
    },
    {
      "id": "connections",
      "label": "03 인물·연구 조직·계산 기반",
      "title": "공동연구, 조직 역할과 회사 협력을 서로 다른 선으로 읽다",
      "intro": "수츠케버의 기존 연구에서 SSI와 NVIDIA 협력으로 이어집니다. 2025년 역할 공지, 2026년 회사 발표와 과거 논문을 날짜별로 구분합니다.",
      "nodes": [
        {
          "id": "ilya",
          "label": "일리야 수츠케버",
          "short": "연구자·조직 역할",
          "input": "여러 공동연구와 날짜별 공지",
          "role": "논문의 공동 기여와 조직 운영의 역할을 나누어 읽는다. 2015년 OpenAI 소개와 2025년 SSI 역할 공지는 서로 다른 시점의 기록이다.",
          "output": "연구와 기관을 잇는 이력",
          "sourceIds": [
            "openai",
            "updates"
          ],
          "icon": "person"
        },
        {
          "id": "collaborators",
          "label": "논문의 공동 연구자",
          "short": "Krizhevsky·Hinton·Vinyals·Le 등",
          "input": "원논문의 저자·기여문",
          "role": "AlexNet·Seq2Seq·GPT-3는 서로 다른 팀의 공동 성과다. 기업 대표 한 사람을 알고 있다는 이유로 전체 방법을 단독 발명으로 표시하지 않는다.",
          "output": "기존 인물·연구 카드",
          "sourceIds": [
            "alexnet",
            "seq2seq",
            "gpt3"
          ],
          "icon": "people"
        },
        {
          "id": "openai-history",
          "label": "OpenAI의 과거 연구",
          "short": "2015 소개·2023 계획",
          "input": "당시 역할·공개 연구",
          "role": "2015년 연구 디렉터 소개와 2023년 공동 리드 계획은 그 날짜의 근거다. 이 직함을 현재 SSI의 직함과 합치거나 현재 OpenAI 소속이라고 쓰지 않는다.",
          "output": "연구 조직의 시기별 맥락",
          "sourceIds": [
            "openai",
            "superalignment"
          ],
          "icon": "company"
        },
        {
          "id": "ssi-organization",
          "label": "SSI",
          "short": "2024 출발·연구 목표",
          "input": "공식 소개와 2026 회사 배포자료",
          "role": "NVIDIA 배포자료는 SSI의 2024년 설립과 Sutskever·Levy의 리드를 소개한다. 연구 목표와 실제 공개 제품·결과의 유무는 따로 읽는다.",
          "output": "능력·안전 연구를 위한 조직",
          "sourceIds": [
            "ssi",
            "partnership"
          ],
          "icon": "company"
        },
        {
          "id": "levy",
          "label": "대니얼 레비",
          "short": "2025 공지의 President",
          "input": "SSI의 날짜별 역할 공지",
          "role": "2025-07-03 공지는 수츠케버의 CEO 역할과 레비의 President 역할을 알린다. 다른 Daniel인 Gross의 2025-06-29 이탈 공지와 구분한다.",
          "output": "회사 운영 역할의 구분",
          "sourceIds": [
            "updates"
          ],
          "icon": "person"
        },
        {
          "id": "nvidia",
          "label": "NVIDIA·젠슨 황",
          "short": "2026 투자·장기 협력",
          "input": "SSI와 NVIDIA의 회사 발표",
          "role": "2026-07-27 NVIDIA 배포자료는 투자·계산 기반 접근·기술 협력의 방향을 밝힌다. 회사 간 협력과 개인 공동저자·지도 관계는 다른 관계다.",
          "output": "기존 CUDA·AI 인프라 카드",
          "sourceIds": [
            "partnership"
          ],
          "icon": "chip"
        }
      ],
      "edges": [
        {
          "id": "ilya-collaborators",
          "from": "ilya",
          "to": "collaborators",
          "label": "논문 공동 기여",
          "sourceIds": [
            "alexnet",
            "seq2seq"
          ],
          "kind": "method"
        },
        {
          "id": "ilya-openai-history",
          "from": "ilya",
          "to": "openai-history",
          "label": "당시 연구 역할",
          "sourceIds": [
            "openai"
          ],
          "kind": "method"
        },
        {
          "id": "ilya-ssi-organization",
          "from": "ilya",
          "to": "ssi-organization",
          "label": "공동설립·리드",
          "sourceIds": [
            "partnership"
          ],
          "kind": "method"
        },
        {
          "id": "levy-ssi-organization",
          "from": "levy",
          "to": "ssi-organization",
          "label": "역할 공지",
          "sourceIds": [
            "updates"
          ],
          "kind": "method"
        },
        {
          "id": "nvidia-ssi-organization",
          "from": "nvidia",
          "to": "ssi-organization",
          "label": "투자·협력 발표",
          "sourceIds": [
            "partnership"
          ],
          "kind": "announced"
        }
      ],
      "positions": {
        "ilya": [
          470,
          110
        ],
        "collaborators": [
          140,
          110
        ],
        "openai-history": [
          800,
          110
        ],
        "ssi-organization": [
          470,
          330
        ],
        "levy": [
          140,
          330
        ],
        "nvidia": [
          800,
          330
        ]
      },
      "height": 440,
      "initial": "collaborators",
      "scope": "회사 협력과 공동저자·지도 관계를 혼동하지 않습니다. 날짜가 다른 발표를 하나의 사건으로 합치지 않습니다."
    }
  ],
  "examples": [
    {
      "id": "sequence",
      "label": "두 단어 경로의 확률",
      "question": "첫 단어가 가장 그럴듯한 경로가 전체에서도 가장 높을까?",
      "choices": [
        {
          "id": "cat-sleep",
          "label": "고양이 / 잔다"
        },
        {
          "id": "cat-play",
          "label": "고양이 / 논다"
        },
        {
          "id": "dog-sleep",
          "label": "강아지 / 잔다"
        },
        {
          "id": "dog-play",
          "label": "강아지 / 논다"
        }
      ],
      "scope": "모든 단어·확률은 직접 정했습니다. 조건부 확률의 곱을 계산할 뿐 신경망 추론·번역·SSI 실행이나 원논문의 beam search가 아닙니다."
    },
    {
      "id": "coverage",
      "label": "관측한 범위의 빈칸",
      "question": "확인한 조건이 늘어나면 무엇을 더 말할 수 있을까?",
      "choices": [
        {
          "id": "narrow",
          "label": "2개 조건 관측"
        },
        {
          "id": "broader",
          "label": "4개 조건 관측"
        },
        {
          "id": "listed",
          "label": "열거한 6개 관측"
        }
      ],
      "scope": "직접 구성한 자료 확인 사례입니다. 숫자는 관측 범위이며 안전 점수·실제 모델 성공률·SSI의 검증 절차가 아닙니다."
    }
  ],
  "bridges": [
    {
      "id": "owner",
      "label": "일리야 수츠케버 · 기업·인프라",
      "type": "person",
      "personId": "ilya-sutskever",
      "filter": "industry"
    },
    {
      "id": "alexnet",
      "label": "AlexNet · 기존 연구",
      "type": "event",
      "eventId": "alexnet"
    },
    {
      "id": "seq2seq",
      "label": "Seq2Seq · 기존 연구",
      "type": "event",
      "eventId": "seq2seq"
    },
    {
      "id": "gpt3",
      "label": "GPT-3 · 기존 연구",
      "type": "event",
      "eventId": "gpt3"
    },
    {
      "id": "hinton",
      "label": "공동연구 · 제프리 힌턴",
      "type": "person",
      "personId": "geoffrey-hinton",
      "filter": "all"
    },
    {
      "id": "vinyals",
      "label": "공동연구 · Oriol Vinyals",
      "type": "person",
      "personId": "oriol-vinyals",
      "filter": "all"
    },
    {
      "id": "huang",
      "label": "NVIDIA·CUDA · 젠슨 황",
      "type": "work",
      "personId": "jensen-huang",
      "workId": "huang-cuda-2006",
      "filter": "industry"
    },
    {
      "id": "amodei",
      "label": "비교 읽기 · 아모데이·Anthropic",
      "type": "work",
      "personId": "dario-amodei",
      "workId": "amodei-anthropic-2021",
      "filter": "industry"
    }
  ],
  "title": "SSI: 배운 표현을 키우는 연구에서 능력·안전·계산 기반으로",
  "personId": "ilya-sutskever",
  "workId": "sutskever-ssi-2024"
};
 const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 function calculate(id,choice){
 if(id==='sequence'){
  const paths=[['cat-sleep','고양이 / 잔다',0.6,0.45],['cat-play','고양이 / 논다',0.6,0.55],['dog-sleep','강아지 / 잔다',0.4,0.95],['dog-play','강아지 / 논다',0.4,0.05]].map(([id,label,first,second])=>({id,label,first,second,value:first*second}));
  const selected=paths.find(p=>p.id===choice),best=paths.reduce((a,b)=>a.value>b.value?a:b);if(!selected)throw new Error('Unknown sequence choice');
  return {id,choiceId:selected.id,type:'sequence',rows:paths,headline:'선택한 경로의 확률은 '+(selected.value*100).toFixed(1)+'%',formula:selected.first+' × '+selected.second+' = '+selected.value.toFixed(3),note:'첫 단어만 보면 고양이(60%)가 높지만, 네 완성 경로에서는 '+best.label+' ('+(best.value*100).toFixed(1)+'%)가 가장 높습니다. 직접 정한 확률의 비교입니다.'};
 }
 if(id==='coverage'){
  const options={narrow:2,broader:4,listed:6};if(!Object.hasOwn(options,choice))throw new Error('Unknown coverage choice');const n=options[choice],labels=['익숙한 과제·조건A','익숙한 과제·조건B','달라진 과제·조건A','달라진 과제·조건B','스트레스 조건A','스트레스 조건B'];
  return {id,choiceId:Object.hasOwn(options,choice)?choice:'narrow',type:'coverage',rows:labels.map((label,i)=>({label,observed:i<n})),headline:n+' / 6개 조건에 관측값이 있다고 가정',formula:'남은 빈칸 = 6 − '+n+' = '+(6-n),note:'이 비율은 안전 점수나 성공률이 아닙니다. 열거한 모든 칸이 채워져도 그 밖의 환경·행동에 관한 결론은 별도의 근거가 필요합니다.'};
 }
 throw new Error('Unknown authored example');
} 
 const getView=id=>{const view=data.views.find(v=>v.id===id);if(!view)throw new Error('Unknown view');return view;};
 const select=(viewId,id)=>{const v=getView(viewId),node=v.nodes.find(n=>n.id===id);if(!node)throw new Error('Unknown role');return {node,connections:v.edges.filter(e=>e.from===node.id||e.to===node.id)};};
 const step=(viewId,id,delta)=>{if(![-1,1].includes(delta))throw new Error('Direction must be -1 or 1');const v=getView(viewId);select(viewId,id);const at=v.nodes.findIndex(n=>n.id===id);return select(v.id,v.nodes[Math.max(0,Math.min(v.nodes.length-1,at+delta))].id);};
 window.AtlasSsiResearchPlatform=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),edges:data.views.flatMap(v=>v.edges),exampleIds:data.examples.map(e=>e.id),getView,select,step,calculate});
})();
