/* Append one sourced industry record; existing research records are preserved. */
(function(){
'use strict';
const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="william-peebles");
if(!person||person.works.some(w=>w.id==="peebles-sora-development-2024"))throw new Error('Existing profile and unapplied adapter required.');
const work={
  "id": "peebles-sora-development-2024",
  "year": 2024,
  "dateLabel": "2024년 Sora 연구·제품 공개에서 출발 · 2023–2026 연구·개발·종료 맥락",
  "title": "DiT에서 Sora로: 영상의 표현을 창작 도구와 개발로 잇다",
  "summary": "DiT의 잠재 패치 표현과 Sora의 시공간 토큰을 출발점으로, 입력·생성·편집·검토·출처·제공 상태의 역할을 연결한다. 공동저자와 제품 팀의 기여, 2024·2025 공개와 2026 종료를 공식 기록으로 나눈다.",
  "type": "기업·연구 개발·모델·서비스·공식 자료",
  "track": "industry",
  "people": [
    "William Peebles",
    "Saining Xie",
    "Tim Brooks"
  ],
  "authorNote": "Peebles·Xie의 DiT 공동연구와 2024 Sora 보고서 저자 중 Peebles·Brooks를 연결한다. 후속 제품·안전·운영은 조직의 기록이며 전 세대의 개인별 책임이나 현재 소속을 뜻하지 않는다.",
  "sources": [
    {
      "title": "Peebles·Xie · DiT 원논문",
      "url": "https://openaccess.thecvf.com/content/ICCV2023/papers/Peebles_Scalable_Diffusion_Models_with_Transformers_ICCV_2023_paper.pdf"
    },
    {
      "title": "DiT · 공식 구현 저장소",
      "url": "https://github.com/facebookresearch/DiT"
    },
    {
      "title": "OpenAI · Sora 최초 기술보고",
      "url": "https://openai.com/index/video-generation-models-as-world-simulators/"
    }
  ],
  "caveat": "공동저자와 팀·회사의 역할을 구분한다. 실제 모델·API는 실행하지 않으며 직접 정한 수·격자·시간 앵커의 산술은 원논문 성능의 재현이 아니다. 제품의 현재 가용성은 날짜별 공식 종료 안내와 구분해 읽는다.",
  "content": {
    "article": {
      "question": "한 장의 그림을 만드는 연구는 어떻게\n움직임을 배우는 모델과 창작 도구로 이어졌을까?",
      "opening": [
        "사람은 한 장의 사진 밖에서도 장면이 이어진다고 생각한다. 공이 가려졌다 다시 보이면 같은 공으로 읽고, 다음 움직임을 예상한다. 영상 생성 연구가 던진 질문은 이런 시간의 관계를 기계가 배울 표현으로 어떻게 바꿀지다. Peebles와 동료들의 연구를 이 질문과 제품 개발의 경로로 연결해 본다.",
        "DiT는 이미지의 잠재 표현을 패치로 나누고 Transformer로 처리했다. 알려진 이미지에 노이즈를 더한 입력과 시간 단계·클래스 조건을 주어, 노이즈를 예측하는 관계를 학습했다. 여러 패치가 서로 참고하는 계산을 확산 생성에 넣어, 표현과 계산 규모를 함께 확장하려 한 공동연구다.",
        "2024년 Sora 기술보고는 영상의 공간과 시간을 압축한 뒤 시공간 패치를 토큰처럼 다루는 발상을 설명했다. 문장 조건과 노이즈가 있는 패치에서 깨끗한 패치를 예측하도록 배웠다. 한 장의 그림을 만드는 데서 나아가 시간에 걸친 시각 자료의 관계를 함께 다루려는 방향이다. 이미지와 길이·비율이 다른 영상도 이 표현 틀에 놓을 수 있었다.",
        "연구 결과를 창작 도구로 옮길 때에는 입력 방식이 더해진다. 2024년 말 제품은 문장·이미지·영상과 스토리보드로 의도를 지정하고 후보를 편집하는 흐름을 제시했다. 무엇을 만들지 정하고 결과를 고치는 사용자의 활동이, 학습된 모형을 이용하는 실제 접점이 된 것이다.",
        "개발에는 모델 밖의 역할도 필요했다. 공식 시스템 카드는 창작자의 피드백, 위험 평가와 입출력 처리의 계층을 기술한다. 출처 정보는 생성 경로를 읽을 단서지만 영상 내용이 참인지, 물리적 상황이 맞는지를 보증하지 않는다. 그럴듯한 생성과 검증된 세계 모형은 구분해야 한다.",
        "연구 공개는 제품의 출시와 종료로 이어지는 역사 속에 놓인다. 2024년 연구·Sora Turbo, 2025년 Sora 2를 거쳐 공식 안내는 web·app의 2026년 4월 26일 종료와 API의 9월 24일 종료를 명시한다. 이 흐름에서 Peebles의 논문 공동저자 기록, Sora 공동연구팀과 제품 조직의 역할을 각각의 근거로 연결한다."
      ],
      "visual": {
        "id": "sora-research-product",
        "navLabel": "표현·개발·팀 연결",
        "title": "배울 수 있는 영상의 표현에서, 의도를 다루는 창작 도구로",
        "caption": "DiT 원논문의 Fig.3와 Sora의 공식 기술보고·제품·시스템 카드를 참고해 직접 구성했습니다. 선택한 역할의 입출력·출처를 읽고, 패치 수와 시간 앵커를 직접 정한 사례로 비교하세요. 실제 영상을 생성하거나 모델 성능을 측정하지 않습니다."
      },
      "takeaway": {
        "title": "지각할 경험을 표현하고, 결과를 다룰 개발의 접점을 만든다",
        "text": "DiT와 Sora는 시각 자료를 계산 가능한 표현과 조건부 생성으로 연결했다. 제품은 입력·편집·평가·출처·제공 상태를 더했다. 논문에서 확인한 방법과 회사가 설명한 제품, 직접 구성한 사례를 나누면 연구가 어디까지 공개되었고 무엇이 남는지 읽을 수 있다."
      },
      "evidenceLabel": "연구와 제품의 기록 더 읽기",
      "referencesLabel": "원논문·기술보고·제품·종료의 공식 자료",
      "technical": {
        "title": "2023 논문·2024 연구·제품·후속 제공의 시점을 나누어 읽기",
        "paragraphs": [
          "DiT의 최초 프리프린트는 2022년, 이 카드가 읽은 학회 원문은 ICCV 2023이다. Fig.3과 §3은 작은 잠재 패치를 토큰으로 만들고 조건을 넣은 Transformer 블록으로 처리한 뒤 출력으로 되돌리는 구성을 보여 준다. 계산의 중심을 Transformer로 바꾸어 모델 크기와 패치 수가 생성에 미치는 영향을 살핀 연구다.",
          "Sora의 공개 설명은 공간과 시간을 줄이는 압축 네트워크, 잠재 공간의 시공간 패치, 화면으로 복원하는 디코더를 연결한다. 이 표현을 쓰면 이미지 한 장도 시간 길이가 하나인 자료로 놓을 수 있다. 자료마다 모양이 달라도 공통된 계산 단위로 다룰 길을 만든 것이다.",
          "시공간 패치의 배열은 생성할 영상의 길이와 화면 비율에도 연결된다. 2024 보고서는 자료를 모두 같은 정사각형으로 잘라 맞추기보다 원래의 비율로 학습하는 방식을 설명한다. 사진의 구도와 영상의 시간 범위를 표현에서 보존하려는 선택으로 읽을 수 있다.",
          "보고서의 캡션 생성과 입력 확장은 문장과 시각 자료를 연결하는 역할이다. 장면을 자세히 설명하는 학습 캡션을 만들고, 짧은 사용자 입력을 더 자세한 조건으로 바꾸어 영상 모형에 전달했다고 기술한다. 문장의 지시와 눈앞의 시각 변화 사이에 학습 신호를 만드는 과정이다.",
          "영상에서 중요한 것은 프레임 하나의 모습뿐 아니라 시간에 따른 상태다. 보고서는 물체가 가려진 뒤에도 이어지는 사례와 함께 유리의 파손·먹는 행동·긴 영상의 일관성 실패도 제시했다. 이 양쪽을 함께 읽어야 시각적 그럴듯함과 세계의 상호작용을 설명하는 능력을 구분할 수 있다.",
          "2024년 말 회사가 공개한 Sora Turbo는 2월 연구 미리보기에서 제품으로 옮겨간 별도 버전이다. 문장·이미지·영상을 입력으로 받고 확장·리믹스·혼합하는 접점을 제공했다. 사용자가 모형의 결과를 고르고 다시 조건을 주는 순환이 창작 도구의 작업 흐름을 이룬다.",
          "스토리보드는 시간 위에 의도를 배치하는 인터페이스다. 시작과 끝만 지정할 때와 중간 장면까지 지정할 때 남는 구간이 달라진다. 아래의 시간 앵커 사례는 그 차이를 수와 격자로 드러내며, 모델이 채워야 할 장면과 사용자가 정한 조건의 위치를 함께 보게 한다.",
          "제품 개발에는 창작자의 피드백과 평가·완화 계층도 참여했다. 2024 시스템 카드는 초기 창작자 사용 경험과 외부 검토, 데이터 전처리와 입력·출력 처리의 역할을 나누어 기술한다. 학습된 생성기 하나에서 끝나지 않고 실제 사용 조건을 다루는 시스템이 더해진 경로다.",
          "당시 제품 발표의 C2PA와 워터마크는 만들어진 영상에 출처를 연결하는 장치다. 사용자는 생성된 경로의 단서를 얻고, 물리적 일관성이나 내용의 사실성은 그와 별도의 기준으로 검토해야 한다. 출처·품질·내용 판단이 제품에서 각각 맡는 역할을 나누어 볼 수 있다.",
          "2025년 Sora 2 발표는 영상과 동기화한 음성, 장면 지시와 상태 유지의 향상을 후속 제품의 방향으로 설명했다. 시스템 카드는 그 버전의 입력·출력과 배포 조건을 적는다. 2024 연구의 표현을 출발점으로 삼되 후속 버전이 공개한 범위와 평가를 그 시점에 맞추어 읽는다.",
          "2026-11-11에 확인한 공식 안내는 web·app의 4월 26일 종료와 API의 9월 24일 종료를 구분한다. DiT의 Peebles·Xie 공동저자, 2024 Sora 보고서의 Bill Peebles를 포함한 13명, 제품 조직의 발표를 함께 놓으면 연구 기여와 제품의 생애가 어떤 경로로 연결되는지 읽을 수 있다.",
          "원보고는 전체 Sora 구조·압축 비율·학습 설정을 공개하지 않았다. 아래 패치 크기·올림·시간 앵커·중복 표시는 직접 정한 산술이며 실제 영상 생성·제품 검증이나 성능 재현이 아니다. 개인의 현재 소속·후속 제품 전부의 책임과 현재 서비스 가용성은 과거 저자 명단·출시 자료에서 추정하지 않는다."
        ]
      }
    },
    "keyIdeas": [
      {
        "title": "표현을 바꾸면 다룰 문제도 넓어진다",
        "text": "다양한 시각 경험을 잠재 표현과 패치로 다루는 발상은 연구의 연결이다. 전체 후속 모형이 이전 논문의 코드와 동일하다는 설명은 아니다."
      },
      {
        "title": "시간 위의 의도도 입력이 된다",
        "text": "스토리보드는 장면의 특정 시점에 조건을 두는 접점이다. 생성 후보와 사용자의 의도를 연결하는 도구를 함께 읽는다."
      },
      {
        "title": "생성과 검토·제공은 다른 역할이다",
        "text": "그럴듯한 결과를 만드는 모형과 평가·편집·출처·운영의 역할을 구분하면 연구가 제품으로 옮겨가는 조건을 볼 수 있다."
      },
      {
        "title": "공개와 종료도 개발 역사의 일부다",
        "text": "2024 연구와 제품, 2025 후속 모형, 2026 서비스 종료를 날짜별로 나눈다. 과거 자료가 남아 있다는 사실이 현재 가용성을 뜻하지 않는다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "Peebles·Xie · DiT 원논문",
        "url": "https://openaccess.thecvf.com/content/ICCV2023/papers/Peebles_Scalable_Diffusion_Models_with_Transformers_ICCV_2023_paper.pdf",
        "location": "ICCV 2023, pp.4195–4205 · Fig.3, §3.1–3.2. 2022년 최초 프리프린트와 2023년 학회 출판을 구분. 원문 Fig.3 실제 검토."
      },
      {
        "title": "DiT · 공식 구현 저장소",
        "url": "https://github.com/facebookresearch/DiT",
        "location": "공식 README의 논문·모델·학습·샘플링 설명. 구현 공개와 이 화면의 자체 산술을 구분. 조회 2026-11-11."
      },
      {
        "title": "OpenAI · Sora 최초 기술보고",
        "url": "https://openai.com/index/video-generation-models-as-world-simulators/",
        "location": "2024-02-15 · Turning visual data into patches, Video compression network, Spacetime latent patches, Scaling transformers, Language understanding, Discussion, Authors. 구현 상세가 공개되지 않았다는 원문의 범위."
      },
      {
        "title": "OpenAI · Sora is here",
        "url": "https://openai.com/index/sora-is-here/",
        "location": "2024-12-09 · Sora Turbo 제품·입력 편집·스토리보드와 당시 한계. 현재 페이지의 2026-04-26 제품 종료 고지도 함께 확인."
      },
      {
        "title": "OpenAI · Sora System Card",
        "url": "https://openai.com/index/sora-system-card/",
        "location": "2024-12-09 · Overview, Model Data, Risk Identification, Mitigation Stack, Acknowledgements. 창작자 피드백과 배포 계층은 모델 구조와 별도."
      },
      {
        "title": "OpenAI · Sora 2 is here",
        "url": "https://openai.com/index/sora-2/",
        "location": "2025-09-30 · 후속 영상·음성 모형과 앱의 당시 공개. 2024년 모형 사양으로 소급하지 않음. 현재 페이지의 종료 고지 확인."
      },
      {
        "title": "OpenAI · Sora 2 System Card",
        "url": "https://deploymentsafety.openai.com/sora-2",
        "location": "2025-09-30 · Overview, Model Data, Safety Stack. 입출력 처리와 안전 계층에 관한 회사의 설명이며 완전한 안전성의 독립 증명이 아님."
      },
      {
        "title": "OpenAI · Sora discontinuation",
        "url": "https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation",
        "location": "2026-11-11 조회 공식 도움말. Sora web/app은 2026-04-26, API는 2026-09-24 종료라고 명시. 제품·API의 시점을 구분."
      },
      {
        "title": "OpenAI · Sora 2 Prompting Guide",
        "url": "https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide",
        "location": "공식 개발자 문서의 샷·행동·카메라·시간에 대한 프롬프트 설명. 후속 제품의 사용 예시이며 2024 모형 내부 구현이나 현재 서비스 가용성을 뜻하지 않음."
      }
    ]
  }
};
person.tagline="DiT·Sora의 시각 표현에서, 창작 도구와 개발의 경로로";
person.intro="이미지의 잠재 표현을 Transformer로 다룬 DiT와 영상의 시공간 패치를 설명한 2024 Sora 보고서의 공동연구자다. 논문·코드·기술보고에 드러난 표현의 발상과 창작 도구로 옮겨간 개발 기록을 함께 읽는다.";
if(!person.tags.includes('industry'))person.tags.push('industry');person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
window.ATLAS_PEEBLES_INDUSTRY_REVISION={personId:person.id,workId:work.id,visualId:"sora-research-product",sourceVersion:'0.49'};
})();
