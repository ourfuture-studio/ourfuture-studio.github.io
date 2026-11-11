/* Source-bound roles and authored calculations; no model or API execution. */
(function(){'use strict';
const data={
  "kind": "kimi",
  "sources": {
    "txl": {
      "title": "Dai·Yang 외 · Transformer-XL",
      "url": "https://aclanthology.org/P19-1285.pdf",
      "location": "ACL 2019 pp.2978–2988 · 동등 기여 주석, §3.2–3.3, Fig.2. 이전 구간의 고정된 상태 재사용과 상대 위치. Fig.2 원도판 실제 검토."
    },
    "k2": {
      "title": "Kimi Team · Kimi K2 기술보고서 v1",
      "url": "https://arxiv.org/html/2507.20534v1",
      "location": "2025년 보고서 · §2 사전학습, §3.1·Fig.8–9 도구 궤적 생성, §3.2 강화학습, Appendix A 기여자·B 도구 형식. Fig.8 원도판 실제 검토."
    },
    "repo": {
      "title": "Moonshot AI · Kimi-K2 공식 저장소",
      "url": "https://github.com/MoonshotAI/Kimi-K2",
      "location": "README의 Base/Instruct 구분, 모델 요약, 도구 사용·배포 안내. 공식 팀의 공개이며 자체 예시가 실제 모델 평가 결과라는 뜻은 아님."
    },
    "tools": {
      "title": "Kimi API · Tool Calls",
      "url": "https://platform.kimi.ai/docs/guide/use-kimi-api-to-complete-tool-calls",
      "location": "2026-11-11 현행 문서 · tool_calls 제안, 애플리케이션의 함수 실행, role=tool 결과 반환. 모델이 실제 도구를 대신 실행하지 않는다고 명시."
    },
    "history": {
      "title": "Kimi API · Multi-turn Chat",
      "url": "https://platform.kimi.ai/docs/guide/engage-in-multi-turn-conversations-using-kimi-api",
      "location": "현행 문서의 stateless API, messages의 질문·응답 보관, 대화 이력과 길이 제어. 현재 예시는 K3.1이며 K2의 과거 사양으로 옮기지 않음."
    },
    "cache": {
      "title": "Kimi API · Context Caching",
      "url": "https://platform.kimi.ai/docs/guide/context-caching",
      "location": "현행 문서의 반복 요청 prefix 재사용과 메시지 순서. 서비스 캐시는 Transformer-XL의 학습 구조와 다른 계층이며 특정 2025 K2 구현으로 단정하지 않음."
    },
    "api": {
      "title": "Kimi API · 현행 Quickstart",
      "url": "https://platform.kimi.ai/docs/get-your-api-key",
      "location": "조회 2026-11-11. 옛 Moonshot K2 quickstart 주소는 이 문서로 이동. 현행 K3.1 모델·API 진입과 2025 K2 공개 기록을 구분."
    },
    "cmu": {
      "title": "CMU · AI Research Transforms Industries",
      "url": "https://magazine.cs.cmu.edu/ai-research-transforms-industries",
      "location": "CMU 대학 공식 기사 · 2026-11-11 조회. Zhilin Yang(SCS 2019)과 Yuxin Wu(SCS 2016)의 Kimi 공동 개발을 소개. 이 문장으로 개인별 K2 알고리즘 책임을 추정하지 않음."
    },
    "license": {
      "title": "Kimi-K2 · 공식 라이선스",
      "url": "https://github.com/MoonshotAI/Kimi-K2/blob/main/LICENSE",
      "location": "2025 Modified MIT License. 가중치·코드 공개와 호스팅 API 접근 조건을 구분. 이 화면은 모델을 다운로드하거나 실행하지 않음."
    }
  },
  "nodes": [
    {
      "id": "segment",
      "label": "긴 문장을 구간으로",
      "type": "Transformer-XL의 문제",
      "input": "고정 길이로 나눈 문장",
      "role": "구간 경계에서 앞 문맥을 놓치는 문제를 다룬다. 문맥의 연결이 계산 가능한 표현이어야 한다.",
      "output": "지금 읽을 구간",
      "sourceIds": [
        "txl"
      ]
    },
    {
      "id": "memory",
      "label": "앞 구간의 상태 재사용",
      "type": "Transformer-XL의 발상",
      "input": "이전 층의 고정된 은닉 상태",
      "role": "Fig.2는 이전 구간의 상태를 저장해 다음 구간이 참고하게 한다. 토큰 원문을 그대로 다시 넣는 것과 구분한다.",
      "output": "이전 문맥의 표현",
      "sourceIds": [
        "txl"
      ]
    },
    {
      "id": "next-segment",
      "label": "현재 문맥과 연결",
      "type": "상대 위치와 계산",
      "input": "기억 상태와 현재 구간",
      "role": "상대 위치 표현으로 이전 상태를 다시 쓸 때 위치의 의미가 어긋나는 문제를 다룬다.",
      "output": "다음 예측의 표현",
      "sourceIds": [
        "txl"
      ]
    },
    {
      "id": "pretraining",
      "label": "K2의 사전학습",
      "type": "다른 시대의 모델 설계",
      "input": "대규모 자료와 MoE 모형",
      "role": "K2 보고서는 MuonClip과 사전학습을 기술한다. Transformer-XL의 상태 재사용을 그대로 K2 구조로 옮긴 그림은 아니다.",
      "output": "학습된 기본 모형",
      "sourceIds": [
        "k2",
        "repo"
      ]
    },
    {
      "id": "trajectories",
      "label": "도구 사용의 궤적",
      "type": "후학습의 문제",
      "input": "도구 명세·과제·실행 결과",
      "role": "Fig.8은 과제와 도구 상호작용 궤적을 생성·검토하는 체계를 보여 준다. 시뮬레이션과 실제 실행 환경의 역할도 나눈다.",
      "output": "행동을 배울 자료",
      "sourceIds": [
        "k2"
      ]
    },
    {
      "id": "posttraining",
      "label": "평가와 후학습",
      "type": "행동을 다듬기",
      "input": "기본 모형·궤적·피드백",
      "role": "도구 사용과 문제 해결은 후학습·강화학습과 평가로 다룬다. 특정 벤치마크 성취를 모든 실제 업무로 일반화하지 않는다.",
      "output": "과제별로 확인할 모형",
      "sourceIds": [
        "k2",
        "repo"
      ]
    },
    {
      "id": "request",
      "label": "질문과 자료를 보냄",
      "type": "서비스 입력",
      "input": "사용자 질문·이력·도구 명세",
      "role": "현행 API에서는 애플리케이션이 messages에 문맥을 구성한다. 요청 사이에 모든 기억이 저절로 이어지는 것은 아니다.",
      "output": "이번 요청의 문맥",
      "sourceIds": [
        "history",
        "api"
      ]
    },
    {
      "id": "model",
      "label": "학습된 모형을 이용",
      "type": "요청과 학습의 구분",
      "input": "이번 문맥과 준비된 모형",
      "role": "질문·도구 설명을 참고해 응답이나 함수 호출을 제안한다. 요청마다 연결값을 다시 학습한다는 뜻은 아니다.",
      "output": "답 또는 호출 제안",
      "sourceIds": [
        "tools",
        "repo"
      ]
    },
    {
      "id": "call",
      "label": "함수 이름과 인자 제안",
      "type": "도구 호출의 표현",
      "input": "도구를 이용할 판단",
      "role": "호출 이름·인자·호출 식별자를 메시지로 반환한다. 제안 자체는 외부 함수를 실행한 결과가 아니다.",
      "output": "구조화된 호출 메시지",
      "sourceIds": [
        "tools"
      ]
    },
    {
      "id": "executor",
      "label": "실제 함수는 앱이 실행",
      "type": "실행 주체",
      "input": "호출 명세와 애플리케이션 코드",
      "role": "공식 문서는 도구 함수를 사용자 애플리케이션이 실행한다고 명시한다. 이 화면에서는 정해 둔 배열의 합만 로컬 계산한다.",
      "output": "도구 실행 결과",
      "sourceIds": [
        "tools"
      ]
    },
    {
      "id": "observation",
      "label": "결과를 문맥으로 반환",
      "type": "상호작용의 연결",
      "input": "호출 식별자와 실행 결과",
      "role": "앱이 결과 메시지를 추가해 다시 모형에 전달한다. 도구 결과가 바뀌면 다음에 참고할 입력도 달라진다.",
      "output": "갱신된 messages",
      "sourceIds": [
        "tools",
        "history"
      ]
    },
    {
      "id": "answer",
      "label": "결과를 참고한 설명",
      "type": "사용자와의 접점",
      "input": "질문·이력·도구 결과",
      "role": "필요하면 다시 도구를 제안하거나 답을 작성한다. 실제 서비스는 실패·시간 한도·검토 조건도 정해야 한다.",
      "output": "사용자가 읽을 응답",
      "sourceIds": [
        "tools"
      ]
    },
    {
      "id": "yang",
      "label": "양즈린",
      "type": "참여 기록",
      "input": "논문·기여자·대학의 기록",
      "role": "Transformer-XL 동등 기여자이며 K2 부록의 기여자다. CMU는 Yang과 Yuxin Wu의 Kimi 공동 개발을 소개한다. 개인별 K2 설계 책임까지 밝힌 기록은 아니다.",
      "output": "연구와 회사 활동의 연결",
      "sourceIds": [
        "txl",
        "k2",
        "cmu"
      ],
      "link": {
        "kind": "person",
        "personId": "yang-zhilin",
        "filter": "industry"
      }
    },
    {
      "id": "txl-team",
      "label": "Transformer-XL 공동저자",
      "type": "공동연구",
      "input": "Dai·Yang 등 여러 연구자",
      "role": "동등 기여와 공동저자를 원문 주석으로 읽는다. 이 관계를 특정 회사의 독점 기술이나 현재 직함으로 바꾸지 않는다.",
      "output": "공개된 연구",
      "sourceIds": [
        "txl"
      ],
      "link": {
        "kind": "event",
        "eventId": "transformer-xl"
      }
    },
    {
      "id": "kimi-team",
      "label": "Kimi Team",
      "type": "팀의 기여",
      "input": "K2 단체저자 보고서",
      "role": "부록의 기여자 명단과 개인별 책임의 확인 범위를 구분한다.",
      "output": "모형·후학습·평가",
      "sourceIds": [
        "k2",
        "repo"
      ]
    },
    {
      "id": "moonshot",
      "label": "Moonshot AI",
      "type": "개발 조직",
      "input": "공식 저장소의 개발 팀 소개",
      "role": "공식 Kimi-K2 저장소는 Moonshot AI 팀의 모형 시리즈로 소개한다. 조직의 활동과 각 연구자의 논문 기여를 따로 읽는다.",
      "output": "가중치·모델·서비스",
      "sourceIds": [
        "repo",
        "cmu"
      ]
    },
    {
      "id": "channels",
      "label": "가중치 공개와 API",
      "type": "제공 경로",
      "input": "공개 저장소와 호스팅 서비스",
      "role": "가중치·코드를 이용하는 길과 호스팅 API를 호출하는 길은 다르다. 현행 API 문서의 최신 모형 이름을 2025 K2 사양으로 소급하지 않는다.",
      "output": "서로 다른 이용 조건",
      "sourceIds": [
        "repo",
        "license",
        "api"
      ]
    },
    {
      "id": "developers",
      "label": "애플리케이션 개발자",
      "type": "실행·운영의 역할",
      "input": "모형의 제안과 사용자 과제",
      "role": "문맥을 구성하고 실제 함수를 실행하며 결과를 다시 전달한다. 이 연결은 기업 간 공식 협력 계약을 뜻하지 않는다.",
      "output": "실제 작업의 서비스 흐름",
      "sourceIds": [
        "tools",
        "history",
        "cache"
      ]
    }
  ],
  "edges": [
    {
      "id": "r1",
      "fromId": "segment",
      "toId": "memory",
      "from": "segment",
      "to": "memory",
      "label": "앞 문맥의 표현",
      "sourceIds": [
        "txl"
      ],
      "kind": "concept"
    },
    {
      "id": "r2",
      "fromId": "memory",
      "toId": "next-segment",
      "from": "memory",
      "to": "next-segment",
      "label": "재사용·상대 위치",
      "sourceIds": [
        "txl"
      ],
      "kind": "concept"
    },
    {
      "id": "r3",
      "fromId": "pretraining",
      "toId": "trajectories",
      "from": "pretraining",
      "to": "trajectories",
      "label": "후학습 자료",
      "sourceIds": [
        "k2"
      ],
      "kind": "concept"
    },
    {
      "id": "r4",
      "fromId": "trajectories",
      "toId": "posttraining",
      "from": "trajectories",
      "to": "posttraining",
      "label": "학습·평가",
      "sourceIds": [
        "k2"
      ],
      "kind": "concept"
    },
    {
      "id": "s1",
      "fromId": "request",
      "toId": "model",
      "from": "request",
      "to": "model",
      "label": "이번 문맥",
      "sourceIds": [
        "history"
      ],
      "kind": "concept"
    },
    {
      "id": "s2",
      "fromId": "model",
      "toId": "call",
      "from": "model",
      "to": "call",
      "label": "호출을 제안",
      "sourceIds": [
        "tools"
      ],
      "kind": "concept"
    },
    {
      "id": "s3",
      "fromId": "call",
      "toId": "executor",
      "from": "call",
      "to": "executor",
      "label": "앱이 실행",
      "sourceIds": [
        "tools"
      ],
      "kind": "concept"
    },
    {
      "id": "s4",
      "fromId": "executor",
      "toId": "observation",
      "from": "executor",
      "to": "observation",
      "label": "실행 결과",
      "sourceIds": [
        "tools"
      ],
      "kind": "concept"
    },
    {
      "id": "s5",
      "fromId": "observation",
      "toId": "model",
      "from": "observation",
      "to": "model",
      "label": "다시 입력",
      "sourceIds": [
        "tools"
      ],
      "kind": "loop"
    },
    {
      "id": "s6",
      "fromId": "model",
      "toId": "answer",
      "from": "model",
      "to": "answer",
      "label": "결과를 참고",
      "sourceIds": [
        "tools"
      ],
      "kind": "concept"
    },
    {
      "id": "c1",
      "fromId": "yang",
      "toId": "txl-team",
      "from": "yang",
      "to": "txl-team",
      "label": "공동연구",
      "sourceIds": [
        "txl"
      ],
      "kind": "authorship"
    },
    {
      "id": "c2",
      "fromId": "yang",
      "toId": "kimi-team",
      "from": "yang",
      "to": "kimi-team",
      "label": "기여자 명단",
      "sourceIds": [
        "k2"
      ],
      "kind": "authorship"
    },
    {
      "id": "c3",
      "fromId": "kimi-team",
      "toId": "moonshot",
      "from": "kimi-team",
      "to": "moonshot",
      "label": "공식 개발 팀",
      "sourceIds": [
        "repo"
      ],
      "kind": "organization"
    },
    {
      "id": "c4",
      "fromId": "moonshot",
      "toId": "channels",
      "from": "moonshot",
      "to": "channels",
      "label": "공개·제공",
      "sourceIds": [
        "repo",
        "api"
      ],
      "kind": "organization"
    },
    {
      "id": "c5",
      "fromId": "developers",
      "toId": "channels",
      "from": "developers",
      "to": "channels",
      "label": "이용하는 앱",
      "sourceIds": [
        "tools",
        "history"
      ],
      "kind": "concept"
    },
    {
      "id": "c6",
      "fromId": "channels",
      "toId": "developers",
      "from": "channels",
      "to": "developers",
      "label": "모형·호출 인터페이스",
      "sourceIds": [
        "tools"
      ],
      "kind": "concept"
    }
  ],
  "views": [
    {
      "id": "research",
      "label": "01 문맥과 행동을 배우다",
      "title": "지난 문맥을 연결하고, 행동의 결과를 다음 판단에 쓰려면?",
      "intro": "위는 Transformer-XL Fig.2의 구간 연결, 아래는 Kimi K2 Fig.8의 도구 궤적·후학습을 참고했습니다. 같은 아키텍처라는 선으로 잇지 않습니다.",
      "initial": "memory",
      "nodeIds": [
        "segment",
        "memory",
        "next-segment",
        "pretraining",
        "trajectories",
        "posttraining"
      ],
      "edgeIds": [
        "r1",
        "r2",
        "r3",
        "r4"
      ],
      "positions": {
        "segment": [
          150,
          85
        ],
        "memory": [
          470,
          85
        ],
        "next-segment": [
          790,
          85
        ],
        "pretraining": [
          150,
          280
        ],
        "trajectories": [
          470,
          280
        ],
        "posttraining": [
          790,
          280
        ]
      },
      "height": 385,
      "scope": "두 연구를 문맥·상호작용이라는 질문으로 비교하는 자체 개념도입니다. K2가 Transformer-XL 전체 구조를 그대로 쓴다고 주장하지 않습니다."
    },
    {
      "id": "service",
      "label": "02 모델과 도구를 서비스로",
      "title": "함수 호출 제안이 실제 작업이 되려면 누가 무엇을 해야 할까?",
      "intro": "모형은 호출 메시지를 제안하고 애플리케이션이 실제 함수를 실행합니다. 결과를 새 문맥으로 돌려주는 순환을 직접 따라갑니다.",
      "initial": "model",
      "nodeIds": [
        "request",
        "model",
        "call",
        "executor",
        "observation",
        "answer"
      ],
      "edgeIds": [
        "s1",
        "s2",
        "s3",
        "s4",
        "s5",
        "s6"
      ],
      "positions": {
        "request": [
          150,
          85
        ],
        "model": [
          470,
          85
        ],
        "call": [
          790,
          85
        ],
        "executor": [
          790,
          280
        ],
        "observation": [
          470,
          280
        ],
        "answer": [
          150,
          280
        ]
      },
      "height": 385,
      "scope": "현행 API 문서의 역할 구분을 참고했습니다. 이 화면의 숫자와 메시지는 직접 만든 로컬 예시이며 실제 Kimi API를 호출하지 않습니다."
    },
    {
      "id": "connections",
      "label": "03 인물·팀·공개·제공",
      "title": "개인의 연구, 팀의 모델, 회사와 개발자의 역할을 나누다",
      "intro": "저자 기록과 기여자 명단, 공식 저장소와 서비스 문서를 각각의 근거로 연결합니다. 가중치 공개와 호스팅 API도 다른 제공 경로입니다.",
      "initial": "txl-team",
      "nodeIds": [
        "yang",
        "txl-team",
        "kimi-team",
        "moonshot",
        "channels",
        "developers"
      ],
      "edgeIds": [
        "c1",
        "c2",
        "c3",
        "c4",
        "c5",
        "c6"
      ],
      "positions": {
        "yang": [
          150,
          85
        ],
        "txl-team": [
          470,
          85
        ],
        "kimi-team": [
          790,
          85
        ],
        "moonshot": [
          790,
          280
        ],
        "channels": [
          470,
          280
        ],
        "developers": [
          150,
          280
        ]
      },
      "height": 385,
      "scope": "2025 K2의 기록과 2026-11-11 현행 문서를 구분합니다. 모델 이름·한도·직함을 과거로 소급하거나 개인의 단독 발명으로 표시하지 않습니다."
    }
  ],
  "bridges": [
    {
      "id": "owner",
      "label": "양즈린",
      "kind": "person",
      "personId": "yang-zhilin",
      "filter": "industry"
    },
    {
      "id": "txl",
      "label": "Transformer-XL 연구",
      "kind": "event",
      "eventId": "transformer-xl"
    },
    {
      "id": "k2",
      "label": "Kimi K2 연구",
      "kind": "event",
      "eventId": "kimi-k2"
    },
    {
      "id": "claude",
      "label": "Claude 서비스와 비교",
      "kind": "person",
      "personId": "dario-amodei",
      "filter": "industry"
    },
    {
      "id": "gemini",
      "label": "Gemini 서비스와 비교",
      "kind": "person",
      "personId": "demis-hassabis",
      "filter": "industry"
    }
  ],
  "milestones": [
    {
      "date": "2019",
      "title": "Transformer-XL",
      "sourceId": "txl"
    },
    {
      "date": "2025",
      "title": "Kimi K2 팀 보고서",
      "sourceId": "k2"
    },
    {
      "date": "2025",
      "title": "가중치·구현 공개",
      "sourceId": "repo"
    },
    {
      "date": "2026.11.11 조회",
      "title": "현행 API는 후속 모형 문서",
      "sourceId": "api"
    }
  ],
  "examples": {
    "tool": {
      "kind": "tool",
      "label": "도구 결과를 문맥으로",
      "question": "계산을 제안한 메시지와, 실제로 계산한 결과는 어떻게 다를까?",
      "scope": "함수 이름·호출 ID·수량·메시지는 직접 작성했습니다. 실제 API·언어 모형·외부 시스템은 실행하지 않고 배열의 합만 로컬 계산합니다.",
      "options": [
        {
          "id": "small",
          "label": "작은 재고",
          "quantities": [
            3,
            5,
            2
          ]
        },
        {
          "id": "changed",
          "label": "새로 바뀐 수량",
          "quantities": [
            3,
            8,
            2
          ]
        },
        {
          "id": "empty",
          "label": "일부가 비어 있음",
          "quantities": [
            0,
            5,
            0
          ]
        }
      ]
    },
    "budget": {
      "kind": "budget",
      "label": "이번 요청의 문맥 예산",
      "question": "과거 대화와 도구 설명·결과를 모두 넣으면 무엇이 달라질까?",
      "capacity": 24,
      "scope": "각 메시지 크기와 전체 예산은 직접 정한 표시 단위입니다. 실제 tokenizer·K2 문맥 한도·요금·서버 캐시를 계산하지 않습니다.",
      "options": [
        {
          "id": "short",
          "label": "짧은 이력",
          "history": 4
        },
        {
          "id": "medium",
          "label": "더 긴 이력",
          "history": 10
        },
        {
          "id": "long",
          "label": "아주 긴 이력",
          "history": 18
        }
      ]
    }
  }
};

function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){for(const value of Object.values(x))freeze(value);Object.freeze(x);}return x;}
const byId=new Map(data.nodes.map(n=>[n.id,n])),edgeById=new Map(data.edges.map(e=>[e.id,e]));
if(byId.size!==data.nodes.length||edgeById.size!==data.edges.length)throw new TypeError('Unique diagram IDs required.');
for(const n of [...data.nodes,...data.edges])if(!n.sourceIds.length||n.sourceIds.some(s=>!data.sources[s]))throw new TypeError('Each role and edge needs a source.');
for(const v of data.views)if(!v.nodeIds.includes(v.initial)||v.nodeIds.some(n=>!byId.has(n)||!v.positions[n])||v.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).fromId,edgeById.get(id).toId].every(n=>v.nodeIds.includes(n))))throw new TypeError('Positioned visible endpoints required.');
function getView(id){const v=data.views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown view.');return freeze({...v,nodes:v.nodeIds.map(n=>byId.get(n)),edges:v.edgeIds.map(e=>edgeById.get(e))});}
function select(viewId,nodeId){const v=getView(viewId),index=v.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Choose a visible role.');return freeze({viewId,index,node:byId.get(nodeId),connections:v.edges.filter(e=>e.fromId===nodeId||e.toId===nodeId),hasPrevious:index>0,hasNext:index<v.nodes.length-1});}
function step(viewId,nodeId,direction){if(![-1,1].includes(direction))throw new RangeError('Step one role.');const v=getView(viewId),s=select(viewId,nodeId);return select(viewId,v.nodeIds[Math.max(0,Math.min(v.nodeIds.length-1,s.index+direction))]);}
function getExample(id){const e=data.examples[id];if(!e)throw new RangeError('Unknown case.');return freeze({...e,executesModel:false,executesApi:false});}
function evaluateCase(id,optionId){const e=getExample(id),o=e.options.find(o=>o.id===optionId);if(!o)throw new RangeError('Choose a case option.');let result;
if(e.kind==='patches'){const counts=o.volume.map((n,i)=>Math.ceil(n/o.patch[i])),total=counts.reduce((a,b)=>a*b,1);result={...o,counts,total,formula:counts.join(' × ')+' = '+total+'개 패치',explanation:'직접 정한 잠재 격자 '+o.volume.join(' × ')+'를 '+o.patch.join(' × ')+' 단위로 나눈 수입니다. 실제 Sora 토큰 수가 아닙니다.'};}
else if(e.kind==='anchors'){const sorted=[...o.times].sort((a,b)=>a-b),gaps=sorted.slice(1).map((n,i)=>n-sorted[i]),duplicates=[...new Set(sorted.filter((n,i)=>i&&n===sorted[i-1]))];result={...o,gaps,duplicates,formula:'시간 앵커 '+sorted.join(' → ')+' · 간격 '+gaps.join(', '),explanation:duplicates.length?'같은 시점 '+duplicates.join(', ')+'에 둘 이상의 앵커를 둔 작성 계획입니다. 자체 배열의 중복 표시이며 Sora의 실제 오류 검사나 생성 결과가 아닙니다.':'조건을 정한 시점 사이에 '+gaps.join(', ')+' 단위의 구간이 남습니다. 중간 장면은 여기서 생성하지 않으며, 실제 제품의 보간 규칙을 재현하지 않습니다.'};}
else if(e.kind==='tool'){const value=o.quantities.reduce((a,b)=>a+b,0),toolCall={id:'demo_inventory',type:'function',function:{name:'sum_inventory',arguments:JSON.stringify({quantities:o.quantities})}},toolMessage={role:'tool',tool_call_id:'demo_inventory',content:JSON.stringify({total:value})};result={...o,value,toolCall,toolMessage,formula:o.quantities.join(' + ')+' = '+value,explanation:'직접 정한 수량을 로컬 JavaScript 함수로 더한 결과입니다. 호출 메시지는 작성한 예시이며 실제 Kimi 응답·외부 도구 실행이 아닙니다.'};}
else if(e.kind==='budget'){const parts=[{label:'규칙',value:3},{label:'질문',value:4},{label:'도구 설명',value:5},{label:'도구 결과',value:4},{label:'과거 이력',value:o.history}],total=parts.reduce((a,b)=>a+b.value,0),overflow=Math.max(0,total-e.capacity);result={...o,parts,total,overflow,capacity:e.capacity,formula:parts.map(p=>p.value).join(' + ')+' = '+total+' / 작성 예산 '+e.capacity,explanation:overflow?'직접 정한 예산보다 '+overflow+' 단위 큽니다. 어떤 정보를 유지하거나 줄일지 결정해야 하는 상황을 표시합니다.':'직접 정한 예산 안에 '+(e.capacity-total)+' 단위의 여유가 있습니다. 실제 모형의 문맥 한도나 tokenizer 측정은 아닙니다.'};}
else throw new TypeError('Unknown authored arithmetic.');return freeze({caseId:id,optionId,kind:e.kind,...result,scope:e.scope,executesModel:false,executesApi:false});}

window.AtlasKimiModelService=freeze({...data,views:data.views.map(v=>getView(v.id)),exampleIds:Object.keys(data.examples),getView,select,step,getExample,evaluateCase});
})();
