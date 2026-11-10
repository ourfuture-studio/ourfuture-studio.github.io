/* Sourced roles, not a live system, operational controller or performance model. */
(function(){
  'use strict';
  const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const sources={
    lattice:{id:'lattice',title:'Anduril · Lattice의 통합 계층',url:'https://www.anduril.com/news/anduril-s-lattice-a-trusted-dual-use-commercial-and-military-platform-for-public-safety-security',location:'2023-07-31 · 분산 센서·피드·시스템의 통합, AI·ML 처리, 사용자와 자산의 연결'},
    mission:{id:'mission',title:'Anduril · Lattice for Mission Autonomy',url:'https://blog.anduril.com/anduril-unveils-lattice-for-mission-autonomy-8e0c5fa0e94b',location:'2023-05-03 · 여러 로봇 자산의 연결과 사람의 감독에 관한 제품 발표'},
    sdk:{id:'sdk',title:'Lattice Developers · 개념과 데이터 흐름',url:'https://developer.anduril.com/guides/concepts/overview',location:'현행 문서 · 데이터·하드웨어 통합과 양방향 연결의 개념 · 확인 2026-11-10'},
    entities:{id:'entities',title:'Lattice Developers · Entities',url:'https://developer.anduril.com/guides/entities/overview',location:'현행 문서 · 공통 상황 표현, 구성요소와 불완전한 정보 · 확인 2026-11-10'},
    partnership:{id:'partnership',title:'Anduril·Palantir · 협력 발표',url:'https://www.anduril.com/news/anduril-and-palantir-to-accelerate-ai-capabilities-for-national-security',location:'2024-12-06 · Lattice·Menace의 현장 데이터와 AIP의 데이터 정리·학습·배포 연결 계획'},
    aip:{id:'aip',title:'Palantir · AIP overview',url:'https://www.palantir.com/docs/foundry/aip/overview',location:'현행 문서 · AI를 조직의 데이터·운영에 연결하는 플랫폼 설명 · 확인 2026-11-10'}
  };
  const nodes=[
    {id:'sensors',label:'센서·장치의 관측',short:'여러 형식의 입력',icon:'sensor',type:'관측원',input:'분산된 센서·영상 피드·시스템 데이터',role:'서로 다른 장치가 보고한 정보를 통합 계층으로 전달한다.',output:'출처가 다른 관측 정보',sourceIds:['lattice'],example:{input:'시설 A의 카메라 장면과 설비 상태 보고',role:'서로 다른 관측이 들어온 장면을 직접 구성했다.',output:'영상 관측 / 설비 상태 관측'}},
    {id:'perception',label:'AI·데이터 처리',short:'관측을 해석하기',icon:'model',type:'처리 계층',input:'센서와 시스템에서 받은 정보',role:'공식 설명은 AI·ML·센서 데이터 처리로 정보를 분석하고 추린다고 소개한다.',output:'사용자가 검토할 정보',sourceIds:['lattice'],example:{input:'시설 A에 관한 두 관측',role:'점검할 단서를 추려 보는 예시다. 이 화면에서 인식 모델을 실행하지 않는다.',output:'시설 A: 점검할 단서가 있음'}},
    {id:'shared-state',label:'함께 보는 상황',short:'대상·관계·상태',icon:'entity',type:'정보 표현',input:'관측과 처리 결과',role:'Entity는 운영에 관련된 대상과 구성요소를 표현한다. 정보가 일부만 채워진 상태도 다룬다.',output:'여러 사용자가 참고할 상황 표현',sourceIds:['entities','lattice'],example:{input:'시설 A에 관한 점검 단서',role:'하나의 설비 카드에 출처와 상태를 나란히 놓아 본다. 자동으로 같은 대상을 판정한 결과가 아니다.',output:'설비 A · 점검 단서 · 관측 출처'}},
    {id:'operator',label:'사람의 상황 이해',short:'검토와 업무 선택',icon:'operator',type:'사람의 역할',input:'통합된 상황과 관련 정보',role:'공식 발표는 사용자가 한 화면에서 정보를 읽고 연결된 센서·차량·자산에 작업을 요청하는 구성을 설명한다.',output:'사용자가 선택한 업무의 맥락',sourceIds:['lattice','mission'],example:{input:'설비 A의 상태와 관측 출처',role:'운영자가 추가 점검이 필요한지 검토하는 장면이다.',output:'시설 점검 업무 선택'}},
    {id:'task-contract',label:'작업의 표현',short:'소프트웨어와 장치의 접점',icon:'task',type:'통합 인터페이스',input:'선택한 업무',role:'SDK 문서는 데이터의 표현과 연결된 자산의 작업을 구분한다. 작업의 교환에는 정해진 통합 형식이 필요하다.',output:'연결된 시스템이 처리할 작업 정보',sourceIds:['sdk'],example:{input:'시설 점검 업무 선택',role:'점검 업무라는 뜻을 장치 쪽과 공유하는 개념 예시다. 실제 명령·API 요청을 만들지 않는다.',output:'시설 A 점검 · 예시 작업 정보'}},
    {id:'field-system',label:'연결된 현장 시스템',short:'기존 장치·로봇·자산',icon:'robot',type:'현장 자산',input:'시스템에 전달된 작업 정보',role:'Lattice는 다른 하드웨어와 소프트웨어를 연결하는 구조로 소개된다. 실제 기능은 연결된 자산과 통합 범위에 달려 있다.',output:'현장 시스템의 진행 정보',sourceIds:['sdk','mission'],example:{input:'시설 A 점검이라는 예시 업무',role:'시설 점검 로봇이 업무를 맡는 장면이다. 실제 Lattice 제품 시연이나 장비 제어가 아니다.',output:'점검 진행 중 · 예시 상태'}},
    {id:'feedback',label:'상태를 다시 공유',short:'연결은 한 번으로 끝나지 않는다',icon:'status',type:'상태 피드백',input:'연결된 시스템의 상태 정보',role:'개념 문서의 양방향 통합을 따라, 현장 상태를 다시 읽는 경로를 함께 표시한다.',output:'갱신된 상황과 업무 상태',sourceIds:['sdk'],example:{input:'시설 A 점검의 예시 진행 상태',role:'상태가 바뀌었음을 운영자 쪽에 다시 표시한다. 지연·성공률을 측정한 결과가 아니다.',output:'시설 A · 점검 상태 갱신'}},
    {id:'edge-data',label:'Lattice·Menace',short:'현장·엣지의 데이터',icon:'sensor',type:'Anduril의 역할',input:'현장에서 생기는 데이터',role:'2024년 협력 발표는 Lattice와 Menace를 현장 데이터의 수집·처리 맥락에서 설명한다.',output:'후속 AI 개발에 활용하려는 현장 데이터',sourceIds:['partnership']},
    {id:'data-preparation',label:'데이터를 개발에 연결',short:'현장과 기업 환경 사이',icon:'entity',type:'협력의 접점',input:'활용할 현장 데이터',role:'발표는 현장에서 얻은 데이터를 기업 규모의 AI 개발에 연결하는 과제를 다룬다.',output:'정리·학습에 사용할 데이터의 맥락',sourceIds:['partnership']},
    {id:'aip',label:'Palantir AIP',short:'정리·라벨링·AI 개발',icon:'model',type:'Palantir의 역할',input:'AI 개발에 사용할 데이터',role:'공동 발표는 AIP를 데이터의 정리·라벨링과 학습·배포를 지원하는 역할로 연결한다.',output:'AI 개발·운영에 이어질 자료와 도구',sourceIds:['partnership','aip']},
    {id:'development',label:'학습·배포로 이어가기',short:'2024년 발표의 협력 방향',icon:'status',type:'개발 과정',input:'정리한 데이터와 개발 도구',role:'두 회사가 발표한 협력의 방향이다. 모든 현장 시스템에 자동으로 적용된 연결이나 배포 완료를 뜻하지 않는다.',output:'학습·배포를 연결하려는 공동의 작업',sourceIds:['partnership']}
  ];
  const edges=[
    {id:'observations',from:'sensors',to:'perception',kind:'data',label:'관측 전달',sourceIds:['lattice']},
    {id:'context',from:'perception',to:'shared-state',kind:'representation',label:'해석 결과와 상황 표현',sourceIds:['lattice','entities']},
    {id:'understanding',from:'shared-state',to:'operator',kind:'presentation',label:'사용자가 읽을 맥락',sourceIds:['lattice']},
    {id:'task-choice',from:'operator',to:'task-contract',kind:'task',label:'업무 선택',sourceIds:['lattice','sdk']},
    {id:'integration',from:'task-contract',to:'field-system',kind:'integration',label:'정해진 통합 형식',sourceIds:['sdk']},
    {id:'reported-state',from:'field-system',to:'feedback',kind:'feedback',label:'현장 상태 전달',sourceIds:['sdk']},
    {id:'state-return',from:'feedback',to:'operator',kind:'feedback',label:'상태를 다시 읽기',sourceIds:['sdk']},
    {id:'edge-enterprise',from:'edge-data',to:'data-preparation',kind:'announced-cooperation',label:'현장 데이터의 활용',sourceIds:['partnership']},
    {id:'prepared-data',from:'data-preparation',to:'aip',kind:'announced-cooperation',label:'정리·라벨링',sourceIds:['partnership']},
    {id:'development-link',from:'aip',to:'development',kind:'announced-cooperation',label:'학습·배포 지원',sourceIds:['partnership']}
  ];
  const views=[
    {id:'perception',label:'01 센서에서 상황으로',title:'여러 장치의 관측을, 사람이 읽을 수 있는 상황으로',intro:'관측을 받는 일, 정보를 처리하는 일, 대상을 표현하는 일과 사람이 읽는 일을 나눕니다.',nodeIds:['sensors','perception','shared-state','operator'],edgeIds:['observations','context','understanding'],sourceIds:['lattice','entities'],initial:'sensors',scope:'2023년 공식 설명과 현행 Entity 문서를 함께 읽어 직접 그린 역할 도식입니다. 선은 논리적 관계이며 처리 지연이나 물리적 배치를 나타내지 않습니다.'},
    {id:'operations',label:'02 사람과 현장 시스템',title:'화면의 정보가, 연결된 현장 시스템의 업무와 만나는 곳',intro:'사용자가 업무를 선택하는 한 가지 경로를 따라갑니다. 작업을 교환하는 인터페이스와 현장 자산의 동작·상태를 나누어 봅니다.',nodeIds:['operator','task-contract','field-system','feedback'],edgeIds:['task-choice','integration','reported-state','state-return'],sourceIds:['lattice','sdk','mission'],initial:'operator',scope:'공식 설명을 읽기 위해 직접 구성한 고수준 역할 도식입니다. 제품 전체의 제어 절차나 승인 정책을 재현하지 않으며 실제 센서·장비·API에 연결하지 않습니다.'},
    {id:'partnership',label:'03 Palantir와 협력',title:'현장의 데이터와, 기업 규모의 AI 개발을 연결하려는 협력',intro:'Anduril과 Palantir의 2024년 12월 6일 발표를 따라갑니다. 두 회사의 협력과 창업자 개인의 역할을 구분합니다.',nodeIds:['edge-data','data-preparation','aip','development'],edgeIds:['edge-enterprise','prepared-data','development-link'],sourceIds:['partnership','aip'],initial:'edge-data',scope:'공동 발표가 설명한 연결 방향입니다. Palantir가 모든 Lattice 장비를 직접 제어한다거나 이 도식 전체가 이미 실행 중이라는 뜻은 아닙니다.'}
  ];
  const byId=new Map(nodes.map(n=>[n.id,n])),edgeById=new Map(edges.map(e=>[e.id,e]));
  for(const n of nodes)if(!n.sourceIds.length||n.sourceIds.some(id=>!sources[id]))throw new TypeError('Each role needs a primary source.');
  for(const e of edges)if(!byId.has(e.from)||!byId.has(e.to)||e.from===e.to||!e.sourceIds.length||e.sourceIds.some(id=>!sources[id]))throw new TypeError('Each role connection needs endpoints and evidence.');
  for(const v of views)if(v.nodeIds.length!==4||v.nodeIds.some(id=>!byId.has(id))||v.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).from,edgeById.get(id).to].every(n=>v.nodeIds.includes(n))))throw new TypeError('The visible role map must preserve every connection endpoint.');
  function getView(id){const v=views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown Lattice view.');return freeze({...v,nodes:v.nodeIds.map(id=>byId.get(id)),edges:v.edgeIds.map(id=>edgeById.get(id))});}
  function select(viewId,nodeId){const v=getView(viewId),index=v.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Select a visible role.');return freeze({viewId,index,node:v.nodes[index],connections:v.edges.filter(e=>e.from===nodeId||e.to===nodeId),hasPrevious:index>0,hasNext:index<v.nodes.length-1});}
  function step(viewId,nodeId,direction){if(direction!==1&&direction!==-1)throw new RangeError('Step one role at a time.');const s=select(viewId,nodeId),v=getView(viewId);return select(viewId,v.nodeIds[Math.max(0,Math.min(v.nodeIds.length-1,s.index+direction))]);}
  window.AtlasLatticeField=freeze({sources,nodes,edges,views,getView,select,step});
})();
