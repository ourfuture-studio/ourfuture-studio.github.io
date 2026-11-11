/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "karp-aip-2023",
  "kind": "aip",
  "sources": {
    "historic": {
      "title": "Palantir2023 Form10-K · AIP 전개",
      "url": "https://www.sec.gov/Archives/edgar/data/1321655/000132165524000022/pltr-20231231.htm",
      "location": "Business overview 인쇄pp4–5,AIP 절:2023 전개 시작,기존 플랫폼·LLM·의사결정/피드백/사람 검토.2026-11-11 공식 본문 직접 확인."
    },
    "aipcon": {
      "title": "Palantir 발행 · 첫 AIPCon 공지",
      "url": "https://www.prnewswire.com/news-releases/palantir-announces-live-stream-of-its-first-aipcon-with-ai-demos--announcements-from-25-customers-301835283.html",
      "location": "2023-05-26 발행 본문:6월1일 행사 예정,Karp개회사/Sankar제품 설명,private network와control. 행사·예정과 실제 고객 성과를 구분."
    },
    "platform": {
      "title": "Palantir · Data,Logic,Actions",
      "url": "https://www.palantir.com/docs/foundry/platform-overview/overview",
      "location": "2026-11-11 조회 현재 문서의 Data·Logic·Actions. 원도판 Action Connectivity for Human+AI Teaming의 controls/reviews/simulations와ERP/MES/Scheduler/Edge변경 직접 확인."
    },
    "logic": {
      "title": "AIP Logic · 입출력과 읽기 경계",
      "url": "https://www.palantir.com/docs/foundry/logic/overview",
      "location": "현재 Overview·Read-time enforcement only:입력/출력/Ontology편집,자동/사람 검토 가능성,읽기 통제와 출력/편집의 전파 한계."
    },
    "blocks": {
      "title": "AIP Logic · Tools",
      "url": "https://www.palantir.com/docs/foundry/logic/blocks",
      "location": "Use LLM→Tools:모델은 사용 요청,Logic이 권한 안에서 실행. Query objects/Call function/Apply actions/Calculator/Current date 목록 도판 직접 확인."
    },
    "criteria": {
      "title": "Action types · Submission criteria",
      "url": "https://www.palantir.com/docs/foundry/action-types/submission-criteria",
      "location": "Submission criteria 정의·Conditions and operators·항공기 변경 예:사용자/파라미터/객체·관계 조건으로 제출 규칙 구성."
    },
    "logs": {
      "title": "AIP observability · Log permissions",
      "url": "https://www.palantir.com/docs/foundry/aip-observability/log-permissioning",
      "location": "도입·Log access requirements·Markings on log content:로그의 민감 내용,역할+활성정책+로그marking,원자료marking자동전파아님."
    },
    "development": {
      "title": "AIP Logic · 개발의 입력·블록·출력",
      "url": "https://www.palantir.com/docs/foundry/logic/getting-started",
      "location": "Application interface·Inputs,blocks,outputs·Run panel·Branching:현재 개발·시험·검토의 흐름.2023역사화면과 구분."
    }
  },
  "views": [
    {
      "id": "workflow",
      "label": "01 문장에서 업무로",
      "title": "Data·Logic·Actions의 연결",
      "intro": "현재 공식 구조를 주문·설비 등 업무 대상을 다룰 역할로 펼칩니다.",
      "initial": "proposal",
      "layout": "layers",
      "nodes": [
        {
          "id": "objects",
          "label": "업무 객체·관계",
          "input": "자료 속 주문·설비·사람",
          "role": "대상과 관계의 문맥을 구성해 무엇을 다루는지 식별한다.",
          "output": "구체화된 업무 문맥",
          "sourceIds": [
            "platform"
          ],
          "x": 110,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "logic-block",
          "label": "모델·업무 논리",
          "input": "문맥과 이번 요청",
          "role": "모델·함수·규칙을 업무 문맥에서 조합한다.",
          "output": "분석과 제안",
          "sourceIds": [
            "platform",
            "logic"
          ],
          "x": 350,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "proposal",
          "label": "변경 제안",
          "input": "도구 요청과 후보 변경",
          "role": "언어 모델의 출력과 실제 적용할 변경을 분리해 검토할 수 있다.",
          "output": "검토할 후보",
          "sourceIds": [
            "platform",
            "logic"
          ],
          "x": 590,
          "y": 100,
          "icon": "document"
        },
        {
          "id": "operator",
          "label": "사람의 검토",
          "input": "제안과 예상 결과",
          "role": "공식 도판의review/simulation은 적용 전에 검토할 지점을 보여 준다.",
          "output": "선택·수정·승인",
          "sourceIds": [
            "platform"
          ],
          "x": 350,
          "y": 300,
          "icon": "people"
        },
        {
          "id": "action",
          "label": "업무 행동",
          "input": "허용된 변경",
          "role": "Actions는 데이터나 외부 시스템의 상태 변경을 연결한다.",
          "output": "지속되는 변경",
          "sourceIds": [
            "platform",
            "criteria"
          ],
          "x": 590,
          "y": 300,
          "icon": "gate"
        },
        {
          "id": "outcome",
          "label": "결과의 관찰",
          "input": "선택과 이후 자료",
          "role": "선택의 결과를 다음 판단에 연결할 기반이다. 실제 학습이나 효과는 별도로 검증한다.",
          "output": "다음 판단의 문맥",
          "sourceIds": [
            "platform"
          ],
          "x": 820,
          "y": 200,
          "icon": "loop"
        }
      ],
      "edges": [
        [
          "objects",
          "logic-block",
          "문맥"
        ],
        [
          "logic-block",
          "proposal",
          "후보"
        ],
        [
          "proposal",
          "operator",
          "검토"
        ],
        [
          "operator",
          "action",
          "적용 조건"
        ],
        [
          "action",
          "outcome",
          "관찰"
        ]
      ],
      "sourceNote": "공식Data/Logic/Actions와Action원도판을 재배치한 자체 업무도"
    },
    {
      "id": "tools",
      "label": "02 도구의 다른 역할",
      "title": "모델의 요청과 플랫폼의 실행",
      "intro": "직접 본 공식 도구 목록에서 자료·논리·행동을 구분했습니다.",
      "initial": "logic-executor",
      "layout": "layers",
      "nodes": [
        {
          "id": "llm-request",
          "label": "모델의 도구 요청",
          "input": "입력·사용 가능한 도구",
          "role": "모델은 도구 사용을 요청하며 직접 권한을 만들어 내지 않는다.",
          "output": "구성된 호출",
          "sourceIds": [
            "blocks"
          ],
          "x": 110,
          "y": 100,
          "icon": "document"
        },
        {
          "id": "logic-executor",
          "label": "Logic 실행 경계",
          "input": "도구 요청과 호출 권한",
          "role": "플랫폼이 정한 권한 안에서 호출을 실행한다.",
          "output": "도구별 결과",
          "sourceIds": [
            "blocks",
            "logic"
          ],
          "x": 350,
          "y": 100,
          "icon": "gate"
        },
        {
          "id": "query",
          "label": "Query objects",
          "input": "조회할 객체·속성",
          "role": "허용된 자료를 문맥으로 읽는 역할이다.",
          "output": "조회 결과",
          "sourceIds": [
            "blocks",
            "logic"
          ],
          "x": 590,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "function",
          "label": "Call function",
          "input": "함수 입력",
          "role": "선택한 함수를 실행해 논리의 결과를 받는 역할이다.",
          "output": "함수 결과",
          "sourceIds": [
            "blocks",
            "development"
          ],
          "x": 110,
          "y": 300,
          "icon": "grid"
        },
        {
          "id": "apply",
          "label": "Apply actions",
          "input": "제안한 편집",
          "role": "설정한 행동으로 Ontology변경을 연결하는 역할이다.",
          "output": "변경의 요청",
          "sourceIds": [
            "blocks",
            "criteria"
          ],
          "x": 590,
          "y": 300,
          "icon": "loop"
        },
        {
          "id": "calculator",
          "label": "계산·현재 날짜",
          "input": "도구 목록의 기능",
          "role": "공식 목록은 계산과 현재 날짜도 별도 도구로 둔다. 이 카드 자체 규칙은 브라우저에서만 계산한다.",
          "output": "제한된 도구 기능",
          "sourceIds": [
            "blocks"
          ],
          "x": 820,
          "y": 200,
          "icon": "chart"
        }
      ],
      "edges": [
        [
          "llm-request",
          "logic-executor",
          "요청"
        ],
        [
          "logic-executor",
          "query",
          "조회"
        ],
        [
          "logic-executor",
          "function",
          "논리"
        ],
        [
          "logic-executor",
          "apply",
          "행동"
        ],
        [
          "logic-executor",
          "calculator",
          "계산"
        ]
      ],
      "sourceNote": "현재 공식Logic도구 목록의 역할 재배치 · 실제 도구 호출 아님"
    },
    {
      "id": "controls",
      "label": "03 통제와 기록의 경계",
      "title": "조회·변경·로그를 각각 확인하기",
      "intro": "현재 문서는 읽기 통제와 후속 출력·로그 보호의 차이를 명시합니다.",
      "initial": "read-boundary",
      "layout": "layers",
      "nodes": [
        {
          "id": "read-boundary",
          "label": "읽는 자료의 권한",
          "input": "행·열·객체·속성 범위",
          "role": "조회할 수 있는 자료를 거른다. 생성 출력에 자동 전파되는 모든 보호를 뜻하지 않는다.",
          "output": "허용된 입력",
          "sourceIds": [
            "logic",
            "blocks"
          ],
          "x": 110,
          "y": 100,
          "icon": "gate"
        },
        {
          "id": "submission",
          "label": "행동 제출 조건",
          "input": "사용자·파라미터·업무 조건",
          "role": "논리문으로 행동 제출 가능성을 결정할 수 있다.",
          "output": "변경 가능한 범위",
          "sourceIds": [
            "criteria"
          ],
          "x": 350,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "review-point",
          "label": "검토·시뮬레이션",
          "input": "후보 변경과 예상 결과",
          "role": "적용 전 사람에게 검토할 지점을 설계할 수 있다. 모든 기능의 강제 승인이라는 뜻은 아니다.",
          "output": "선택한 변경",
          "sourceIds": [
            "platform",
            "logic"
          ],
          "x": 590,
          "y": 100,
          "icon": "people"
        },
        {
          "id": "output-protection",
          "label": "출력의 보호",
          "input": "생성문·편집된 자료",
          "role": "원자료의 읽기 통제만으로 후속 보호를 단정하지 않고 전파 설계를 함께 본다.",
          "output": "별도 보호 조건",
          "sourceIds": [
            "logic",
            "blocks"
          ],
          "x": 110,
          "y": 300,
          "icon": "document"
        },
        {
          "id": "log-boundary",
          "label": "로그 접근",
          "input": "민감한 입력·실행 내용",
          "role": "로그도 역할·활성정책·로그marking의 조건으로 다룬다. 모든 사용자에게 공개되지 않는다.",
          "output": "검토 가능한 기록",
          "sourceIds": [
            "logs"
          ],
          "x": 590,
          "y": 300,
          "icon": "memory"
        },
        {
          "id": "rule-example",
          "label": "자체 규칙·기록",
          "input": "권한·대상·승인3값",
          "role": "아래 표는 논리곱과 짧은 자체 기록을 계산해 경계를 보여 준다.",
          "output": "조회/변경/차단",
          "sourceIds": [
            "criteria",
            "logs"
          ],
          "x": 820,
          "y": 200,
          "icon": "loop"
        }
      ],
      "edges": [
        [
          "read-boundary",
          "submission",
          "다른 조건"
        ],
        [
          "submission",
          "review-point",
          "검토 가능성"
        ],
        [
          "read-boundary",
          "output-protection",
          "후속 보호"
        ],
        [
          "review-point",
          "log-boundary",
          "기록"
        ],
        [
          "log-boundary",
          "rule-example",
          "경계 읽기"
        ]
      ],
      "sourceNote": "현재 문서의 보호 범위 구분 · 자체 규칙은 제품 보안 전체의 재현 아님"
    }
  ],
  "cases": [
    {
      "id": "denied",
      "label": "자료 권한 없음",
      "permission": false,
      "objectAllowed": true,
      "approved": true,
      "explanation": "0∧1=0이므로 조회를 차단합니다. 승인이 있어도 앞의 자료 경계를 건너뛰지 않습니다."
    },
    {
      "id": "scope",
      "label": "대상 범위 밖",
      "permission": true,
      "objectAllowed": false,
      "approved": true,
      "explanation": "1∧0=0입니다. 자료 기능의 권한이 있어도 이번 대상이 범위 밖이면 이 사례에서는 조회·변경 모두 차단합니다."
    },
    {
      "id": "review",
      "label": "조회 후 검토 대기",
      "permission": true,
      "objectAllowed": true,
      "approved": false,
      "explanation": "조회는1,변경은1∧0=0입니다. 제안에 필요한 자료 접근과 실제 변경을 나누었습니다."
    },
    {
      "id": "approved",
      "label": "변경을 승인",
      "permission": true,
      "objectAllowed": true,
      "approved": true,
      "explanation": "조회와 승인이 모두1이라 변경 조건을 통과하고 자체 기록에 approved-action을 남깁니다. 실제 업무 변경은 하지 않습니다."
    }
  ],
  "caseTitle": "직접 만든 업무 규칙: 승인만 있으면 자료와 행동에 접근할까?",
  "caseScope": "자료 권한·대상 범위·변경 승인은 직접 정한 Boolean입력입니다. 조회=권한∧대상,변경=조회∧승인의 자체 규칙과 짧은 자체 기록만 계산합니다. 실제 Palantir의 권한·감사·LLM·고객 자료·외부 시스템은 실행하지 않습니다.",
  "bridges": [
    {
      "id": "ontology",
      "label": "Palantir의 업무 Ontology",
      "personId": "alex-karp",
      "workId": "karp-palantir-2003",
      "filter": "industry"
    },
    {
      "id": "anduril",
      "label": "Anduril·Lattice의 현장 연결",
      "personId": "palmer-luckey",
      "workId": "luckey-anduril-2017",
      "filter": "industry"
    }
  ],
  "visualId": "detail-karp-aip-2023"
};

function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
function getView(id){const v=data.views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown view.');return v;}
function select(view,id){const n=getView(view).nodes.find(n=>n.id===id);if(!n)throw new RangeError('Choose a visible source role.');return n;}
function evaluate(id){const c=data.cases.find(c=>c.id===id);if(!c)throw new RangeError('Choose an authored case.');let r;
if(data.kind==='factory'){const rows=c.routes.map(([label,recompute,transfer,queue])=>({label,recompute,transfer,queue,value:recompute+transfer+queue}));const minimum=Math.min(...rows.map(x=>x.value)),selected=rows.filter(x=>x.value===minimum).map(x=>x.label);r={rows,minimum,selected,formula:rows.map(x=>x.label+': '+x.recompute+' + '+x.transfer+' + '+x.queue+' = '+x.value).join(' / '),headline:'작성 비용에서 '+selected.join('·')+' 선택 · '+minimum+' 단위',explanation:c.explanation};}
else if(data.kind==='graphics'||data.kind==='vr'){const rows=c.stages.map(([label,value])=>({label,value}));if(rows.some(x=>!Number.isInteger(x.value)||x.value<0))throw new TypeError('Nonnegative authored units required.');const sum=rows.reduce((n,x)=>n+x.value,0),max=Math.max(...rows.map(x=>x.value));r={rows,total:sum,interval:max,bottlenecks:rows.filter(x=>x.value===max).map(x=>x.label),formula:rows.map(x=>x.value).join(' + ')+' = '+sum,headline:data.kind==='graphics'?'첫 항목의 가정 지연 '+sum+' · 겹쳐 흐를 때 간격 '+max:'가정한 합계 '+sum+' 단위',explanation:c.explanation};}
else if(data.kind==='aip'){const allow=c.permission&&c.objectAllowed,execute=allow&&c.approved;const rows=[['자료 권한',c.permission],['대상 범위',c.objectAllowed],['변경 승인',c.approved]].map(([label,value])=>({label,value:Number(value)}));r={rows,allowed:allow,executed:execute,audit:['request',allow?'read-allowed':'read-denied',execute?'approved-action':'no-action'],formula:'조회 = 권한 ∧ 대상범위 = '+Number(allow)+' / 변경 = 조회 ∧ 승인 = '+Number(execute),headline:execute?'작성 규칙: 승인된 변경':allow?'작성 규칙: 조회만 허용':'작성 규칙: 조회 차단',explanation:c.explanation};}
else if(data.kind==='resources'){const rows=c.resources.map(([label,need,capacity])=>({label,need,capacity,margin:capacity-need,eligible:need<=capacity}));const unmet=rows.filter(x=>!x.eligible).map(x=>x.label),meetsAuthoredConditions=unmet.length===0;r={rows,unmet,meetsAuthoredConditions,formula:rows.map(x=>x.label+': '+x.capacity+' − '+x.need+' = '+x.margin).join(' / '),headline:meetsAuthoredConditions?'작성한 세 조건은 충족':'작성 조건 미충족: '+unmet.join('·'),explanation:c.explanation};}
else if(data.kind==='institution'||data.kind==='transition'||data.kind==='acquisition'){const rows=c.items.map(x=>({...x,eligible:x.documented&&(!c.requireDelivery||x.delivered)}));const accepted=rows.filter(x=>x.eligible);r={rows,accepted:accepted.map(x=>x.label),count:accepted.length,formula:accepted.length+' / '+rows.length+'개가 선택한 근거 조건에 해당',headline:'기록 조건을 통과한 항목 '+accepted.length+'개',explanation:c.explanation};}
else throw new TypeError('Unknown finite case.');return freeze({id:c.id,label:c.label,...r,scope:data.caseScope,executesProduct:false});}
for(const v of data.views){if(!v.nodes.some(n=>n.id===v.initial)||new Set(v.nodes.map(n=>n.id)).size!==v.nodes.length)throw new TypeError('Distinct visible roles required.');for(const n of v.nodes)if(!n.sourceIds.length||n.sourceIds.some(s=>!data.sources[s]))throw new TypeError('Cited roles required.');for(const e of v.edges)if(!v.nodes.some(n=>n.id===e[0])||!v.nodes.some(n=>n.id===e[1]))throw new TypeError('Visible edge endpoints required.');}

window.AtlasDetailAIP2023=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
