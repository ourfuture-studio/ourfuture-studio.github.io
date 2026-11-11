/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "huang-gtc-2025",
  "kind": "factory",
  "sources": {
    "wrap": {
      "title": "NVIDIA · GTC2025 공식 정리",
      "url": "https://blogs.nvidia.com/blog/nvidia-keynote-at-gtc-2025-ai-news-live-updates/",
      "location": "2025-03-25 Wrap-Up: Key Points. 제품·기반·후속 계획을 묶은 발표 정리.2026-11-11 본문 확인; 성능·시장 수치를 독립 결과로 재인용하지 않음."
    },
    "compute": {
      "title": "NVIDIA · Blackwell Ultra 발표",
      "url": "https://nvidianews.nvidia.com/news/nvidia-blackwell-ultra-ai-factory-platform-paves-way-for-age-of-ai-reasoning",
      "location": "2025-03-18: rack-scale design,scale-out infrastructure,Availability와Software Innovations. 발표 당시 기능·하반기 제공 예정을 구분."
    },
    "dynamo": {
      "title": "NVIDIA · Dynamo 발표",
      "url": "https://nvidianews.nvidia.com/news/nvidia-dynamo-open-source-library-accelerates-and-scales-ai-reasoning-models",
      "location": "2025-03-18 도입·Disaggregated Serving. 문맥 처리/생성 분리,조정·통신과 지원 framework 설명."
    },
    "cache": {
      "title": "Dynamo · Inference Supercharged",
      "url": "https://nvidianews.nvidia.com/news/nvidia-dynamo-open-source-library-accelerates-and-scales-ai-reasoning-models",
      "location": "Inference Supercharged: KV cache 위치와 요청 라우팅. 공식 개념 이미지의 API Server/GPU Planner/Smart Router/Cache Manager/Communication Library 실제 확인."
    },
    "network": {
      "title": "NVIDIA · Photonics 연결 발표",
      "url": "https://nvidianews.nvidia.com/news/nvidia-spectrum-x-co-packaged-optics-networking-switches-ai-factories",
      "location": "2025-03-18 A Networked Ecosystem·Availability. Quantum-X의 당시2025예정과Spectrum-X의2026예정; 현재 공급 확인으로 소급하지 않음."
    },
    "storage": {
      "title": "NVIDIA · AI Data Platform 발표",
      "url": "https://nvidianews.nvidia.com/news/nvidia-and-storage-industry-leaders-unveil-new-class-of-enterprise-infrastructure-for-the-age-of-ai",
      "location": "2025-03-18 도입·AI Data Platform Adds Accelerated Computing and AI to Storage. 기업 자료·query agent·추출/검색의 관계. 회사 성능비는 독립 검증하지 않음."
    }
  },
  "views": [
    {
      "id": "system",
      "label": "01 칩 밖의 시스템",
      "title": "추론의 계산과 자료·연결·운영을 함께 놓기",
      "intro": "2025 발표가 묶은 기반을 요청과 자료가 이동할 역할로 읽습니다.",
      "initial": "serving",
      "layout": "layers",
      "nodes": [
        {
          "id": "model",
          "label": "준비된 모델",
          "input": "학습된 가중치와 요청",
          "role": "추론은 준비된 표현을 사용해 이번 입력을 처리한다. 학습과 요청 제공은 다른 단계다.",
          "output": "이번 요청의 계산",
          "sourceIds": [
            "compute",
            "dynamo"
          ],
          "x": 110,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "compute",
          "label": "계산·기억",
          "input": "토큰과 중간 상태",
          "role": "rack-scale 계산·기억의 구성은 요청이 쓰는 자원을 제공한다.",
          "output": "장치의 연산",
          "sourceIds": [
            "compute"
          ],
          "x": 340,
          "y": 100,
          "icon": "memory"
        },
        {
          "id": "network",
          "label": "장치 사이 연결",
          "input": "여러 GPU의 자료",
          "role": "통신은 분리한 단계와 여러 장치를 함께 쓰는 조건이다.",
          "output": "옮겨진 상태",
          "sourceIds": [
            "network",
            "dynamo"
          ],
          "x": 570,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "storage",
          "label": "기업의 자료",
          "input": "저장된 문서·여러 자료형",
          "role": "AI Data Platform은 query agent가 기업 자료에 닿을 기반을 설명한다.",
          "output": "추론에 넣을 근거",
          "sourceIds": [
            "storage"
          ],
          "x": 110,
          "y": 300,
          "icon": "document"
        },
        {
          "id": "serving",
          "label": "요청 배치",
          "input": "들어오는 여러 요청",
          "role": "Dynamo의 조정·라우팅은 어떤 장치와 기억을 사용할지 정하는 역할이다.",
          "output": "응답을 만드는 경로",
          "sourceIds": [
            "dynamo",
            "cache"
          ],
          "x": 570,
          "y": 300,
          "icon": "loop"
        },
        {
          "id": "response",
          "label": "사용자 응답",
          "input": "계산과 자료의 결과",
          "role": "기반의 연결이 서비스 요청으로 이어진다. 실제 응답 품질은 별도 조건에서 검증해야 한다.",
          "output": "다음 요청과 검토",
          "sourceIds": [
            "storage",
            "wrap"
          ],
          "x": 810,
          "y": 200,
          "icon": "people"
        }
      ],
      "edges": [
        [
          "model",
          "compute",
          "추론"
        ],
        [
          "compute",
          "network",
          "상태"
        ],
        [
          "storage",
          "serving",
          "자료"
        ],
        [
          "network",
          "serving",
          "경로"
        ],
        [
          "serving",
          "response",
          "제공"
        ]
      ],
      "sourceNote": "2025공식 발표를 역할로 재배치한 자체 도식 · 실제전체 배선도 아님"
    },
    {
      "id": "dynamo",
      "label": "02 요청과 기억의 경로",
      "title": "Dynamo의 다섯 층을, 자원과의 연결로 펼치기",
      "intro": "공식 개념 이미지에서 확인한 이름과 발표 본문의 역할을 연결합니다.",
      "initial": "router",
      "layout": "layers",
      "nodes": [
        {
          "id": "api",
          "label": "API Server",
          "input": "서비스 요청",
          "role": "요청이 서빙 시스템으로 들어오는 접점으로 공식 이미지에 표시된다.",
          "output": "접수한 요청",
          "sourceIds": [
            "cache"
          ],
          "x": 110,
          "y": 100,
          "icon": "document"
        },
        {
          "id": "planner",
          "label": "GPU Planner",
          "input": "요청량과 필요한 자원",
          "role": "발표는 요청의 양·종류에 맞추어 GPU를 더하거나 다시 배치하는 기능을 설명한다.",
          "output": "배치할 자원",
          "sourceIds": [
            "dynamo",
            "cache"
          ],
          "x": 350,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "router",
          "label": "Smart Router",
          "input": "이번 입력과 기억 위치",
          "role": "cache의 위치와 이번 요청의 관계를 보고 장치로 요청을 잇는다.",
          "output": "선택한 경로",
          "sourceIds": [
            "cache"
          ],
          "x": 590,
          "y": 100,
          "icon": "loop"
        },
        {
          "id": "cache-manager",
          "label": "Cache Manager",
          "input": "앞서 계산한 문맥 상태",
          "role": "기억의 위치와 재사용 가능성을 서빙에서 다룬다. 답안 문자열의 단순 저장과 구분한다.",
          "output": "다시 쓸 중간 상태",
          "sourceIds": [
            "cache"
          ],
          "x": 350,
          "y": 300,
          "icon": "memory"
        },
        {
          "id": "communication",
          "label": "통신 라이브러리",
          "input": "분리된 단계 사이 상태",
          "role": "처리와 생성을 따로 배치하면 상태를 옮기는 통신도 필요하다.",
          "output": "단계 사이 전달",
          "sourceIds": [
            "dynamo",
            "cache"
          ],
          "x": 590,
          "y": 300,
          "icon": "network"
        },
        {
          "id": "workers",
          "label": "GPU 자원",
          "input": "연산과 기억의 요청",
          "role": "실제 계산이 놓일 자원이다. 그림의 선은 기능 관계를 뜻하며 실제 API 호출 순서의 복제는 아니다.",
          "output": "응답 계산",
          "sourceIds": [
            "compute",
            "dynamo"
          ],
          "x": 820,
          "y": 200,
          "icon": "grid"
        }
      ],
      "edges": [
        [
          "api",
          "router",
          "요청"
        ],
        [
          "planner",
          "workers",
          "자원 조정"
        ],
        [
          "cache-manager",
          "router",
          "기억 위치"
        ],
        [
          "router",
          "workers",
          "경로"
        ],
        [
          "communication",
          "workers",
          "상태 전송"
        ]
      ],
      "sourceNote": "공식 Dynamo 개념 이미지의5층 이름을 펼친 자체 관계도"
    },
    {
      "id": "evidence",
      "label": "03 발표를 어떻게 읽을까",
      "title": "기능·공급·예정·측정의 다른 근거",
      "intro": "기조연설의 여러 문장을 같은 종류의 완료 사실로 합치지 않습니다.",
      "initial": "dated-plan",
      "layout": "timeline",
      "nodes": [
        {
          "id": "dated-release",
          "label": "2025 발표",
          "input": "제품·개발 공개 문서",
          "role": "정확한 발표일과 문서 종류를 붙여 사건을 고정한다.",
          "output": "그때의 공개 범위",
          "sourceIds": [
            "wrap",
            "compute"
          ],
          "x": 100,
          "y": 115,
          "icon": "document"
        },
        {
          "id": "function",
          "label": "기능의 역할",
          "input": "계산·라우팅·저장 설명",
          "role": "어떤 일을 맡는지와 제품 성능비의 검증을 나누어 읽는다.",
          "output": "설계 질문",
          "sourceIds": [
            "dynamo",
            "storage"
          ],
          "x": 290,
          "y": 295,
          "icon": "network"
        },
        {
          "id": "dated-plan",
          "label": "당시의 제공 계획",
          "input": "Availability 문단",
          "role": "서로 다른 제품의 예정 시점이 적혀 있다. 현재 이행의 증거는 별도 확인이 필요하다.",
          "output": "날짜를 가진 계획",
          "sourceIds": [
            "compute",
            "network"
          ],
          "x": 480,
          "y": 115,
          "icon": "document"
        },
        {
          "id": "conditions",
          "label": "비교의 조건",
          "input": "회사 성능·효율 주장",
          "role": "모델·정밀도·수량·소프트웨어 조건과 독립 재현을 확인해야 비교를 넓힐 수 있다.",
          "output": "측정할 항목",
          "sourceIds": [
            "wrap",
            "compute"
          ],
          "x": 670,
          "y": 295,
          "icon": "grid"
        },
        {
          "id": "authored-case",
          "label": "자체 비용표",
          "input": "재계산·전송·대기 가정",
          "role": "아래 합계는 선택의 질문을 드러내는 직접 계산이다. 원제품 측정과 분리한다.",
          "output": "조건을 바꾼 선택",
          "sourceIds": [
            "cache",
            "dynamo"
          ],
          "x": 860,
          "y": 115,
          "icon": "loop"
        }
      ],
      "edges": [
        [
          "dated-release",
          "function",
          "무엇을"
        ],
        [
          "dated-release",
          "dated-plan",
          "언제"
        ],
        [
          "conditions",
          "authored-case",
          "가정과 측정구분"
        ]
      ],
      "sourceNote": "발표 종류와 직접 구성한 가정을 구분하는 읽기 도식"
    }
  ],
  "cases": [
    {
      "id": "cache",
      "label": "재계산이 적은 B",
      "routes": [
        [
          "A",
          8,
          1,
          2
        ],
        [
          "B",
          2,
          3,
          1
        ]
      ],
      "explanation": "A는11,B는6입니다. 이 가정에서는 재계산이 적은 B가 선택됩니다."
    },
    {
      "id": "queue",
      "label": "B의 대기가 커지면",
      "routes": [
        [
          "A",
          8,
          1,
          0
        ],
        [
          "B",
          2,
          3,
          8
        ]
      ],
      "explanation": "A는9,B는13입니다. cache 이점이 있어도 대기 부담이 커져 선택이 A로 바뀝니다."
    },
    {
      "id": "transfer",
      "label": "전송 부담이 커지면",
      "routes": [
        [
          "A",
          8,
          1,
          0
        ],
        [
          "B",
          2,
          9,
          0
        ]
      ],
      "explanation": "A는9,B는11입니다. 재계산만 줄이는 선택이 전체 가정 비용의 최소와 같지 않을 수 있습니다."
    },
    {
      "id": "tie",
      "label": "같은 합의 두 후보",
      "routes": [
        [
          "A",
          4,
          1,
          1
        ],
        [
          "B",
          2,
          3,
          1
        ]
      ],
      "explanation": "두 후보가 모두6입니다. 이 작은 목적함수만으로는 하나를 더 낫다고 고를 수 없습니다."
    }
  ],
  "caseTitle": "직접 정한 라우팅 비용: cache만 보면 선택할 수 있을까?",
  "caseScope": "후보A/B의 재계산·전송·대기 수는 직접 정한 단위이며 합이 작은 후보를 고르는 자체 규칙입니다. Dynamo의 실제 정책·모델 추론·GPU 지연·요금·수익을 실행하거나 재현하지 않습니다.",
  "bridges": [
    {
      "id": "cuda",
      "label": "CUDA의 계산 모델",
      "personId": "jensen-huang",
      "workId": "huang-cuda-2006",
      "filter": "industry"
    },
    {
      "id": "grok",
      "label": "Grok의 학습·서비스 기반",
      "personId": "elon-musk",
      "workId": "musk-grok-2023",
      "filter": "industry"
    }
  ],
  "visualId": "detail-huang-gtc-2025"
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

window.AtlasDetailGTC2025=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
