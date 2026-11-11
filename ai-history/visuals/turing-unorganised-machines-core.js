/* Original five-unit A-type dynamics and an explicitly abstract B-type behavior table. */
(function(){
  'use strict';
  const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
  const pdf='https://www.npl.co.uk/getattachment/84156b8e-1b00-45b7-9f5e-3179cfa458c5/80916595-Intelligent-Machinery.pdf?lang=en-US';
  const s=(title,page,location)=>({title,url:pdf+'#page='+page,location});
  const sources={
    organisation:s('Turing (1948) · 비조직 기계의 발상',8,'§4 · 보고서 p.6/PDF p.8. 비교적 임의의 방식으로 표준 부품을 연결한 기계와, 무작위 신경 배열을 착상으로 한 단순 모형.'),
    atype:s('Turing (1948) · A형의 다섯 단위',8,'§4 · 보고서 p.6/PDF p.8. 두 입력·이전 시각·동기 갱신, 5단위 연결표와 6시각의 상태표. 원도판을 참고해 직접 재구성.'),
    btype:s('Turing (1948) · B형 연결의 세 상태',9,'§4 · 보고서 pp.6–7/PDF pp.8–9. modifier 도판, 0·1 반전 전달/상수1/두 조건의 교대와 두 위상. 본문의 지연은 2 moments.'),
    control:s('Turing (1948) · 외부 개입으로 연결 조건을',13,'§8 · 보고서 p.11/PDF p.13. 연결마다 외부 입력 A·B를 두고 통상1·적절한 다른 신호로 연결 조건을 바꾸는 제안.'),
    cortex:s('Turing (1948) · 훈련으로 조직되는 피질의 비유',14,'§9 · 보고서 p.12/PDF p.14. 유아 피질이 훈련과 외부 개입으로 조직된다는 연구 구상. 현대 신경과학의 실증 결과로 읽지 않음.'),
    training:s('Turing (1948) · 훈련 제안과 P형 실험의 범위',15,'§10–11 · 보고서 pp.13–16/PDF pp.15–18. pleasure-pain 제안과 별도 P형 종이기계 실험·한계. A/B의 유용한 학습이 완성됐다는 결과와 구분.'),
    discipline:s('Turing (1948) · 규율과 주도성',19,'§12 · 보고서 p.17/PDF p.19. 정해진 규칙 따르기만으로 지능이 충분한 것은 아니라는 논의와 두 연구 경로의 제안.')
  };
  const role=(id,label,input,idea,output,sourceIds)=>({id,label,input,role:idea,output,sourceIds});
  const views=[
    {id:'organisation',label:'01 뇌의 연결에서 비조직 기계로',title:'작은 단위들을 연결하면, 전체의 기능은 어디에서 생길까?',intro:'각 단위의 규칙과 단위 사이의 연결을 나누어 봅니다. 처음부터 완성된 기능을 모두 적는 대신, 조직을 만들고 바꿀 수 있는 기계를 생각합니다.',initial:'connection-pattern',nodes:[
      role('brain-analogy','뇌의 연결을 착상으로','여러 신경 단위가 연결된 모습','보고서는 무작위로 연결된 신경계의 아주 단순한 모형으로 A형을 살펴본다. 생물학적 뉴런 전체를 복제하는 대신 작은 단위와 연결에서 출발한다.','신경 회로에서 얻은 계산의 발상',['organisation']),
      role('small-units','한 단위의 규칙은 작다','두 입력과 하나의 출력','A형의 각 단위는 이전 시각의 두 값을 곱해 1에서 뺀다. 같은 작은 규칙을 가진 단위도 다른 곳에서 신호를 받아 서로 다른 활동을 한다.','전체를 만드는 작은 구성요소',['atype']),
      role('connection-pattern','누구와 연결되는가','각 단위에 들어오는 두 연결','어떤 출력이 어느 단위의 입력으로 돌아오는지가 전체 활동의 구조를 정한다. 작은 규칙만 보아서는 전체 기계의 시간 변화를 다 알 수 없다.','연결의 조직과 전체 활동',['organisation','atype']),
      role('time-evolution','활동은 시간에 이어진다','같은 회로와 시작 상태','동기 신호마다 이전 시각의 값으로 전체 단위를 함께 갱신한다. 한 화면 안에서 먼저 바뀐 단위의 값을 뒤 단위가 즉시 받는 순차 계산은 아니다.','한 시각 뒤의 전체 상태',['atype']),
      role('fixed-vs-change','고정 회로와 바꿀 연결','A형의 활동·B형의 연결 조건','A형 예제의 활동만 진행시킨다고 학습이 일어나지는 않는다. B형은 연결이 신호를 전달하는 조건을 바꿀 가능성을 더한다.','활동 변화와 조직 변화의 구별',['atype','btype']),
      role('organisation-goal','기능을 만들 조직을 찾다','초기 조직과 외부의 개입','훈련이 어떤 조직을 형성하게 할지 묻는다. 보고서는 규칙을 따르는 규율과 새로운 상황에서 선택하는 주도성을 함께 논의하며, 단순한 임의 연결만으로 유용한 지능이 완성된다고 하지 않는다.','기계를 조직하는 연구 문제',['cortex','discipline'])
    ]},
    {id:'a-type',label:'02 A형 기계의 활동',title:'같은 다섯 단위가, 지난 시각의 값을 함께 읽는다',intro:'원문의 연결표와 초기 상태를 그대로 재구성해 실행합니다. 외부 입력이 없는 닫힌 회로이므로 아래 0·1은 시작할 때의 단위 상태입니다.',initial:'synchronous',nodes:[
      role('two-inputs','각 단위의 두 입력','원문의 i(r), j(r) 연결표','선택한 단위가 어느 두 단위의 값을 읽는지 화살표와 계산식으로 함께 표시한다. 자기 자신으로 돌아오는 연결도 원문 표에 있다.','입력의 출처가 보이는 규칙',['atype']),
      role('synchronous','이전 시각에서 함께 갱신','q(t)의 다섯 값','qᵣ(t+1)=1−qᵢ(t)qⱼ(t)다. 모든 단위의 다음 값은 같은 이전 상태에서 계산해 한 번에 바꾼다.','동기적인 다음 상태',['atype']),
      role('initial-state','시작 상태를 바꾸다','시각0의 다섯 값','원문 상태표는 [1,1,0,0,1]에서 시작한다. 다른 시작 상태는 직접 바꿔 보는 사례이며 선택하면 시간과 이력을 처음부터 다시 만든다.','같은 회로에서 달라지는 경로',['atype']),
      role('source-trace','원문 여섯 시각을 대조','연결표·6열의 상태표','원문과 같은 초기 상태에서 다섯 번 갱신하면 여섯 시각의 표와 일치한다. 표의 열을 시간, 행을 단위로 읽는 원도판을 화면에서는 시간별 행으로 다시 적었다.','원문과 대조한 실제 계산',['atype']),
      role('period','활동의 반복을 읽다','이어지는 전체 상태','원문 예제는 세 시각 뒤부터 두 상태가 번갈아 반복된다고 설명한다. 이 작은 회로의 반복은 학습이나 모든 지능의 성질을 측정하는 점수가 아니다.','정해진 회로에서의 시간 경로',['atype']),
      role('activity-not-learning','활동 실행과 학습을 나누다','고정된 연결과 갱신 규칙','이 보기에서는 연결과 규칙을 바꾸지 않는다. 시작 상태를 바꾸거나 시간을 진행시키는 조작을, 경험으로 연결을 배우는 알고리즘이라고 부르지 않는다.','다음 보기에서 물을 조직 변경',['atype','btype'])
    ]},
    {id:'b-type',label:'03 B형 연결을 바꾸며 조직하기',title:'연결은 신호를 그대로 잇는 선이어야 할까?',intro:'원문 modifier의 구성과 본문에 적힌 입출력 조건을 나누어 봅니다. 외부 개입으로 신호가 전해지는 방식을 바꾼다는 아이디어에 초점을 둡니다.',initial:'modified-connection',nodes:[
      role('modified-connection','연결에 변형기를 넣다','단위 사이의 한 연결','원문은 A형의 연결을 작은 회로로 바꾸어 B형을 구성한다. 연결 자체가 신호를 전하는 방식을 달리할 수 있게 만든다.','조직을 바꿀 수 있는 접점',['btype']),
      role('inversion','조건 i · 0과 1을 뒤집다','들어온 0·1 신호','원문의 첫 조건은 그대로 전달이 아니라 0과 1을 서로 바꾸어 전달하는 것이다. 본문이 적은 두 시각 지연을 아래 블랙박스 표에 반영한다.','지연 뒤의 반전 신호',['btype']),
      role('constant-one','조건 ii · 항상 1로','어떤 입력 신호이든','두 번째 조건은 입력을 모두 1로 바꾼다. 막힌 연결을 항상 0으로 표시하면 원문과 달라진다.','입력에 무관한 상수1',['btype']),
      role('alternating','조건 iii · 두 조건이 교대','첫 조건과 둘째 조건의 순서','원문은 반전 전달과 상수1이 번갈아 적용되는 경우와 두 위상을 적는다. 입력이 0이면 두 조건 모두 1이므로 출력 자체가 언제나 0101이 되는 것은 아니다.','입력과 위상을 함께 읽을 관계',['btype']),
      role('interference','외부 개입으로 조건을 바꾸다','연결마다 두 개의 외부 입력','원문은 통상 1인 외부 A·B 입력에 적절한 다른 신호를 주어 연결 조건을 바꾸는 방법을 제안한다. 화면의 조건 버튼은 이 역할을 직접 선택해 비교한다.','기계를 조직할 외부의 개입',['control']),
      role('training-boundary','훈련의 목표와 실제 범위','연결 변경과 기계의 능력','교사 개입이 유용한 조직을 형성하게 하는 문제다. 보고서의 별도 P형 종이기계 실험에는 교육 방식과 규모의 한계도 적혀 있다. 아래 조건 직접 선택을 A/B형의 학습 완성이나 그 실험의 재현으로 표시하지 않는다.','조직 변경을 학습으로 이어 갈 질문',['training','btype','discipline'])
    ]}
  ];
  const aNetwork={nodes:[1,2,3,4,5],inputs:[[3,2],[3,5],[4,5],[3,4],[2,5]],positions:{1:[115,85],2:[465,85],3:[290,235],4:[115,385],5:[465,385]},sourceInitial:[1,1,0,0,1],limit:32};
  const aPresets=[{id:'source',label:'원문 초기 상태',values:[1,1,0,0,1],source:true},{id:'zeros',label:'자체 시작 · 모두0',values:[0,0,0,0,0],source:false},{id:'ones',label:'자체 시작 · 모두1',values:[1,1,1,1,1],source:false}];
  function bits(value,count){if(!Array.isArray(value)||value.length!==count)throw new TypeError('정해진 수의 0·1이 필요합니다.');const result=[];for(let i=0;i<count;i++){if(value[i]!==0&&value[i]!==1)throw new TypeError('각 상태는 0 또는 1입니다.');result.push(value[i]);}return result;}
  function aInitial(values=aNetwork.sourceInitial){return freeze({time:0,values:bits(values,5)});}
  function readA(state){if(!state||typeof state!=='object'||!Number.isInteger(state.time)||state.time<0||state.time>aNetwork.limit)throw new TypeError('표시 범위 안의 A형 상태가 필요합니다.');return {time:state.time,values:bits(state.values,5)};}
  function aInspect(state,unit=1){const s=readA(state);if(!Number.isInteger(unit)||unit<1||unit>5)throw new RangeError('단위1–5를 선택하세요.');const[i,j]=aNetwork.inputs[unit-1],left=s.values[i-1],right=s.values[j-1];return freeze({unit,time:s.time,current:s.values[unit-1],inputUnits:[i,j],inputValues:[left,right],next:1-left*right,formula:'1 − ('+left+' × '+right+') = '+(1-left*right)});}
  function aStep(state){const before=readA(state);if(before.time>=aNetwork.limit)throw new RangeError('32시각 표시 한도입니다.');const calculations=aNetwork.nodes.map(n=>aInspect(before,n)),after={time:before.time+1,values:calculations.map(c=>c.next)};return freeze({before,after,calculations});}
  function aRun(state,count){const first=readA(state);if(!Number.isInteger(count)||count<0||count>aNetwork.limit)throw new RangeError('표시할 변화 수는 0–32입니다.');const states=[first];let current=first;for(let i=0;i<count&&current.time<aNetwork.limit;i++){current=aStep(current).after;states.push(current);}return freeze({states,state:current,executed:states.length-1,status:current.time===aNetwork.limit?'display-limit':'count-complete'});}
  const bModes=[{id:'invert',label:'i · 반전 전달'},{id:'one',label:'ii · 상수1'},{id:'alternate',label:'iii · 두 조건 교대'}];
  const bStreams=[{id:'001101',label:'자체 입력 · 001101',values:[0,0,1,1,0,1]},{id:'111111',label:'자체 입력 · 111111',values:[1,1,1,1,1,1]},{id:'000000',label:'자체 입력 · 000000',values:[0,0,0,0,0,0]}];
  function bCase(mode='invert',phase=0,streamId='001101'){
    if(!bModes.some(m=>m.id===mode)||![0,1].includes(phase))throw new RangeError('알려진 연결 조건과 위상을 선택하세요.');const stream=bStreams.find(s=>s.id===streamId);if(!stream)throw new RangeError('알려진 입력열을 선택하세요.');
    const rows=Array.from({length:stream.values.length+2},(_,time)=>{const sourceTime=time-2,known=sourceTime>=0&&sourceTime<stream.values.length,input=sourceTime>=0?stream.values[sourceTime]:null,active=mode==='alternate'?((sourceTime+phase)%2===0?'invert':'one'):mode;return {time,inputNow:stream.values[time]??null,sourceTime:known?sourceTime:null,sourceInput:known?input:null,activeMode:known?active:null,output:known?(active==='invert'?1-input:1):null};});
    return freeze({mode,phase,streamId,input:stream.values,rows,delay:2,outputs:rows.filter(r=>r.output!==null).map(r=>r.output),executesInternalModifier:false,executesLearning:false,scope:'본문에 적힌 입출력 조건을 2시각 지연의 블랙박스로 계산합니다. 초기 두 출력은 지정하지 않습니다. 원도판 내부 세 게이트의 클럭 경계를 재현한 실행은 아닙니다.'});
  }
  const getView=id=>{const v=views.find(v=>v.id===id);if(!v)throw new RangeError('알려진 보기를 선택하세요.');return v;};
  const select=(viewId,id)=>{const n=getView(viewId).nodes.find(n=>n.id===id);if(!n)throw new RangeError('현재 보기의 항목을 선택하세요.');return n;};
  const bridges=[{id:'turing1936',personId:'alan-turing',workId:'turing-computable-numbers',label:'1936 · 기계적 계산 절차의 정의'},{id:'turing1950',personId:'alan-turing',workId:'turing-computing-machinery-intelligence',label:'1950 · 모방 게임과 학습하는 기계'}];
  window.AtlasTuringUnorganisedMachines=freeze({sources,views,nodes:views.flatMap(v=>v.nodes),aNetwork,aPresets,bModes,bStreams,bridges,getView,select,aInitial,aInspect,aStep,aRun,bCase});
})();
