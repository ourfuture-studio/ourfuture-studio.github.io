/* Dated, source-bound roles and independently computed authored cases. */
(function(){
 'use strict';
 const data={
  "sources": {
    "maml": {
      "title": "Finn·Abbeel·Levine · MAML (2017)",
      "url": "https://proceedings.mlr.press/v70/finn17a/finn17a.pdf",
      "location": "pp.1–3, Fig.1·Algorithm1·§2.2. 적응 후 별도 자료의 손실로 초기화를 학습. 자체 한 변수 제곱 손실은 원논문 실험의 재현이 아님."
    },
    "imitation": {
      "title": "Finn 외 · One-Shot Visual Imitation Learning (2017)",
      "url": "https://proceedings.mlr.press/v78/finn17a/finn17a.pdf",
      "location": "§1·3–4, Algorithm1, Fig.2·5. 시각적 모방과 메타 갱신용 별도 시범, §4.2의 적응 시 행동 라벨 없는 영상 조건. 메타 학습에는 전문가 행동 자료가 필요."
    },
    "pi0": {
      "title": "Physical Intelligence · π0 공개",
      "url": "https://www.pi.website/blog/pi0",
      "location": "2024-10-31 · Our First Generalist Policy. 다양한 로봇 자료와 VLA·flow matching의 방향. 이 기록의 2024년 기준점."
    },
    "pi05": {
      "title": "Physical Intelligence 외 · π0.5 원논문 v1",
      "url": "https://arxiv.org/pdf/2504.16054v1",
      "location": "2025-04-22 · §III–IV, Fig.3, §V·VI, AppendixA–B. 이질 자료 공동 학습·고수준 단계와 연속 행동·평가 조건. Fig.3 PDF p.4를 실제 확인."
    },
    "pi05blog": {
      "title": "Physical Intelligence · π0.5 공식 해설",
      "url": "https://www.pi.website/blog/pi05",
      "location": "2025-04-22 · How does it work / Training and inference / Generalization. 50-step·1초 행동 청크와 새 환경 평가·실패를 설명. 원논문과 같은 연구의 별도 해설."
    },
    "pi07": {
      "title": "Physical Intelligence 외 · π0.7 원논문",
      "url": "https://www.pi.website/download/pi07.pdf",
      "location": "2026-04-16 · §III–V, Fig.1–2, §VII와 coaching 평가 Fig.14–16. 상세 언어·메타데이터·시각 하위 목표와 지원 조건을 구분. 모든 시연을 처음부터 완전 자율로 읽지 않음."
    },
    "pi07blog": {
      "title": "Physical Intelligence · π0.7 공식 해설",
      "url": "https://www.pi.website/blog/pi07",
      "location": "2026-04-16 · Training/Inference와 Compositional task generalization. 언어·메타데이터·시각적 하위 목표로 행동을 지정하며 coaching·후속 fine-tuning 조건을 구분."
    },
    "chunking": {
      "title": "Physical Intelligence · Real-Time Action Chunking",
      "url": "https://www.pi.website/research/real_time_chunking",
      "location": "2025-06-09 · 동기 추론의 지연 문제와 비동기 청크 생성. 아래 버퍼 산술은 해당 알고리즘의 구현·성능 측정이 아님."
    },
    "api": {
      "title": "Physical Intelligence · Pi API beta",
      "url": "https://www.pi.website/blog/api-beta",
      "location": "2026-10-13 · 자료 업로드·미세조정·hosted inference·실패 기반 후속 수집. 공개 beta와 회사가 제시한 제공 경로이며 실제 계정·장치를 연결하지 않음."
    },
    "openpi": {
      "title": "Physical Intelligence · 공식 openpi 저장소",
      "url": "https://github.com/Physical-Intelligence/openpi",
      "location": "조회 2026-11-11 · 모델·학습·추론 안내와 로봇별 입력·변환·설정. 공개 코드와 hosted API를 구분하며 여기서는 코드를 실행하지 않음."
    }
  },
  "views": [
    {
      "id": "learning",
      "label": "01 새 과제에 적응하는 시작점",
      "title": "한 가지 해답보다, 다시 배우기 좋은 연결값을 찾다",
      "intro": "MAML Fig.1·Algorithm1을 참고해 과제별 적응과 그 뒤의 메타 갱신을 나눕니다. 새 과제에서는 연결값이 바뀐다는 점이 문맥만 바꾸는 언어 모형과 다릅니다.",
      "nodes": [
        {
          "id": "prior-tasks",
          "label": "여러 과제를 경험하다",
          "short": "과제 자체가 학습 단위",
          "input": "서로 다른 과제의 적은 자료",
          "role": "MAML은 하나의 과제에만 잘 맞는 해답보다 새 과제에 적응하기 좋은 시작점을 찾으려 했다. 과거의 여러 과제가 그 시작점을 훈련하는 경험이 된다.",
          "output": "과제 분포에서 뽑은 학습 문제",
          "sourceIds": [
            "maml"
          ],
          "icon": "document"
        },
        {
          "id": "initialization",
          "label": "적응하기 좋은 시작점",
          "short": "공유 초기 파라미터 θ",
          "input": "여러 과제를 거친 경험",
          "role": "새 과제의 몇 번의 기울기 갱신이 잘 듣도록 초기 연결값을 조정한다. 모든 과제의 최종 정답을 하나로 평균내는 일과 다르다.",
          "output": "새 과제에 넘길 초기 모형",
          "sourceIds": [
            "maml"
          ],
          "icon": "model"
        },
        {
          "id": "adaptation",
          "label": "적은 자료로 바꾸다",
          "short": "과제 안쪽의 갱신",
          "input": "그 과제의 시범·표본",
          "role": "초기 모형에서 그 과제의 손실을 줄이는 갱신을 수행한다. 이때 파라미터가 실제로 달라지며 GPT의 문맥 예시만 바꾸는 경우와 구별된다.",
          "output": "과제별 적응 파라미터",
          "sourceIds": [
            "maml",
            "imitation"
          ],
          "icon": "tools"
        },
        {
          "id": "heldout",
          "label": "적응 뒤에 확인하다",
          "short": "적응에 쓰지 않은 자료",
          "input": "바꾼 모형과 별도 평가 표본",
          "role": "적응에 쓴 표본만 잘 맞췄는지 보지 않고 과제의 다른 표본에서 손실을 확인한다. 그 결과가 시작점의 좋고 나쁨을 평가하는 근거가 된다.",
          "output": "적응 후 손실",
          "sourceIds": [
            "maml"
          ],
          "icon": "chart"
        },
        {
          "id": "meta-update",
          "label": "시작점을 다시 조정하다",
          "short": "과제를 가로지르는 갱신",
          "input": "여러 과제의 적응 후 손실",
          "role": "각 과제의 적응 과정을 거친 뒤 좋은 결과를 내도록 원래 θ를 업데이트한다. 원논문의 메타 기울기와 자체 한 변수 산술은 계산 규모가 다르다.",
          "output": "다음 적응을 위한 시작점",
          "sourceIds": [
            "maml"
          ],
          "icon": "model"
        },
        {
          "id": "new-task",
          "label": "새 행동을 빨리 익히다",
          "short": "시각적 모방으로의 적용",
          "input": "새 과제의 시범과 관찰",
          "role": "후속 2017년 연구는 적은 시각적 시범으로 새 동작을 익히는 메타 모방 학습을 다뤘다. 기존 과제 경험 없이 한 번 보고 모든 행동을 학습했다는 뜻은 아니다.",
          "output": "조건이 붙은 빠른 적응",
          "sourceIds": [
            "imitation"
          ],
          "icon": "robot"
        }
      ],
      "edges": [
        {
          "id": "prior-tasks-initialization",
          "from": "prior-tasks",
          "to": "initialization",
          "label": "과제 경험",
          "sourceIds": [
            "maml"
          ],
          "kind": "method"
        },
        {
          "id": "initialization-adaptation",
          "from": "initialization",
          "to": "adaptation",
          "label": "시작점 제공",
          "sourceIds": [
            "maml"
          ],
          "kind": "method"
        },
        {
          "id": "adaptation-heldout",
          "from": "adaptation",
          "to": "heldout",
          "label": "별도 자료 확인",
          "sourceIds": [
            "maml"
          ],
          "kind": "method"
        },
        {
          "id": "heldout-meta-update",
          "from": "heldout",
          "to": "meta-update",
          "label": "적응 후 손실",
          "sourceIds": [
            "maml"
          ],
          "kind": "method"
        },
        {
          "id": "meta-update-initialization",
          "from": "meta-update",
          "to": "initialization",
          "label": "시작점 갱신",
          "sourceIds": [
            "maml"
          ],
          "kind": "method"
        },
        {
          "id": "new-task-adaptation",
          "from": "new-task",
          "to": "adaptation",
          "label": "적은 새 시범",
          "sourceIds": [
            "imitation"
          ],
          "kind": "method"
        }
      ],
      "positions": {
        "prior-tasks": [
          140,
          110
        ],
        "initialization": [
          470,
          110
        ],
        "adaptation": [
          800,
          110
        ],
        "heldout": [
          800,
          330
        ],
        "meta-update": [
          470,
          330
        ],
        "new-task": [
          140,
          330
        ]
      },
      "height": 440,
      "initial": "initialization",
      "scope": "원논문 MAML Fig.1을 참고해 직접 그린 역할 그림입니다. 아래 한 변수의 제곱 손실은 다층 신경망·2차 메타 기울기·로봇 실험을 재현하지 않습니다."
    },
    {
      "id": "robot",
      "label": "02 관찰·언어에서 로봇 행동으로",
      "title": "무엇을 하려는지와 몸을 어떻게 움직일지를 함께 표현하다",
      "intro": "π0.5 Fig.3과 공식 추론 설명을 바탕으로 지시·장면, 언어 하위 목표, 연속 행동 청크를 연결합니다. 정책·제어기·현장 검증은 서로 다른 역할입니다.",
      "nodes": [
        {
          "id": "observations",
          "label": "지금의 장면과 몸 상태",
          "short": "카메라·관절·지시",
          "input": "관찰과 자연어 목표",
          "role": "VLA가 행동을 선택하려면 무엇이 보이는지뿐 아니라 어떤 일을 하려는지와 로봇의 상태도 표현해야 한다. 그림은 Pi 계열이 다루는 역할을 단순화한다.",
          "output": "행동에 조건을 주는 입력",
          "sourceIds": [
            "pi05",
            "openpi"
          ],
          "icon": "image"
        },
        {
          "id": "cotrain",
          "label": "이질적인 경험을 함께 배우다",
          "short": "로봇·웹·언어 자료",
          "input": "다른 로봇의 시범·언어·시각 자료",
          "role": "π0.5는 여러 종류의 자료를 함께 학습해 물체의 의미·과제 단계·운동 기술을 연결하려 했다. 하나의 자료 유형만 늘렸다는 설명과 다르다.",
          "output": "시각·언어·행동을 잇는 모형",
          "sourceIds": [
            "pi05",
            "pi05blog"
          ],
          "icon": "model"
        },
        {
          "id": "subtask",
          "label": "다음 하위 목표를 말로",
          "short": "고수준 언어 단계",
          "input": "현재 관찰과 큰 지시",
          "role": "π0.5의 추론은 우선 언어로 된 하위 단계를 만들고 그 단계를 따르는 저수준 행동을 계산한다. 사람이 확인할 수 있는 언어 단계와 실제 모터 명령은 다른 표현이다.",
          "output": "지금 수행할 하위 목표",
          "sourceIds": [
            "pi05",
            "pi05blog"
          ],
          "icon": "document"
        },
        {
          "id": "actions",
          "label": "연속 행동 묶음을 만들다",
          "short": "저수준 action chunk",
          "input": "관찰·하위 목표·행동 표현",
          "role": "π0.5는 연속 행동에 flow matching을 사용한다. 공식 해설의 50-step·1초 청크는 해당 연구 설명이며 현재 모든 Pi API의 고정 사양을 뜻하지 않는다.",
          "output": "앞으로 수행할 짧은 행동열",
          "sourceIds": [
            "pi05",
            "pi05blog"
          ],
          "icon": "robot"
        },
        {
          "id": "controller",
          "label": "장치에 맞게 실행하다",
          "short": "정책과 로봇 제어를 구분",
          "input": "모형의 출력과 로봇 설정",
          "role": "공개 코드에는 로봇별 자료 변환과 추론 설정이 필요하다. 시각화는 실제 관절·속도 제한·충돌 검사·제어기를 연결하지 않으며 모델 출력만으로 현장 안전이 보장되지 않는다.",
          "output": "실행과 다음 관찰",
          "sourceIds": [
            "openpi",
            "chunking"
          ],
          "icon": "tools"
        },
        {
          "id": "new-observation",
          "label": "새 관찰로 다시 판단하다",
          "short": "피드백과 지연",
          "input": "실행 뒤 달라진 장면",
          "role": "행동 중 환경이 바뀌고 추론에는 시간이 걸린다. 2025년 실시간 청크 연구는 이 지연을 다뤘다. 아래의 버퍼 시간 계산은 원논문 알고리즘이나 로봇 실험이 아니다.",
          "output": "다음 추론·평가에 쓸 관측",
          "sourceIds": [
            "chunking",
            "pi05"
          ],
          "icon": "chart"
        }
      ],
      "edges": [
        {
          "id": "observations-cotrain",
          "from": "observations",
          "to": "cotrain",
          "label": "관찰·지시",
          "sourceIds": [
            "pi05"
          ],
          "kind": "method"
        },
        {
          "id": "cotrain-subtask",
          "from": "cotrain",
          "to": "subtask",
          "label": "언어 단계",
          "sourceIds": [
            "pi05"
          ],
          "kind": "method"
        },
        {
          "id": "subtask-actions",
          "from": "subtask",
          "to": "actions",
          "label": "단계에 조건화",
          "sourceIds": [
            "pi05"
          ],
          "kind": "method"
        },
        {
          "id": "actions-controller",
          "from": "actions",
          "to": "controller",
          "label": "장치별 연결",
          "sourceIds": [
            "openpi"
          ],
          "kind": "method"
        },
        {
          "id": "controller-new-observation",
          "from": "controller",
          "to": "new-observation",
          "label": "실행 뒤 관찰",
          "sourceIds": [
            "pi05"
          ],
          "kind": "method"
        },
        {
          "id": "new-observation-observations",
          "from": "new-observation",
          "to": "observations",
          "label": "다시 판단",
          "sourceIds": [
            "chunking"
          ],
          "kind": "method"
        }
      ],
      "positions": {
        "observations": [
          140,
          110
        ],
        "cotrain": [
          470,
          110
        ],
        "subtask": [
          800,
          110
        ],
        "actions": [
          800,
          330
        ],
        "controller": [
          470,
          330
        ],
        "new-observation": [
          140,
          330
        ]
      },
      "height": 440,
      "initial": "cotrain",
      "scope": "π0.5의 학습·추론 역할 개념도입니다. MAML과 Pi 모델의 직접적인 구조 계승을 주장하지 않으며 실제 모형·로봇·API를 실행하지 않습니다."
    },
    {
      "id": "connections",
      "label": "03 인물·회사·API와 평가",
      "title": "연구 모델을 현장에 연결할 때 데이터·장치·운영이 더해진다",
      "intro": "공동연구·회사 연구·2026 API beta를 날짜별로 읽습니다. 기존 연구의 의미와 이후 제품 공개를 구분하며 회사 발표의 시연 조건·한계도 함께 봅니다.",
      "nodes": [
        {
          "id": "chelsea",
          "label": "첼시 핀",
          "short": "공동 연구자의 역할",
          "input": "MAML·Pi 계열의 저자 기록",
          "role": "개인의 연구 질문과 각 논문의 여러 공동 기여를 함께 읽는다. 회사와 제품을 한 연구자의 단독 발명으로 서술하지 않는다.",
          "output": "연구·로봇 플랫폼의 연결",
          "sourceIds": [
            "maml",
            "pi05",
            "pi07"
          ],
          "icon": "person"
        },
        {
          "id": "collaboration",
          "label": "동료들과의 공동 연구",
          "short": "Abbeel·Levine·Pi 연구팀",
          "input": "논문의 공동 저자·기여문",
          "role": "MAML의 Finn·Abbeel·Levine과 Pi 계열의 큰 공동연구팀은 구성과 시점이 다르다. 공동저자 관계를 모두 같은 회사 소속으로 표시하지 않는다.",
          "output": "기존 인물·연구 카드",
          "sourceIds": [
            "maml",
            "imitation",
            "pi05"
          ],
          "icon": "people"
        },
        {
          "id": "pi-company",
          "label": "Physical Intelligence",
          "short": "2024 π0에서 이후 연구로",
          "input": "회사의 연구 공개",
          "role": "이 기록은 2024년 π0 공개를 기준으로 이후 Pi 계열과 제공 경로를 연결한다. MAML의 알고리즘이 Pi 제품의 내부에 그대로 들어갔다고 추정하지 않는다.",
          "output": "자료·학습·모형 개발의 조직",
          "sourceIds": [
            "pi0",
            "pi05"
          ],
          "icon": "company"
        },
        {
          "id": "steering",
          "label": "2026년의 행동 지정",
          "short": "π0.7의 후속 연구",
          "input": "언어·시각 하위 목표·메타데이터",
          "role": "π0.7은 무엇을 할지와 어떻게 할지에 관한 다양한 조건을 학습에 포함한다고 설명한다. 언어 코칭과 후속 미세조정이 들어간 시연을 무조건적인 무시범 성공으로 바꾸지 않는다.",
          "output": "조건에 따라 행동을 지정하는 연구",
          "sourceIds": [
            "pi07",
            "pi07blog"
          ],
          "icon": "model"
        },
        {
          "id": "api-platform",
          "label": "Pi API beta",
          "short": "2026-10 제공 발표",
          "input": "응용 자료·미세조정·hosted inference",
          "role": "공식 beta 글은 자료 업로드, 회사가 관리하는 기반의 미세조정, hosted gateway 추론을 설명한다. 공개 openpi 실행과 hosted API 제공은 구분한다.",
          "output": "응용 개발자가 쓰는 접점",
          "sourceIds": [
            "api",
            "openpi"
          ],
          "icon": "company"
        },
        {
          "id": "field-evaluation",
          "label": "현장에서 확인하고 보완",
          "short": "다음 자료 수집으로",
          "input": "로봇 실행 결과·실패 조건",
          "role": "API 글은 시범 수집→학습→로봇 시험→실패를 보고 다음 수집을 정하는 반복을 소개한다. 개발에 쓴 실패와 독립 최종 평가 자료를 분리해야 한다.",
          "output": "조건별 평가와 다음 경험",
          "sourceIds": [
            "api",
            "pi05"
          ],
          "icon": "chart"
        }
      ],
      "edges": [
        {
          "id": "chelsea-collaboration",
          "from": "chelsea",
          "to": "collaboration",
          "label": "공동 연구",
          "sourceIds": [
            "maml",
            "pi05"
          ],
          "kind": "method"
        },
        {
          "id": "collaboration-pi-company",
          "from": "collaboration",
          "to": "pi-company",
          "label": "Pi 연구팀의 기여",
          "sourceIds": [
            "pi05"
          ],
          "kind": "method"
        },
        {
          "id": "pi-company-steering",
          "from": "pi-company",
          "to": "steering",
          "label": "2026 후속 연구",
          "sourceIds": [
            "pi07"
          ],
          "kind": "method"
        },
        {
          "id": "pi-company-api-platform",
          "from": "pi-company",
          "to": "api-platform",
          "label": "2026 제공 발표",
          "sourceIds": [
            "api"
          ],
          "kind": "announced"
        },
        {
          "id": "api-platform-field-evaluation",
          "from": "api-platform",
          "to": "field-evaluation",
          "label": "자료·학습·현장 반복",
          "sourceIds": [
            "api"
          ],
          "kind": "method"
        }
      ],
      "positions": {
        "chelsea": [
          470,
          110
        ],
        "collaboration": [
          140,
          110
        ],
        "pi-company": [
          470,
          330
        ],
        "steering": [
          140,
          330
        ],
        "api-platform": [
          800,
          330
        ],
        "field-evaluation": [
          800,
          110
        ]
      },
      "height": 440,
      "initial": "collaboration",
      "scope": "조직과 제품 제공은 회사의 공식 발표 범위입니다. 특정 사용 환경의 성능이나 장치 안전을 보장하는 그림이 아닙니다."
    }
  ],
  "examples": [
    {
      "id": "adaptation",
      "label": "적응 전 시작점 비교",
      "question": "각 과제의 해답보다, 적응한 뒤의 결과가 좋은 시작점은?",
      "choices": [
        {
          "id": "left",
          "label": "시작점 −1"
        },
        {
          "id": "balanced",
          "label": "시작점 1"
        },
        {
          "id": "right",
          "label": "시작점 3"
        }
      ],
      "scope": "세 목표·시작점·학습률을 직접 정한 한 변수 제곱 손실입니다. 다층 신경망·원논문 전체 MAML·실제 로봇 학습이나 일반화 결과를 재현하지 않습니다."
    },
    {
      "id": "buffer",
      "label": "추론 도착과 행동 버퍼",
      "question": "이전 명령이 1초 준비되어 있다면, 새 결과가 늦을 때 어떤 공백이 남을까?",
      "choices": [
        {
          "id": "fast",
          "label": "가정 지연 0ms"
        },
        {
          "id": "delayed",
          "label": "가정 지연 120ms"
        },
        {
          "id": "late",
          "label": "가정 지연 1200ms"
        }
      ],
      "scope": "직접 가정한 지연과 준비된 버퍼의 시간 차만 계산합니다. 실제 RTC 알고리즘·API 속도·로봇의 제어 또는 안전을 실행·측정한 결과가 아닙니다."
    }
  ],
  "bridges": [
    {
      "id": "owner",
      "label": "첼시 핀 · 기업·인프라",
      "type": "person",
      "personId": "chelsea-finn",
      "filter": "industry"
    },
    {
      "id": "maml",
      "label": "MAML · 기존 연구",
      "type": "event",
      "eventId": "maml"
    },
    {
      "id": "pi05",
      "label": "π0.5 · 기존 연구",
      "type": "event",
      "eventId": "pi05"
    },
    {
      "id": "levine",
      "label": "공동연구 · Sergey Levine",
      "type": "person",
      "personId": "sergey-levine",
      "filter": "all"
    },
    {
      "id": "abbeel",
      "label": "공동연구 · Pieter Abbeel",
      "type": "person",
      "personId": "pieter-abbeel",
      "filter": "all"
    },
    {
      "id": "fei",
      "label": "비교 읽기 · 페이페이 리·공간 지능",
      "type": "work",
      "personId": "fei-fei-li",
      "workId": "fei-worldlabs-2024",
      "filter": "industry"
    },
    {
      "id": "huang",
      "label": "기반 비교 · 젠슨 황·CUDA",
      "type": "work",
      "personId": "jensen-huang",
      "workId": "huang-cuda-2006",
      "filter": "industry"
    }
  ],
  "title": "Physical Intelligence: 빠르게 배우는 모형에서 로봇의 행동과 배포로",
  "personId": "chelsea-finn",
  "workId": "finn-physical-intelligence-2024"
};
 const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 function calculate(id,choice){
 if(id==='adaptation'){
  const values={left:-1,balanced:1,right:3};if(!Object.hasOwn(values,choice))throw new Error('Unknown adaptation choice');const theta=values[choice],targets=[-2,1,4],alpha=0.25;
  const rows=targets.map((target,i)=>{const gradient=2*(theta-target),adapted=theta-alpha*gradient;return{label:'과제 '+String.fromCharCode(65+i),target,gradient,adapted,before:(theta-target)**2,after:(adapted-target)**2};});
  const average=rows.reduce((s,r)=>s+r.after,0)/rows.length;
  return{id,choiceId:Object.hasOwn(values,choice)?choice:'balanced',type:'adaptation',theta,alpha,rows,headline:'한 번 적응한 뒤 평균 손실 '+average.toFixed(3),formula:'θᵢ′ = '+theta+' − 0.25 × 2('+theta+' − yᵢ)',note:'세 목표값 −2, 1, 4에 대한 직접 구성한 손실입니다. 시작점 1의 평균은 1.500, −1과 3은 2.500입니다. 이 작은 문제의 결과를 실제 로봇 과제의 우열로 일반화하지 않습니다.'};
 }
 if(id==='buffer'){
  const values={fast:0,delayed:120,late:1200};if(!Object.hasOwn(values,choice))throw new Error('Unknown buffer choice');const latency=values[choice],buffer=1000,gap=Math.max(0,latency-buffer);
  return{id,choiceId:Object.hasOwn(values,choice)?choice:'fast',type:'buffer',latency,buffer,gap,headline:'가정한 명령 버퍼 뒤의 공백 '+gap+'ms',formula:'공백 = max(0, '+latency+' − '+buffer+') = '+gap+'ms',note:'기존 명령이 '+buffer+'ms 준비되어 있다는 가정입니다. 공백 0ms가 올바른 행동이나 안전한 실행을 보장하지 않습니다. 실제 추론·제어·네트워크를 측정하지 않습니다.'};
 }
 throw new Error('Unknown authored example');
} 
 const getView=id=>{const view=data.views.find(v=>v.id===id);if(!view)throw new Error('Unknown view');return view;};
 const select=(viewId,id)=>{const v=getView(viewId),node=v.nodes.find(n=>n.id===id);if(!node)throw new Error('Unknown role');return {node,connections:v.edges.filter(e=>e.from===node.id||e.to===node.id)};};
 const step=(viewId,id,delta)=>{if(![-1,1].includes(delta))throw new Error('Direction must be -1 or 1');const v=getView(viewId);select(viewId,id);const at=v.nodes.findIndex(n=>n.id===id);return select(v.id,v.nodes[Math.max(0,Math.min(v.nodes.length-1,at+delta))].id);};
 window.AtlasPiRobotPlatform=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),edges:data.views.flatMap(v=>v.edges),exampleIds:data.examples.map(e=>e.id),getView,select,step,calculate});
})();
