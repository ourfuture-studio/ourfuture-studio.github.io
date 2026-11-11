/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "wang-meta-2025",
  "kind": "evaluation",
  "sources": {
    "transaction": {
      "title": "Scale · Meta 투자와 Wang 합류 공지",
      "url": "https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution",
      "location": "2025-06-12 본문 첫5문단:투자·상업 관계·Meta합류/Scale이사회·당시임시CEO·소수지분·독립/고객자료보호방침.2026-11-11직접확인."
    },
    "roles": {
      "title": "Meta Q2 2025 · 공식 실적발표 원문",
      "url": "https://s21.q4cdn.com/399680738/files/doc_financials/2025/q2/META-Q2-2025-Earnings-Call-Transcript.pdf#page=1",
      "location": "2025-07-30 transcript pp1–2:MSL구성과Wang/Friedman/Zhao역할·연구자/인프라/데이터엔지니어·당시계산기반확장계획. 원PDF/페이지직접확인."
    },
    "vision": {
      "title": "Meta · Personal Superintelligence for Everyone",
      "url": "https://about.fb.com/news/2025/07/personal-superintelligence-for-everyone/",
      "location": "2025-07-30 본문:개인의목표와도구라는비전. 목표와실현을구분하며개인경험·성과로꾸미지않음."
    },
    "scaling": {
      "title": "Meta · Muse Spark / Scaling Axes",
      "url": "https://ai.meta.com/blog/introducing-muse-spark-msl/",
      "location": "2026-04-08 Scaling Axes:사전학습/자료선별·RL·test-time reasoning. 원본RL이미지실제확인:Train/HeldOut,pass@1/@16,log(step)/accuracy. 회사성능비의독립검증아님."
    },
    "evaluation": {
      "title": "Meta · Muse Spark Eval Methodology",
      "url": "https://ai.meta.com/static-resource/muse-spark-eval-methodology",
      "location": "Overall Methodology/PDF1:도구·시도·제3자비교환경의제약;Per-benchmark details. 현재원문6p직접읽기;자체8항목은해당데이터셋아님."
    },
    "product": {
      "title": "Meta · Muse Spark 제품 공지",
      "url": "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
      "location": "2026-04-08 발표와2026-05-12 업데이트:앱/웹·APIprivatepreview·앱과기기로의확장. 당시상태와계획·후속업데이트구분."
    },
    "current": {
      "title": "Meta AI Research · 조회 시의 후속 기록",
      "url": "https://research.meta.ai/",
      "location": "2026-11-11 목록 직접확인:4월첫발표뒤7–11월후속버전/제품글이존재. 개별새버전의모든기능·이용조건은추정하지않음."
    }
  },
  "views": [
    {
      "id": "organisation",
      "label": "01 투자와 역할 이동",
      "title": "지분·상업 관계·연구 역할은 다른 연결이다",
      "intro": "2025공식 발표와transcript가 명시한 관계를 선택합니다.",
      "initial": "wang-role",
      "layout": "layers",
      "nodes": [
        {
          "id": "minority",
          "label": "Meta의 소수지분",
          "input": "Scale의2025투자발표",
          "role": "소수지분을갖는투자와회사전체인수를구분한다.",
          "output": "투자 관계",
          "sourceIds": [
            "transaction"
          ],
          "x": 110,
          "y": 100,
          "icon": "document"
        },
        {
          "id": "scale-company",
          "label": "Scale의 독립 운영",
          "input": "회사와고객의관계",
          "role": "당시발표는독립성과고객자료보호방침을적었다. 개별계약의실제자료공유를추정하지않는다.",
          "output": "자료·상업의경계",
          "sourceIds": [
            "transaction"
          ],
          "x": 350,
          "y": 100,
          "icon": "gate"
        },
        {
          "id": "commercial",
          "label": "상업 관계 확대",
          "input": "데이터솔루션의발표",
          "role": "상업관계를확장한다는문장과개별모델의학습자료명세는같지않다.",
          "output": "공개된협력범위",
          "sourceIds": [
            "transaction"
          ],
          "x": 590,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "wang-role",
          "label": "Wang의 전체 팀",
          "input": "Meta2025공식역할",
          "role": "7월transcript는MSL전체팀을이끈다고적었다.모델의단독저자라는뜻은아니다.",
          "output": "조직의실행조건",
          "sourceIds": [
            "roles"
          ],
          "x": 350,
          "y": 300,
          "icon": "people"
        },
        {
          "id": "science-product",
          "label": "제품·과학의 역할",
          "input": "Friedman·Zhao",
          "role": "제품/응용연구와과학책임을따로소개한원문이다.",
          "output": "개발의다른책임",
          "sourceIds": [
            "roles"
          ],
          "x": 590,
          "y": 300,
          "icon": "grid"
        },
        {
          "id": "engineering",
          "label": "연구·인프라·자료",
          "input": "연구자와엔지니어",
          "role": "모델개발에필요한여러역할을조직으로묶으려는설명이다.",
          "output": "후속연구·제품",
          "sourceIds": [
            "roles"
          ],
          "x": 820,
          "y": 200,
          "icon": "network"
        }
      ],
      "edges": [
        [
          "minority",
          "scale-company",
          "지분관계"
        ],
        [
          "scale-company",
          "commercial",
          "별도상업관계"
        ],
        [
          "wang-role",
          "science-product",
          "역할구분"
        ],
        [
          "science-product",
          "engineering",
          "개발"
        ]
      ],
      "sourceNote": "2025공식문서에나온관계 · 비공개고객자료경로·개인의단독기술발명을뜻하지않음"
    },
    {
      "id": "development",
      "label": "02 자원에서 모델·제품으로",
      "title": "학습의 세 축과 제공의 역할",
      "intro": "2026개발 문서로 후속 문제를 읽되2025계약의세부와합치지않습니다.",
      "initial": "pretrain",
      "layout": "layers",
      "nodes": [
        {
          "id": "data-curation",
          "label": "자료의 선별",
          "input": "자료·품질·개발조건",
          "role": "공식개발글은자료선별을사전학습개선의한요소로적었다.어떤Scale고객자료를썼다고추정하지않는다.",
          "output": "학습의입력",
          "sourceIds": [
            "scaling",
            "transaction"
          ],
          "x": 110,
          "y": 100,
          "icon": "document"
        },
        {
          "id": "pretrain",
          "label": "사전학습",
          "input": "자료·구조·최적화·계산",
          "role": "여러표현과능력의기반을배우는단계로설명된다.",
          "output": "학습된모델",
          "sourceIds": [
            "scaling"
          ],
          "x": 350,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "rl",
          "label": "강화학습",
          "input": "학습된모델과과제",
          "role": "사전학습뒤의능력개발축으로설명되며학습/별도평가를함께본다.",
          "output": "변화한모델",
          "sourceIds": [
            "scaling"
          ],
          "x": 590,
          "y": 100,
          "icon": "loop"
        },
        {
          "id": "reasoning",
          "label": "응답 시 추론 계산",
          "input": "준비된모델과이번요청",
          "role": "학습때의계산과구분한test-time축이다. 실제구현·효과는해당모델과조건에서확인한다.",
          "output": "이번응답",
          "sourceIds": [
            "scaling"
          ],
          "x": 350,
          "y": 300,
          "icon": "grid"
        },
        {
          "id": "serving",
          "label": "제품으로 제공",
          "input": "모델·앱·API·기기",
          "role": "연구모델과각접근경로의제공범위는날짜별로다르다.",
          "output": "사용자의접근",
          "sourceIds": [
            "product"
          ],
          "x": 590,
          "y": 300,
          "icon": "people"
        },
        {
          "id": "versions",
          "label": "후속 버전의 기록",
          "input": "버전·제공조건·평가",
          "role": "공식연구목록에4월이후후속기록이있다.초기발표를최신이라고부르지않는다.",
          "output": "다시확인할범위",
          "sourceIds": [
            "current",
            "product"
          ],
          "x": 820,
          "y": 200,
          "icon": "document"
        }
      ],
      "edges": [
        [
          "data-curation",
          "pretrain",
          "자료"
        ],
        [
          "pretrain",
          "rl",
          "후학습"
        ],
        [
          "rl",
          "reasoning",
          "모델"
        ],
        [
          "reasoning",
          "serving",
          "응답"
        ],
        [
          "serving",
          "versions",
          "후속개발"
        ]
      ],
      "sourceNote": "2026공개개발역할의재배치 · 특정자료계약·실제배치전체구조의복제아님"
    },
    {
      "id": "evaluation",
      "label": "03 무엇으로 판단할까",
      "title": "학습 자료와 별도 평가 자료의 다른 역할",
      "intro": "직접 본RL도판의 두 패널을 성적의 분모와 검증 조건으로 펼칩니다.",
      "initial": "heldout-set",
      "layout": "layers",
      "nodes": [
        {
          "id": "train-set",
          "label": "학습 자료",
          "input": "학습에사용한과제",
          "role": "원도판의왼쪽은학습자료의성적을보여준다.새과제의결과와같은분모가아니다.",
          "output": "학습중의관찰",
          "sourceIds": [
            "scaling"
          ],
          "x": 110,
          "y": 100,
          "icon": "memory"
        },
        {
          "id": "checkpoint",
          "label": "모델의 단계",
          "input": "학습step과모델상태",
          "role": "공식도판은학습진행에따른성적을놓았다.이카드는원점들을추출해새곡선을만들지않는다.",
          "output": "평가할상태",
          "sourceIds": [
            "scaling"
          ],
          "x": 350,
          "y": 100,
          "icon": "network"
        },
        {
          "id": "heldout-set",
          "label": "별도 평가 자료",
          "input": "학습과구분해둔과제",
          "role": "원도판의오른쪽패널은heldout평가를따로놓는다.",
          "output": "새과제에대한관찰",
          "sourceIds": [
            "scaling"
          ],
          "x": 590,
          "y": 100,
          "icon": "memory"
        },
        {
          "id": "eval-tools",
          "label": "도구·시도·채점",
          "input": "실행환경과판정조건",
          "role": "방법문서는도구와채점,시도횟수·비교환경을기록한다.",
          "output": "조건을가진결과",
          "sourceIds": [
            "evaluation"
          ],
          "x": 350,
          "y": 300,
          "icon": "grid"
        },
        {
          "id": "denominator",
          "label": "직접 고른 분모",
          "input": "A–H의노출/성공가정",
          "role": "아래표는선택된항목의성공수와전체수를계산한다.",
          "output": "가정의75%/50%",
          "sourceIds": [
            "scaling",
            "evaluation"
          ],
          "x": 590,
          "y": 300,
          "icon": "chart"
        },
        {
          "id": "limits",
          "label": "결과의 적용 범위",
          "input": "버전·과제·환경",
          "role": "평가결과를모든업무·현재제품의성공으로넓히지않는다.",
          "output": "후속검증의질문",
          "sourceIds": [
            "evaluation",
            "current"
          ],
          "x": 820,
          "y": 200,
          "icon": "gate"
        }
      ],
      "edges": [
        [
          "train-set",
          "checkpoint",
          "학습"
        ],
        [
          "checkpoint",
          "heldout-set",
          "별도평가"
        ],
        [
          "heldout-set",
          "eval-tools",
          "실행조건"
        ],
        [
          "eval-tools",
          "denominator",
          "무엇을셌나"
        ],
        [
          "denominator",
          "limits",
          "해석범위"
        ]
      ],
      "sourceNote": "원도판의Train/HeldOut분리를재구성 · 아래8항목과비율은직접작성,Meta점수아님"
    }
  ],
  "cases": [
    {
      "id": "mixed",
      "label": "이미 본 항목도 포함",
      "heldOutOnly": false,
      "samples": [
        {
          "label": "A",
          "seen": true,
          "passed": true
        },
        {
          "label": "B",
          "seen": true,
          "passed": true
        },
        {
          "label": "C",
          "seen": true,
          "passed": true
        },
        {
          "label": "D",
          "seen": true,
          "passed": true
        },
        {
          "label": "E",
          "seen": false,
          "passed": true
        },
        {
          "label": "F",
          "seen": false,
          "passed": true
        },
        {
          "label": "G",
          "seen": false,
          "passed": false
        },
        {
          "label": "H",
          "seen": false,
          "passed": false
        }
      ],
      "explanation": "A–D는 이미 본 항목,E–H는 보지 않은 항목으로 가정했습니다. A–F가 성공해6/8=75%입니다."
    },
    {
      "id": "heldout",
      "label": "보지 않은 항목만",
      "heldOutOnly": true,
      "samples": [
        {
          "label": "A",
          "seen": true,
          "passed": true
        },
        {
          "label": "B",
          "seen": true,
          "passed": true
        },
        {
          "label": "C",
          "seen": true,
          "passed": true
        },
        {
          "label": "D",
          "seen": true,
          "passed": true
        },
        {
          "label": "E",
          "seen": false,
          "passed": true
        },
        {
          "label": "F",
          "seen": false,
          "passed": true
        },
        {
          "label": "G",
          "seen": false,
          "passed": false
        },
        {
          "label": "H",
          "seen": false,
          "passed": false
        }
      ],
      "explanation": "A–D를 분모에서도 제외하면 E–H4개 중E/F2개만 성공합니다.2/4=50%이며 같은 표에서도 평가 대상의 정의가 결과를 바꿉니다."
    },
    {
      "id": "empty",
      "label": "평가 대상이 없으면",
      "heldOutOnly": true,
      "samples": [
        {
          "label": "A",
          "seen": true,
          "passed": true
        },
        {
          "label": "B",
          "seen": true,
          "passed": true
        },
        {
          "label": "C",
          "seen": true,
          "passed": true
        },
        {
          "label": "D",
          "seen": true,
          "passed": true
        }
      ],
      "explanation": "모두 이미 본 항목이라 선택한 대상이0개입니다.0/0을0%나100%로 해석하지 않고 평가할 항목 없음으로 남깁니다."
    }
  ],
  "caseTitle": "직접 만든8개 항목: 이미 본 항목을 빼면 분모가 어떻게 바뀔까?",
  "caseScope": "A–H의 학습 노출·성공 여부는 모두 직접 정한 입력입니다. 선택한 항목의 성공수/전체수를 계산하며0/0은미정의로둡니다. Meta·Scale의 실제자료/모델/점수/개선효과·누수 여부를 실행하거나 검증하지 않습니다.",
  "bridges": [
    {
      "id": "scale",
      "label": "Scale의 데이터 기반 사업",
      "personId": "alexandr-wang",
      "workId": "wang-scale-2016",
      "filter": "industry"
    },
    {
      "id": "gpu",
      "label": "계산·연결·서빙의 기반",
      "personId": "jensen-huang",
      "workId": "huang-gtc-2025",
      "filter": "industry"
    }
  ],
  "visualId": "detail-wang-meta-2025"
};

function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
function getView(id){const v=data.views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown view.');return v;}
function select(view,id){const n=getView(view).nodes.find(n=>n.id===id);if(!n)throw new RangeError('Choose a visible source role.');return n;}
function evaluate(id){const c=data.cases.find(c=>c.id===id);if(!c)throw new RangeError('Choose an authored case.');let r;
if(data.kind==='factory'){const rows=c.routes.map(([label,recompute,transfer,queue])=>({label,recompute,transfer,queue,value:recompute+transfer+queue}));const minimum=Math.min(...rows.map(x=>x.value)),selected=rows.filter(x=>x.value===minimum).map(x=>x.label);r={rows,minimum,selected,formula:rows.map(x=>x.label+': '+x.recompute+' + '+x.transfer+' + '+x.queue+' = '+x.value).join(' / '),headline:'작성 비용에서 '+selected.join('·')+' 선택 · '+minimum+' 단위',explanation:c.explanation};}
else if(data.kind==='graphics'||data.kind==='vr'){const rows=c.stages.map(([label,value])=>({label,value}));if(rows.some(x=>!Number.isInteger(x.value)||x.value<0))throw new TypeError('Nonnegative authored units required.');const sum=rows.reduce((n,x)=>n+x.value,0),max=Math.max(...rows.map(x=>x.value));r={rows,total:sum,interval:max,bottlenecks:rows.filter(x=>x.value===max).map(x=>x.label),formula:rows.map(x=>x.value).join(' + ')+' = '+sum,headline:data.kind==='graphics'?'첫 항목의 가정 지연 '+sum+' · 겹쳐 흐를 때 간격 '+max:'가정한 직렬 지연 '+sum+' ms',explanation:c.explanation};if(data.kind==='vr'){r.angularSpeed=c.angularSpeed;r.angle=Number((c.angularSpeed*sum/1000).toFixed(4));r.formula+=' ms / 일정 회전 가정 '+c.angularSpeed+' × '+sum+' / 1000 = '+r.angle+'°';}}
else if(data.kind==='aip'){const allow=c.permission&&c.objectAllowed,execute=allow&&c.approved;const rows=[['자료 권한',c.permission],['대상 범위',c.objectAllowed],['변경 승인',c.approved]].map(([label,value])=>({label,value:Number(value)}));r={rows,allowed:allow,executed:execute,audit:['request',allow?'read-allowed':'read-denied',execute?'approved-action':'no-action'],formula:'조회 = 권한 ∧ 대상범위 = '+Number(allow)+' / 변경 = 조회 ∧ 승인 = '+Number(execute),headline:execute?'작성 규칙: 승인된 변경':allow?'작성 규칙: 조회만 허용':'작성 규칙: 조회 차단',explanation:c.explanation};}
else if(data.kind==='evaluation'){const rows=c.samples.map(x=>({...x,eligible:!c.heldOutOnly||!x.seen})),included=rows.filter(x=>x.eligible),denominator=included.length,numerator=included.filter(x=>x.passed).length,percent=denominator?100*numerator/denominator:null;r={rows,denominator,numerator,percent,selected:included.map(x=>x.label),formula:denominator?numerator+' / '+denominator+' = '+percent+'% (직접 만든 항목)':'0 / 0 → 평가할 항목 없음 · 비율 미정의',headline:percent===null?'가정표에 평가 대상이 없음':'가정표의 선택한 항목: '+percent+'%',explanation:c.explanation};}
else if(data.kind==='resources'){const rows=c.resources.map(([label,need,capacity])=>({label,need,capacity,margin:capacity-need,eligible:need<=capacity}));const unmet=rows.filter(x=>!x.eligible).map(x=>x.label),meetsAuthoredConditions=unmet.length===0;r={rows,unmet,meetsAuthoredConditions,formula:rows.map(x=>x.label+': '+x.capacity+' − '+x.need+' = '+x.margin).join(' / '),headline:meetsAuthoredConditions?'작성한 세 조건은 충족':'작성 조건 미충족: '+unmet.join('·'),explanation:c.explanation};}
else if(data.kind==='institution'||data.kind==='transition'||data.kind==='acquisition'){const rows=c.items.map(x=>({...x,eligible:x.documented&&(!c.requireDelivery||x.delivered)}));const accepted=rows.filter(x=>x.eligible);r={rows,accepted:accepted.map(x=>x.label),count:accepted.length,formula:accepted.length+' / '+rows.length+'개가 선택한 근거 조건에 해당',headline:'기록 조건을 통과한 항목 '+accepted.length+'개',explanation:c.explanation};}
else throw new TypeError('Unknown finite case.');return freeze({id:c.id,label:c.label,...r,scope:data.caseScope,executesProduct:false});}
for(const v of data.views){if(!v.nodes.some(n=>n.id===v.initial)||new Set(v.nodes.map(n=>n.id)).size!==v.nodes.length)throw new TypeError('Distinct visible roles required.');for(const n of v.nodes)if(!n.sourceIds.length||n.sourceIds.some(s=>!data.sources[s]))throw new TypeError('Cited roles required.');for(const e of v.edges)if(!v.nodes.some(n=>n.id===e[0])||!v.nodes.some(n=>n.id===e[1]))throw new TypeError('Visible edge endpoints required.');}

window.AtlasDetailMeta2025=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
