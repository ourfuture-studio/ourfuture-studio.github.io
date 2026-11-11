/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "musk-xai-spacex-2026",
  "kind": "resources",
  "sources": {
    "acquired": {
      "title": "xAI · xAI joins SpaceX",
      "url": "https://x.ai/news/xai-joins-spacex",
      "location": "2026-02-02 공식 공지: SpaceX has acquired xAI.2026-11-11 직접 본문 확인; 추가 링크는 조회 시 빈 본문/timeout이어서 근거로 확장하지 않음."
    },
    "integration": {
      "title": "SpaceX 원문 PDF · 통합 위험",
      "url": "https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20%28Approved%20by%20Bafin%29%20-%20June%205%2C%202026.pdf#page=23",
      "location": "2026-06-05§1.3.3 인쇄p10/PDF23: AI 부문·인수·조직 및 운영 통합,미완료 단계. 원본 PDF 다운로드·텍스트 및 페이지 직접 확인."
    },
    "strategy": {
      "title": "SpaceX 원문 PDF · 역량의 결합",
      "url": "https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20%28Approved%20by%20Bafin%29%20-%20June%205%2C%202026.pdf#page=67",
      "location": "사업 개요 인쇄p54/PDF67: AI 개발,발사·위성 제작·통신 역량을 연결하려는 회사의 설명. 그림은 해당 산문을 직접 재구성."
    },
    "constraints": {
      "title": "SpaceX 원문 PDF · 전력·방열·연결",
      "url": "https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20%28Approved%20by%20Bafin%29%20-%20June%205%2C%202026.pdf#page=82",
      "location": "인쇄pp69–71/PDF82–84: 태양광·방열·통신·장치 검사/운영의 회사 계획. 비용·우위·성능 전망을 독립 사실로 복사하지 않음."
    },
    "difference": {
      "title": "SpaceX 원문 PDF · 통신과 계산 위성",
      "url": "https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20%28Approved%20by%20Bafin%29%20-%20June%205%2C%202026.pdf#page=83",
      "location": "인쇄p70/PDF83: 통신 위성 대비 AI 계산 위성의 전력·방열·전자 장치 차이. 원문 페이지 이미지를 직접 확인."
    },
    "plan": {
      "title": "SpaceX 원문 PDF · orbital AI compute 정의",
      "url": "https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20%28Approved%20by%20Bafin%29%20-%20June%205%2C%202026.pdf#page=357",
      "location": "용어집 인쇄G-12/PDF357: 예정된 궤도 계산 기반의 정의와2028년 배치 시작 기대. 완료 사실이 아닌 회사의 당시 계획."
    }
  },
  "views": [
    {
      "id": "integration",
      "label": "01 조직과 개발의 결합",
      "title": "AI·통신·발사를 연결하려는 전략",
      "intro": "2026 인수 공지와6월 원문의 역할을 연결한 도식입니다.",
      "initial": "ai-dev",
      "layout": "layers",
      "nodes": [
        {
          "id": "ai-dev",
          "label": "AI 개발",
          "input": "모델·개발 조직",
          "role": "xAI의 개발 역량을 AI 부문의 기반으로 설명한다.",
          "output": "계산·제품 개발",
          "sourceIds": [
            "acquired",
            "integration",
            "strategy"
          ],
          "x": 110,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "compute-site",
          "label": "계산의 기반",
          "input": "장치·기억·자원 운영",
          "role": "모델을 학습하고 제공할 물리 기반의 확장을 회사 전략으로 놓았다.",
          "output": "개발과 제공의 조건",
          "sourceIds": [
            "strategy",
            "constraints"
          ],
          "x": 350,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "connectivity",
          "label": "위성 통신",
          "input": "자료·응답의 연결",
          "role": "Space·Connectivity와 AI 개발을 연결하려는 의도다. 모든 현행 요청의 경로라는 뜻은 아니다.",
          "output": "전달의 기반",
          "sourceIds": [
            "strategy"
          ],
          "x": 590,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "launch",
          "label": "발사·위성 제작",
          "input": "하드웨어를 싣고 배치할 역량",
          "role": "앞으로의 계산 위성 배치에 쓰려는 회사 역량으로 제시된다.",
          "output": "예정된 배치 조건",
          "sourceIds": [
            "strategy",
            "constraints"
          ],
          "x": 350,
          "y": 300,
          "icon": "triangle"
        },
        {
          "id": "organisation",
          "label": "통합 운영",
          "input": "인수 뒤의 조직·절차",
          "role": "6월 위험 절은 조직·관리·절차의 미완료 작업을 적는다.",
          "output": "남은 실행 조건",
          "sourceIds": [
            "integration"
          ],
          "x": 590,
          "y": 300,
          "icon": "people"
        },
        {
          "id": "service",
          "label": "사용과 전달",
          "input": "개발한 모델과 기반의 연결",
          "role": "최종 제품과 사용자의 연결이라는 전략을 읽는다. 실제 품질·이행에는 각자의 증거가 필요하다.",
          "output": "검증할 결과",
          "sourceIds": [
            "strategy",
            "integration"
          ],
          "x": 820,
          "y": 200,
          "icon": "document"
        }
      ],
      "edges": [
        [
          "ai-dev",
          "compute-site",
          "연산"
        ],
        [
          "compute-site",
          "connectivity",
          "자료"
        ],
        [
          "launch",
          "compute-site",
          "배치 계획"
        ],
        [
          "organisation",
          "ai-dev",
          "실행"
        ],
        [
          "connectivity",
          "service",
          "전달"
        ]
      ],
      "sourceNote": "회사 원문 산문을 재구성한 역량도 · 실제 전체 시스템 배선도 아님"
    },
    {
      "id": "physical",
      "label": "02 궤도 계산의 조건",
      "title": "연산기를 싣는 것에서 운영까지",
      "intro": "원문은 전력·방열·통신과 수명·고장의 조건을 함께 다룹니다.",
      "initial": "heat-system",
      "layout": "layers",
      "nodes": [
        {
          "id": "power",
          "label": "태양광 전력",
          "input": "궤도·태양전지의 계획",
          "role": "연산 장치가 사용할 전력을 공급하려는 설계 조건이다.",
          "output": "전력 예산",
          "sourceIds": [
            "constraints",
            "difference"
          ],
          "x": 110,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "processor",
          "label": "AI 연산기",
          "input": "전력과 입력 자료",
          "role": "통신 위성과 다른 전력·전자 장치 요구를 가진다는 원문 설명이다.",
          "output": "계산과 발생한 열",
          "sourceIds": [
            "difference"
          ],
          "x": 350,
          "y": 100,
          "icon": "memory"
        },
        {
          "id": "heat-system",
          "label": "방열 구조",
          "input": "계산 장치의 열",
          "role": "복사로 열을 버릴 구조를 계획한다. 진공이 열을 자동 제거한다는 설명이 아니다.",
          "output": "열 예산",
          "sourceIds": [
            "constraints",
            "difference"
          ],
          "x": 590,
          "y": 100,
          "icon": "loop"
        },
        {
          "id": "interlink",
          "label": "위성 간·지상 연결",
          "input": "자료와 결과",
          "role": "위성 간 통신과 지상 전달을 계산 체계의 연결 조건으로 제시했다.",
          "output": "이동한 자료",
          "sourceIds": [
            "constraints"
          ],
          "x": 350,
          "y": 300,
          "icon": "network"
        },
        {
          "id": "lifecycle",
          "label": "검사·수명·고장",
          "input": "발사 전 검사·운영 상태",
          "role": "사전 검사와 작업 재배치·퇴역 등 남은 운영 설계를 설명한다.",
          "output": "지속할 조건",
          "sourceIds": [
            "constraints"
          ],
          "x": 590,
          "y": 300,
          "icon": "gate"
        },
        {
          "id": "resource-rule",
          "label": "작은 자원표",
          "input": "서로 다른 세 예산",
          "role": "아래 사례는 각 예산의 여유와 조건의 논리곱만 계산한다.",
          "output": "충족/미충족 항목",
          "sourceIds": [
            "difference",
            "constraints"
          ],
          "x": 820,
          "y": 200,
          "icon": "chart"
        }
      ],
      "edges": [
        [
          "power",
          "processor",
          "공급"
        ],
        [
          "processor",
          "heat-system",
          "열"
        ],
        [
          "processor",
          "interlink",
          "자료"
        ],
        [
          "lifecycle",
          "processor",
          "운영"
        ],
        [
          "heat-system",
          "resource-rule",
          "조건"
        ]
      ],
      "sourceNote": "궤도 부분은 원문의 개발 계획 · 수치와 조건표는 자체 가정"
    },
    {
      "id": "status",
      "label": "03 확인된 사건과 계획",
      "title": "인수·미완료 통합·향후 배치를 나누기",
      "intro": "문서의 시점과 문장 종류를 함께 선택합니다.",
      "initial": "future-plan",
      "layout": "timeline",
      "nodes": [
        {
          "id": "acquisition-fact",
          "label": "2월 인수 공지",
          "input": "2026-02-02",
          "role": "인수가 이루어졌다는 회사의 직접 발표다.",
          "output": "확인한 기업 사건",
          "sourceIds": [
            "acquired"
          ],
          "x": 100,
          "y": 110,
          "icon": "document"
        },
        {
          "id": "june-disclosure",
          "label": "6월 문서",
          "input": "2026-06-05",
          "role": "사업의 설명과 위험·전망을 함께 적은 공식 원문이다.",
          "output": "조건을 가진 기록",
          "sourceIds": [
            "integration",
            "strategy"
          ],
          "x": 290,
          "y": 295,
          "icon": "document"
        },
        {
          "id": "not-complete",
          "label": "통합의 남은 작업",
          "input": "조직·절차·운영",
          "role": "§1.3.3은 통합의 미완료 단계와 실행 위험을 적는다.",
          "output": "확인할 후속 변화",
          "sourceIds": [
            "integration"
          ],
          "x": 480,
          "y": 110,
          "icon": "people"
        },
        {
          "id": "future-plan",
          "label": "배치의 기대",
          "input": "용어집의2028년 기대",
          "role": "예정된 시작 시점은 완료나 현재 운영의 증거가 아니다.",
          "output": "추적할 계획",
          "sourceIds": [
            "plan"
          ],
          "x": 670,
          "y": 295,
          "icon": "network"
        },
        {
          "id": "evidence-limit",
          "label": "효과의 검증",
          "input": "회사의 비용·효율 전망",
          "role": "성능·경제성·실행은 독립 조건과 실제 기록으로 평가해야 한다.",
          "output": "보류한 결과 주장",
          "sourceIds": [
            "constraints",
            "plan"
          ],
          "x": 860,
          "y": 110,
          "icon": "gate"
        }
      ],
      "edges": [
        [
          "acquisition-fact",
          "june-disclosure",
          "후속 문서"
        ],
        [
          "june-disclosure",
          "not-complete",
          "당시 위험"
        ],
        [
          "june-disclosure",
          "future-plan",
          "당시 계획"
        ],
        [
          "future-plan",
          "evidence-limit",
          "후속 검증"
        ]
      ],
      "sourceNote": "공식 기록의 시점과 문장 유형 · 미래 이행·투자 판단을 뜻하지 않음"
    }
  ],
  "cases": [
    {
      "id": "heat",
      "label": "방열 조건이 부족",
      "resources": [
        [
          "전력",
          11,
          12
        ],
        [
          "방열",
          11,
          10
        ],
        [
          "연결",
          5,
          6
        ]
      ],
      "explanation": "전력 여유1,방열−1,연결1입니다. 전력과 연결이 남아도 방열 조건이 하나 부족해 이 작은 규칙은 통과하지 않습니다."
    },
    {
      "id": "balanced",
      "label": "세 조건을 맞추면",
      "resources": [
        [
          "전력",
          11,
          12
        ],
        [
          "방열",
          11,
          12
        ],
        [
          "연결",
          5,
          6
        ]
      ],
      "explanation": "각 여유가1입니다. 작성한 세 조건만 통과했으며 실제 체계의 모든 조건이나 궤도 배치의 실현을 입증하지 않습니다."
    },
    {
      "id": "link",
      "label": "연결 조건이 부족",
      "resources": [
        [
          "전력",
          11,
          12
        ],
        [
          "방열",
          11,
          12
        ],
        [
          "연결",
          5,
          4
        ]
      ],
      "explanation": "전력·방열은 남지만 연결 여유가−1입니다. 연산을 수행할 자원과 결과를 전달할 자원을 별도로 확인해야 합니다."
    },
    {
      "id": "boundary",
      "label": "경계에서 같으면",
      "resources": [
        [
          "전력",
          11,
          11
        ],
        [
          "방열",
          11,
          11
        ],
        [
          "연결",
          5,
          5
        ]
      ],
      "explanation": "세 여유가0입니다. 이 규칙의 경계는 통과하지만 예비 여유·고장·시간 변화의 실제 요구는 이 작은 모델에 포함하지 않았습니다."
    }
  ],
  "caseTitle": "직접 만든 자원 예산: 하나가 남아도 세 조건을 통과할까?",
  "caseScope": "전력·방열·연결의 요구량/허용량은 각각 직접 정한 단위입니다. 여유=허용−요구,통과=세 여유가 모두0이상인 자체 규칙입니다. 실제 AI 위성의 설계·열해석·전력·링크·비용·운영 가능성을 계산하지 않습니다.",
  "bridges": [
    {
      "id": "grok",
      "label": "xAI·Grok의 모델과 지상 기반",
      "personId": "elon-musk",
      "workId": "musk-grok-2023",
      "filter": "industry"
    },
    {
      "id": "gtc",
      "label": "계산·연결·저장의 시스템 조건",
      "personId": "jensen-huang",
      "workId": "huang-gtc-2025",
      "filter": "industry"
    }
  ],
  "visualId": "detail-musk-xai-spacex-2026"
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

window.AtlasDetailXaiSpaceX2026=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
