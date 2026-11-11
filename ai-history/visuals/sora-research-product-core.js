/* Source-bound roles and authored calculations; no model or API execution. */
(function(){'use strict';
const data={
  "kind": "sora",
  "sources": {
    "dit": {
      "title": "Peebles·Xie · DiT 원논문",
      "url": "https://openaccess.thecvf.com/content/ICCV2023/papers/Peebles_Scalable_Diffusion_Models_with_Transformers_ICCV_2023_paper.pdf",
      "location": "ICCV 2023, pp.4195–4205 · Fig.3, §3.1–3.2. 2022년 최초 프리프린트와 2023년 학회 출판을 구분. 원문 Fig.3 실제 검토."
    },
    "ditCode": {
      "title": "DiT · 공식 구현 저장소",
      "url": "https://github.com/facebookresearch/DiT",
      "location": "공식 README의 논문·모델·학습·샘플링 설명. 구현 공개와 이 화면의 자체 산술을 구분. 조회 2026-11-11."
    },
    "report": {
      "title": "OpenAI · Sora 최초 기술보고",
      "url": "https://openai.com/index/video-generation-models-as-world-simulators/",
      "location": "2024-02-15 · Turning visual data into patches, Video compression network, Spacetime latent patches, Scaling transformers, Language understanding, Discussion, Authors. 구현 상세가 공개되지 않았다는 원문의 범위."
    },
    "launch": {
      "title": "OpenAI · Sora is here",
      "url": "https://openai.com/index/sora-is-here/",
      "location": "2024-12-09 · Sora Turbo 제품·입력 편집·스토리보드와 당시 한계. 현재 페이지의 2026-04-26 제품 종료 고지도 함께 확인."
    },
    "system": {
      "title": "OpenAI · Sora System Card",
      "url": "https://openai.com/index/sora-system-card/",
      "location": "2024-12-09 · Overview, Model Data, Risk Identification, Mitigation Stack, Acknowledgements. 창작자 피드백과 배포 계층은 모델 구조와 별도."
    },
    "sora2": {
      "title": "OpenAI · Sora 2 is here",
      "url": "https://openai.com/index/sora-2/",
      "location": "2025-09-30 · 후속 영상·음성 모형과 앱의 당시 공개. 2024년 모형 사양으로 소급하지 않음. 현재 페이지의 종료 고지 확인."
    },
    "system2": {
      "title": "OpenAI · Sora 2 System Card",
      "url": "https://deploymentsafety.openai.com/sora-2",
      "location": "2025-09-30 · Overview, Model Data, Safety Stack. 입출력 처리와 안전 계층에 관한 회사의 설명이며 완전한 안전성의 독립 증명이 아님."
    },
    "sunset": {
      "title": "OpenAI · Sora discontinuation",
      "url": "https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation",
      "location": "2026-11-11 조회 공식 도움말. Sora web/app은 2026-04-26, API는 2026-09-24 종료라고 명시. 제품·API의 시점을 구분."
    },
    "guide": {
      "title": "OpenAI · Sora 2 Prompting Guide",
      "url": "https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide",
      "location": "공식 개발자 문서의 샷·행동·카메라·시간에 대한 프롬프트 설명. 후속 제품의 사용 예시이며 2024 모형 내부 구현이나 현재 서비스 가용성을 뜻하지 않음."
    }
  },
  "nodes": [
    {
      "id": "visual-data",
      "label": "다양한 영상의 경험",
      "type": "풀려는 문제",
      "input": "길이·화면 비율이 다른 영상과 이미지",
      "role": "서로 다른 시각 자료를 함께 배울 표현이 필요하다.",
      "output": "통일할 시각 입력",
      "sourceIds": [
        "report",
        "system"
      ]
    },
    {
      "id": "latent",
      "label": "픽셀을 잠재 표현으로",
      "type": "표현",
      "input": "프레임들의 픽셀 배열",
      "role": "2024 기술보고는 공간·시간을 압축한 잠재 공간과 디코더를 설명한다. 압축 비율의 전체 사양은 공개하지 않는다.",
      "output": "압축된 시공간 표현",
      "sourceIds": [
        "report",
        "dit"
      ]
    },
    {
      "id": "patches",
      "label": "시공간 패치를 토큰으로",
      "type": "표현",
      "input": "압축된 영상 표현",
      "role": "영상의 작은 시공간 부분을 Transformer가 다룰 단위로 놓는다. 문장의 토큰과 비교한 발상이다.",
      "output": "여러 모양의 토큰 배열",
      "sourceIds": [
        "report",
        "dit"
      ]
    },
    {
      "id": "denoising",
      "label": "조건을 보며 함께 복원",
      "type": "학습한 계산",
      "input": "노이즈가 있는 패치·문장 조건",
      "role": "DiT의 Transformer 계산과 Sora의 공개 설명을 잇는다. 실제 Sora의 모든 블록과 학습 설정을 재구성한 도면은 아니다.",
      "output": "노이즈를 줄인 잠재 표현",
      "sourceIds": [
        "dit",
        "report"
      ]
    },
    {
      "id": "decode",
      "label": "화면으로 되돌리기",
      "type": "표현의 출구",
      "input": "생성된 잠재 표현",
      "role": "학습된 디코더가 픽셀 공간으로 연결한다. 아래의 격자 수 계산은 디코더를 실행하지 않는다.",
      "output": "검토할 영상 후보",
      "sourceIds": [
        "report",
        "system"
      ]
    },
    {
      "id": "coherence",
      "label": "이어지는 세계인가?",
      "type": "검토할 질문",
      "input": "생성한 영상과 지시",
      "role": "물체의 상태·연속성·물리적 상호작용은 별도로 확인해야 한다. 그럴듯한 영상이 일반 물리 시뮬레이터의 검증은 아니다.",
      "output": "성공과 실패의 사례",
      "sourceIds": [
        "report",
        "system",
        "sora2"
      ]
    },
    {
      "id": "creative-input",
      "label": "말·이미지·시간 앵커",
      "type": "창작자의 입력",
      "input": "사용자의 의도와 참고 자료",
      "role": "2024 제품은 텍스트·영상·이미지와 스토리보드 접점을 제공했다. 의도를 표현하는 화면도 개발의 일부다.",
      "output": "생성에 줄 조건",
      "sourceIds": [
        "launch",
        "guide"
      ]
    },
    {
      "id": "request",
      "label": "학습된 모델에 요청",
      "type": "학습과 사용의 경계",
      "input": "입력 조건과 준비된 모형",
      "role": "사용자는 이번 샷의 조건을 정한다. 요청을 보낸다는 사실을 매번 모형 전체를 다시 학습하는 일로 설명하지 않는다.",
      "output": "이번 생성 작업",
      "sourceIds": [
        "launch",
        "guide"
      ]
    },
    {
      "id": "candidate",
      "label": "영상 후보와 편집",
      "type": "생성·편집 접점",
      "input": "모형의 생성 결과",
      "role": "당시 제품의 확장·리믹스·혼합 기능은 연구 표현을 편집 가능한 창작 흐름으로 연결했다.",
      "output": "이어 다듬을 후보",
      "sourceIds": [
        "launch"
      ]
    },
    {
      "id": "evaluation",
      "label": "품질과 배포 조건",
      "type": "모델 밖의 평가",
      "input": "영상·의도·사용 조건",
      "role": "시스템 카드는 위험 평가와 입출력 처리 계층을 별도로 설명한다. 작은 앵커 사례는 이 평가를 대체하지 않는다.",
      "output": "검토와 피드백",
      "sourceIds": [
        "system",
        "system2"
      ]
    },
    {
      "id": "provenance",
      "label": "출처를 함께 제공",
      "type": "제품 계층",
      "input": "생성 파일과 출처 정보",
      "role": "2024 제품 발표는 C2PA와 워터마크를 설명했다. 출처 표시가 내용의 진실성이나 물리적 정확성을 보장하지는 않는다.",
      "output": "생성 출처를 읽을 단서",
      "sourceIds": [
        "launch",
        "system"
      ]
    },
    {
      "id": "lifecycle",
      "label": "공개와 종료를 날짜로",
      "type": "제품의 생애",
      "input": "기술보고·제품·종료 공지",
      "role": "2024 연구 공개와 제품 출시, 2025 후속 모형, 2026 web/app·API 종료는 서로 다른 사건이다.",
      "output": "현재 이용 가능성과 구분한 역사",
      "sourceIds": [
        "launch",
        "sora2",
        "sunset"
      ]
    },
    {
      "id": "peebles",
      "label": "윌리엄 피블스",
      "type": "공동 연구자",
      "input": "DiT와 Sora의 저자 기록",
      "role": "DiT는 Peebles·Xie의 논문이고 2024 Sora 보고서에는 Bill Peebles가 공동저자로 적혀 있다. 현재 소속·전 제품 책임은 이 명단으로 추정하지 않는다.",
      "output": "개인 기여의 확인 범위",
      "sourceIds": [
        "dit",
        "report"
      ],
      "link": {
        "kind": "person",
        "personId": "william-peebles",
        "filter": "industry"
      }
    },
    {
      "id": "xie",
      "label": "사이닝 시에",
      "type": "DiT 공동저자",
      "input": "DiT의 두 저자",
      "role": "개인 한 명의 발명으로 줄이지 않고 공동연구의 연결을 읽는다.",
      "output": "공개 논문·코드",
      "sourceIds": [
        "dit",
        "ditCode"
      ],
      "link": {
        "kind": "event",
        "eventId": "dit"
      }
    },
    {
      "id": "dit-team",
      "label": "DiT 논문·구현",
      "type": "공개 연구",
      "input": "잠재 확산과 Transformer",
      "role": "논문과 공식 코드로 방법을 검토할 수 있다. Sora 보고서의 DiT 인용은 공개된 연구 연결이다.",
      "output": "후속 연구가 참조할 기반",
      "sourceIds": [
        "dit",
        "ditCode",
        "report"
      ]
    },
    {
      "id": "openai",
      "label": "OpenAI 제품·운영",
      "type": "개발 조직",
      "input": "연구 모형과 제품 접점",
      "role": "개인별 논문 기여와 제품·안전·운영의 조직 활동을 나누어 표시한다.",
      "output": "당시 제품 제공과 종료 공지",
      "sourceIds": [
        "launch",
        "system",
        "sunset"
      ]
    },
    {
      "id": "sora-team",
      "label": "Sora 공동연구팀",
      "type": "팀 기여",
      "input": "2024 보고서의 여러 저자",
      "role": "Tim Brooks·Bill Peebles·Aditya Ramesh 등 13명이 적힌 공동 보고서다. 각자의 세부 책임은 저자 순서만으로 정하지 않는다.",
      "output": "공개 기술보고",
      "sourceIds": [
        "report"
      ],
      "link": {
        "kind": "event",
        "eventId": "sora"
      }
    },
    {
      "id": "creators",
      "label": "창작자와 검토자",
      "type": "제품 피드백",
      "input": "사용 경험·실패 사례",
      "role": "공식 시스템 카드는 창작자와 외부 검토자의 피드백을 설명한다. 참여가 제품이나 정책에 대한 보증을 뜻하지 않는다고도 밝힌다.",
      "output": "수정·평가의 근거",
      "sourceIds": [
        "system"
      ]
    }
  ],
  "edges": [
    {
      "id": "r1",
      "fromId": "visual-data",
      "toId": "latent",
      "from": "visual-data",
      "to": "latent",
      "label": "표현을 압축",
      "sourceIds": [
        "report"
      ],
      "kind": "concept"
    },
    {
      "id": "r2",
      "fromId": "latent",
      "toId": "patches",
      "from": "latent",
      "to": "patches",
      "label": "시공간 단위",
      "sourceIds": [
        "report"
      ],
      "kind": "concept"
    },
    {
      "id": "r3",
      "fromId": "patches",
      "toId": "denoising",
      "from": "patches",
      "to": "denoising",
      "label": "조건부 복원",
      "sourceIds": [
        "dit",
        "report"
      ],
      "kind": "concept"
    },
    {
      "id": "r4",
      "fromId": "denoising",
      "toId": "decode",
      "from": "denoising",
      "to": "decode",
      "label": "화면으로",
      "sourceIds": [
        "report"
      ],
      "kind": "concept"
    },
    {
      "id": "r5",
      "fromId": "decode",
      "toId": "coherence",
      "from": "decode",
      "to": "coherence",
      "label": "별도 검토",
      "sourceIds": [
        "report",
        "system"
      ],
      "kind": "concept"
    },
    {
      "id": "d1",
      "fromId": "creative-input",
      "toId": "request",
      "from": "creative-input",
      "to": "request",
      "label": "이번 조건",
      "sourceIds": [
        "launch"
      ],
      "kind": "concept"
    },
    {
      "id": "d2",
      "fromId": "request",
      "toId": "candidate",
      "from": "request",
      "to": "candidate",
      "label": "생성과 편집",
      "sourceIds": [
        "launch"
      ],
      "kind": "concept"
    },
    {
      "id": "d3",
      "fromId": "candidate",
      "toId": "evaluation",
      "from": "candidate",
      "to": "evaluation",
      "label": "평가",
      "sourceIds": [
        "system"
      ],
      "kind": "concept"
    },
    {
      "id": "d4",
      "fromId": "evaluation",
      "toId": "provenance",
      "from": "evaluation",
      "to": "provenance",
      "label": "제공 계층",
      "sourceIds": [
        "launch",
        "system"
      ],
      "kind": "concept"
    },
    {
      "id": "d5",
      "fromId": "provenance",
      "toId": "lifecycle",
      "from": "provenance",
      "to": "lifecycle",
      "label": "날짜·제공 상태",
      "sourceIds": [
        "launch",
        "sunset"
      ],
      "kind": "dated"
    },
    {
      "id": "c1",
      "fromId": "peebles",
      "toId": "dit-team",
      "from": "peebles",
      "to": "dit-team",
      "label": "공동저자",
      "sourceIds": [
        "dit"
      ],
      "kind": "authorship"
    },
    {
      "id": "c2",
      "fromId": "xie",
      "toId": "dit-team",
      "from": "xie",
      "to": "dit-team",
      "label": "공동저자",
      "sourceIds": [
        "dit"
      ],
      "kind": "authorship"
    },
    {
      "id": "c3",
      "fromId": "peebles",
      "toId": "sora-team",
      "from": "peebles",
      "to": "sora-team",
      "label": "보고서 저자",
      "sourceIds": [
        "report"
      ],
      "kind": "authorship"
    },
    {
      "id": "c4",
      "fromId": "dit-team",
      "toId": "sora-team",
      "from": "dit-team",
      "to": "sora-team",
      "label": "보고서가 인용",
      "sourceIds": [
        "report"
      ],
      "kind": "reference"
    },
    {
      "id": "c5",
      "fromId": "sora-team",
      "toId": "openai",
      "from": "sora-team",
      "to": "openai",
      "label": "팀·회사",
      "sourceIds": [
        "report",
        "launch"
      ],
      "kind": "organization"
    },
    {
      "id": "c6",
      "fromId": "creators",
      "toId": "openai",
      "from": "creators",
      "to": "openai",
      "label": "피드백",
      "sourceIds": [
        "system"
      ],
      "kind": "feedback"
    }
  ],
  "views": [
    {
      "id": "research",
      "label": "01 움직이는 장면의 표현",
      "title": "영상도 문장처럼, 다룰 수 있는 단위로 표현할 수 있을까?",
      "intro": "DiT Fig.3와 Sora 2024 기술보고의 공개 설명을 참고한 자체 개념도입니다. 픽셀·잠재 표현·시공간 패치·조건부 복원과 결과 검토를 구분합니다.",
      "initial": "latent",
      "nodeIds": [
        "visual-data",
        "latent",
        "patches",
        "denoising",
        "decode",
        "coherence"
      ],
      "edgeIds": [
        "r1",
        "r2",
        "r3",
        "r4",
        "r5"
      ],
      "positions": {
        "visual-data": [
          150,
          85
        ],
        "latent": [
          470,
          85
        ],
        "patches": [
          790,
          85
        ],
        "denoising": [
          790,
          280
        ],
        "decode": [
          470,
          280
        ],
        "coherence": [
          150,
          280
        ]
      },
      "height": 385,
      "scope": "표현의 계보를 보여 주며 실제 Sora 전체 구조·데이터·학습 설정의 복제는 아닙니다."
    },
    {
      "id": "development",
      "label": "02 연구에서 창작 도구로",
      "title": "생성 모델에서, 의도를 넣고 결과를 다듬는 제품으로",
      "intro": "입력·생성·편집과 평가·출처·제공 상태는 다른 역할입니다. 2024와 2025의 당시 제품 설명을 현재 서비스 안내로 읽지 않습니다.",
      "initial": "request",
      "nodeIds": [
        "creative-input",
        "request",
        "candidate",
        "evaluation",
        "provenance",
        "lifecycle"
      ],
      "edgeIds": [
        "d1",
        "d2",
        "d3",
        "d4",
        "d5"
      ],
      "positions": {
        "creative-input": [
          150,
          85
        ],
        "request": [
          470,
          85
        ],
        "candidate": [
          790,
          85
        ],
        "evaluation": [
          790,
          280
        ],
        "provenance": [
          470,
          280
        ],
        "lifecycle": [
          150,
          280
        ]
      },
      "height": 385,
      "scope": "공식 종료 공지 기준 web/app은 2026-04-26, API는 2026-09-24 종료했습니다. 아래는 연구·개발 역사를 읽는 화면입니다."
    },
    {
      "id": "connections",
      "label": "03 인물·팀·개발의 연결",
      "title": "공동저자의 연구, 개발 조직, 사용자의 피드백",
      "intro": "논문 공동저자·보고서 인용·회사·제품 피드백을 선의 종류와 출처로 나눕니다. 다른 기업 카드로 가는 비교 링크는 협력 관계를 뜻하지 않습니다.",
      "initial": "xie",
      "nodeIds": [
        "peebles",
        "xie",
        "dit-team",
        "openai",
        "sora-team",
        "creators"
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
        "peebles": [
          150,
          85
        ],
        "xie": [
          470,
          85
        ],
        "dit-team": [
          790,
          85
        ],
        "openai": [
          790,
          280
        ],
        "sora-team": [
          470,
          280
        ],
        "creators": [
          150,
          280
        ]
      },
      "height": 385,
      "scope": "Peebles의 현재 소속이나 모든 Sora 세대의 개발 책임을 2024 공동저자 기록으로 추정하지 않습니다."
    }
  ],
  "bridges": [
    {
      "id": "owner",
      "label": "윌리엄 피블스",
      "kind": "person",
      "personId": "william-peebles",
      "filter": "industry"
    },
    {
      "id": "dit",
      "label": "DiT 연구",
      "kind": "event",
      "eventId": "dit"
    },
    {
      "id": "sora",
      "label": "2024 Sora 연구",
      "kind": "event",
      "eventId": "sora"
    },
    {
      "id": "cuda",
      "label": "CUDA·인프라 비교",
      "kind": "person",
      "personId": "jensen-huang",
      "filter": "industry"
    },
    {
      "id": "world",
      "label": "공간 지능과 비교",
      "kind": "person",
      "personId": "fei-fei-li",
      "filter": "industry"
    }
  ],
  "milestones": [
    {
      "date": "2023",
      "title": "DiT 학회 원문",
      "sourceId": "dit"
    },
    {
      "date": "2024.02.15",
      "title": "Sora 연구 보고",
      "sourceId": "report"
    },
    {
      "date": "2024.12.09",
      "title": "Sora Turbo 제품",
      "sourceId": "launch"
    },
    {
      "date": "2025.09.30",
      "title": "Sora 2 공개",
      "sourceId": "sora2"
    },
    {
      "date": "2026.04.26",
      "title": "web·app 종료",
      "sourceId": "sunset"
    },
    {
      "date": "2026.09.24",
      "title": "API 종료",
      "sourceId": "sunset"
    }
  ],
  "examples": {
    "patches": {
      "kind": "patches",
      "label": "시공간 패치 수 비교",
      "question": "정지 이미지·가로 영상·긴 영상은 몇 개의 단위로 나뉠까?",
      "scope": "잠재 격자의 크기와 패치 크기는 직접 정했습니다. 올림 규칙은 자체 사례의 규칙이며 Sora의 비공개 압축률·실제 패치 크기·영상 품질·처리속도를 추정하지 않습니다.",
      "options": [
        {
          "id": "still",
          "label": "정지 이미지",
          "volume": [
            1,
            4,
            6
          ],
          "patch": [
            1,
            2,
            2
          ]
        },
        {
          "id": "wide",
          "label": "짧은 가로 영상",
          "volume": [
            4,
            4,
            6
          ],
          "patch": [
            2,
            2,
            2
          ]
        },
        {
          "id": "portrait",
          "label": "세로 영상",
          "volume": [
            4,
            6,
            4
          ],
          "patch": [
            2,
            2,
            2
          ]
        },
        {
          "id": "long",
          "label": "더 긴 영상",
          "volume": [
            8,
            4,
            6
          ],
          "patch": [
            2,
            2,
            2
          ]
        }
      ]
    },
    "anchors": {
      "kind": "anchors",
      "label": "시간 앵커의 간격 보기",
      "question": "어느 시점의 장면을 정해 주고, 어느 구간을 열어 둘까?",
      "scope": "일곱 시간 위치와 앵커를 직접 정한 계획입니다. 실제 Sora 스토리보드·프레임·영상 생성이나 제품 검증 규칙을 실행하지 않습니다.",
      "options": [
        {
          "id": "sparse",
          "label": "시작과 끝",
          "times": [
            0,
            6
          ]
        },
        {
          "id": "guided",
          "label": "중간에도 앵커",
          "times": [
            0,
            2,
            4,
            6
          ]
        },
        {
          "id": "duplicate",
          "label": "같은 시점 두 조건",
          "times": [
            0,
            2,
            2,
            6
          ]
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

window.AtlasSoraResearchProduct=freeze({...data,views:data.views.map(v=>getView(v.id)),exampleIds:Object.keys(data.examples),getView,select,step,getExample,evaluateCase});
})();
