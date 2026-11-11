/* Refine only the existing work's summary, caveat and content after catalog-setup. */
(function(){'use strict';
const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="jensen-huang");
const w=p?.works.find(w=>w.id==="huang-gtc-2025");if(!w)throw new Error('Existing industry work required.');
Object.assign(w,{
  "summary": "GTC2025의 칩·네트워크·저장·Dynamo 발표를 요청이 실제 응답으로 이어지는 시스템의 역할로 읽는다. 모델의 계산, 이전 문맥의 재사용, 요청 배치와 제품의 공급 계획을 구분한다.",
  "caveat": "2025-03 발표의 제품·계획·회사 성능 주장과2026-11-11에 읽은 원문을 구분한다. 아래 비용과 라우팅 규칙은 직접 정한 사례이며 실제 Dynamo의 정책·GPU 지연·수익이나 현재 공급 여부를 검증하지 않는다.",
  "content": {
    "article": {
      "question": "큰 모델을 준비한 뒤에도,\n왜 요청을 보낼 장치와 기억·연결을 함께 골라야 할까?",
      "opening": [
        "사용자가 문장을 보내면 준비된 모델은 그 문맥을 처리하고 다음 토큰을 만든다. 여러 사용자의 요청이 동시에 들어오면 어떤 장치에 보내고, 앞에서 계산한 문맥을 어디서 다시 쓸지 정해야 한다. 큰 GPU가 있다는 사실만으로 요청이 사용자에게 응답으로 돌아오는 경로가 완성되지는 않는다.",
        "GTC2025에서 Huang이 발표한 범위는 칩을 넘어섰다. 공식 정리는 Blackwell과 후속 Blackwell Ultra, 연결망·저장 기반과 추론 소프트웨어를 함께 놓았다. 산업 발표의 핵심을 어떤 부품이 더 크다는 소개보다 계산·자료·요청의 경계를 함께 설계하려는 문제로 읽을 수 있다.",
        "Dynamo의 당시 발표는 문맥을 처리하는 단계와 응답을 생성하는 단계를 서로 다른 GPU에 배치하는 disaggregated serving을 설명했다. 두 단계의 자원 요구를 따로 조정하려는 발상이다. 단계가 나뉘면 그 사이의 상태와 문맥을 옮길 연결도 개발의 일부가 된다.",
        "앞 요청의 계산을 담은 KV cache도 경로 선택의 단서가 된다. 발표는 cache의 위치를 파악하고 새 요청에 맞는 장치로 보내 재계산을 줄이는 방식을 설명한다. 자료를 이미 가진 곳, 대기 중인 요청, 상태를 옮길 부담이 어떤 관계를 이루는지 살펴볼 질문이다.",
        "네트워크와 저장 발표는 이 경계를 바깥으로 넓힌다. 여러 장치가 함께 일할 통신과, 기업 자료를 찾아 추론에 연결하는 저장 기반이 필요하다. 이 역할들을 연결해야 학습된 표현이 사용자의 서비스 요청과 업무 자료에 닿을 수 있다.",
        "발표에 등장한 제품·소프트웨어의 기능 설명과 출시 예정, 회사가 주장한 성능비는 같은 근거가 아니다. 아래에서는 역할을 먼저 나누고, 두 후보의 작은 비용표를 바꾸어 선택이 달라지는지 본다. 공식 발표의 구조를 읽는 자체 사례이며 실제 제품의 라우터나 성능 측정을 실행하지 않는다."
      ],
      "visual": {
        "id": "detail-huang-gtc-2025",
        "navLabel": "계산·요청·발표의 조건",
        "title": "GPU 한 개에서, 요청과 문맥이 흐르는 시스템으로",
        "caption": "2025-03-18 공식 발표와 Dynamo의 공식 개념 이미지(API Server·GPU Planner·Smart Router·Cache Manager·Communication Library)를 참고해 직접 재배치했습니다. 역할을 고르고, 직접 정한 두 후보의 재계산·전송·대기 비용을 비교하세요."
      },
      "takeaway": {
        "title": "추론을 제공하려면 계산의 위치와 자료의 경로도 설계해야 한다",
        "text": "GTC2025의 발표는 계산·기억·통신·저장·요청 배치를 한 시스템의 다른 역할로 연결한다. 기능과 제공 계획을 날짜에 맞춰 읽고, 직접 만든 비용표는 그 선택의 질문을 드러내는 데 쓴다."
      },
      "technical": {
        "title": "요청 배치·KV cache·발표 시점을 더 읽기",
        "paragraphs": [
          "2025-03-18 Blackwell Ultra 발표는 rack-scale 설계와 scale-out 연결을 함께 다룬다. 이 카드에서는 실제 GPU 수나 성능비를 다시 계산하지 않고, 계산 장치를 연결한 시스템이라는 설계 단위를 읽는다.",
          "Dynamo 발표의 disaggregated serving은 문맥을 처리하는 단계와 토큰을 생성하는 단계를 분리한다고 적는다. 한 요청의 앞단 계산과 이어지는 생성이 어떤 자료를 주고받는지 설계해야 한다는 점에 초점을 둔다.",
          "Inference Supercharged 절은 이전 요청에서 형성한 KV cache의 위치를 파악하고, 새 요청을 적합한 GPU로 라우팅해 재계산을 피하는 설명이다. 실제 KV cache는 단순한 답안 저장소가 아니라 모델 추론의 중간 상태다.",
          "공식 Dynamo 이미지는 API Server·GPU Planner·Smart Router·Cache Manager·Communication Library를 층으로 표현한다. 둘째 그림은 이 다섯 이름과 GPU 자원을 읽기 쉽게 다시 배치한 역할도이며 실제 호출 순서나 전체 코드의 복제는 아니다.",
          "Spectrum-X/Quantum-X photonics 발표는 대규모 연결의 광학·전자 부품과 공급 생태계를 다룬다. 같은 발표의 Availability는 서로 다른 제공 예정 시점을 적으므로, 연결 기술의 구상과 당시 계획을 한 번에 실현된 배치로 읽지 않는다.",
          "AI Data Platform 발표는 기업 저장 자료에 접근할 query agent, 검색·추출과 계산·네트워크의 조합을 설명한다. 기업 자료의 접근 가능성과 응답의 실제 정확성은 별도 검증이 필요한 조건이다.",
          "직접 만든 비용표는 각 후보의 재계산·전송·대기라는 세 수를 더해 최솟값을 고른다. cache가 가깝더라도 대기가 커지면 다른 후보가 선택된다. 모든 숫자는 가정한 단위이고 실제 Dynamo가 같은 목적함수나 스케줄을 사용한다는 설명은 아니다.",
          "GTC 정리의 당시 생산 상태와 Blackwell Ultra·photonics의 제공 예정을 날짜별로 읽었다. 원문을2026-11-11에 다시 확인했어도 그것만으로 모든 예정의 현재 이행·성능·가격을 확인한 것은 아니다. 현재 사용 판단에는 해당 버전과 제공 문서를 다시 확인해야 한다."
        ]
      },
      "referencesLabel": "공식 원문과 확인한 위치",
      "evidenceLabel": "개발의 조건과 근거 더 읽기"
    },
    "keyIdeas": [
      {
        "title": "계산 장치와 서비스는 다른 층이다",
        "text": "모델의 연산과 요청 수용·배치·응답의 제공을 각각 설계한다."
      },
      {
        "title": "문맥 처리와 생성을 따로 배치한다",
        "text": "Dynamo 발표의 disaggregated serving은 서로 다른 단계의 자원 요구를 분리해 조정하려는 발상이다."
      },
      {
        "title": "기억의 위치가 경로를 바꾼다",
        "text": "KV cache를 다시 쓸 위치와 상태를 옮길 부담을 함께 본다."
      },
      {
        "title": "통신·저장은 연산의 바깥 조건이다",
        "text": "자료를 읽고 이동시킬 수 있어야 여러 GPU와 기업 데이터가 서비스의 일부가 된다."
      },
      {
        "title": "발표의 종류마다 근거를 붙인다",
        "text": "당시 공급 상태·예정·기능·성능 주장을 나누며, 현재 상태나 독립 검증으로 옮기지 않는다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "NVIDIA · GTC2025 공식 정리",
        "url": "https://blogs.nvidia.com/blog/nvidia-keynote-at-gtc-2025-ai-news-live-updates/",
        "location": "2025-03-25 Wrap-Up: Key Points. 제품·기반·후속 계획을 묶은 발표 정리.2026-11-11 본문 확인; 성능·시장 수치를 독립 결과로 재인용하지 않음."
      },
      {
        "title": "NVIDIA · Blackwell Ultra 발표",
        "url": "https://nvidianews.nvidia.com/news/nvidia-blackwell-ultra-ai-factory-platform-paves-way-for-age-of-ai-reasoning",
        "location": "2025-03-18: rack-scale design,scale-out infrastructure,Availability와Software Innovations. 발표 당시 기능·하반기 제공 예정을 구분."
      },
      {
        "title": "NVIDIA · Dynamo 발표",
        "url": "https://nvidianews.nvidia.com/news/nvidia-dynamo-open-source-library-accelerates-and-scales-ai-reasoning-models",
        "location": "2025-03-18 도입·Disaggregated Serving. 문맥 처리/생성 분리,조정·통신과 지원 framework 설명."
      },
      {
        "title": "Dynamo · Inference Supercharged",
        "url": "https://nvidianews.nvidia.com/news/nvidia-dynamo-open-source-library-accelerates-and-scales-ai-reasoning-models",
        "location": "Inference Supercharged: KV cache 위치와 요청 라우팅. 공식 개념 이미지의 API Server/GPU Planner/Smart Router/Cache Manager/Communication Library 실제 확인."
      },
      {
        "title": "NVIDIA · Photonics 연결 발표",
        "url": "https://nvidianews.nvidia.com/news/nvidia-spectrum-x-co-packaged-optics-networking-switches-ai-factories",
        "location": "2025-03-18 A Networked Ecosystem·Availability. Quantum-X의 당시2025예정과Spectrum-X의2026예정; 현재 공급 확인으로 소급하지 않음."
      },
      {
        "title": "NVIDIA · AI Data Platform 발표",
        "url": "https://nvidianews.nvidia.com/news/nvidia-and-storage-industry-leaders-unveil-new-class-of-enterprise-infrastructure-for-the-age-of-ai",
        "location": "2025-03-18 도입·AI Data Platform Adds Accelerated Computing and AI to Storage. 기업 자료·query agent·추출/검색의 관계. 회사 성능비는 독립 검증하지 않음."
      }
    ]
  }
});
})();
