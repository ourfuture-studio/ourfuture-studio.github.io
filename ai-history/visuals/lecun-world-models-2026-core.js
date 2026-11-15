/* A fully specified grid reconstruction of representation-space prediction/planning.
 * It does not train, load, benchmark or reproduce JEPA / V-JEPA / AMI models. */
(function(){
 'use strict';
 const clone=v=>JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const initial={goal:'east',obstacle:false,horizon:2,texture:'steady',observe:true};
 const actions=[{id:'right',label:'오른쪽',symbol:'→',delta:[1,0]},{id:'up',label:'위',symbol:'↑',delta:[0,-1]},{id:'down',label:'아래',symbol:'↓',delta:[0,1]},{id:'left',label:'왼쪽',symbol:'←',delta:[-1,0]}];
 const goals=[{id:'east',label:'오른쪽 목표',position:[3,2]},{id:'north',label:'위쪽 목표',position:[1,0]},{id:'south',label:'아래쪽 목표',position:[1,4]}];
 const example=freeze({initial,actions,goals,start:[1,2],size:5,wall:[2,2],
  stages:[{id:'goal',label:'무엇을 이루려 하나?'},{id:'observe',label:'장면을 관찰하다'},{id:'encode',label:'무엇을 표현할까?'},{id:'predict',label:'행동의 결과를 상상하다'},{id:'compare',label:'목표와의 거리를 비교하다'},{id:'select',label:'후보를 고르다'},{id:'act',label:'첫 행동만 적용하다'},{id:'feedback',label:'다시 보고 계획하다'}],
  scenarios:[{id:'clear',label:'바로 갈 수 있는 장면',input:initial},{id:'texture',label:'배경 무늬만 바뀐다면',input:{...initial,texture:'flicker'}},{id:'short-wall',label:'막힌 길 · 두 단계만 보기',input:{...initial,obstacle:true}},{id:'long-wall',label:'막힌 길 · 네 단계 보기',input:{...initial,obstacle:true,horizon:4}},{id:'unobserved',label:'현재 위치를 못 본다면',input:{...initial,observe:false}}],
  history:[{year:2022,label:'자율적 지능의 구조 제안',note:'LeCun의 입장문. 예측 세계모델과 여러 추상 수준의 계획을 함께 제안했다.'},{year:2023,label:'I-JEPA',note:'같은 이미지에서 가려진 부분의 표현을 예측하는 공동연구.'},{year:2025,label:'V-JEPA 2 · V-JEPA 2-AC',note:'영상 표현의 자기지도 학습과 로봇 행동 조건부 예측·계획을 나눠 학습한 공동연구.'},{year:2026,label:'AMI Labs의 연구 방향',note:'공식 창립팀에 LeCun이 포함된다. 표현 공간의 세계모델·기억·계획을 연구 목표로 설명한다.'}],
  source:{position:'https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf',image:'https://arxiv.org/pdf/2301.08243#page=3',training:'https://arxiv.org/pdf/2506.09985#page=4',planning:'https://arxiv.org/pdf/2506.09985#page=11',ami:'https://amilabs.xyz/'},
  boundary:'격자·위치 두 성분·색 무늬·행동 규칙·동률 규칙은 직접 정했다. 학습된 인코더나 신경망 가중치 없이 모든 유한 행동열을 비교한다. 실제 V-JEPA 2의 연속 행동 최적화·CEM·로봇 실험 또는 AMI 구현의 재현이 아니다.'
 });
 function validate(input){if(!input||typeof input!=='object'||Array.isArray(input)||Reflect.ownKeys(input).length!==5||Reflect.ownKeys(input).some(k=>typeof k!=='string'||!Object.hasOwn(initial,k))||!goals.some(g=>g.id===input.goal)||![2,4].includes(input.horizon)||!['steady','flicker'].includes(input.texture)||typeof input.obstacle!=='boolean'||typeof input.observe!=='boolean')throw TypeError('Choose the five finite observation, goal and planning settings.');return clone(input);}
 const distance=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
 function transition(position,action,obstacle){const a=actions.find(a=>a.id===action);if(!a)throw TypeError('Unknown grid action');const proposed=[position[0]+a.delta[0],position[1]+a.delta[1]],blocked=proposed.some(n=>n<0||n>=5)||(obstacle&&same(proposed,example.wall));return{position:blocked?position.slice():proposed,blocked};}
 function scene(position,texture){const values=[];for(let y=0;y<5;y++)for(let x=0;x<5;x++)values.push(x===position[0]&&y===position[1]?4:(x+y+texture)%2);return values;}
 function enumerate(start,goal,input){const candidates=[];function visit(sequence,path,collisions){if(sequence.length===input.horizon){const endpoint=path.at(-1),id=sequence.map(a=>actions.findIndex(x=>x.id===a)).join('');candidates.push({id,actions:sequence.slice(),path:clone(path),endpoint:endpoint.slice(),cost:distance(endpoint,goal),collisions});return;}for(const a of actions){const next=transition(path.at(-1),a.id,input.obstacle);visit([...sequence,a.id],[...path,next.position],collisions+(next.blocked?1:0));}}visit([], [start.slice()],0);candidates.sort((a,b)=>a.cost-b.cost||a.collisions-b.collisions||a.id.localeCompare(b.id));return candidates;}
 function analyze(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options)||Reflect.ownKeys(options).some(k=>k!=='input'))throw TypeError('Only the finite input settings are accepted');
  const input=validate(Object.hasOwn(options,'input')?options.input:initial),goal=goals.find(g=>g.id===input.goal).position.slice(),events=[];const push=e=>events.push({index:events.length,...clone(e)});
  const observation=input.observe?{position:example.start.slice(),frame:scene(example.start,0)}:null;
  const targetTexture=input.texture==='flicker'?1:0,predictedPixels=scene(goal,0),targetPixels=scene(goal,targetTexture),appearance={predicted:predictedPixels,target:targetPixels,pixelL1:predictedPixels.reduce((sum,n,i)=>sum+Math.abs(n-targetPixels[i]),0),featureL1:0,featureTarget:goal.slice(),description:'같은 물체 위치를 두고 배경 무늬만 바꾼 자체 비교. 위치 표현은 색을 버리도록 직접 정했다.'};
  const candidates=input.observe?enumerate(example.start,goal,input):[],chosen=candidates[0]||null,applied=chosen?transition(example.start,chosen.actions[0],input.obstacle):null,replanned=applied?enumerate(applied.position,goal,input)[0]:null;
  push({kind:'goal',message:'먼저 목표 장면을 정한다. 무엇을 이루려는지는 예측 모형 밖에서 주어진 조건이다.'});
  push({kind:'observe',message:observation?'현재 장면에서 물체가 어디 있는지 읽는다.':'현재 위치를 관찰하지 못했다. 시작 위치를 추측해 계획을 확정하지 않는다.'});
  push({kind:'encode',message:'이 격자에서는 표현을 [가로 위치, 세로 위치]로 직접 정했다. 배경의 색 무늬는 표현에 넣지 않는다.'});
  push({kind:'predict',message:chosen?'각 행동을 차례로 넣어 '+candidates.length+'개의 유한 행동열 끝 위치를 계산한다.':'출발 위치가 없으므로 행동의 결과를 계산할 근거가 없다.'});
  push({kind:'compare',message:chosen?'각 끝 위치와 목표 위치의 L1 거리를 계산한다. 가까운 결과부터 비교한다.':'현재 관찰이 없어 목표까지의 행동 비용도 계산하지 않는다.'});
  push({kind:'select',message:chosen?'가장 작은 목표 거리를 가진 후보를 고른다. 동률이면 충돌 횟수, 고정한 행동 순서로 정한다.':'관찰이 빠져 선택할 계획이 없다.'});
  push({kind:'act',message:chosen?'예상 행동열 전체를 믿고 실행하지 않고, 첫 행동 하나만 이 격자에 적용한다.':'시작 상태를 모르므로 행동을 적용하지 않는다.'});
  push({kind:'feedback',message:chosen?'새 위치를 다시 보고 같은 길이로 재계획한다. 실제 로봇 명령은 전송하지 않는다.':'관찰을 다시 얻는 것이 먼저다. 위치 정보 없이 계획 성공을 표시하지 않는다.'});
  return{input,goal,observation,appearance,candidates,chosen,applied,replanned,events,status:!chosen?'insufficient-observation':chosen.cost===0?'goal-reached-in-model':'best-available-in-horizon',scope:example.boundary};
 }
 function verifyRun(run){try{return{valid:same(run,analyze({input:run.input}))};}catch(_){return{valid:false};}}
 function replay(run,index=0){
  if(!run||!Array.isArray(run.events)||!Number.isInteger(index)||index<0||index>=run.events.length)throw RangeError('Select an available planning stage');if(!verifyRun(run).valid)throw TypeError('Only an unchanged finite calculation can be replayed');
  const candidates=index>=3?run.candidates.map(c=>({id:c.id,actions:clone(c.actions),path:clone(c.path),endpoint:clone(c.endpoint),collisions:index>=4?c.collisions:null,cost:index>=4?c.cost:null})):[];if(index<4)candidates.sort((a,b)=>a.id.localeCompare(b.id));
  return{index,event:clone(run.events[index]),complete:index===run.events.length-1,input:clone(run.input),goal:clone(run.goal),observation:index>=1?clone(run.observation):null,appearance:index>=2?clone(run.appearance):null,candidates,chosen:index>=5?clone(run.chosen):null,applied:index>=6?clone(run.applied):null,replanned:index>=7?clone(run.replanned):null,status:index>=5?run.status:'inspecting'};
 }
 window.AtlasLeCunWorld2026=freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
