/* Typed, sourced relationships. This is a reading map, not an ownership ledger. */
(function(){
  'use strict';
  const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const sources={
    proxy:{id:'proxy',title:'Palantir · 2023 SEC 위임장 공시',url:'https://www.sec.gov/Archives/edgar/data/1321655/000132165523000033/pltr-20230425.htm',location:'인쇄 p.8 · Karp·Thiel의 공동창업과 2003년부터의 역할, Thiel의 2005년부터 Founders Fund 파트너 경력'},
    filing:{id:'filing',title:'Palantir · 2020 SEC S-1',url:'https://www.sec.gov/Archives/edgar/data/1321655/000119312520230013/d904406ds1.htm',location:'Related Party Transactions · 인쇄 p.194 · Founders Fund 관련 법인들의 지분 보유와 Thiel의 역할'},
    thiel:{id:'thiel',title:'Founders Fund · Peter Thiel',url:'https://foundersfund.com/team/peter-thiel/',location:'공식 약력 · 기업가·투자자, Palantir 공동창업자·의장과 Founders Fund 파트너'},
    investment:{id:'investment',title:'a16z · Anduril 투자 발표',url:'https://a16z.com/announcement/anduril/',location:'2019-10-03 · 기존 투자자로 Founders Fund·General Catalyst를 명시'},
    platforms:{id:'platforms',title:'Palantir · Platform overview',url:'https://www.palantir.com/docs/foundry/platform-overview',location:'Platform overview · The Ontology · Decision components'},
    partnership:{id:'partnership',title:'Anduril·Palantir · 공동 협력 발표',url:'https://www.anduril.com/news/anduril-and-palantir-to-accelerate-ai-capabilities-for-national-security',location:'2024-12-06 · 회사 간 협력과 AIP·Lattice·Menace의 역할을 설명한 공식 발표'},
    luckey:{id:'luckey',title:'미 공군 공식 행사 자료 · Palmer Luckey',url:'https://ww3.safaq.hq.af.mil/Portals/63/Palmer_Luckey%20_Anduril%20Industries.pdf?ver=2019-03-20-141126-673',location:'2019년 행사 약력 · Oculus와 Anduril 설립 경력'}
  };
  const types={person:{label:'인물',symbol:'P'},company:{label:'기업',symbol:'C'},fund:{label:'투자 조직',symbol:'F'},platform:{label:'플랫폼·구성요소',symbol:'S'}};
  const nodes=[
    {id:'peter-thiel',type:'person',label:'피터 틸',english:'Peter Thiel',short:'창업 · 이사회 · 투자',description:'Palantir의 공동창업자이자 Founders Fund의 파트너다. 기업을 만드는 역할과 투자 조직에서 맡는 역할을 각각 읽는다.',time:'2003년부터 Palantir 의장 · 2005년부터 Founders Fund 파트너 (2023년 공시)',sourceIds:['proxy','thiel'],personId:'peter-thiel'},
    {id:'alex-karp',type:'person',label:'알렉스 카프',english:'Alex Karp',short:'Palantir 공동창업',description:'Palantir의 공동창업자다. 2023년 공시는 Karp와 Thiel의 서로 다른 회사 내 역할을 함께 기록한다.',time:'2003년부터 이사 · 2023년 공시의 CEO·공동창업자',sourceIds:['proxy'],personId:'alex-karp'},
    {id:'palmer-luckey',type:'person',label:'팔머 러키',english:'Palmer Luckey',short:'Anduril 공동창업',description:'Oculus에 이어 Anduril 설립에 참여했다. 여기서는 Anduril의 기업·플랫폼 연결을 따라간다.',time:'Anduril 설립 경력 · 2019년 공식 약력',sourceIds:['luckey'],personId:'palmer-luckey'},
    {id:'palantir',type:'company',label:'Palantir',english:'Palantir Technologies',short:'데이터 · AI · 조직 운영',description:'기업·기관의 데이터와 의사결정, 실행을 연결하는 플랫폼을 제공한다. 공동창업 관계와 현재 플랫폼 설명은 시점이 다른 자료다.',time:'2003년부터의 공동창업자 역할 / 현행 플랫폼 문서',sourceIds:['proxy','platforms']},
    {id:'founders-fund',type:'fund',label:'Founders Fund',english:'Venture capital firm',short:'벤처 투자 조직',description:'기업에 자본을 공급하는 벤처 투자 조직이다. Thiel의 파트너 경력, 관련 펀드의 Palantir 지분 보유, Anduril 투자 기록을 각각 확인한다.',time:'파트너 경력: 2005년부터 / Anduril: 2019년 자료 / Palantir 지분: 2020년 공시',sourceIds:['proxy','thiel','filing','investment']},
    {id:'anduril',type:'company',label:'Anduril',english:'Anduril Industries',short:'자율 시스템 · 현장 소프트웨어',description:'AI·자율 시스템·센서 융합을 다루는 기업이다. Founders Fund의 투자 기록, Luckey의 설립 경력, Palantir와의 협력 발표를 각각 연결한다.',time:'투자 확인: 2019-10-03 / 회사 간 협력 발표: 2024-12-06',sourceIds:['investment','luckey','partnership']},
    {id:'foundry',type:'platform',label:'Foundry',english:'Data operations',short:'데이터 운영',description:'Palantir 공식 문서가 데이터 운영 플랫폼으로 설명한다. 데이터의 수집·통합과 운영용 응용을 연결한다.',time:'현행 공식 플랫폼 문서 · 확인 기준 2026-11-10',sourceIds:['platforms']},
    {id:'ontology',type:'platform',label:'Ontology',english:'Data · Logic · Actions',short:'데이터 · 논리 · 행동',description:'객체·관계, 모델·규칙, 행동을 연결해 조직의 운영을 표현하는 구성이다. W3C의 OWL 표준과 구현·추론 범위를 따로 비교해야 한다.',time:'현행 공식 플랫폼 문서 · 확인 기준 2026-11-10',sourceIds:['platforms']},
    {id:'aip',type:'platform',label:'AIP',english:'Artificial Intelligence Platform',short:'생성형 AI와 운영의 연결',description:'Palantir는 AIP를 생성형 AI와 조직 운영을 연결하는 플랫폼으로 설명한다. 창업자가 개별 알고리즘을 발명했다는 관계는 그리지 않는다.',time:'현행 공식 플랫폼 문서 · 확인 기준 2026-11-10',sourceIds:['platforms']},
    {id:'apollo',type:'platform',label:'Apollo',english:'Software deployment',short:'소프트웨어 배포',description:'Palantir 공식 문서가 소프트웨어 배포를 맡는 플랫폼으로 설명한다. 데이터·모델을 만드는 일과 운영 환경에 배포하는 일을 나누어 본다.',time:'현행 공식 플랫폼 문서 · 확인 기준 2026-11-10',sourceIds:['platforms']},
    {id:'lattice',type:'platform',label:'Lattice',english:'Edge autonomy platform',short:'현장·엣지의 자율 시스템',description:'Anduril·Palantir의 2024년 발표가 현장의 자율 시스템과 AI 활용을 연결하는 플랫폼으로 소개한다. 회사의 설명과 독립적인 성능 검증은 다른 근거다.',time:'2024-12-06 · 공동 발표에서 설명한 역할',sourceIds:['partnership']}
  ];
  const edges=[
    {id:'thiel-palantir',from:'peter-thiel',to:'palantir',kind:'cofounder',label:'공동창업',description:'공시는 Thiel을 Palantir 공동창업자로 명시하고 2003년부터 의장 역할을 기록한다.',time:'2003년부터의 역할 · 2023년 공시',sourceIds:['proxy']},
    {id:'karp-palantir',from:'alex-karp',to:'palantir',kind:'cofounder',label:'공동창업',description:'공시는 Karp를 Palantir 공동창업자이자 CEO로 소개하고, 이사로 재직한 시점을 2003년부터로 기록한다. CEO의 시작 연도를 이 문장으로 정하지 않는다.',time:'이사 경력: 2003년부터 · 공동창업자·CEO: 2023년 공시',sourceIds:['proxy']},
    {id:'luckey-anduril',from:'palmer-luckey',to:'anduril',kind:'cofounder',label:'공동창업',description:'2019년 미 공군 행사 약력에서 Luckey의 Anduril 설립 참여를 확인한다.',time:'2019년 공식 약력에서 확인',sourceIds:['luckey']},
    {id:'thiel-founders-fund',from:'peter-thiel',to:'founders-fund',kind:'partner',label:'파트너',description:'2023년 공시는 Thiel이 2005년부터 Founders Fund의 파트너였다고 기록한다. 펀드의 설립 연도를 대신 표시하는 값은 아니다.',time:'2005년부터 · 2023년 공시',sourceIds:['proxy','thiel']},
    {id:'founders-fund-anduril',from:'founders-fund',to:'anduril',kind:'investment',label:'기존 투자자',description:'a16z의 2019년 투자 발표는 Founders Fund를 Anduril의 기존 투자자로 명시한다. 최초 투자일·현재 지분·Thiel의 개인 투자액은 이 자료로 정하지 않는다.',time:'확인 자료: 2019-10-03',sourceIds:['investment']},
    {id:'founders-fund-palantir',from:'founders-fund',to:'palantir',kind:'investment',label:'관련 펀드의 지분 보유',description:'2020년 S-1은 Founders Fund 관련 법인들의 Palantir 지분 보유와 여러 관련 펀드 업무집행조합원에서 맡은 Thiel의 역할을 공시한다. 하나의 법인이나 개인의 현재 지분으로 바꾸어 읽지 않는다.',time:'2020년 S-1 공시 시점',sourceIds:['filing']},
    {id:'palantir-anduril',from:'palantir',to:'anduril',kind:'partnership',label:'회사 간 협력 발표',description:'2024년 공동 발표는 현장의 데이터와 기업 규모 AI 개발·배포를 연결하려는 협력을 설명한다. 개인 간 공동연구나 특정 배포의 완료를 나타내지 않는다.',time:'2024-12-06',sourceIds:['partnership']},
    {id:'palantir-foundry',from:'palantir',to:'foundry',kind:'platform',label:'플랫폼 제공',description:'공식 문서가 Foundry를 Palantir의 데이터 운영 플랫폼으로 설명한다.',time:'현행 플랫폼 문서',sourceIds:['platforms']},
    {id:'palantir-aip',from:'palantir',to:'aip',kind:'platform',label:'플랫폼 제공',description:'공식 문서가 AIP를 생성형 AI와 조직 운영을 연결하는 플랫폼으로 설명한다.',time:'현행 플랫폼 문서',sourceIds:['platforms']},
    {id:'palantir-apollo',from:'palantir',to:'apollo',kind:'platform',label:'플랫폼 제공',description:'공식 문서가 Apollo를 소프트웨어 배포를 위한 플랫폼으로 설명한다.',time:'현행 플랫폼 문서',sourceIds:['platforms']},
    {id:'anduril-lattice',from:'anduril',to:'lattice',kind:'platform',label:'플랫폼 제공',description:'2024년 공동 발표가 Anduril의 Lattice를 현장·엣지 자율 시스템 플랫폼으로 소개한다.',time:'2024-12-06',sourceIds:['partnership']},
    {id:'foundry-ontology',from:'foundry',to:'ontology',kind:'architecture',label:'공유 운영 모델',description:'플랫폼 문서는 Foundry·AIP의 구조와 그 중심의 Ontology를 설명한다. 선은 구성 관계이며 실행 순서를 뜻하지 않는다.',time:'현행 플랫폼 문서',sourceIds:['platforms']},
    {id:'aip-ontology',from:'aip',to:'ontology',kind:'architecture',label:'공유 운영 모델',description:'Ontology가 데이터·논리·행동을 연결하며 AI가 운영 맥락에서 활용되도록 하는 구조를 설명한다. 모든 LLM 출력을 사실로 보장한다는 뜻은 아니다.',time:'현행 플랫폼 문서',sourceIds:['platforms']}
  ];
  const views=[
    {id:'organization',label:'01 창업과 조직',title:'한 사람의 역할을, 기업과 투자 조직으로 나누어 읽기',description:'Thiel과 Karp의 Palantir 공동창업, Thiel의 Founders Fund 파트너 경력, Luckey의 Anduril 설립 참여를 구분합니다.',columns:[{label:'인물',ids:['peter-thiel','alex-karp','palmer-luckey']},{label:'기업·투자 조직',ids:['palantir','founders-fund','anduril']}],edgeIds:['thiel-palantir','karp-palantir','luckey-anduril','thiel-founders-fund','palantir-anduril'],initial:'peter-thiel'},
    {id:'capital',label:'02 자본과 기업',title:'펀드의 투자 기록을 거쳐, 기업 간 협력까지',description:'Thiel의 직책, 관련 펀드의 Palantir 지분, Anduril 투자 기록과 두 기업의 협력 발표는 서로 다른 종류의 연결입니다.',columns:[{label:'인물',ids:['peter-thiel','palmer-luckey']},{label:'투자 조직',ids:['founders-fund']},{label:'기업',ids:['anduril','palantir']}],edgeIds:['thiel-founders-fund','founders-fund-anduril','founders-fund-palantir','luckey-anduril','thiel-palantir','palantir-anduril'],initial:'founders-fund'},
    {id:'platform',label:'03 AI를 운영으로',title:'AI 모델이 조직에서 쓰이려면, 어떤 층이 연결되어야 할까?',description:'Palantir의 데이터·AI·배포 플랫폼과 Anduril의 현장 플랫폼을 살펴봅니다. 제품·구성 관계를 배치한 지도이며, 하나의 실행 흐름도는 아닙니다.',columns:[{label:'기업',ids:['palantir','anduril']},{label:'플랫폼',ids:['foundry','aip','apollo','lattice']},{label:'공유 운영 모델',ids:['ontology']}],edgeIds:['palantir-foundry','palantir-aip','palantir-apollo','anduril-lattice','foundry-ontology','aip-ontology','palantir-anduril'],initial:'ontology'}
  ];
  const nodeMap=new Map(nodes.map(n=>[n.id,n])),edgeMap=new Map(edges.map(e=>[e.id,e]));
  for(const n of nodes){if(!types[n.type]||!n.sourceIds.length||n.sourceIds.some(id=>!sources[id]))throw new TypeError('Every typed entity needs primary evidence.');}
  const endpointTypes={cofounder:['person','company'],partner:['person','fund'],investment:['fund','company'],partnership:['company','company'],platform:['company','platform'],architecture:['platform','platform']};
  for(const e of edges){const expected=endpointTypes[e.kind];if(!expected||nodeMap.get(e.from)?.type!==expected[0]||nodeMap.get(e.to)?.type!==expected[1]||!e.sourceIds.length||e.sourceIds.some(id=>!sources[id]))throw new TypeError('Relationships require valid entity types and primary evidence.');}
  for(const v of views){const ids=v.columns.flatMap(c=>c.ids);if(new Set(ids).size!==ids.length||ids.some(id=>!nodeMap.has(id))||v.edgeIds.some(id=>!edgeMap.has(id)||![edgeMap.get(id).from,edgeMap.get(id).to].every(n=>ids.includes(n))))throw new TypeError('View relationships must keep both visible endpoints.');}
  function getView(id){const view=views.find(v=>v.id===id);if(!view)throw new RangeError('Unknown ecosystem view.');return freeze({...view,nodes:view.columns.flatMap(c=>c.ids).map(id=>nodeMap.get(id)),edges:view.edgeIds.map(id=>edgeMap.get(id))});}
  function select(viewId,nodeId){const view=getView(viewId),entity=view.nodes.find(n=>n.id===nodeId);if(!entity)throw new RangeError('Select a visible entity.');const connections=view.edges.filter(e=>e.from===nodeId||e.to===nodeId);return freeze({viewId,node:entity,connections,neighborIds:[...new Set(connections.map(e=>e.from===nodeId?e.to:e.from))]});}
  window.AtlasThielEcosystem=freeze({sources,types,nodes,edges,views,getView,select});
})();
