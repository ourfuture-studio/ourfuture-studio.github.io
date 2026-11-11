/* Refine only the existing work's summary, caveat and content after catalog-setup. */
(function(){'use strict';
const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="elon-musk");
const w=p?.works.find(w=>w.id==="musk-openai-2015");if(!w)throw new Error('Existing industry work required.');
Object.assign(w,{
  "summary": "2015년 OpenAI는 연구자·계산 자원·공개와 협력의 규칙을 묶어 장기 AI 연구를 수행할 기관을 만들려 했다. Musk의 당시 공동의장·후원 역할과 연구 책임자의 역할을 나누어 읽는다.",
  "caveat": "2015·2018 공식 문서의 당시 조직과 정책을 다룬다. 설립 발표는 논문이나 모델의 기술 발명 증거가 아니며, 지원 약정을 실제 지출이나 현재 역할로 바꾸어 읽지 않는다. 아래 근거 판별은 직접 만든 논리 규칙이다.",
  "content": {
    "article": {
      "question": "더 일반적인 지능을 연구하려면,\n연구자와 자원을 어떤 기관으로 묶어야 할까?",
      "opening": [
        "지능을 구현하는 새 방법은 연구를 이어갈 사람과 계산 자원도 필요로 한다. 2015년 OpenAI의 설립 발표는 더 넓은 범위의 지적 과제를 연구할 기관을 만들고, 연구 성과가 누구에게 돌아갈지를 조직의 목적과 연결했다. 이 카드의 대상은 새 알고리즘보다 그 연구를 지속할 조건이다.",
        "발표는 문제마다 알고리즘을 손으로 다시 작성하는 방식과, 자료에 따라 표현을 배우는 딥러닝을 대비했다. 동시에 당시 능력이 좁은 과제에 머물렀다고 설명했다. 특정 과제의 성공에서 일반 지능으로 바로 건너가기보다 여러 과제와 한계를 계속 탐구할 연구기관이 필요하다는 문제 설정이었다.",
        "당시 문서는 연구 책임자 Ilya Sutskever, 기술 책임자 Greg Brockman, 연구 엔지니어·과학자와 자문진을 구분했다. Musk와 Sam Altman은 공동의장으로, 여러 개인·기관은 후원자로 등장한다. 연구 방향·개발 실행·운영과 지원은 서로 연결되지만 같은 직무는 아니다.",
        "기관의 출력도 모델 하나로 한정하지 않았다. 논문·블로그·코드의 공개를 장려하고 다른 기관과 협력하며 기업과 기술을 연구·배치하겠다는 방침을 적었다. 연구 결과를 검토하고 이어 사용할 통로를 기관 설계의 일부로 둔 셈이다.",
        "2018년 후원자 발표는 사람과 계산 자원에 대한 투자를 늘리는 다음 단계를 설명하며 Musk의 이사회 이탈을 알렸다. 같은 문서의 연구·응용, 자문, 이사회 명단을 함께 읽으면 설립 당시의 이름표를 이후 모든 시점에 그대로 붙일 수 없다는 점이 드러난다.",
        "아래 그림은 목적에서 연구·자원·공유로 이어지는 구조와 두 날짜의 역할을 나눈다. 근거 판별에서는 출처가 있다는 조건에 더해 그 문장이 말한 날짜와 동사가 주장에 맞는지 확인한다. 개인의 유명세 대신 어떤 역할을 어느 문서가 뒷받침하는지 추적하는 방식이다."
      ],
      "visual": {
        "id": "detail-musk-openai-2015",
        "navLabel": "연구기관·역할·시점",
        "title": "연구의 아이디어를 지속할 조직의 조건",
        "caption": "Introducing OpenAI(2015)의 목적·연구진·후원·공개 방침과 OpenAI supporters(2018)의 변화 기록을 직접 도식화했습니다. 원문에는 이 회로 그림이 없습니다. 선은 공개된 역할의 연결이며 자금 흐름의 실측이나 개인의 기술 공헌을 뜻하지 않습니다."
      },
      "takeaway": {
        "title": "일반 지능의 연구에는, 방법을 지속할 기관도 필요했다",
        "text": "2015년 발표가 묶은 것은 연구진·자원·공유·협력의 규칙이다. Musk의 공동의장·지원 역할은 이 기관의 기록으로 읽고, 개별 모델의 발명과 현재 직책은 각자의 근거로 확인한다."
      },
      "technical": {
        "title": "연구기관의 자원·공유 규칙과 역할의 시점을 더 읽기",
        "paragraphs": [
          "Introducing OpenAI의 Background는 과제별 탐색의 성공이 기대했던 일반성으로 바로 이어지지 않았다는 회고에서 출발한다. 딥러닝의 자료 기반 학습을 유망한 접근으로 설명하지만, 설립 문서 자체가 일반 지능을 달성한 결과 보고는 아니다.",
          "Looking forward의 좁은 능력과 장래의 이익·위험 설명은 연구의 목표와 동기를 제시한다. 이 카드에서는 당시 목표가 기관의 설계로 어떻게 옮겨졌는지 읽는다. 능력에 관한 전망을 검증된 미래 사실로 제시하지 않는다.",
          "OpenAI 절의 공개 방침은 논문·블로그·코드를 서로 다른 전달 형식으로 열거한다. 연구를 계속하려면 결과를 다른 사람이 검토할 수 있어야 한다는 관점으로 연결했으며, 모든 후속 모델이나 자료가 무조건 공개된다는 현재 정책으로 확대하지 않았다.",
          "2015년 명단에서 Sutskever는 research director, Brockman은 CTO, Altman과 Musk는 co-chairs다. 이 구분은 공동 설립에 참여한 사실에서 각 논문·모델의 설계자를 추정하지 않도록 한다. 기술 공헌은 해당 논문과 개발 문서의 저자·역할로 확인해야 한다.",
          "후원 문단은 지원의 약정을 설명하고 초기 지출 전망을 별도로 적는다. 약정과 지출은 발생 시점과 회계 의미가 다르다. 여기서는 금액을 성능의 원인이나 실제 투입량으로 사용하지 않고 연구 자원 확보의 구조만 도식화했다.",
          "2018-02-20 공식 발표는 Musk의 이사회 이탈과 당시 기부·자문에 관한 계획을 함께 적었다. 그 문장을2026년의 현직·기부 이행·자문 활동의 확인으로 옮기지 않는다. 연구·응용과 사람·계산 자원의 관계는 같은 문단의 직접 설명에 근거한다.",
          "Charter의 Cooperative orientation은 연구 공개와 안전·보안에 따른 공개 방식의 변화를 함께 다룬다. 설립 당시의 공개 지향과 이후의 조정 원칙을 연결해 읽을 자료다. 이 페이지의 공통 메뉴나 최신 제품명은2015년 본문의 사건이 아니다.",
          "직접 만든 판별표에서 출처 확인은 첫 조건이고, 문장의 날짜·동사까지 주장과 일치하는지가 두 번째 조건이다. 두 조건의 논리곱을 계산하면 출처가 있어도 과도하게 넓힌 주장은 제외된다. 이는 조직의 공식 심사나 실제 법률·회계 판단을 실행하는 규칙이 아니다."
        ]
      },
      "referencesLabel": "공식 원문과 확인한 위치",
      "evidenceLabel": "개발의 조건과 근거 더 읽기"
    },
    "keyIdeas": [
      {
        "title": "방법과 연구기관을 함께 설계한다",
        "text": "새 표현을 탐구할 사람·계산·운영의 연결을 장기 연구의 조건으로 둔다."
      },
      {
        "title": "역할마다 다른 근거를 붙인다",
        "text": "연구 책임자·CTO·공동의장·후원자라는 원문의 역할을 서로 바꾸지 않는다."
      },
      {
        "title": "공개는 연구의 다음 입력이다",
        "text": "논문·블로그·코드를 공유하면 다른 사람이 검토하고 이어 연구할 통로가 생긴다."
      },
      {
        "title": "약정과 실행을 나누어 읽는다",
        "text": "지원하기로 한 자원과 실제 지출·완료된 개발은 별도 기록이 필요하다."
      },
      {
        "title": "조직은 날짜를 가진다",
        "text": "2015년의 공동의장 기록과2018년의 이사회 변경을 각각의 시점에 고정한다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "OpenAI · Introducing OpenAI / Background",
        "url": "https://openai.com/index/introducing-openai/",
        "location": "2015-12-11 Background·Looking forward: 과제별 방법과 일반성의 문제,자료 기반 딥러닝·당시 좁은 능력.2026-11-11 본문 확인."
      },
      {
        "title": "Introducing OpenAI · 기관의 목적",
        "url": "https://openai.com/index/introducing-openai/",
        "location": "도입·OpenAI 절 첫 두 문단: 당시 비영리 연구기관의 목적,장기 연구·공개·협력 방침."
      },
      {
        "title": "Introducing OpenAI · 당시 역할",
        "url": "https://openai.com/index/introducing-openai/",
        "location": "OpenAI 절: research director Sutskever,CTO Brockman,연구진·자문진,co-chairs Altman/Musk. 기술 발명 저자와 구분."
      },
      {
        "title": "Introducing OpenAI · 후원의 약정",
        "url": "https://openai.com/index/introducing-openai/",
        "location": "마지막 후원자 문단: 지원 약정과 초기 지출 전망이 별도 표현됨. 금액을 실제 투입·성과로 사용하지 않음."
      },
      {
        "title": "OpenAI · OpenAI supporters",
        "url": "https://openai.com/index/openai-supporters/",
        "location": "2018-02-20 Musk의 이사회 이탈 문단,사람·계산 자원 투자와 연구/robotics/Dota 문단,당시 Board 명단. 현재 상태로 소급하지 않음."
      },
      {
        "title": "OpenAI Charter · 공개와 협력",
        "url": "https://openai.com/charter/",
        "location": "Cooperative orientation·Long-term safety: 협력/공공재/연구 공개와 안전·보안에 따른 공개 조정의 원칙. 현재 본문 확인;2015실행 결과 아님."
      }
    ]
  }
});
})();
