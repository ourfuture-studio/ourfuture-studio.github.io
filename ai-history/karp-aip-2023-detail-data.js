/* Refine only the existing work's summary, caveat and content after catalog-setup. */
(function(){'use strict';
const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="alex-karp");
const w=p?.works.find(w=>w.id==="karp-aip-2023");if(!w)throw new Error('Existing industry work required.');
Object.assign(w,{
  "summary": "AIP는 언어 모델을 기업의 객체·관계·도구·업무 행동에 연결하려 했다.2023 전개 기록과 현재 공식 개발 문서를 구분해,모델의 제안이 권한·검토·실행 기록을 거쳐 업무 변경으로 이어지는 조건을 본다.",
  "caveat": "2023 출시·행사 기록과2026-11-11 조회한 개발 문서는 시점이 다르다. 현재 기능을 모두2023 최초 버전에 소급하지 않는다. 권한·대상·승인의 작은 사례는 직접 만든 규칙이며 실제 AIP 정책·고객 자료·행동·감사 시스템을 실행하지 않는다.",
  "content": {
    "article": {
      "question": "문장을 생성한 AI의 제안을,\n어떻게 실제 업무의 변경으로 연결할까?",
      "opening": [
        "언어 모델이 납기 지연의 원인을 설명하더라도 주문이나 생산 계획이 자동으로 바뀌는 것은 아니다. 어떤 주문과 설비를 말하는지 알아야 하고,사용자가 그 자료와 행동에 접근할 수 있어야 하며,변경의 결과도 남겨야 한다. AIP가 연결하려는 문제는 문장 생성에서 실제 업무의 다음 단계로 넘어가는 이 경계다.",
        "Palantir의2023 연차보고서는 그해 AIP 전개를 시작했다고 적었다. 기존 플랫폼의 자료·업무 기반에 LLM을 결합하려는 제품이었다. 첫 AIPCon의 공식 공지는 Karp의 개회사와 CTO Shyam Sankar의 상세 제품 소개 역할을 구분했다. 이 기록을 개인의 알고리즘 발명이나 새 논문으로 꾸미지 않는다.",
        "현재 공식 설명은 업무의 대상을 객체와 관계로 놓고,모델·함수와 업무 논리를 그 문맥에서 사용한다. 예를 들어 입력 문서가 어느 주문·고객·설비와 연결되는지 찾을 수 있어야 모델의 설명이 구체적인 업무 대상에 닿는다. 데이터의 의미와 모델의 표현을 연결하는 층이 필요한 이유다.",
        "모델의 도구 호출도 별도 실행 경계를 가진다. AIP Logic 문서는 모델이 도구 사용을 요청하고 Logic이 권한 안에서 실행한다고 설명한다. 자료 조회,함수 호출,행동 적용을 같은 자유로운 텍스트 응답으로 취급하지 않고 각각의 기능과 허용 범위로 묶는다.",
        "업무 변경에는 제안을 검토할 지점도 설계할 수 있다. 공식 Action 도판은 통제·검토·시뮬레이션을 나누며 ERP·MES·일정·현장 장치의 변경으로 연결되는 모습을 보여 준다. 제안에서 변경까지의 선택과 결과를 남기면 다음 판단은 이전 선택의 맥락을 참고할 수 있다.",
        "아래에서는 자료·논리·행동,도구의 종류,권한과 기록의 경계를 번갈아 본다. 직접 만든 사례에서는 자료 권한과 대상 범위가 있어야 조회를 허용하고,승인을 더해야 변경을 허용한다. 제품 전체의 보안이나 모든 업무의 정답을 보장하는 규칙이 아니라 경계를 드러내는 작은 업무 흐름이다."
      ],
      "visual": {
        "id": "detail-karp-aip-2023",
        "navLabel": "업무·도구·통제",
        "title": "데이터에서 제안으로,검토한 제안에서 행동으로",
        "caption": "2023 공식 기록과 Palantir Platform overview의 Data·Logic·Actions,Action Connectivity for Human+AI Teaming 도판,Logic의 도구 목록을 참고해 직접 그렸습니다. 현재 문서의 구조를 설명하며2023 화면의 복제나 고객 성과의 재현이 아닙니다."
      },
      "takeaway": {
        "title": "AI의 제안이 업무가 되려면,대상·도구·권한·검토를 연결해야 한다",
        "text": "AIP의 핵심 연결은 문장을 만들 모델과 실제 업무 객체·행동 사이에 있다. 자료를 읽는 권한,변경을 실행하는 조건,출력과 로그를 보호하는 조건을 각각 설계하고 확인한다."
      },
      "technical": {
        "title": "객체·Logic 도구·행동 승인·기록의 경계를 더 읽기",
        "paragraphs": [
          "2023 Form10-K의 Business overview는 AIP 전개 시작과 기존 Gotham/Foundry 및 LLM의 연결을 적었다. 첫 AIPCon 공지는2023-06-01 행사와 고객 시연의 계획을 알린다. 행사 명단의 등장과 실제 고객별 성능·배치 성과는 다른 근거다.",
          "현재 Platform overview는 Data·Logic·Actions를 나누어 설명한다. Data는 객체와 관계의 문맥,Logic은 모델·업무 논리·분석,Actions는 변경을 지속하거나 외부 시스템에 전달할 동작이다. 이 구분을 첫 그림에서 제안과 업무 변경의 경로로 재배치했다.",
          "AIP Logic의 입력은 문자열이나 Ontology 객체일 수 있고,블록의 출력은 다음 블록의 입력이 될 수 있다. 실행을 개발할 때 입력·중간 결과·최종 출력의 범위를 구체화해야 하는 이유다. 현재 Getting started의 구성 화면을2023 최초 화면으로 소급하지 않았다.",
          "Blocks의 Tools는 자료·논리·행동 도구를 구분하며 모델은 도구 사용을 요청하고 플랫폼이 실행한다고 적는다. 직접 본 목록에는 Query objects·Call function·Apply actions·Calculator와 Current date가 있다. 아래 SVG는 그 기능 구분을 옮겼으며 제품 코드를 실행하지 않는다.",
          "Submission criteria는 사용자·파라미터·객체·관계의 조건을 논리문으로 결합해 행동 제출 가능성을 결정한다. 문서의 항공기 변경 사례처럼 업무 규칙은 문장의 그럴듯함과 별개로 확인할 수 있다. 아래의 권한·대상·승인 세 값은 이 카드에서 정한 작은 사례의 조건이다.",
          "Action Connectivity 원도판은 Action controls·reviews·simulations를 나누고 ERP·MES·Scheduler·Edge device의 변경을 그린다. 사람이 모든 호출을 반드시 승인해야 한다는 제품의 단일 규칙이 아니라,검토 지점을 업무에 맞게 설계할 수 있다는 기능 구분으로 읽었다.",
          "현재 Logic 문서는 행·열 접근 통제가 읽는 자료를 거르지만 모델 출력이나 구성한 Ontology 편집에 자동 전파되는 통제는 아니라고 명시한다. 별도 marking/CBAC 등의 전파 설계를 함께 확인해야 한다. 로그 문서도 민감한 내용과 별도 권한·정책·marking 조건을 설명하므로 로그를 모든 사용자가 볼 수 있다고 단정하지 않는다.",
          "자체 규칙은 조회=자료권한∧대상범위,변경=조회∧승인을 계산하고 request→read-allowed/denied→approved-action/no-action의 짧은 기록을 만든다. 승인만 참으로 바꾸어도 자료 권한을 우회할 수 없게 했다. 이 기록은 설명용으로 직접 생성한 문자열이며 실제 제품의 감사 로그 형식이나 고객 승인 체계를 재현하지 않는다."
        ]
      },
      "referencesLabel": "공식 원문과 확인한 위치",
      "evidenceLabel": "개발의 조건과 근거 더 읽기"
    },
    "keyIdeas": [
      {
        "title": "업무 대상을 문맥으로 준다",
        "text": "객체와 관계는 모델의 제안을 주문·설비·고객 같은 구체적 대상에 연결한다."
      },
      {
        "title": "도구 요청과 실행을 나눈다",
        "text": "모델이 제안한 호출은 플랫폼이 정한 도구와 권한 경계를 거친다."
      },
      {
        "title": "제안과 변경을 구분한다",
        "text": "검토와 시뮬레이션을 거친 뒤 어떤 행동을 적용할지 설계할 수 있다."
      },
      {
        "title": "자료·출력·로그의 보호를 따로 본다",
        "text": "읽기 통제가 생성된 출력과 모든 후속 기록에 자동으로 이어진다고 가정하지 않는다."
      },
      {
        "title": "2023 사건과 현재 기능을 나눈다",
        "text": "당시 제품 전개·행사와 이후 발전한 개발 문서의 구조를 날짜에 맞춰 읽는다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "Palantir2023 Form10-K · AIP 전개",
        "url": "https://www.sec.gov/Archives/edgar/data/1321655/000132165524000022/pltr-20231231.htm",
        "location": "Business overview 인쇄pp4–5,AIP 절:2023 전개 시작,기존 플랫폼·LLM·의사결정/피드백/사람 검토.2026-11-11 공식 본문 직접 확인."
      },
      {
        "title": "Palantir 발행 · 첫 AIPCon 공지",
        "url": "https://www.prnewswire.com/news-releases/palantir-announces-live-stream-of-its-first-aipcon-with-ai-demos--announcements-from-25-customers-301835283.html",
        "location": "2023-05-26 발행 본문:6월1일 행사 예정,Karp개회사/Sankar제품 설명,private network와control. 행사·예정과 실제 고객 성과를 구분."
      },
      {
        "title": "Palantir · Data,Logic,Actions",
        "url": "https://www.palantir.com/docs/foundry/platform-overview/overview",
        "location": "2026-11-11 조회 현재 문서의 Data·Logic·Actions. 원도판 Action Connectivity for Human+AI Teaming의 controls/reviews/simulations와ERP/MES/Scheduler/Edge변경 직접 확인."
      },
      {
        "title": "AIP Logic · 입출력과 읽기 경계",
        "url": "https://www.palantir.com/docs/foundry/logic/overview",
        "location": "현재 Overview·Read-time enforcement only:입력/출력/Ontology편집,자동/사람 검토 가능성,읽기 통제와 출력/편집의 전파 한계."
      },
      {
        "title": "AIP Logic · Tools",
        "url": "https://www.palantir.com/docs/foundry/logic/blocks",
        "location": "Use LLM→Tools:모델은 사용 요청,Logic이 권한 안에서 실행. Query objects/Call function/Apply actions/Calculator/Current date 목록 도판 직접 확인."
      },
      {
        "title": "Action types · Submission criteria",
        "url": "https://www.palantir.com/docs/foundry/action-types/submission-criteria",
        "location": "Submission criteria 정의·Conditions and operators·항공기 변경 예:사용자/파라미터/객체·관계 조건으로 제출 규칙 구성."
      },
      {
        "title": "AIP observability · Log permissions",
        "url": "https://www.palantir.com/docs/foundry/aip-observability/log-permissioning",
        "location": "도입·Log access requirements·Markings on log content:로그의 민감 내용,역할+활성정책+로그marking,원자료marking자동전파아님."
      },
      {
        "title": "AIP Logic · 개발의 입력·블록·출력",
        "url": "https://www.palantir.com/docs/foundry/logic/getting-started",
        "location": "Application interface·Inputs,blocks,outputs·Run panel·Branching:현재 개발·시험·검토의 흐름.2023역사화면과 구분."
      }
    ]
  }
});
})();
