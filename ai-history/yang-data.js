/* Append one sourced industry record; existing research records are preserved. */
(function(){
'use strict';
const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="yang-zhilin");
if(!person||person.works.some(w=>w.id==="yang-kimi-platform-2025"))throw new Error('Existing profile and unapplied adapter required.');
const work={
  "id": "yang-kimi-platform-2025",
  "year": 2025,
  "dateLabel": "2025년 Kimi K2 공개에서 출발 · 2019 연구·2026 현행 서비스 문서와 구분",
  "title": "Kimi K2·Moonshot AI: 문맥과 도구 사용을 서비스의 작업으로 잇다",
  "summary": "Transformer-XL의 문맥 표현과 K2의 도구 궤적·후학습을 비교하고, 모형의 호출 제안·앱의 실제 실행·결과 메시지·사용자 응답을 연결한다. 개인·팀·회사, 공개 가중치와 현행 API를 근거와 시점에 맞춰 구분한다.",
  "type": "기업·연구 개발·모델·서비스·공식 자료",
  "track": "industry",
  "people": [
    "Zhilin Yang",
    "Zihang Dai"
  ],
  "authorNote": "Transformer-XL 동등 기여자와 K2 기여자 기록을 인물 연결의 근거로 쓴다. K2의 단체저자는 Kimi Team이며 개인별 설계 책임이나 현행 API 전부의 저자를 뜻하지 않는다.",
  "sources": [
    {
      "title": "Dai·Yang 외 · Transformer-XL",
      "url": "https://aclanthology.org/P19-1285.pdf"
    },
    {
      "title": "Kimi Team · Kimi K2 기술보고서 v1",
      "url": "https://arxiv.org/html/2507.20534v1"
    },
    {
      "title": "Moonshot AI · Kimi-K2 공식 저장소",
      "url": "https://github.com/MoonshotAI/Kimi-K2"
    }
  ],
  "caveat": "2025 K2의 연구와 현행 API 문서의 시점을 구분한다. 팀 보고서의 기여자 명단에서 개인별 설계 책임을 추정하지 않는다. 작은 수량·문맥 예산은 자체 사례이며 실제 Kimi 추론·API 호출·토큰 계산이 아니다.",
  "content": {
    "article": {
      "question": "지난 문맥을 읽고 도구의 결과를 다시 참고하는 모델은\n어떻게 실제 작업을 수행하는 서비스로 이어질까?",
      "opening": [
        "문장을 길게 읽는 능력과 일을 끝내는 능력은 같지 않다. 앞 문맥의 의미를 이어 읽어야 하고, 필요하면 계산이나 검색을 요청한 뒤 그 결과를 다음 판단에 넣어야 한다. 양즈린의 기존 연구에서 출발해 모형과 애플리케이션이 이 역할을 어떻게 나누는지 살펴본다.",
        "Transformer-XL은 고정 길이 구간이 문맥을 끊는 문제를 다뤘다. 앞 구간에서 계산한 은닉 상태를 다음 구간이 참고하게 하고 상대 위치를 표현했다. 사람의 기억을 그대로 복제했다는 주장보다, 문맥을 넘겨줄 계산상의 표현을 어떻게 설계했는지가 핵심이다.",
        "2025 Kimi K2 보고서는 다른 규모와 설계의 언어 모형을 제시했다. 도구 명세와 과제, 결과를 판정할 기준을 만들고 에이전트가 환경과 상호작용한 궤적을 수집해 후학습에 쓰는 흐름을 설명했다. 자연 문장을 많이 읽는 데서 한 걸음 더 나아가, 어떤 행동을 고르고 그 결과로 다음 판단을 이어갈지 배울 경험을 구성한 것이다.",
        "행동을 배우는 과정과 실제 함수를 실행하는 주체도 다르다. 모형이 도구 이름과 인자를 제안해도 창고 합계를 읽거나 외부 시스템을 호출하는 일은 애플리케이션 코드가 맡는다. 실행 결과를 메시지로 돌려주어야 모형이 그 결과를 다음 응답에 참고할 수 있다.",
        "모형·팀·회사는 한 줄의 이름으로 합칠 수 없다. K2의 저자는 Kimi Team이며 부록은 Yang을 포함한 기여자를 적는다. 공식 저장소는 Moonshot AI 팀의 개발을 설명하고, CMU는 Yang과 Yuxin Wu의 Kimi 공동 개발을 소개한다. 개인의 참여 기록과 전체 알고리즘의 책임은 별도로 읽는다.",
        "공개 가중치를 받아 사용하는 길과 호스팅 API를 호출하는 길은 제공 조건부터 다르다. 현행 문서는 후속 모형으로 업데이트되어 있으므로 이 카드는 2025 K2의 연구 기록과 2026-11-11에 확인한 서비스 규약을 구분한다. 아래 사례는 실제 API를 호출하지 않고 문맥과 실행의 역할을 직접 구성해 본다."
      ],
      "visual": {
        "id": "kimi-model-service",
        "navLabel": "문맥·도구·서비스",
        "title": "기억할 표현과 행동의 궤적, 실행을 맡는 애플리케이션을 잇다",
        "caption": "Transformer-XL Fig.2와 Kimi K2 Fig.8, 공식 API의 도구 호출 과정을 참고한 자체 개념도입니다. 모형의 호출 제안과 앱의 실제 실행을 나누고, 직접 정한 수량·문맥 예산을 바꾸어 결과를 살펴보세요. 실제 모델 추론·학습·외부 API 호출은 하지 않습니다."
      },
      "takeaway": {
        "title": "지능의 표현과, 실제 시스템에서 행동하는 경로를 함께 설계한다",
        "text": "이전 문맥을 쓸 표현, 도구와 상호작용하며 배울 자료, 제안을 실행하고 결과를 되돌려주는 앱은 서로 다른 역할이다. 팀의 논문과 공개 가중치·호스팅 서비스의 근거를 나누면 연구의 아이디어가 사용자의 작업으로 이어지는 조건을 더 구체적으로 읽을 수 있다."
      },
      "evidenceLabel": "논문과 서비스 역할 더 읽기",
      "referencesLabel": "원논문·공식 저장소·API 규약·대학의 기록",
      "technical": {
        "title": "모델 구조·후학습·API의 상태와 개인 기여를 구분하기",
        "paragraphs": [
          "Transformer-XL의 ACL 2019 원문은 Dai와 Yang의 동등 기여를 적는다. §3.2·Fig.2는 앞 구간에서 계산한 은닉 상태를 고정해 다음 구간의 참고 문맥으로 연결한다. §3.3의 상대 위치는 상태를 다시 사용할 때 두 위치의 관계를 해석할 수 있게 하는 장치다.",
          "K2의 MoE는 입력 토큰에 대해 선택된 전문가를 이용하는 큰 모형의 구성을 다룬다. 사전학습은 문장·코드·지식에서 일반적인 예측의 기반을 마련하고, 뒤의 행동 학습이 활용할 표현을 만든다. 보고서는 자료 처리와 계산 예산을 그 설계의 조건으로 함께 기술한다.",
          "MuonClip은 큰 모형을 학습할 때 생기는 수치 불안정을 다루는 선택이다. 보고서는 attention의 query·key로 생기는 큰 logit을 신호로 삼아 가중치의 크기를 조절하는 방법을 설명한다. 배울 표현을 안정적으로 갱신할 계산의 조건도 모델 연구의 일부라는 점을 보여 준다.",
          "Fig.8의 첫 단계는 실제·합성 도구 명세를 모으고, 도구 조합과 과제를 만드는 것이다. 각 과제에는 성공 여부를 볼 판정 기준을 연결한다. 에이전트가 어떤 도구를 선택해야 하는지와 그 선택이 과제에 맞는지를 함께 기록할 수 있게 만든 구성이다.",
          "이어지는 과정에서는 사용자·에이전트·도구 실행 환경이 여러 차례 상호작용하고, 판정자가 그 궤적을 기준에 따라 검토한다. 보고서는 시뮬레이션의 규모와 실제 실행 환경의 피드백을 함께 이용했다고 설명한다. 선택·실행·결과의 연결을 배울 자료를 구성하는 발상이다.",
          "K2의 후학습은 이렇게 만든 행동 자료와 강화학습·평가를 연결한다. Base와 Instruct를 나누어 공개한 것도 준비된 기본 모형과 지시·도구 행동을 다듬은 모형의 이용 목적을 드러낸다. 어떤 종류의 경험과 판단 기준을 더할지가 단순한 문장 예측 이후의 과제로 이어진다.",
          "현행 Tool Calls 문서는 함수 이름·인자·호출 식별자가 모형의 메시지로 반환되는 흐름을 설명한다. 실제 함수는 애플리케이션이 실행한다. 제안과 실행을 나누면, 모델이 무엇을 하려 했는지와 외부 시스템이 어떤 결과를 냈는지를 각각 확인할 수 있다.",
          "앱은 실행 결과를 role=tool 메시지와 호출 식별자로 되돌린다. 모형은 그 결과를 새 문맥에 포함해 답하거나 다음 도구를 제안한다. 아래의 단계 선택에서는 같은 수량도 호출 제안, 로컬 합계, 결과 메시지, 설명에서 어떤 형태로 놓이는지 따라가 볼 수 있다.",
          "다중 대화의 이력은 앱이 messages에 구성한다. 사용자 질문·모형 응답·도구 결과를 다음 요청에 함께 보내야 앞의 사건이 이번 판단의 근거가 된다. 문맥 예산 사례는 어떤 정보를 넣을 때 크기가 늘어나는지 드러내어, 과거 정보와 현재 과제 사이의 선택을 보게 한다.",
          "서비스의 Context Caching은 반복해서 보내는 prefix를 재사용하는 효율화 방법이다. 원문·도구 설명·규칙처럼 잘 바뀌지 않는 부분을 안정된 순서로 놓고 질문·도구 결과처럼 변하는 부분을 뒤에 놓는 이유를 이해할 수 있다. 논문의 내부 상태 재사용과 API 제공 시스템의 역할을 각각 읽는 지점이다.",
          "공식 저장소의 공개 가중치·코드는 직접 준비할 실행 환경과 라이선스 조건으로 연결되고, 호스팅 API는 서비스의 요청 인터페이스로 연결된다. Yang의 Transformer-XL 저자·K2 기여자 기록, CMU가 소개한 Kimi 공동 개발과 Moonshot AI 팀의 제공을 나누면 인물·팀·회사·앱이 맡는 역할이 선명해진다.",
          "2025 K2 보고서와 2026-11-11 현행 API 문서의 최신 모형·한도·기능은 시점이 다르다. K2가 Transformer-XL 전체 구조를 계승했다고 추정하지 않는다. 아래 수량·호출 메시지·문맥 단위는 직접 정했고 실제 Kimi 추론·학습·API·tokenizer를 실행하지 않는다. 개인별 K2 설계 책임도 기여자 명단만으로 정하지 않는다."
        ]
      }
    },
    "keyIdeas": [
      {
        "title": "문맥은 계산할 표현이어야 한다",
        "text": "이전 구간의 상태를 다시 쓰는 내부 방법과 앱이 메시지 이력을 보내는 서비스 방법을 나누어 읽는다."
      },
      {
        "title": "행동을 배울 자료가 필요하다",
        "text": "도구 명세와 상호작용의 궤적을 학습·평가에 연결한 연구의 발상을 살펴본다."
      },
      {
        "title": "호출 제안과 실제 실행을 구분한다",
        "text": "모형은 구조화된 요청을 제안하고 앱이 실행한다. 실행 결과가 새 입력으로 돌아오는 순환이 필요하다."
      },
      {
        "title": "개인·팀·공개·제공을 따로 잇는다",
        "text": "공동저자·기여자 명단과 회사·가중치·API의 역할은 다르다. 확인한 근거와 시점에 맞추어 연결한다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "Dai·Yang 외 · Transformer-XL",
        "url": "https://aclanthology.org/P19-1285.pdf",
        "location": "ACL 2019 pp.2978–2988 · 동등 기여 주석, §3.2–3.3, Fig.2. 이전 구간의 고정된 상태 재사용과 상대 위치. Fig.2 원도판 실제 검토."
      },
      {
        "title": "Kimi Team · Kimi K2 기술보고서 v1",
        "url": "https://arxiv.org/html/2507.20534v1",
        "location": "2025년 보고서 · §2 사전학습, §3.1·Fig.8–9 도구 궤적 생성, §3.2 강화학습, Appendix A 기여자·B 도구 형식. Fig.8 원도판 실제 검토."
      },
      {
        "title": "Moonshot AI · Kimi-K2 공식 저장소",
        "url": "https://github.com/MoonshotAI/Kimi-K2",
        "location": "README의 Base/Instruct 구분, 모델 요약, 도구 사용·배포 안내. 공식 팀의 공개이며 자체 예시가 실제 모델 평가 결과라는 뜻은 아님."
      },
      {
        "title": "Kimi API · Tool Calls",
        "url": "https://platform.kimi.ai/docs/guide/use-kimi-api-to-complete-tool-calls",
        "location": "2026-11-11 현행 문서 · tool_calls 제안, 애플리케이션의 함수 실행, role=tool 결과 반환. 모델이 실제 도구를 대신 실행하지 않는다고 명시."
      },
      {
        "title": "Kimi API · Multi-turn Chat",
        "url": "https://platform.kimi.ai/docs/guide/engage-in-multi-turn-conversations-using-kimi-api",
        "location": "현행 문서의 stateless API, messages의 질문·응답 보관, 대화 이력과 길이 제어. 현재 예시는 K3.1이며 K2의 과거 사양으로 옮기지 않음."
      },
      {
        "title": "Kimi API · Context Caching",
        "url": "https://platform.kimi.ai/docs/guide/context-caching",
        "location": "현행 문서의 반복 요청 prefix 재사용과 메시지 순서. 서비스 캐시는 Transformer-XL의 학습 구조와 다른 계층이며 특정 2025 K2 구현으로 단정하지 않음."
      },
      {
        "title": "Kimi API · 현행 Quickstart",
        "url": "https://platform.kimi.ai/docs/get-your-api-key",
        "location": "조회 2026-11-11. 옛 Moonshot K2 quickstart 주소는 이 문서로 이동. 현행 K3.1 모델·API 진입과 2025 K2 공개 기록을 구분."
      },
      {
        "title": "CMU · AI Research Transforms Industries",
        "url": "https://magazine.cs.cmu.edu/ai-research-transforms-industries",
        "location": "CMU 대학 공식 기사 · 2026-11-11 조회. Zhilin Yang(SCS 2019)과 Yuxin Wu(SCS 2016)의 Kimi 공동 개발을 소개. 이 문장으로 개인별 K2 알고리즘 책임을 추정하지 않음."
      },
      {
        "title": "Kimi-K2 · 공식 라이선스",
        "url": "https://github.com/MoonshotAI/Kimi-K2/blob/main/LICENSE",
        "location": "2025 Modified MIT License. 가중치·코드 공개와 호스팅 API 접근 조건을 구분. 이 화면은 모델을 다운로드하거나 실행하지 않음."
      }
    ]
  }
};
person.tagline="긴 문맥과 도구 사용 연구에서, 모델·앱·서비스의 연결로";
person.intro="Transformer-XL에서 긴 문맥을 연결하는 표현을 연구했고, Kimi K2 기여자 명단에 참여가 기록되어 있다. 문맥의 계산과 도구 사용 후학습을 출발점으로 Moonshot AI 팀의 공개 모형과 서비스 경로를 연결해 본다.";
if(!person.tags.includes('industry'))person.tags.push('industry');person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
window.ATLAS_YANG_INDUSTRY_REVISION={personId:person.id,workId:work.id,visualId:"kimi-model-service",sourceVersion:'0.49'};
})();
