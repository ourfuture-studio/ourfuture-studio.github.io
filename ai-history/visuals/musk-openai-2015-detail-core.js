/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "musk-openai-2015",
  "kind": "institution",
  "sources": {
    "problem": {
      "title": "OpenAI · Introducing OpenAI / Background",
      "url": "https://openai.com/index/introducing-openai/",
      "location": "2015-12-11 Background·Looking forward: 과제별 방법과 일반성의 문제,자료 기반 딥러닝·당시 좁은 능력.2026-11-11 본문 확인."
    },
    "mission": {
      "title": "Introducing OpenAI · 기관의 목적",
      "url": "https://openai.com/index/introducing-openai/",
      "location": "도입·OpenAI 절 첫 두 문단: 당시 비영리 연구기관의 목적,장기 연구·공개·협력 방침."
    },
    "roles": {
      "title": "Introducing OpenAI · 당시 역할",
      "url": "https://openai.com/index/introducing-openai/",
      "location": "OpenAI 절: research director Sutskever,CTO Brockman,연구진·자문진,co-chairs Altman/Musk. 기술 발명 저자와 구분."
    },
    "support": {
      "title": "Introducing OpenAI · 후원의 약정",
      "url": "https://openai.com/index/introducing-openai/",
      "location": "마지막 후원자 문단: 지원 약정과 초기 지출 전망이 별도 표현됨. 금액을 실제 투입·성과로 사용하지 않음."
    },
    "change": {
      "title": "OpenAI · OpenAI supporters",
      "url": "https://openai.com/index/openai-supporters/",
      "location": "2018-02-20 Musk의 이사회 이탈 문단,사람·계산 자원 투자와 연구/robotics/Dota 문단,당시 Board 명단. 현재 상태로 소급하지 않음."
    },
    "charter": {
      "title": "OpenAI Charter · 공개와 협력",
      "url": "https://openai.com/charter/",
      "location": "Cooperative orientation·Long-term safety: 협력/공공재/연구 공개와 안전·보안에 따른 공개 조정의 원칙. 현재 본문 확인;2015실행 결과 아님."
    }
  },
  "views": [
    {
      "id": "institution",
      "label": "01 연구를 지속할 기관",
      "title": "목적에서 연구·자원·공유로",
      "intro": "2015년 설립 문서의 단락을 연구가 이어지는 조건으로 다시 배치했습니다.",
      "initial": "research",
      "layout": "layers",
      "nodes": [
        {
          "id": "goal",
          "label": "연구의 목적",
          "input": "과제별 성공과 남은 일반성",
          "role": "더 넓은 능력의 연구와 결과의 수혜 범위를 기관의 목표로 놓는다.",
          "output": "장기 연구의 방향",
          "sourceIds": [
            "problem",
            "mission"
          ],
          "x": 110,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "research",
          "label": "연구진",
          "input": "연구 책임자·과학자·엔지니어",
          "role": "가설을 구현하고 관찰할 연구의 실행을 맡을 역할이다.",
          "output": "연구 결과",
          "sourceIds": [
            "roles"
          ],
          "x": 350,
          "y": 100,
          "icon": "people"
        },
        {
          "id": "compute",
          "label": "사람·계산 자원",
          "input": "지원과 운영의 기반",
          "role": "2018문서는 사람과 계산에 대한 투자를 다음 단계의 조건으로 연결한다.",
          "output": "지속할 실험 조건",
          "sourceIds": [
            "change",
            "support"
          ],
          "x": 590,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "sharing",
          "label": "논문·코드 공개",
          "input": "검토할 수 있는 결과",
          "role": "2015방침은 논문·블로그·코드의 공개를 장려한다고 적었다.",
          "output": "다른 연구의 입력",
          "sourceIds": [
            "mission"
          ],
          "x": 350,
          "y": 300,
          "icon": "document"
        },
        {
          "id": "cooperation",
          "label": "기관 간 협력",
          "input": "다른 기관·기업과 연구",
          "role": "연구·개발·배치의 협력을 기관의 활동 범위에 포함했다.",
          "output": "후속 탐구와 개발",
          "sourceIds": [
            "mission",
            "charter"
          ],
          "x": 590,
          "y": 300,
          "icon": "network"
        },
        {
          "id": "feedback",
          "label": "다음 연구 질문",
          "input": "공유한 결과와 한계",
          "role": "기관은 한 과제의 성공 뒤에도 능력과 영향의 질문을 이어갈 구조다. 이 연결은 원문을 읽은 해석이다.",
          "output": "목표와 연구의 재검토",
          "sourceIds": [
            "problem",
            "mission"
          ],
          "x": 820,
          "y": 200,
          "icon": "loop"
        }
      ],
      "edges": [
        [
          "goal",
          "research",
          "질문"
        ],
        [
          "compute",
          "research",
          "조건"
        ],
        [
          "research",
          "sharing",
          "결과"
        ],
        [
          "sharing",
          "cooperation",
          "공유"
        ],
        [
          "cooperation",
          "feedback",
          "후속 연구"
        ]
      ],
      "sourceNote": "설립 원문의 단락과 명단을 재배치한 자체 역할도 · 실제 조직도·자금 흐름 아님"
    },
    {
      "id": "roles",
      "label": "02 이름마다 다른 역할",
      "title": "2015 명단과2018 변경 기록",
      "intro": "어느 시점에 어떤 역할로 이름이 등장하는지 원문을 선택해 봅니다.",
      "initial": "chairs",
      "layout": "layers",
      "nodes": [
        {
          "id": "chairs",
          "label": "공동의장",
          "input": "Altman·Musk",
          "role": "2015문서에서 공동의장으로 적혔다. 연구 논문 저자라는 뜻으로 바꾸지 않는다.",
          "output": "기관의 운영 역할",
          "sourceIds": [
            "roles"
          ],
          "x": 110,
          "y": 100,
          "icon": "people"
        },
        {
          "id": "research-director",
          "label": "연구 책임자",
          "input": "Ilya Sutskever",
          "role": "연구 책임자라는 명시된 역할을 확인한다.",
          "output": "연구 방향의 역할",
          "sourceIds": [
            "roles"
          ],
          "x": 350,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "cto",
          "label": "기술 책임자",
          "input": "Greg Brockman",
          "role": "CTO라는 개발·기술 조직 역할이 명시되어 있다.",
          "output": "기술 실행의 역할",
          "sourceIds": [
            "roles"
          ],
          "x": 590,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "funders",
          "label": "후원자",
          "input": "개인·기관의 지원 약정",
          "role": "자원을 지원하는 역할과 실제 지출·완료 실험의 근거를 나누어 읽는다.",
          "output": "연구 자원 확보",
          "sourceIds": [
            "support"
          ],
          "x": 110,
          "y": 300,
          "icon": "document"
        },
        {
          "id": "change-record",
          "label": "2018 변경",
          "input": "이사회 이탈 발표",
          "role": "공식 문서는 Musk의 이사회 이탈을 알리고 당시의 후원·자문 계획을 적었다.",
          "output": "날짜를 가진 역할 변경",
          "sourceIds": [
            "change"
          ],
          "x": 590,
          "y": 300,
          "icon": "document"
        }
      ],
      "edges": [
        [
          "chairs",
          "funders",
          "역할 구분"
        ],
        [
          "research-director",
          "cto",
          "연구와 개발"
        ],
        [
          "chairs",
          "change-record",
          "후속 기록"
        ]
      ],
      "sourceNote": "연결선은 원문에 적힌 역할의 구분 · 개인 간 기술 지도·인과 공헌을 뜻하지 않음"
    },
    {
      "id": "claims",
      "label": "03 근거가 말한 범위",
      "title": "목표·정책·약정·실행을 구분하기",
      "intro": "한 문서에 등장해도 문장의 종류와 확인할 후속 근거는 다릅니다.",
      "initial": "date-bound",
      "layout": "timeline",
      "nodes": [
        {
          "id": "aim",
          "label": "목표",
          "input": "더 넓은 지능과 수혜",
          "role": "미래에 이루려는 목적을 적은 문장이다. 달성 결과와 구분한다.",
          "output": "평가할 질문",
          "sourceIds": [
            "problem",
            "mission"
          ],
          "x": 100,
          "y": 110,
          "icon": "network"
        },
        {
          "id": "policy",
          "label": "당시 방침",
          "input": "공개·협력 권장",
          "role": "기관이 지향한 운영 규칙이다. 후속 문서에서 공개 조정을 함께 읽는다.",
          "output": "검토할 정책",
          "sourceIds": [
            "mission",
            "charter"
          ],
          "x": 290,
          "y": 295,
          "icon": "document"
        },
        {
          "id": "commitment",
          "label": "지원 약정",
          "input": "후원의 문장",
          "role": "약정의 존재와 실제 집행은 다른 확인 대상이다.",
          "output": "집행 근거의 질문",
          "sourceIds": [
            "support"
          ],
          "x": 480,
          "y": 110,
          "icon": "memory"
        },
        {
          "id": "date-bound",
          "label": "시점의 역할",
          "input": "2015와2018의 명단",
          "role": "문장이 말한 시점과 이번 주장의 시점을 맞춘다.",
          "output": "범위를 지킨 주장",
          "sourceIds": [
            "roles",
            "change"
          ],
          "x": 670,
          "y": 295,
          "icon": "gate"
        },
        {
          "id": "claim-rule",
          "label": "직접 판별",
          "input": "출처 ∧ 시점·동사 일치",
          "role": "아래 표의 작은 규칙은 과도한 확대를 눈에 보이게 한다.",
          "output": "남는 항목의 수",
          "sourceIds": [
            "support",
            "change"
          ],
          "x": 860,
          "y": 110,
          "icon": "loop"
        }
      ],
      "edges": [
        [
          "aim",
          "policy",
          "목적과 규칙"
        ],
        [
          "commitment",
          "claim-rule",
          "동사 확인"
        ],
        [
          "date-bound",
          "claim-rule",
          "시점 확인"
        ]
      ],
      "sourceNote": "원문 유형에 따른 자체 근거 점검 도식 · 조직 성과의 측정 아님"
    }
  ],
  "cases": [
    {
      "id": "source-only",
      "label": "출처만 확인",
      "requireDelivery": false,
      "items": [
        {
          "label": "2015 공동의장",
          "documented": true,
          "delivered": true
        },
        {
          "label": "2018 이사회 이탈",
          "documented": true,
          "delivered": true
        },
        {
          "label": "2015 이름→현재 직책",
          "documented": true,
          "delivered": false
        },
        {
          "label": "지원 약정→실제 지출",
          "documented": true,
          "delivered": false
        }
      ],
      "explanation": "출처 조건만 두면4개가 모두 남습니다. 출처의 존재와 주장을 뒷받침하는 범위는 다릅니다."
    },
    {
      "id": "bounded",
      "label": "시점·동사까지 확인",
      "requireDelivery": true,
      "items": [
        {
          "label": "2015 공동의장",
          "documented": true,
          "delivered": true
        },
        {
          "label": "2018 이사회 이탈",
          "documented": true,
          "delivered": true
        },
        {
          "label": "2015 이름→현재 직책",
          "documented": true,
          "delivered": false
        },
        {
          "label": "지원 약정→실제 지출",
          "documented": true,
          "delivered": false
        }
      ],
      "explanation": "두 조건을 함께 적용하면 당시 역할과 이탈 기록2개만 남습니다. 현재 직책과 지출은 추가 근거가 필요합니다."
    },
    {
      "id": "invention",
      "label": "설립과 기술 저자",
      "requireDelivery": true,
      "items": [
        {
          "label": "설립 문서에 공동의장",
          "documented": true,
          "delivered": true
        },
        {
          "label": "공동의장→모델 발명자",
          "documented": true,
          "delivered": false
        },
        {
          "label": "연구 책임자 역할 명시",
          "documented": true,
          "delivered": true
        }
      ],
      "explanation": "설립·조직 역할2개는 확인되지만,공동의장 이름만으로 특정 모델의 기술 발명자를 정할 수 없습니다."
    }
  ],
  "caseTitle": "출처가 있다는 것만으로, 같은 주장이 될까?",
  "caseScope": "각 항목의 두 입력은 이 카드에서 직접 판정한 읽기 사례입니다. 첫 값은 공식 출처 존재,둘째 값은 날짜·동사가 주장에 맞는지입니다. 논리곱은 근거 연결을 점검하는 자체 규칙이며 공식 조직심사·현재 직책 조회가 아닙니다.",
  "bridges": [
    {
      "id": "grok",
      "label": "이후 xAI·Grok 개발 기록",
      "personId": "elon-musk",
      "workId": "musk-grok-2023",
      "filter": "industry"
    },
    {
      "id": "ssi",
      "label": "Sutskever의 이후 기관 구상",
      "personId": "ilya-sutskever",
      "workId": "sutskever-ssi-2024",
      "filter": "industry"
    }
  ],
  "visualId": "detail-musk-openai-2015"
};

function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
function getView(id){const v=data.views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown view.');return v;}
function select(view,id){const n=getView(view).nodes.find(n=>n.id===id);if(!n)throw new RangeError('Choose a visible source role.');return n;}
function evaluate(id){const c=data.cases.find(c=>c.id===id);if(!c)throw new RangeError('Choose an authored case.');let r;
if(data.kind==='factory'){const rows=c.routes.map(([label,recompute,transfer,queue])=>({label,recompute,transfer,queue,value:recompute+transfer+queue}));const minimum=Math.min(...rows.map(x=>x.value)),selected=rows.filter(x=>x.value===minimum).map(x=>x.label);r={rows,minimum,selected,formula:rows.map(x=>x.label+': '+x.recompute+' + '+x.transfer+' + '+x.queue+' = '+x.value).join(' / '),headline:'작성 비용에서 '+selected.join('·')+' 선택 · '+minimum+' 단위',explanation:c.explanation};}
else if(data.kind==='graphics'||data.kind==='vr'){const rows=c.stages.map(([label,value])=>({label,value}));if(rows.some(x=>!Number.isInteger(x.value)||x.value<0))throw new TypeError('Nonnegative authored units required.');const sum=rows.reduce((n,x)=>n+x.value,0),max=Math.max(...rows.map(x=>x.value));r={rows,total:sum,interval:max,bottlenecks:rows.filter(x=>x.value===max).map(x=>x.label),formula:rows.map(x=>x.value).join(' + ')+' = '+sum,headline:data.kind==='graphics'?'첫 항목의 가정 지연 '+sum+' · 겹쳐 흐를 때 간격 '+max:'가정한 합계 '+sum+' 단위',explanation:c.explanation};}
else if(data.kind==='aip'){const allow=c.permission&&c.objectAllowed,execute=allow&&c.approved;const rows=[['자료 권한',c.permission],['대상 범위',c.objectAllowed],['변경 승인',c.approved]].map(([label,value])=>({label,value:Number(value)}));r={rows,allowed:allow,executed:execute,audit:['request',allow?'read-allowed':'read-denied',execute?'approved-action':'no-action'],formula:'조회 = 권한 ∧ 대상범위 = '+Number(allow)+' / 변경 = 조회 ∧ 승인 = '+Number(execute),headline:execute?'작성 규칙: 승인된 변경':allow?'작성 규칙: 조회만 허용':'작성 규칙: 조회 차단',explanation:c.explanation};}
else if(data.kind==='institution'||data.kind==='transition'||data.kind==='acquisition'){const rows=c.items.map(x=>({...x,eligible:x.documented&&(!c.requireDelivery||x.delivered)}));const accepted=rows.filter(x=>x.eligible);r={rows,accepted:accepted.map(x=>x.label),count:accepted.length,formula:accepted.length+' / '+rows.length+'개가 선택한 근거 조건에 해당',headline:'기록 조건을 통과한 항목 '+accepted.length+'개',explanation:c.explanation};}
else throw new TypeError('Unknown finite case.');return freeze({id:c.id,label:c.label,...r,scope:data.caseScope,executesProduct:false});}
for(const v of data.views){if(!v.nodes.some(n=>n.id===v.initial)||new Set(v.nodes.map(n=>n.id)).size!==v.nodes.length)throw new TypeError('Distinct visible roles required.');for(const n of v.nodes)if(!n.sourceIds.length||n.sourceIds.some(s=>!data.sources[s]))throw new TypeError('Cited roles required.');for(const e of v.edges)if(!v.nodes.some(n=>n.id===e[0])||!v.nodes.some(n=>n.id===e[1]))throw new TypeError('Visible edge endpoints required.');}

window.AtlasDetailOpenAI2015=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
