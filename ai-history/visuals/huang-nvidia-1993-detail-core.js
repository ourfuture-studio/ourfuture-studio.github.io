/* Official-source roles and authored finite cases; no product/API execution. */
(function(){'use strict';
const data={
  "slug": "huang-nvidia-1993",
  "kind": "graphics",
  "sources": {
    "founding": {
      "title": "NVIDIA 공식 연혁 · 1993",
      "url": "https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/",
      "location": "1993 · 3D Graphics. 1993-04-05와 Huang·Malachowsky·Priem 공동설립, 게임·멀티미디어 목표. 2026-11-11 본문 확인."
    },
    "later": {
      "title": "NVIDIA 공식 연혁 · 후속 사건",
      "url": "https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/",
      "location": "1999 GPU · 2006 CUDA · 2012 AI. 회사의 회고·표현이며 독립 성능 검증이 아니다. 2026-11-11 확인."
    },
    "pipeline": {
      "title": "NVIDIA GPU Gems · Fig.28-1",
      "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
      "location": "Cem Cebenoyan, Chapter28 §28.1.1 · Fig.28-1, PDF p6/인쇄474. 원 도판 직접 확인: system/video memory, caches, vertex/raster/fragment/ROP. 2004 설명을 1993 사양으로 소급하지 않음."
    },
    "bottleneck": {
      "title": "GPU Gems · 병목을 찾는 방법",
      "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
      "location": "§28.1.2·§28.2 및 Fig.28-2. 작업량/처리 조건을 바꾸어 제한 단계를 찾고 반복하는 절. 도판28-2 본문 설명 확인, 그림 자체의 영상 검토는 하지 않음."
    },
    "stages": {
      "title": "GPU Gems · 정점·fragment·출력",
      "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
      "location": "§28.2.1 ROP, §28.2.3 Fragment Shading, §28.2.4 Vertex Processing. 색 계산과 기억 읽기·쓰기를 구분한 본문 확인."
    },
    "developer": {
      "title": "GPU Gems · 자료 이동과 작업 제출",
      "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
      "location": "§28.2.5 Vertex and Index Transfer · §28.3.1 CPU/resource locking/batch size. 실제 구현·벤치마크는 실행하지 않음."
    }
  },
  "views": [
    {
      "id": "problem",
      "label": "01 어떤 일을 감당할까",
      "title": "게임의 장면을, 반복해 그릴 수 있는 제품으로",
      "intro": "1993 공식 연혁의 공동설립·시장 목표를 출발점으로, 장면을 만드는 사람과 계산을 받아 줄 개발 조건을 연결합니다.",
      "initial": "scene",
      "layout": "layers",
      "sourceNote": "1993 공식 회고에서 출발한 자체 역할 도식 · 개인의 단독 알고리즘 발명으로 읽지 않음",
      "nodes": [
        {
          "id": "scene",
          "label": "움직이는 3D 장면",
          "input": "게임·멀티미디어의 장면",
          "role": "화면이 바뀔 때마다 기하와 색을 다시 다룰 계산 수요가 생긴다.",
          "output": "반복할 그래픽스 작업",
          "sourceIds": [
            "founding",
            "pipeline"
          ],
          "x": 110,
          "y": 130,
          "icon": "triangle"
        },
        {
          "id": "founders",
          "label": "세 공동설립자",
          "input": "제품과 조직을 만들 선택",
          "role": "공식 연혁은 Huang·Malachowsky·Priem을 함께 적는다. 팀의 개발 역할과 함께 읽는다.",
          "output": "1993 회사의 출발",
          "sourceIds": [
            "founding"
          ],
          "x": 335,
          "y": 85,
          "icon": "people"
        },
        {
          "id": "builders",
          "label": "개발자의 장면",
          "input": "물체·재질·그릴 명령",
          "role": "장면을 구성한 자료와 명령이 장치에 전달될 수 있어야 한다.",
          "output": "장치에 줄 작업",
          "sourceIds": [
            "pipeline",
            "developer"
          ],
          "x": 335,
          "y": 285,
          "icon": "document"
        },
        {
          "id": "graphics-work",
          "label": "그래픽스 기반",
          "input": "반복되는 여러 종류의 일",
          "role": "정점·화면 위치·색·기억 접근을 기능과 자료 흐름으로 나누어 다룬다.",
          "output": "표현을 바꾸는 처리 경로",
          "sourceIds": [
            "pipeline",
            "stages"
          ],
          "x": 575,
          "y": 185,
          "icon": "network"
        },
        {
          "id": "experience",
          "label": "다시 그릴 화면",
          "input": "처리와 기억 접근의 결과",
          "role": "사용자가 볼 화면으로 이어져야 제품의 계산이 경험과 연결된다. 실제 속도는 조건별 측정이 필요하다.",
          "output": "다음 프레임의 질문",
          "sourceIds": [
            "founding",
            "bottleneck"
          ],
          "x": 815,
          "y": 185,
          "icon": "grid"
        }
      ],
      "edges": [
        [
          "scene",
          "founders",
          "제품의 문제"
        ],
        [
          "scene",
          "builders",
          "표현할 장면"
        ],
        [
          "founders",
          "graphics-work",
          "조직·개발"
        ],
        [
          "builders",
          "graphics-work",
          "자료·명령"
        ],
        [
          "graphics-work",
          "experience",
          "화면으로"
        ]
      ]
    },
    {
      "id": "pipeline",
      "label": "02 장면이 화면으로",
      "title": "Fig.28-1의 기능과 기억을, 자료가 지나는 길로 읽기",
      "intro": "GPU Gems의 원 그림을 다시 배치했습니다. 명령·기하·처리·화면 기록의 역할을 누르면 해당 절이 열립니다.",
      "initial": "vertex",
      "layout": "memory",
      "sourceNote": "GPU Gems(2004) Fig.28-1 기반 자체 재배치 · 1993 제품 배선도 아님",
      "nodes": [
        {
          "id": "cpu",
          "label": "CPU · 명령 제출",
          "input": "그릴 장면의 요청",
          "role": "CPU가 준비한 명령과 자료가 그래픽스 장치의 작업으로 들어간다. 제출 비용과 자료 이동도 고려한다.",
          "output": "명령과 기하의 공급",
          "sourceIds": [
            "pipeline",
            "developer"
          ],
          "x": 110,
          "y": 175,
          "icon": "document"
        },
        {
          "id": "geometry",
          "label": "기하 자료",
          "input": "정점과 index",
          "role": "자료가 놓인 기억과 전송 경로가 다음 처리 단계의 조건이 된다.",
          "output": "정점 속성",
          "sourceIds": [
            "pipeline",
            "developer"
          ],
          "x": 338,
          "y": 100,
          "icon": "memory"
        },
        {
          "id": "vertex",
          "label": "정점 변환",
          "input": "위치·법선·좌표",
          "role": "clipping·rasterization에 쓸 표현으로 바꾼다. 각 정점에 필요한 일과 정점 수가 부담을 만든다.",
          "output": "화면 배치에 쓸 속성",
          "sourceIds": [
            "pipeline",
            "stages"
          ],
          "x": 565,
          "y": 100,
          "icon": "triangle"
        },
        {
          "id": "raster",
          "label": "화면의 덮임",
          "input": "처리된 삼각형",
          "role": "원 그림의 triangle setup과 rasterization은 기하를 화면의 fragment로 잇는 기능이다.",
          "output": "색을 다룰 화면 부분",
          "sourceIds": [
            "pipeline"
          ],
          "x": 800,
          "y": 100,
          "icon": "grid"
        },
        {
          "id": "fragment",
          "label": "색과 깊이",
          "input": "fragment·텍스처",
          "role": "색·깊이를 계산하는 일과 출력 기억 접근은 구분해서 제한 요인을 살핀다.",
          "output": "비교·기록할 값",
          "sourceIds": [
            "pipeline",
            "stages"
          ],
          "x": 800,
          "y": 290,
          "icon": "grid"
        },
        {
          "id": "frame",
          "label": "Frame buffer",
          "input": "출력할 색·깊이",
          "role": "비교·blending·읽고 쓰는 부담이 생긴다. 색을 계산하는 기능만 빨라져도 이 경계가 남을 수 있다.",
          "output": "화면의 기록",
          "sourceIds": [
            "pipeline",
            "stages"
          ],
          "x": 338,
          "y": 290,
          "icon": "memory"
        }
      ],
      "edges": [
        [
          "cpu",
          "geometry",
          "자료"
        ],
        [
          "geometry",
          "vertex",
          "fetch"
        ],
        [
          "vertex",
          "raster",
          "변환"
        ],
        [
          "raster",
          "fragment",
          "fragment"
        ],
        [
          "fragment",
          "frame",
          "읽기·쓰기"
        ]
      ]
    },
    {
      "id": "conditions",
      "label": "03 무엇을 바꿀까",
      "title": "한 번에 모든 것을 빠르게 하기보다, 제한하는 단계를 찾다",
      "intro": "병목을 찾는 개발 방법과 후속 연혁을 날짜별로 읽습니다. 아래 가정 사례는 실제 GPU를 실행하지 않습니다.",
      "initial": "identify",
      "layout": "timeline",
      "sourceNote": "공식 연혁과 GPU Gems 방법론을 잇는 자체 도식 · 발표·활용·측정을 구분",
      "nodes": [
        {
          "id": "identify",
          "label": "작업량을 바꾸기",
          "input": "느린 장면과 단계 후보",
          "role": "정점·fragment·출력 등의 부담을 하나씩 바꾸어 어느 조건에 반응하는지 확인한다.",
          "output": "병목의 후보",
          "sourceIds": [
            "bottleneck"
          ],
          "x": 100,
          "y": 115,
          "icon": "document"
        },
        {
          "id": "optimize",
          "label": "해당 경계를 줄이기",
          "input": "확인한 제한 요인",
          "role": "계산·자료 크기·제출 방식 중 실제 부담을 줄인 뒤 다시 살핀다.",
          "output": "다음에 확인할 조건",
          "sourceIds": [
            "developer",
            "bottleneck"
          ],
          "x": 290,
          "y": 295,
          "icon": "loop"
        },
        {
          "id": "gpu1999",
          "label": "1999 · GPU",
          "input": "뒤의 제품 연혁",
          "role": "회사의 GPU 회고를 1993 공동설립과 별도 사건으로 둔다.",
          "output": "후속 그래픽스 기반",
          "sourceIds": [
            "later"
          ],
          "x": 480,
          "y": 115,
          "icon": "grid"
        },
        {
          "id": "cuda2006",
          "label": "2006 · CUDA",
          "input": "그래픽스 밖의 과학·연구",
          "role": "공식 연혁은 GPU의 병렬 계산을 과학과 연구로 연 기반을 별도 연도로 기록한다.",
          "output": "다른 계산의 개발 접점",
          "sourceIds": [
            "later"
          ],
          "x": 670,
          "y": 295,
          "icon": "network"
        },
        {
          "id": "ai2012",
          "label": "2012 · AI 활용",
          "input": "뒤의 신경망 학습",
          "role": "AlexNet과 연결된 활용을 회사 연혁의 후속 사건으로 읽는다. 설립 당시의 단독 AI 발명으로 합치지 않는다.",
          "output": "기존 CUDA·AI 카드로",
          "sourceIds": [
            "later"
          ],
          "x": 860,
          "y": 115,
          "icon": "memory"
        }
      ],
      "edges": [
        [
          "identify",
          "optimize",
          "반복"
        ],
        [
          "gpu1999",
          "cuda2006",
          "후속 시점"
        ],
        [
          "cuda2006",
          "ai2012",
          "후속 활용"
        ]
      ]
    }
  ],
  "cases": [
    {
      "id": "base",
      "label": "출력이 느린 가정",
      "stages": [
        [
          "전송",
          4
        ],
        [
          "정점",
          6
        ],
        [
          "fragment",
          8
        ],
        [
          "출력",
          12
        ]
      ],
      "explanation": "첫 항목은30단위, 지속 간격은12단위로 둡니다. 출력의12가 남아 있습니다."
    },
    {
      "id": "shader",
      "label": "fragment만 줄이기",
      "stages": [
        [
          "전송",
          4
        ],
        [
          "정점",
          6
        ],
        [
          "fragment",
          4
        ],
        [
          "출력",
          12
        ]
      ],
      "explanation": "단계 합은26으로 줄지만 가장 느린 출력12가 남아 지속 간격은 그대로입니다."
    },
    {
      "id": "output",
      "label": "출력 부담 줄이기",
      "stages": [
        [
          "전송",
          4
        ],
        [
          "정점",
          6
        ],
        [
          "fragment",
          8
        ],
        [
          "출력",
          6
        ]
      ],
      "explanation": "합은24, 지속 간격은8입니다. 이제 fragment가 새 병목이 되어 다음 확인 대상이 바뀝니다."
    },
    {
      "id": "balanced",
      "label": "세 경계를 맞추기",
      "stages": [
        [
          "전송",
          4
        ],
        [
          "정점",
          6
        ],
        [
          "fragment",
          6
        ],
        [
          "출력",
          6
        ]
      ],
      "explanation": "합은22, 지속 간격은6입니다. 세 단계가 같은 제한값을 가지므로 한 경계만 다시 줄여도 다른 경계가 남을 수 있습니다."
    }
  ],
  "caseTitle": "가정한 단계 예산: 어디를 줄여야 흐름이 달라질까?",
  "caseScope": "수와 단위는 직접 정했습니다. 첫 항목은 단계 합, 완전히 겹쳐 흐르는 독립 단계의 지속 간격은 최댓값으로 둔 작은 모형입니다. CPU·캐시·준비·실제 GPU 스케줄을 실행하지 않아 제품의 지연·프레임률·성능비가 아닙니다.",
  "bridges": [
    {
      "id": "cuda",
      "label": "CUDA의 병렬 계산으로",
      "personId": "jensen-huang",
      "workId": "huang-cuda-2006",
      "filter": "industry"
    },
    {
      "id": "gtc",
      "label": "GTC의 시스템 발표로",
      "personId": "jensen-huang",
      "workId": "huang-gtc-2025",
      "filter": "industry"
    }
  ],
  "visualId": "detail-huang-nvidia-1993"
};

function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
function getView(id){const v=data.views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown view.');return v;}
function select(view,id){const n=getView(view).nodes.find(n=>n.id===id);if(!n)throw new RangeError('Choose a visible source role.');return n;}
function evaluate(id){const c=data.cases.find(c=>c.id===id);if(!c)throw new RangeError('Choose an authored case.');let r;
if(data.kind==='graphics'||data.kind==='factory'||data.kind==='vr'){const rows=c.stages.map(([label,value])=>({label,value}));if(rows.some(x=>!Number.isInteger(x.value)||x.value<0))throw new TypeError('Nonnegative authored units required.');const sum=rows.reduce((n,x)=>n+x.value,0),max=Math.max(...rows.map(x=>x.value));r={rows,total:sum,interval:max,bottlenecks:rows.filter(x=>x.value===max).map(x=>x.label),formula:rows.map(x=>x.value).join(' + ')+' = '+sum,headline:data.kind==='graphics'?'첫 항목의 가정 지연 '+sum+' · 겹쳐 흐를 때 간격 '+max:'가정한 합계 '+sum+' 단위',explanation:c.explanation};}
else if(data.kind==='aip'){const allow=c.permission&&c.objectAllowed,execute=allow&&c.approved;const rows=[['자료 권한',c.permission],['대상 범위',c.objectAllowed],['변경 승인',c.approved]].map(([label,value])=>({label,value:Number(value)}));r={rows,allowed:allow,executed:execute,audit:['request',allow?'read-allowed':'read-denied',execute?'approved-action':'no-action'],formula:'조회 = 권한 ∧ 대상범위 = '+Number(allow)+' / 변경 = 조회 ∧ 승인 = '+Number(execute),headline:execute?'작성 규칙: 승인된 변경':allow?'작성 규칙: 조회만 허용':'작성 규칙: 조회 차단',explanation:c.explanation};}
else if(data.kind==='institution'||data.kind==='transition'||data.kind==='acquisition'){const rows=c.items.map(x=>({...x,eligible:x.documented&&(!c.requireDelivery||x.delivered)}));const accepted=rows.filter(x=>x.eligible);r={rows,accepted:accepted.map(x=>x.label),count:accepted.length,formula:accepted.length+' / '+rows.length+'개가 선택한 근거 조건에 해당',headline:'기록 조건을 통과한 항목 '+accepted.length+'개',explanation:c.explanation};}
else throw new TypeError('Unknown finite case.');return freeze({id:c.id,label:c.label,...r,scope:data.caseScope,executesProduct:false});}
for(const v of data.views){if(!v.nodes.some(n=>n.id===v.initial)||new Set(v.nodes.map(n=>n.id)).size!==v.nodes.length)throw new TypeError('Distinct visible roles required.');for(const n of v.nodes)if(!n.sourceIds.length||n.sourceIds.some(s=>!data.sources[s]))throw new TypeError('Cited roles required.');for(const e of v.edges)if(!v.nodes.some(n=>n.id===e[0])||!v.nodes.some(n=>n.id===e[1]))throw new TypeError('Visible edge endpoints required.');}

window.AtlasDetailNvidia1993=freeze({...data,nodes:data.views.flatMap(v=>v.nodes),getView,select,evaluate});
})();
