/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "luckey-oculus-2012",
  "kind": "vr",
  "sources": {
    "origin": {
      "title": "Palmer Luckey · 10 Years of Oculus",
      "url": "https://palmerluckey.com/10-years-of-oculus/",
      "location": "2022-04-15/16 회고가 재게시한2012-04-15 About문:넓은시야/낮은추적지연/가벼움/착용감/비용 목표. 개인회고와 당시문장구분."
    },
    "dk2": {
      "title": "Tom Forsyth · GDC Europe2014 / DK2",
      "url": "https://media.gdcvault.com/gdceurope2014/Presentations/830373_Tom_Forsyth.pdf#page=3",
      "location": "2014-08 Developing VR Experiences with Oculus Rift,PDF3 The Rift Technology. 화면·렌즈·왜곡보정·추적·융합/예측. 원문도판 실제확인."
    },
    "perception": {
      "title": "GDC2014 · 머리와 눈의 관계",
      "url": "https://media.gdcvault.com/gdceurope2014/Presentations/830373_Tom_Forsyth.pdf#page=22",
      "location": "PDF22 Vestibulo-Optical Reflex 도판,PDF23–25 fixation/VORgain. 귀·눈·반사경로와 머리/눈의관계를 개발 조건으로 제시. 그림 직접확인;생리학성능새주장X."
    },
    "compositor": {
      "title": "Meta · The compositor",
      "url": "https://developers.meta.com/vr/essentials/the-compositor/",
      "location": "Updated2026-08-28:세역할·Time warp·Positionaltimewarp·Lenscorrection.2026-11-11본문확인.2012기능으로소급하지않음."
    },
    "latency": {
      "title": "Meta PC SDK · Performance HUD",
      "url": "https://developers.meta.com/vr/documentation/native/pc/dg-hud/",
      "location": "Performance Summary/Latency Timing:AppMotion-to-Photon·AppTrackingtoMid-Photon·TimeWarptoMid-Photon 정의. 측정시작/끝점구분. CDN이미지fetch실패라직접이미지확인주장X."
    },
    "sdk": {
      "title": "Oculus Team · SDK1.0 개발자 제공",
      "url": "https://developers.meta.com/vr/blog/rift-sdk-1-0-shipping-to-developers-with-final-rift-hardware/",
      "location": "2015-12-21 본문:출시앱을 위한 최종hardware/SDK/runtime,DK2/SDK0.8의 다른 개발용도. 당시 개발 제공 범위."
    },
    "consumer": {
      "title": "Meta 공식 기록 · Introducing Oculus Rift",
      "url": "https://about.fb.com/news/2015/06/introducing-the-oculus-rift/",
      "location": "2015-06-11 본문:소비자Rift를2016Q1에 제공할 예정으로 발표. 발표와 실제배송구분."
    }
  },
  "views": [
    {
      "id": "experience",
      "label": "01 몸과 보이는 세계",
      "title": "시각 경험의 여러 조건을 함께 맞추기",
      "intro": "2012목표와2014개발 자료에서 몸·화면·착용의 관계를 고릅니다.",
      "initial": "head-motion",
      "layout": "layers",
      "nodes": [
        {
          "id": "head-motion",
          "label": "머리의 움직임",
          "input": "회전·이동하는 사용자",
          "role": "고개가 움직이면 어느 방향과 위치에서 장면을 볼지도 바뀐다.",
          "output": "다음 시점의 자세",
          "sourceIds": [
            "dk2",
            "perception"
          ],
          "x": 110,
          "y": 100,
          "icon": "people"
        },
        {
          "id": "tracking",
          "label": "자세·위치 추적",
          "input": "센서의 상태",
          "role": "2014DK2설명은 자세·위치 추적과 소프트웨어 융합·예측을 함께 놓는다.",
          "output": "장면을 정할 상태",
          "sourceIds": [
            "dk2"
          ],
          "x": 350,
          "y": 100,
          "icon": "loop"
        },
        {
          "id": "view",
          "label": "양쪽 눈의 장면",
          "input": "가상 공간의 시점",
          "role": "사람의 움직임과 어울리는 장면이 필요하다. VOR설명은 몸과 장면의 일치를 개발자가 고려할 맥락이다.",
          "output": "보일 영상",
          "sourceIds": [
            "dk2",
            "perception"
          ],
          "x": 590,
          "y": 100,
          "icon": "eye"
        },
        {
          "id": "lenses",
          "label": "시야·렌즈",
          "input": "화면에서 눈까지의 경로",
          "role": "넓은시야라는 목표와 렌즈 왜곡 보정이라는 개발 조건을 함께 본다.",
          "output": "눈에 닿은 장면",
          "sourceIds": [
            "origin",
            "dk2"
          ],
          "x": 350,
          "y": 300,
          "icon": "eye"
        },
        {
          "id": "comfort",
          "label": "착용의 조건",
          "input": "무게·긴 사용시간",
          "role": "초기소개문은 가벼움·편안함을 장치 목표의 일부로 적었다.",
          "output": "계속 쓸 조건",
          "sourceIds": [
            "origin"
          ],
          "x": 590,
          "y": 300,
          "icon": "people"
        },
        {
          "id": "presence",
          "label": "체험의 목표",
          "input": "움직임·영상·착용의 연결",
          "role": "현장에있는듯한 경험을 만들려는 목표다. 실제사람의반응은 별도관찰이 필요하다.",
          "output": "검토할 경험",
          "sourceIds": [
            "origin",
            "perception"
          ],
          "x": 820,
          "y": 200,
          "icon": "network"
        }
      ],
      "edges": [
        [
          "head-motion",
          "tracking",
          "추적"
        ],
        [
          "tracking",
          "view",
          "시점"
        ],
        [
          "view",
          "lenses",
          "영상"
        ],
        [
          "lenses",
          "presence",
          "지각"
        ],
        [
          "comfort",
          "presence",
          "착용"
        ]
      ],
      "sourceNote": "초기목표와2014원자료를 엮은 자체도식 · 신경반사 회로 전체의 재현 아님"
    },
    {
      "id": "response",
      "label": "02 움직임에서 표시까지",
      "title": "시간이 흐르는 경로와 후대의 보정",
      "intro": "현재compositor설명은2012구현과구분해후속원리로연결합니다.",
      "initial": "render-frame",
      "layout": "layers",
      "nodes": [
        {
          "id": "sample",
          "label": "움직임을 읽기",
          "input": "이번 센서 상태",
          "role": "장면을 그릴 자세 정보를 얻는다.",
          "output": "앱의 입력",
          "sourceIds": [
            "dk2",
            "latency"
          ],
          "x": 110,
          "y": 100,
          "icon": "loop"
        },
        {
          "id": "render-frame",
          "label": "장면을 그리기",
          "input": "자세와 공간의 자료",
          "role": "앱이 각 눈의 영상을 렌더링한다. 계산 중에도 사용자는 움직일 수 있다.",
          "output": "제출된 프레임",
          "sourceIds": [
            "compositor",
            "latency"
          ],
          "x": 350,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "late-pose",
          "label": "더 늦은 방향 추정",
          "input": "표시 가까운 시점의 자세",
          "role": "현재timewarp문서는 나중의 방향 추정으로 완성프레임을 조정한다고 설명한다.",
          "output": "보정의 입력",
          "sourceIds": [
            "compositor"
          ],
          "x": 590,
          "y": 100,
          "icon": "people"
        },
        {
          "id": "composite",
          "label": "보정·합성",
          "input": "영상·렌즈·레이어",
          "role": "현재compositor는 회전보정·렌즈보정·레이어 합성을 담당한다.",
          "output": "표시할 결과",
          "sourceIds": [
            "compositor"
          ],
          "x": 350,
          "y": 300,
          "icon": "eye"
        },
        {
          "id": "screen",
          "label": "화면에 표시",
          "input": "완성된 출력",
          "role": "측정의 끝점을 어디에 두는지가지연수치의의미를정한다.",
          "output": "눈에 닿는 빛",
          "sourceIds": [
            "latency"
          ],
          "x": 590,
          "y": 300,
          "icon": "memory"
        },
        {
          "id": "delay-case",
          "label": "직접 지연 계산",
          "input": "가정한네단계와일정회전",
          "role": "합계와그시간동안의회전각만계산한다. 실제예측이나보정결과가 아니다.",
          "output": "비교할 가정",
          "sourceIds": [
            "latency",
            "compositor"
          ],
          "x": 820,
          "y": 200,
          "icon": "chart"
        }
      ],
      "edges": [
        [
          "sample",
          "render-frame",
          "처리"
        ],
        [
          "render-frame",
          "composite",
          "프레임"
        ],
        [
          "late-pose",
          "composite",
          "더늦은정보"
        ],
        [
          "composite",
          "screen",
          "표시"
        ],
        [
          "screen",
          "delay-case",
          "시간기준"
        ]
      ],
      "sourceNote": "후대공식compositor의역할재배치 · 직접계산은예측/보정SDK실행아님"
    },
    {
      "id": "development",
      "label": "03 시제품에서 플랫폼으로",
      "title": "발표·개발자 제공·현재 설명의 다른 시점",
      "intro": "장치의 이름이 같아도 모든 버전과 문서를 한 시점으로 합치지 않습니다.",
      "initial": "sdk-stage",
      "layout": "timeline",
      "nodes": [
        {
          "id": "start2012",
          "label": "2012 출발",
          "input": "재게시된당시소개문",
          "role": "체험의목표와사업의시작을창업자회고로확인한다.",
          "output": "목표의 기록",
          "sourceIds": [
            "origin"
          ],
          "x": 100,
          "y": 110,
          "icon": "document"
        },
        {
          "id": "dk22014",
          "label": "2014 DK2",
          "input": "GDC개발발표",
          "role": "화면·추적·예측을함께설명한후속개발시점이다.",
          "output": "장치 개발의 조건",
          "sourceIds": [
            "dk2",
            "perception"
          ],
          "x": 290,
          "y": 295,
          "icon": "memory"
        },
        {
          "id": "sdk-stage",
          "label": "2015 SDK·runtime",
          "input": "출시앱개발자의준비",
          "role": "최종장치와개발도구를맞추어다른개발자가콘텐츠를준비할경로다.",
          "output": "제작 가능한 플랫폼",
          "sourceIds": [
            "sdk"
          ],
          "x": 480,
          "y": 110,
          "icon": "grid"
        },
        {
          "id": "consumer-plan",
          "label": "소비자 제공 계획",
          "input": "2015발표의2016Q1예정",
          "role": "제품발표와배송시점을구분해읽는다.",
          "output": "후속이행의질문",
          "sourceIds": [
            "consumer"
          ],
          "x": 670,
          "y": 295,
          "icon": "people"
        },
        {
          "id": "current-doc",
          "label": "2026 원리 설명",
          "input": "현재compositor문서",
          "role": "후대의구현설명을초기제품기능으로소급하지않는다.",
          "output": "지연문제의다음설계",
          "sourceIds": [
            "compositor"
          ],
          "x": 860,
          "y": 110,
          "icon": "loop"
        }
      ],
      "edges": [
        [
          "start2012",
          "dk22014",
          "개발"
        ],
        [
          "dk22014",
          "sdk-stage",
          "도구"
        ],
        [
          "sdk-stage",
          "consumer-plan",
          "제공예정"
        ],
        [
          "sdk-stage",
          "current-doc",
          "후대설명"
        ]
      ],
      "sourceNote": "각자날짜를가진1차기록 · 최초VR발명·현재제품구매안내 아님"
    }
  ],
  "cases": [
    {
      "id": "base",
      "label": "네 단계 합계",
      "stages": [
        [
          "감지",
          2
        ],
        [
          "앱 처리",
          4
        ],
        [
          "렌더링",
          8
        ],
        [
          "표시 대기",
          6
        ]
      ],
      "angularSpeed": 90,
      "explanation": "2+4+8+6=20ms입니다. 일정회전 가정에서는 이 시간 동안1.8° 움직입니다. 실제 표시 오차와 같다는 뜻은 아닙니다."
    },
    {
      "id": "render",
      "label": "렌더링을 줄이면",
      "stages": [
        [
          "감지",
          2
        ],
        [
          "앱 처리",
          4
        ],
        [
          "렌더링",
          4
        ],
        [
          "표시 대기",
          6
        ]
      ],
      "angularSpeed": 90,
      "explanation": "합계16ms,가정각도1.44°입니다. 렌더링만 빨라져도 다른 단계의 시간은 남습니다."
    },
    {
      "id": "display",
      "label": "표시 대기를 줄이면",
      "stages": [
        [
          "감지",
          2
        ],
        [
          "앱 처리",
          4
        ],
        [
          "렌더링",
          8
        ],
        [
          "표시 대기",
          2
        ]
      ],
      "angularSpeed": 90,
      "explanation": "합계16ms,각도1.44°입니다. 다른 경로를 바꾸어도 같은 합계가 나올 수 있습니다."
    },
    {
      "id": "both",
      "label": "두 단계를 줄이면",
      "stages": [
        [
          "감지",
          2
        ],
        [
          "앱 처리",
          4
        ],
        [
          "렌더링",
          4
        ],
        [
          "표시 대기",
          2
        ]
      ],
      "angularSpeed": 90,
      "explanation": "합계12ms,각도1.08°입니다. 이 모델 안의 변화이며 실제 편안함의 향상이나 성능을 측정한 결과는 아닙니다."
    }
  ],
  "caseTitle": "직접 정한 지연: 영상 한 장을 기다리는 동안 얼마나 움직일까?",
  "caseScope": "각 단계의 ms와 회전속도90°/s는 직접 가정했습니다. 직렬합계L과일정회전ω에서ωL/1000만 계산합니다. 실제Rift·센서·SDK·프레임예측·표시오차·사람의지각·멀미를 측정하거나 재현하지 않습니다.",
  "bridges": [
    {
      "id": "anduril",
      "label": "이후 Anduril·Lattice의 현장 시스템",
      "personId": "palmer-luckey",
      "workId": "luckey-anduril-2017",
      "filter": "industry"
    },
    {
      "id": "graphics",
      "label": "그래픽 계산의 시스템 조건",
      "personId": "jensen-huang",
      "workId": "huang-nvidia-1993",
      "filter": "industry"
    }
  ],
  "visualId": "detail-luckey-oculus-2012"
};

function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
function getView(id){const v=data.views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown view.');return v;}
function select(view,id){const n=getView(view).nodes.find(n=>n.id===id);if(!n)throw new RangeError('Choose a visible source role.');return n;}
function evaluate(id){const c=data.cases.find(c=>c.id===id);if(!c)throw new RangeError('Choose an authored case.');let r;
if(data.kind==='factory'){const rows=c.routes.map(([label,recompute,transfer,queue])=>({label,recompute,transfer,queue,value:recompute+transfer+queue}));const minimum=Math.min(...rows.map(x=>x.value)),selected=rows.filter(x=>x.value===minimum).map(x=>x.label);r={rows,minimum,selected,formula:rows.map(x=>x.label+': '+x.recompute+' + '+x.transfer+' + '+x.queue+' = '+x.value).join(' / '),headline:'작성 비용에서 '+selected.join('·')+' 선택 · '+minimum+' 단위',explanation:c.explanation};}
else if(data.kind==='graphics'||data.kind==='vr'){const rows=c.stages.map(([label,value])=>({label,value}));if(rows.some(x=>!Number.isInteger(x.value)||x.value<0))throw new TypeError('Nonnegative authored units required.');const sum=rows.reduce((n,x)=>n+x.value,0),max=Math.max(...rows.map(x=>x.value));r={rows,total:sum,interval:max,bottlenecks:rows.filter(x=>x.value===max).map(x=>x.label),formula:rows.map(x=>x.value).join(' + ')+' = '+sum,headline:data.kind==='graphics'?'첫 항목의 가정 지연 '+sum+' · 겹쳐 흐를 때 간격 '+max:'가정한 직렬 지연 '+sum+' ms',explanation:c.explanation};if(data.kind==='vr'){r.angularSpeed=c.angularSpeed;r.angle=Number((c.angularSpeed*sum/1000).toFixed(4));r.formula+=' ms / 일정 회전 가정 '+c.angularSpeed+' × '+sum+' / 1000 = '+r.angle+'°';}}
else if(data.kind==='aip'){const allow=c.permission&&c.objectAllowed,execute=allow&&c.approved;const rows=[['자료 권한',c.permission],['대상 범위',c.objectAllowed],['변경 승인',c.approved]].map(([label,value])=>({label,value:Number(value)}));r={rows,allowed:allow,executed:execute,audit:['request',allow?'read-allowed':'read-denied',execute?'approved-action':'no-action'],formula:'조회 = 권한 ∧ 대상범위 = '+Number(allow)+' / 변경 = 조회 ∧ 승인 = '+Number(execute),headline:execute?'작성 규칙: 승인된 변경':allow?'작성 규칙: 조회만 허용':'작성 규칙: 조회 차단',explanation:c.explanation};}
else if(data.kind==='resources'){const rows=c.resources.map(([label,need,capacity])=>({label,need,capacity,margin:capacity-need,eligible:need<=capacity}));const unmet=rows.filter(x=>!x.eligible).map(x=>x.label),meetsAuthoredConditions=unmet.length===0;r={rows,unmet,meetsAuthoredConditions,formula:rows.map(x=>x.label+': '+x.capacity+' − '+x.need+' = '+x.margin).join(' / '),headline:meetsAuthoredConditions?'작성한 세 조건은 충족':'작성 조건 미충족: '+unmet.join('·'),explanation:c.explanation};}
else if(data.kind==='institution'||data.kind==='transition'||data.kind==='acquisition'){const rows=c.items.map(x=>({...x,eligible:x.documented&&(!c.requireDelivery||x.delivered)}));const accepted=rows.filter(x=>x.eligible);r={rows,accepted:accepted.map(x=>x.label),count:accepted.length,formula:accepted.length+' / '+rows.length+'개가 선택한 근거 조건에 해당',headline:'기록 조건을 통과한 항목 '+accepted.length+'개',explanation:c.explanation};}
else throw new TypeError('Unknown finite case.');return freeze({id:c.id,label:c.label,...r,scope:data.caseScope,executesProduct:false});}
for(const v of data.views){if(!v.nodes.some(n=>n.id===v.initial)||new Set(v.nodes.map(n=>n.id)).size!==v.nodes.length)throw new TypeError('Distinct visible roles required.');for(const n of v.nodes)if(!n.sourceIds.length||n.sourceIds.some(s=>!data.sources[s]))throw new TypeError('Cited roles required.');for(const e of v.edges)if(!v.nodes.some(n=>n.id===e[0])||!v.nodes.some(n=>n.id===e[1]))throw new TypeError('Visible edge endpoints required.');}

window.AtlasDetailOculus2012=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
