/* Official role descriptions plus a separately authored, split-aware customer-support example. */
(function(){
  'use strict';
  const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const sources={
    engine:{title:'Scale · Data Engine',url:'https://scale.com/data-engine',location:'현행 제품 설명 · 수집·선별·주석·학습·평가의 순환, Generation·RLHF·Evaluation · 확인 2026-11-10'},
    genai:{title:'Scale · Generative AI Data Engine',url:'https://scale.com/generative-ai-data-engine',location:'현행 제품 설명 · 전문가·품질 관리·시범 데이터·사람 피드백과 선호 순위 · 확인 2026-11-10'},
    rlhf:{title:'Scale · Why is ChatGPT so good?',url:'https://scale.com/blog/chatgpt-reinforcement-learning',location:'2023-01-25 · instruction datasets와 RLHF의 사람 시범·후보 비교·보상 모델·학습 해설'},
    quality:{title:'Scale · 데이터 품질 관리 설명',url:'https://scale.com/blog/data-quality',location:'2026-06-29 · 작업·데이터셋·기여자 수준의 검토, 지침·오류 유형·데이터 범위. 회사가 설명한 절차이며 독립 성과 평가와 구분한다.'},
    evaluation:{title:'Scale · SEAL Leaderboards 발표',url:'https://scale.com/blog/leaderboard',location:'2024-05-29 · 비공개 평가자료·분야 전문가·다회 검수·방법 공개, 오염과 과적합 문제'},
    seal:{title:'Scale · SEAL 출범',url:'https://scale.com/blog/safety-evaluations-alignment-lab',location:'2023-11-08 · 평가 재현성·신뢰성·벤치마크·레드팀 연구 방향'},
    labs:{title:'Scale · Scale Labs 출범',url:'https://scale.com/blog/scale-labs',location:'2026-03-09 · 2023년 SEAL에서 확장된 후속 평가·후학습 연구의 소개'},
    founding:{title:'Scale · About',url:'https://scale.com/about',location:'Founded 2016, Data at Scale와 Evaluations. 설립 연도와 현행 설명을 나누어 읽는다. 확인 2026-11-10'},
    meta:{title:'Scale · Meta 투자와 왕의 합류 발표',url:'https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution',location:'2025-06-12 · Meta 투자·상업 관계 확대, 왕의 Meta 합류와 Scale 이사회 유지. 발표 당시의 관계'},
    independence:{title:'Scale · 투자 이후 회사·고객 정보의 경계',url:'https://scale.com/blog/customer-trust-scale-meta-deal',location:'2025-06-18 · 독립 회사 유지·운영 비통합·고객 기밀 정보 비공유에 관한 회사 설명'}
  };
  const ex=(input,role,output)=>({input,role,output});
  const nodes=[
    {id:'provided-record',label:'원천 자료와 과제',short:'어떤 문제를 풀게 할 것인가',icon:'tables',type:'입력과 목표',input:'실제 업무의 자료와 해결할 문제',role:'데이터의 수집과 선별은 어떤 장면을 모델에게 배우게 할지 정하는 출발점이다. 원천 자료만 모아도 원하는 정답이 생기는 것은 아니다.',output:'문제와 관련된 자료',sourceIds:['engine','genai'],example:ex('TRAIN-01 · 고객 문의: “언제 도착하나요?”','제공 기록에 배송 예정일이 없는 장면을 직접 구성했다.','기록: 주문 접수 / 배송 예정일: 미제공')},
    {id:'task-guideline',label:'사람 판단의 기준',short:'좋은 답변의 조건을 적기',icon:'action',type:'과제·지침',input:'자료와 목표 행동',role:'시범·선호·검수에는 판단할 기준이 필요하다. Scale의 품질 설명은 작업별 품질 규칙과 전문가가 정하는 기준을 다룬다.',output:'주석과 검수에 사용할 지침',sourceIds:['genai','quality'],example:ex('배송 예정일이 없는 주문 기록','지침을 “제공 기록에 없는 날짜를 만들지 않는다”로 정한다.','알 수 없는 정보는 확인이 필요하다고 답한다.')},
    {id:'human-demonstration',label:'사람의 시범',short:'기준을 답변 데이터로 표현하기',icon:'person',type:'학습 신호 · 시범',input:'문의·제공 기록·작성 지침',role:'사람이 작성한 prompt–response 쌍은 모델이 어떤 응답을 따라 배울지 보여 주는 시범 자료가 될 수 있다.',output:'문의와 시범 답변의 쌍',sourceIds:['rlhf','genai'],example:ex('TRAIN-01 · “언제 도착하나요?”','사람이 지침에 맞는 답변을 작성한 예시다.','“제공 기록에 배송 예정일이 없어 확인이 필요합니다.”')},
    {id:'quality-review',label:'주석·자료의 검토',short:'답변 하나와 자료 전체를 함께 보기',icon:'review',type:'품질 관리',input:'시범·지침·자료의 구성',role:'개별 주석을 검토하는 일과 데이터셋의 범위·중복·난이도를 검토하는 일은 다른 수준의 확인이다. 전문가와 자동화 도구의 역할도 구분한다.',output:'검토한 학습 자료와 수정할 항목',sourceIds:['quality','genai'],example:ex('TRAIN-01 시범과 작성 지침','답변이 없는 날짜를 덧붙이지 않았는지 지침과 대조하는 장면이다. 실제 검수 서비스를 실행하지 않는다.','검토한 시범 · 학습 자료 후보로 표시')},
    {id:'candidate-responses',label:'답변 후보',short:'같은 질문의 여러 답을 놓기',icon:'question',type:'비교할 대상',input:'문의와 답변 후보',role:'Scale의 RLHF 해설은 같은 프롬프트에 대한 여러 응답을 비교하는 자료를 설명한다. 시범 한 개와 후보 사이의 선호는 다른 형태의 신호다.',output:'비교할 응답 쌍',sourceIds:['rlhf','genai'],example:ex('TRAIN-01 · 제공 기록에 배송 예정일 없음','두 후보는 이 화면을 위해 직접 썼다. 모델의 실제 출력이 아니다.','A “내일 도착합니다.” / B “예정일이 없어 확인이 필요합니다.”')},
    {id:'human-preference',label:'사람의 비교 판단',short:'어느 답이 기준에 더 맞는가',icon:'person',type:'학습 신호 · 선호',input:'후보 A·B와 판단 기준',role:'응답 순위나 쌍별 선호를 모으면 사람이 어떤 결과를 더 낫게 보는지 학습에 사용할 자료로 표현할 수 있다. 선호가 모든 사실의 참을 증명하는 것은 아니다.',output:'지침에 따른 선호 정보',sourceIds:['rlhf','genai'],example:ex('A의 근거 없는 날짜 / B의 확인 필요 안내','이 사례의 기준에 따라 B를 A보다 선호한다고 표시한다.','선호 쌍: B ≻ A · 근거 없는 날짜를 덧붙이지 않음')},
    {id:'training-use',label:'모델을 바꾸는 학습',short:'시범·선호의 쓰임을 구분하기',icon:'model',type:'모델 개발',input:'검토한 시범·선호 자료',role:'2023년 해설은 시범으로 지도 미세조정하고, 비교 자료로 보상 모델을 학습한 뒤 정책을 갱신하는 RLHF 경로를 설명한다. 현재 모든 고객의 학습법이 같다는 뜻은 아니다.',output:'학습 뒤 별도 확인할 모델',sourceIds:['rlhf','engine'],example:ex('학습용 TRAIN-01의 시범·선호','그 자료가 쓰일 위치만 표시한다. 이 화면은 모델 가중치를 바꾸지 않는다.','학습에 쓰는 자료와 개발·최종 평가 자료를 분리')},
    {id:'heldout-diagnosis',label:'새 문의로 개발 진단',short:'학습에 넣지 않은 사례와 기준',icon:'review',type:'개발·진단용 보류 평가',input:'학습에 사용하지 않은 새 문의와 평가 기준',role:'평가는 모델의 약점을 확인하기 위한 다른 역할이다. Scale은 비공개 평가자료·전문가 검토·방법 공개로 오염과 과적합을 다루려는 방향을 제시한다.',output:'개발 과정에서 살펴볼 오류 유형',sourceIds:['evaluation','seal'],example:ex('DEV-01 · “배송은 출발했나요?” / 배송 상태 미제공','진단 기준은 제공 기록에 없는 출발 상태를 단정하지 않는 것이다. 실제 답변이나 점수를 생성하지 않는다.','개발 진단의 입력·기준만 표시 · 성능 측정 결과 없음')},
    {id:'next-data-plan',label:'오류 유형에서 다음 자료로',short:'새 사례를 수집하고 최종 시험은 남기기',icon:'status',type:'다음 개발 계획',input:'개발·진단에서 관찰할 오류 유형',role:'데이터 엔진의 반복은 실패 유형을 찾아 다음 자료를 계획하는 관점으로 읽을 수 있다. 이 자체 사례는 진단 문항을 그대로 훈련에 되넣지 않고, 새 학습 사례와 별도 최종 시험을 구분한다.',output:'새 학습 자료의 수집 계획',sourceIds:['engine','quality','evaluation'],example:ex('가정: 정보가 없는데 확정하는 오류를 발견했다면','그 유형의 새 학습 사례 TRAIN-NEXT-01을 수집할 계획을 세운다. DEV-01은 복사하지 않으며 TEST-01은 별도 유지한다.','다음 수집 계획 · 최종 시험은 따로 남김')},
    {id:'wang',label:'알렉산더 왕',short:'Scale 설립자 · 2025년 Meta 합류',icon:'person',type:'인물 · 발표 시점의 역할',input:'AI 데이터 작업을 사업으로 연결하는 문제',role:'2016년 Scale 설립에서 출발한다. 2025-06-12 발표는 왕의 Meta 합류와 Scale 이사회 유지를 설명한다. 이후의 모든 제품이나 연구를 개인의 단독 발명으로 돌리지 않는다.',output:'설립·이사회·회사 이동의 기록',sourceIds:['founding','meta','independence']},
    {id:'scale',label:'Scale AI',short:'학습 데이터와 평가의 기반',icon:'company',type:'기업',input:'모델 개발에 필요한 자료·판단·평가의 문제',role:'학습 데이터·주석·사람 피드백과 평가 도구를 제공하는 회사로 설명된다. 제품 역할과 회사가 보고한 성과를 독립 검증 결과와 구분한다.',output:'데이터와 평가를 위한 제품·서비스',sourceIds:['founding','engine','genai']},
    {id:'data-engine',label:'Data Engine',short:'자료·주석·학습·평가의 반복',icon:'tables',type:'제품 · 현행 설명',input:'원천 자료와 모델의 개발 과제',role:'수집·선별·주석·학습·평가를 반복하는 데이터 엔진의 관점을 제시한다. 한 번의 라벨링보다 다음에 어떤 자료가 필요한지 찾는 흐름에 주목한다.',output:'다음 개발 단계에 사용할 자료와 관찰',sourceIds:['engine']},
    {id:'genai-data',label:'GenAI Data Engine',short:'사람 시범·선호와 품질 관리',icon:'model',type:'제품 · 후속 생성형 AI 설명',input:'생성형 모델이 배울 과제와 사람 판단',role:'전문가가 작성·검토하는 자료, instruction following과 사람 피드백·선호 순위를 소개한다. 이 내용은 2016년 창업 당시의 제품 구조와 구분한다.',output:'모델에 맞춘 시범·선호 등 자료',sourceIds:['genai','rlhf','quality']},
    {id:'evaluation-research',label:'평가 연구',short:'SEAL에서 후속 연구로',icon:'review',type:'연구 조직 · 시점을 나누어 읽기',input:'모델을 어떻게 시험할지의 문제',role:'2023년 SEAL 출범, 2024년 전문가 평가 리더보드, 2026년 Scale Labs 소개는 서로 다른 시점의 평가·후학습 연구 경로다.',output:'벤치마크·평가 방법·오류 분석 연구',sourceIds:['seal','evaluation','labs']},
    {id:'meta',label:'Meta',short:'2025년 투자·상업 관계 확대',icon:'company',type:'기업 · 2025년 발표',input:'AI 개발과 데이터 기반에 관한 협력',role:'2025-06-12 발표는 Meta의 투자와 상업 관계 확대, 왕의 Meta 합류를 설명한다. 6월18일 글은 Scale의 독립 유지·운영 비통합·고객 기밀 비공유를 밝혔다.',output:'발표 당시의 투자·사업·인물 관계',sourceIds:['meta','independence']}
  ];
  const edge=(id,from,to,kind,label,sourceIds)=>({id,from,to,kind,label,sourceIds});
  const edges=[
    edge('record-guideline','provided-record','task-guideline','preparation','과제에 맞는 기준',['engine','quality']),
    edge('guide-demonstration','task-guideline','human-demonstration','preparation','기준을 시범으로',['rlhf','genai']),
    edge('demonstration-quality','human-demonstration','quality-review','preparation','주석과 자료의 검토',['quality']),
    edge('candidate-preference','candidate-responses','human-preference','feedback-data','사람의 비교',['rlhf']),
    edge('preference-training','human-preference','training-use','training','학습에 쓸 신호',['rlhf']),
    edge('training-diagnosis','training-use','heldout-diagnosis','evaluation','별도 자료로 개발 진단',['evaluation']),
    edge('diagnosis-plan','heldout-diagnosis','next-data-plan','diagnosis','오류 유형을 다음 계획으로',['engine','evaluation']),
    edge('new-training-plan','next-data-plan','candidate-responses','feedback','새 학습 사례의 수집 계획',['engine','quality']),
    edge('wang-founded','wang','scale','founder','설립자',['founding','meta']),
    edge('scale-engine','scale','data-engine','product','데이터 제품',['engine']),
    edge('scale-genai','scale','genai-data','product','사람 피드백 자료',['genai']),
    edge('scale-evaluation','scale','evaluation-research','research','평가 연구',['seal','labs']),
    edge('meta-scale','meta','scale','dated-investment','2025 투자·사업',['meta','independence']),
    edge('wang-meta','wang','meta','dated-role','2025 합류 발표',['meta'])
  ];
  const views=[
    {id:'preparation',label:'01 데이터에 판단의 기준을 담기',title:'무엇을 배우게 할지, 사람이 자료와 기준을 만든다',intro:'같은 문의에도 답변의 기준은 저절로 생기지 않습니다. 원천 기록·작성 지침·사람의 시범·검토가 어떻게 학습 자료로 연결되는지 살펴봅니다.',nodeIds:['provided-record','task-guideline','human-demonstration','quality-review'],edgeIds:['record-guideline','guide-demonstration','demonstration-quality'],initial:'provided-record',scope:'공식 제품·기술 설명을 참고한 역할 그림입니다. 문의·답변·자료 배정은 직접 구성했으며 실제 고객 사례나 Scale의 고정된 내부 파이프라인이 아닙니다.'},
    {id:'feedback',label:'02 사람 피드백과 별도 평가',title:'어떤 답을 배울지와, 무엇으로 시험할지를 나눈다',intro:'같은 학습용 문의의 후보를 비교한 뒤, 다른 문의로 개발 과정의 약점을 살펴봅니다. 오류 유형에서 새 학습 자료를 계획하되 최종 시험은 별도로 남깁니다.',nodeIds:['candidate-responses','human-preference','training-use','heldout-diagnosis','next-data-plan'],edgeIds:['candidate-preference','preference-training','training-diagnosis','diagnosis-plan','new-training-plan'],initial:'candidate-responses',scope:'개발·진단용 보류 평가와 최종 시험은 다릅니다. 진단을 보고 자료를 고르는 반복을 독립 최종 검증으로 부르지 않습니다. 아래는 역할과 배정의 자체 설계이며 모델 학습·추론·성능 측정을 실행하지 않습니다.'},
    {id:'companies',label:'03 회사·제품·인물의 연결',title:'데이터 인프라의 사업과, 사람의 이동을 나누어 보다',intro:'Scale의 제품·연구 경로와 2025년 Meta 투자·왕의 합류 발표를 연결합니다. 날짜가 있는 점선은 당시 발표된 회사·인물 관계입니다.',nodeIds:['wang','scale','data-engine','genai-data','evaluation-research','meta'],edgeIds:['wang-founded','scale-engine','scale-genai','scale-evaluation','meta-scale','wang-meta'],initial:'scale',scope:'2016년 창업, 후속 제품 설명, 2023·2024·2026년 평가 연구, 2025년 거래·합류는 서로 다른 시점입니다. Meta 투자를 인수나 모든 고객 자료의 통합으로 표시하지 않습니다. 현재 직책을 이 발표만으로 단정하지 않습니다.'}
  ];
  const assignments=freeze({training:['TRAIN-01'],diagnostic:['DEV-01'],finalTest:['TEST-01'],nextTraining:['TRAIN-NEXT-01']});
  const allIds=Object.values(assignments).flat();if(new Set(allIds).size!==allIds.length)throw new TypeError('Keep training, diagnostic and final-test examples disjoint.');
  const byId=new Map(nodes.map(n=>[n.id,n])),edgeById=new Map(edges.map(e=>[e.id,e]));
  for(const n of nodes)if(!n.sourceIds.length||n.sourceIds.some(id=>!sources[id]))throw new TypeError('Each role needs evidence.');
  for(const e of edges)if(!byId.has(e.from)||!byId.has(e.to)||e.from===e.to||!e.sourceIds.length||e.sourceIds.some(id=>!sources[id]))throw new TypeError('Each connection needs endpoints and evidence.');
  for(const v of views)if(v.nodeIds.some(id=>!byId.has(id))||v.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).from,edgeById.get(id).to].every(n=>v.nodeIds.includes(n))))throw new TypeError('Visible connections need visible endpoints.');
  function getView(id){const v=views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown Scale view.');return freeze({...v,nodes:v.nodeIds.map(id=>byId.get(id)),edges:v.edgeIds.map(id=>edgeById.get(id))});}
  function select(viewId,nodeId){const v=getView(viewId),index=v.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Select a visible role.');return freeze({viewId,index,node:v.nodes[index],connections:v.edges.filter(e=>e.from===nodeId||e.to===nodeId),hasPrevious:index>0,hasNext:index<v.nodes.length-1});}
  function step(viewId,nodeId,direction){if(direction!==1&&direction!==-1)throw new RangeError('Step one role at a time.');const s=select(viewId,nodeId),v=getView(viewId);return select(viewId,v.nodeIds[Math.max(0,Math.min(v.nodeIds.length-1,s.index+direction))]);}
  function scenario(viewId,nodeId){select(viewId,nodeId);if(viewId==='companies')return null;return freeze({stage:nodeId,assignments,preference:['human-preference','training-use','heldout-diagnosis','next-data-plan'].includes(nodeId)?'B ≻ A':'아직 비교하지 않음',diagnosis:['heldout-diagnosis','next-data-plan'].includes(nodeId),nextPlan:nodeId==='next-data-plan',trainingPrompt:'언제 도착하나요?',trainingRecord:'배송 예정일 미제공',candidateA:'내일 도착합니다.',candidateB:'제공 기록에 배송 예정일이 없어 확인이 필요합니다.',diagnosticPrompt:'배송은 출발했나요?',diagnosticRecord:'배송 상태 미제공',modelRun:false,scope:'문의·후보·판단·자료 배정은 직접 구성했습니다. 실제 고객 데이터나 모델 출력·학습·평가 점수·개선 효과가 아닙니다.'});}
  window.AtlasScaleDataFeedback=freeze({sources,nodes,edges,views,assignments,getView,select,step,scenario});
})();
