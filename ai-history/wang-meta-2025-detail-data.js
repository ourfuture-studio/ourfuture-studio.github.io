/* Refine only the existing work's summary, caveat and content after catalog-setup. */
(function(){'use strict';
const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="alexandr-wang");
const w=p?.works.find(w=>w.id==="wang-meta-2025");if(!w)throw new Error('Existing industry work required.');
Object.assign(w,{
  "summary": "2025년 Wang의 Meta 합류와 Scale에 대한 투자는 데이터·연구 조직·계산 기반·제품 개발을 연결하려는 산업 기록이다. 투자·역할 이동과 후대 모델의 학습·평가·배포를 나누어 개발의 조건을 읽는다.",
  "caveat": "2025-06 Scale 발표와7월 Meta 공식 실적발표의 당시 역할,2026 모델 개발·제품 발표를2026-11-11 확인했다. 소수지분 투자와 기업 인수,조직 책임자와 모델의 기술 저자를 구분한다. Scale의 특정 고객 자료가 Meta 모델에 사용됐다고 추정하지 않는다. 아래 항목·성공률은 직접 만든 예시다.",
  "content": {
    "article": {
      "question": "데이터를 준비하던 산업의 경험은,\n모델을 연구하고 제품으로 만드는 조건과 어떻게 이어질까?",
      "opening": [
        "AI 개발에는 알고리즘을 제안하는 일과 함께 자료를 준비하고,계산을 수행하고,모델을 평가해 사용자에게 제공하는 일이 필요하다.2025년 Wang의 Meta 합류는 이 조건들을 한 연구·제품 조직으로 연결하려는 산업 변화로 읽을 수 있다. 이름이 이동했다는 사실에서 특정 모델의 발명을 바로 추정할 수는 없다.",
        "Scale의2025-06-12 공식 발표는 Meta의 투자와 상업 관계 확대,Wang의 Meta 합류를 나누어 적었다. Wang은 Scale 이사회에 남고 Scale은 독립성을 유지하며 Meta가 소수지분을 갖는다는 설명이었다. 이를 Meta가 Scale 전체를 인수했다거나 모든 고객 자료에 접근한다는 주장으로 바꾸지 않는다.",
        "Meta의 그해7월 공식 실적발표는 MSL의 연구·제품·FAIR 팀과 다음 모델을 개발할 조직을 설명했다. Wang은 전체 팀,Nat Friedman은 AI 제품과 응용 연구,Shengjia Zhao는 새 연구의 chief scientist로 소개됐다. 조직 운영·제품·과학의 역할을 구분하면 누가 어떤 일을 연결하는지 더 구체적으로 볼 수 있다.",
        "후대의2026 Muse Spark 발표는 자료 선별·구조·최적화의 사전학습,강화학습,응답 때 사용하는 추론 계산을 구분했다. 조직이 확보한 자원이 모델의 능력으로 이어지려면 각 단계에서 무엇을 바꾸고 무엇으로 확인할지 정해야 한다. 이 제품 개발 자료를2025의 조직 발표와 연결하되 계약의 비공개 세부를 채워 넣지는 않는다.",
        "공식 학습 도판은 학습 자료에서의 성적과 별도로 둔 평가 자료의 성적을 나란히 보여 준다. 배운 항목의 성공만으로 새 과제의 능력을 판단하기 어렵기 때문이다. 평가 방법 문서의 도구·시도 횟수·채점·비교 환경도 결과를 읽는 조건이 된다.",
        "아래 그림은 조직과 투자,학습과 제공,평가할 자료의 경계를 연결한다. 직접 만든8개 항목에서는 이미 본 항목을 섞을 때와 제외할 때 분모가 어떻게 달라지는지 계산한다. Meta의 실제 점수나 개선 효과를 재현하는 표가 아니라 개발 결과를 어떤 대상으로 판단할지 드러내는 사례다."
      ],
      "visual": {
        "id": "detail-wang-meta-2025",
        "navLabel": "조직·학습·검증",
        "title": "투자와 사람의 이동에서,모델 개발의 조건으로",
        "caption": "Scale2025 공지,Meta Q2 2025 공식 transcript,2026 Muse Spark의 Scaling Axes와 원도판의 학습/별도 평가 구분을 참고해 직접 그렸습니다. 공개된 조직·개발 역할을 연결하며,비공개 고객 자료 이동이나 계약의 실제 데이터 경로를 추정한 그림이 아닙니다."
      },
      "takeaway": {
        "title": "조직의 연결은,자료·학습·평가·제품의 경계를 구체화할 때 이해된다",
        "text": "2025년 투자와 역할 이동은 모델 개발의 조건을 묶는 사건이다. 후대 개발 자료로 각 단계의 문제를 읽되,특정 고객 자료·개인의 단독 발명·독립 성능 향상을 근거 없이 덧붙이지 않는다."
      },
      "technical": {
        "title": "투자 구조·연구 역할·학습과 평가의 조건을 더 읽기",
        "paragraphs": [
          "2025-06 Scale 공지는 Meta의 소수지분 투자,상업 관계 확대,Wang의 Meta 합류와 Scale 이사회 잔류,당시 임시 CEO 지정을 함께 설명한다. 이 카드에서는 금액·기업 가치로 기술 성과를 설명하지 않고,각 문장이 바꾼 조직 관계를 구분했다.",
          "Scale의 독립성과 고객 자료 보호는 회사가 발표한 방침이다. 특정 고객 자료의 이동 여부나 모델별 학습 계약이 공개된 것은 아니므로 어떤 자료가 Muse에 들어갔다고 선을 그리지 않았다. 데이터 기반 기업의 경험과 모델 개발의 필요를 연결한 설명은 계약의 실행 경로와 다르다.",
          "Meta Q2 2025 transcript의pp1–2는 Wang의 전체 팀,Friedman의 제품·응용 연구,Zhao의 과학 책임 역할을 나누고 연구자·인프라·데이터 엔지니어를 언급한다. 같은 문서의 cluster 확장 계획은 당시의 계획으로 읽었다.2026의 실제 가동량·계산 투입량·조직 전체를 그 문서만으로 확인하지 않는다.",
          "2026-04 Muse Spark의 Scaling Axes는 사전학습의 구조·최적화·자료 선별,강화학습,응답 시 추론 계산을 나눈다. 각 단계가 자원을 능력으로 바꿀 개발 지점을 제공한다. 회사가 보고한 효율·성능비를 이 카드의 독립 실험 결과로 다시 계산하지 않았다.",
          "직접 본 Scaling Observations–RL Training 원도판은 가로축log(step),세로축accuracy와pass@1/pass@16의 학습 및 별도 평가를 나란히 놓았다. 이 카드의 도식은 평가 대상을 분리한 구조를 옮겼으며 그래프의 점을 추출하거나 새 성능 곡선을 만들어 붙이지 않았다.",
          "공식 Eval Methodology는 도구 사용·시도 횟수·채점과 비교 모델 환경을 설명하고,일부 제3자 모델은 해당 환경에 맞게 조정되지 않았을 수 있음을 적었다. 점수의 이름만으로 동일한 조건의 비교라고 판단하지 않는 이유다. 자체 사례의75%/50%는 그 문서나 Meta 모델의 값이 아니다.",
          "2026-04 제품 공지는 앱·웹 제공,파트너 API preview와 이후 제공 계획을 나누며5월 업데이트를 별도로 붙였다.2026-11-11의 공식 연구 목록에는 더 후속 버전과 제품 기록이 확인된다. 이 카드는2025 합류의 후속 개발 사례를 다루며4월 모델을 최신 모델이나 모든 이용자의 현재 제공 상태로 부르지 않는다.",
          "작은 사례에서4개는 이미 본 항목,4개는 보지 않은 항목으로 직접 정했다. 앞의4개와 뒤의2개가 성공하면 전체6/8=75%,보지 않은 항목만 고르면2/4=50%다. 대상이0개면0%로 만들지 않고 비율 미정의로 표시한다. 실제 데이터 누수·성능 측정이나 모델 간 비교를 수행한 결과는 아니다."
        ]
      },
      "referencesLabel": "공식 원문과 확인한 위치",
      "evidenceLabel": "개발의 조건과 근거 더 읽기"
    },
    "keyIdeas": [
      {
        "title": "투자·상업 관계·인물 이동을 나눈다",
        "text": "하나의 발표 안에서도 지분 관계와 개인의 역할,자료 계약은 서로 다른 사건이다."
      },
      {
        "title": "운영·제품·과학의 역할을 구분한다",
        "text": "조직 책임자와 제품·응용 연구·과학 책임자의 당시 역할을 각각 확인한다."
      },
      {
        "title": "자료와 계산은 학습 설계와 만난다",
        "text": "사전학습·후학습·응답 추론에서 자원이 어떻게 쓰이는지 단계별로 본다."
      },
      {
        "title": "배운 항목과 새 항목을 나눈다",
        "text": "성공 수뿐 아니라 어떤 항목이 분모에 들어갔는지를 기록한다."
      },
      {
        "title": "연구 결과와 제공 상태에 날짜를 붙인다",
        "text": "2026 발표도 버전·조건·단계가 다르므로 초기 발표를 최신 제공 현황으로 부르지 않는다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "Scale · Meta 투자와 Wang 합류 공지",
        "url": "https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution",
        "location": "2025-06-12 본문 첫5문단:투자·상업 관계·Meta합류/Scale이사회·당시임시CEO·소수지분·독립/고객자료보호방침.2026-11-11직접확인."
      },
      {
        "title": "Meta Q2 2025 · 공식 실적발표 원문",
        "url": "https://s21.q4cdn.com/399680738/files/doc_financials/2025/q2/META-Q2-2025-Earnings-Call-Transcript.pdf#page=1",
        "location": "2025-07-30 transcript pp1–2:MSL구성과Wang/Friedman/Zhao역할·연구자/인프라/데이터엔지니어·당시계산기반확장계획. 원PDF/페이지직접확인."
      },
      {
        "title": "Meta · Personal Superintelligence for Everyone",
        "url": "https://about.fb.com/news/2025/07/personal-superintelligence-for-everyone/",
        "location": "2025-07-30 본문:개인의목표와도구라는비전. 목표와실현을구분하며개인경험·성과로꾸미지않음."
      },
      {
        "title": "Meta · Muse Spark / Scaling Axes",
        "url": "https://ai.meta.com/blog/introducing-muse-spark-msl/",
        "location": "2026-04-08 Scaling Axes:사전학습/자료선별·RL·test-time reasoning. 원본RL이미지실제확인:Train/HeldOut,pass@1/@16,log(step)/accuracy. 회사성능비의독립검증아님."
      },
      {
        "title": "Meta · Muse Spark Eval Methodology",
        "url": "https://ai.meta.com/static-resource/muse-spark-eval-methodology",
        "location": "Overall Methodology/PDF1:도구·시도·제3자비교환경의제약;Per-benchmark details. 현재원문6p직접읽기;자체8항목은해당데이터셋아님."
      },
      {
        "title": "Meta · Muse Spark 제품 공지",
        "url": "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
        "location": "2026-04-08 발표와2026-05-12 업데이트:앱/웹·APIprivatepreview·앱과기기로의확장. 당시상태와계획·후속업데이트구분."
      },
      {
        "title": "Meta AI Research · 조회 시의 후속 기록",
        "url": "https://research.meta.ai/",
        "location": "2026-11-11 목록 직접확인:4월첫발표뒤7–11월후속버전/제품글이존재. 개별새버전의모든기능·이용조건은추정하지않음."
      }
    ]
  }
});
})();
