/* Independent person profiles. Shared authored research articles are reused by canonical id. */
(function(){
 'use strict';
 const rows=[
  {
    "id": "seymour-papert",
    "name": "Seymour A. Papert",
    "nameKo": "시모어 페퍼트",
    "aliases": [
      "Seymour Papert",
      "Papert",
      "시모어 파퍼트",
      "페퍼트",
      "Perceptrons"
    ],
    "tagline": "배움의 가능성을, 표현의 구조에서 묻다",
    "roles": [
      "계산의 표현 범위",
      "구성주의·컴퓨팅과 학습"
    ],
    "tags": [
      "foundations",
      "symbolic",
      "neural"
    ],
    "intro": "수학과 인간의 지식 형성에 관심을 둔 연구자다. 민스키와는 망이 관찰하는 특징과 판단 방식을 제한했을 때 무엇을 계산할 수 있는지 분석했다. 제네바에서 피아제와 연구한 경험은 사람이 직접 만들고 탐구하며 지식을 구성한다는 관심으로도 이어졌다. Perceptrons의 표현 범위 분석과 이후 컴퓨터를 통한 배움의 연구를 한 사람의 서로 다른 질문으로 읽는다.",
    "workMode": "papert"
  },
  {
    "id": "patrick-hayes",
    "name": "Patrick J. Hayes",
    "nameKo": "패트릭 헤이스",
    "aliases": [
      "Pat Hayes",
      "Patrick Hayes",
      "Patrick John Hayes",
      "패트릭 헤이즈"
    ],
    "tagline": "상식과 행동, 웹의 지식에 정확한 뜻을 부여하다",
    "roles": [
      "지식 표현·자동 추론",
      "공간·시간·형식 의미론"
    ],
    "tags": [
      "symbolic"
    ],
    "intro": "상식에 관한 문장을 기계가 추론할 수 있는 표현으로 적으려 했다. 매카시와의 1969년 공동논문은 불완전한 세계 지식·행동·변하지 않는 사실을 어떻게 논리로 다룰지 물었다. 이후 RDF Semantics의 편집자로서는 웹의 관계 문장이 어떤 해석에서 참이며 어떤 추론이 타당한지 명시했다. 공동논문과 표준을 이어 읽으면 사실의 의미를 명시하는 연구가 여러 환경으로 확장되는 과정을 볼 수 있다.",
    "workMode": "hayes"
  },
  {
    "id": "luis-c-lamb",
    "name": "Luís C. Lamb",
    "nameKo": "루이스 C. 램",
    "aliases": [
      "Luis Lamb",
      "Luis C. Lamb",
      "Luís Lamb",
      "루이스 램",
      "루이스 람"
    ],
    "tagline": "경험에서 배우고, 배운 지식에서 추론하는 계산",
    "roles": [
      "신경 기호 AI",
      "추론·논리·학습의 결합"
    ],
    "tags": [
      "hybrid",
      "symbolic"
    ],
    "intro": "브라질 UFRGS와 런던 Imperial에서 컴퓨터과학을 공부하고, 논리와 신경 계산을 함께 다루는 연구를 전개했다. 가르세즈·개베이와의 공동저서는 명제의 참·거짓을 넘어서 가능 세계·시간·지식의 구조를 신경 계산과 연결하는 방법을 다룬다. 서로 다른 논리의 의미와 학습으로 변하는 연결값을 함께 살피는 것이 이 인물 기록의 중심이다.",
    "workMode": "cognitive"
  },
  {
    "id": "dov-gabbay",
    "name": "Dov M. Gabbay",
    "nameKo": "도브 M. 개베이",
    "aliases": [
      "Dov Gabbay",
      "Dov M Gabbay",
      "도브 개베이",
      "도브 가베이"
    ],
    "tagline": "논리 체계의 구조를 계산과 추론 모형으로 잇다",
    "roles": [
      "양상·시간 논리",
      "논리와 신경 기호 계산"
    ],
    "tags": [
      "symbolic",
      "hybrid"
    ],
    "intro": "논리 체계·양상 논리·시간 논리와 AI를 연구해 온 논리학자다. King’s College London에서는 논리와 계산 분야를 연구했으며, 가르세즈·램과의 공동저서에서는 여러 논리의 추론 구조를 신경 모형과 연결했다. 사례에서 배우는 능력과 명시한 의미에 따라 추론하는 능력이 어떤 조건에서 함께 성립하는지 살핀다.",
    "workMode": "cognitive"
  }
];
 const people=window.ATLAS_PEOPLE_PROFILES;
 if(!Array.isArray(people)||!window.AtlasPapertPerceptronsEntry)throw new Error('Stage2 symbolic profile dependencies are missing.');
 const clone=value=>JSON.parse(JSON.stringify(value));
 const workById=id=>{for(const p of people){const w=p.works.find(w=>w.id===id);if(w)return w;}throw new Error('Shared authored research record missing: '+id);};
 const sourceHayes=workById('mccarthy-hayes-1969'),sourceCognitive=workById('garcez-cognitive-reasoning-2008');
 const papert={...clone(window.AtlasPapertPerceptronsEntry.record),content:clone(window.AtlasPapertPerceptronsEntry.content)};
 for(const p of rows){const mode=p.workMode;delete p.workMode;if(people.some(old=>old.id===p.id))throw new Error('Duplicate stage2 profile: '+p.id);p.works=[clone(mode==='papert'?papert:mode==='hayes'?sourceHayes:sourceCognitive)];for(const w of p.works)delete w.eventId;people.push(p);}
 const minsky=people.find(p=>p.id==='marvin-minsky');if(!minsky)throw new Error('Minsky profile is required.');
 if(!minsky.works.some(w=>w.id===papert.id))minsky.works.push(clone(papert));
})();
